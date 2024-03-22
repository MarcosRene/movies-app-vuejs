<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'

import Card from '../components/Card.vue'
import Loader from '../components/Loader.vue'

const favoritesMoviesList = ref([])
const isLoading = ref(false)

function getAllFavoritesMovies() {
  try {
    isLoading.value = true

    const favoritesMovies = localStorage.getItem('@moviesapp:movies')

    if (favoritesMovies) {
      const formattedFavoritesMovies = JSON.parse(favoritesMovies)?.map(
        (movie) => ({
          ...movie,
          poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        })
      )

      favoritesMoviesList.value = formattedFavoritesMovies || []
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function handleFavoreMovieRemove(movieId) {
  try {
    const updatedFavoritesList = favoritesMoviesList.value.filter(
      (movie) => movie.id !== movieId
    )

    favoritesMoviesList.value = [...updatedFavoritesList]

    localStorage.setItem('@moviesapp:movies',JSON.stringify(favoritesMoviesList.value))
    toast.success('Removido(a) da sua lista de favoritos.')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => getAllFavoritesMovies())
</script>

<template>
  <Loader v-if="isLoading" />

  <section v-else="!isLoading" class="py-32 px-8">
    <ul
      v-if="favoritesMoviesList.length > 0"
      class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      <li v-for="favoriteMovie in favoritesMoviesList" :key="favoriteMovie.id">
        <Card :movie="favoriteMovie" :on-remove="handleFavoreMovieRemove" />
      </li>
    </ul>

    <div v-else="!favoritesMoviesList" class="flex items-center justify-center">
      <div class="text-center flex flex-col gap-2">
        <h1 class="font-bold text-2xl">Lista de favoritos vazia</h1>
        <span class="block text-base"
          >Que tal adicionar seus filmes e sérias favoritas aqui?</span
        >
        <router-link
          to="/"
          class="font-medium text-red-500 underline transform transition hover:-translate-x-2"
        >
          Ir para lista de filmes e séries.
        </router-link>
      </div>
    </div>
  </section>
</template>
