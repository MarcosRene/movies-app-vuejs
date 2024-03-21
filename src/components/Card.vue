<script>
export default {
  props: {
    imageUrl: String,
    id: Number,
  },
}
</script>

<template>
  <router-link :to="'/movie/' + id">
    <div class="overflow-hidden rounded-xl">
      <img
        :src="'https://image.tmdb.org/t/p/original/' + imageUrl"
        class="object-cover"
      />
    </div>
  </router-link>
</template>
