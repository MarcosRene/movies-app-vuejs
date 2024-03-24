<script setup>
import { ref, onMounted } from 'vue'

import Card from '../components/Card.vue'
import Loader from '../components/Loader.vue'

import { API_KEY } from '../constants'

const movies = ref([])
const isLoading = ref(false)

async function fetchAllMoviesData() {
  try {
    isLoading.value = true

    const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=pt-BR`
  )

    const data = await response.json()
    movies.value = data.results.map((item) => ({
      ...item,
      poster_path: `https://image.tmdb.org/t/p/original${item.poster_path}`,
    }))
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => fetchAllMoviesData())
</script>

<template>
  <Loader v-if="isLoading" />

  <section v-else="!isLoading" class="py-32 px-8">
    <ul class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <li
        v-for="movie in movies"
        :key="movie.id"
      >
        <Card :data="movie" />
      </li>
    </ul>
  </section>
</template>
