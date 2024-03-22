<script setup>
import { PhTrashSimple } from '@phosphor-icons/vue'

defineProps({
  movie: {
    type: Object,
    required: true,
  },
  onRemove: {
    type: Function
  }
})
</script>

<template>
  <router-link :to="'/movie/' + movie?.id">
    <div class="overflow-hidden rounded-xl transition-transform transform hover:-translate-y-2">
      <img :src="movie?.poster_path" class="object-cover" />
    </div>
  </router-link>
  <button v-if="!!onRemove" @click="() => onRemove(movie?.id)" class="min-w-28 h-12 px-4 mt-4 font-medium bg-red-600 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-all hover:scale-95">
    <PhTrashSimple :size="18" weight="fill" class="flex-shrink-0"/>
    <span>Excluír favorito</span> 
  </button>
</template>
