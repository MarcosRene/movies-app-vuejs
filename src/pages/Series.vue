<script setup>
import { ref, onMounted } from 'vue'

import Loader from '../components/Loader.vue'
import Card from '../components/Card.vue'

const series = ref([])
const isLoading = ref(false)

async function fetchMoviesTvData() {
  try {
    isLoading.value = true

    const response = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${import.meta.env.VITE_TMBD_API_KEY}&language=pt-BR`
    )

    const data = await response.json()
    series.value = data.results.map((item) => ({
      ...item,
      poster_path: `https://image.tmdb.org/t/p/original${item.poster_path}`,
    }))

  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => fetchMoviesTvData())
</script>

<template>
  <Loader v-if="isLoading" />

  <section v-else="!isLoading" class="py-32 px-8">
    <ul class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <li
        v-for="serie in series"
        :key="serie.id"
        class="transition-transform transform hover:-translate-y-2"
      >
        <Card :data="serie" />
      </li>
    </ul>
  </section>
</template>
