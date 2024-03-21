<script setup>
defineProps({
  serie: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <router-link :to="'/serie/' + serie?.id">
    <div class="overflow-hidden rounded-xl">
      <img :src="serie?.poster_path" class="object-cover" />
    </div>
  </router-link>
</template>
