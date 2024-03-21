<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <router-link :to="'/movie/' + movie?.id">
    <div class="overflow-hidden rounded-xl">
      <img :src="movie?.poster_path" class="object-cover" />
    </div>
  </router-link>
</template>
