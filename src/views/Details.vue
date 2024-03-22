<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify';
import { PhHeart, PhPlay } from '@phosphor-icons/vue'

import Loader from '../components/Loader.vue'

import { API_KEY } from '../constants'

const { params } = useRoute()

const { id: movieId } = params

const movie = ref({})
const isLoading = ref(false)
const favoritesMoviesList = ref([])

function formatAverage(avarage) {
  return avarage?.toFixed(1)
}

async function fetchMovieById() {
  try {
    isLoading.value = true

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`
    )

    const data = await response.json()
    movie.value = {
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

function getAllFavoritesMovies() {
  try {
    const favoritesMovies = localStorage.getItem('@moviesapp:movies')

    if (favoritesMovies) {
      const formattedFavoritesMovies = JSON.parse(favoritesMovies)?.map(movie => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      }))

      favoritesMoviesList.value = formattedFavoritesMovies || []
    }
  } catch (error) {
    console.error(error)
  }
}

async function handleFavoriteMovieSave() {
  try {
    const newFavoritesMoviesList = [
      ...favoritesMoviesList.value,
      movie.value
    ]

   localStorage.setItem('@moviesapp:movies', JSON.stringify(newFavoritesMoviesList))
   toast.success('Adicionado(a) a sua lista de favoritos.')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchMovieById()
  getAllFavoritesMovies()
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
        movie?.backdrop_path +
        ')',
    }"
  >
    <div
      class="h-full py-32 px-8 flex items-center justify-start z-10 animate-slider-right-to-left"
    >
      <div class="flex flex-col gap-6">
        <div class="max-w-screen-sm flex flex-col gap-10">
          <h1 class="text-5xl font-extrabold">{{ movie.title }}</h1>

          <div class="text-zinc-400 flex items-center gap-2">
            <span
              >{{
                new Date(movie.release_date).toLocaleString('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
              }}
            </span>
            |
            <span class="text-green-600 font-bold">{{
              movie.vote_average
            }}</span>
            | <span>{{ movie.runtime + ' min' }}</span>
          </div>

          <p v-if="movie.overview">{{ movie.overview }}</p>

          <div
            className="flex flex-col md:flex-row md:justify-between md:items-start"
          >
            <ul
              class="max-w-[200px] grid grid-cols-2 gap-x-8 order-2 md:order-1"
            >
              <li v-for="genre in movie.genres">
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
                <span @click="handleFavoriteMovieSave">Salvar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
