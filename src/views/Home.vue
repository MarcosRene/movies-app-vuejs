<script>
import Card from '../components/Card.vue'

import { API_KEY } from '../constants'

export default {
  components: {
    Card,
  },

  data: () => ({
    movies: null,
  }),

  created() {
    this.fetchMoviesData()
  },

  watch: {
    currentBranch: 'fetchMoviesData',
  },

  methods: {
    async fetchMoviesData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      )

      const data = await response.json()
      this.movies = data.results
    },
  },
}
</script>

<template>
  <ul class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
    <li
      v-for="movie in movies"
      :key="movie.id"
      class="transition-transform transform hover:-translate-y-2"
    >
      <Card :id="movie.id" :image-url="movie.poster_path" />
    </li>
  </ul>
</template>
