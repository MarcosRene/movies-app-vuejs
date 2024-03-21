<script setup>
import { ref, onMounted } from 'vue'

import Card from '../components/Card.vue'

import { API_KEY } from '../constants'

const movies = ref([])

async function fetchMoviesData() {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR`
  )

  const data = await response.json()
  movies.value = data.results.map((item) => ({
    ...item,
    poster_path: `https://image.tmdb.org/t/p/original${item.poster_path}`,
  }))
}

onMounted(() => fetchMoviesData())
</script>

<template>
  <section class="py-32 px-8">
    <ul class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <li
        v-for="movie in movies"
        :key="movie.id"
        class="transition-transform transform hover:-translate-y-2"
      >
        <Card :movie="movie" />
      </li>
    </ul>
  </section>
</template>
