<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify';
import { PhHeart, PhPlay } from '@phosphor-icons/vue'

import Loader from '../components/Loader.vue'

import { API_KEY } from '../constants'

const { params } = useRoute()

const { id: serieId } = params

const serie = ref({})
const isLoading = ref(false)
const favoritesSeriesList = ref([])

function formatAverage(avarage) {
  return avarage?.toFixed(1)
}

async function fetchSerieById() {
  try {
    isLoading.value = true

    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${serieId}?api_key=${API_KEY}&language=pt-BR`
    )

    const data = await response.json()
    serie.value = {
      ...data,
      backdrop_path: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
      vote_average: formatAverage(data.vote_average),
    }    
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function getAllFavoritesSeries() {
  try {
    const favoritesSeries = localStorage.getItem('@moviesapp:movies')

    if (favoritesSeries) {
      const formattedFavoritesSeries = JSON.parse(favoritesSeries)?.map(
        (serie) => ({
          ...serie,
          poster_path: `https://image.tmdb.org/t/p/original${serie.poster_path}`,
        })
      )

      favoritesSeriesList.value = formattedFavoritesSeries || []
    }
  } catch (error) {
    console.error(error)
  }
}

async function handleFavoriteSerieSave() {
  try {
    const serieToAdd = {
      ...serie.value,
      media_type: 'tv',
    }

    const serieAlreadyExists = favoritesSeriesList.value.some(
      (favoriteSerie) => favoriteSerie.id === serieToAdd.id
    )

    if (serieAlreadyExists) {
      return toast.warning('Já está na sua lista de favoritos.')
    }

    favoritesSeriesList.value.push(serieToAdd)

    localStorage.setItem(
      '@moviesapp:movies',
      JSON.stringify(favoritesSeriesList.value)
    )

    toast.success('Adicionado(a) à sua lista de favoritos.')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchSerieById(), 
  getAllFavoritesSeries()
})
</script>

<template>
  <Loader v-if="isLoading" />

  <section
    v-else="!isLoading"
    class="h-screen bg-cover bg-no-repeat [background-position:center] md:[background-position:top]"
    :style="{
      backgroundImage:
        'linear-gradient(to right, black, rgba(0, 0, 0, 0.5)), url(' +
        serie?.backdrop_path +
        ')',
    }"
  >
    <div
      class="h-full py-32 px-8 flex items-center justify-start z-10 animate-slider-right-to-left"
    >
      <div class="flex flex-col gap-6">
        <div class="max-w-screen-sm flex flex-col gap-10">
          <h1 class="text-5xl font-extrabold">{{ serie?.name }}</h1>

          <div class="text-zinc-400 flex items-center gap-2">
            <span
              >{{
                new Date(serie.first_air_date).toLocaleString('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
              }}
            </span>
            |
            <span class="text-green-600 font-bold">{{
              serie.vote_average
            }}</span>
            |
            <span v-for="serie in serie.episode_run_time">{{
              serie + ' min'
            }}</span>
          </div>

          <p v-if="serie.overview">{{ serie.overview }}</p>

          <div
            className="flex flex-col md:flex-row md:justify-between md:items-start"
          >
            <ul
              class="max-w-[200px] grid grid-cols-2 gap-x-8 order-2 md:order-1"
            >
              <li v-for="genre in serie.genres">
                <span class="text-zinc-400">{{ genre.name }}</span>
              </li>
            </ul>

            <div className="mb-8 flex gap-4 order-1 md:mb-0 md:order-2">
              <button
                class="min-w-28 size-12 font-medium rounded-lg bg-red-600 flex items-center justify-center gap-2 hover:bg-red-700 transition-all hover:scale-95"
              >
                <PhPlay :size="18" weight="fill" />
                <span>Trailer</span>
              </button>
              <button
                class="min-w-28 size-12 font-medium rounded-lg border-2 border-white bg-transparent flex items-center justify-center gap-2 transition-all hover:scale-95"
              >
                <PhHeart :size="18" weight="fill" />
                <span @click="handleFavoriteSerieSave">Salvar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
