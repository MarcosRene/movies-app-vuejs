<script setup>
defineProps({
  serie: {
    type: Object,
    required: true,
  },
  onRemove: {
    type: Function
  }
})
</script>

<template>
  <router-link :to="'/serie/' + serie?.id">
    <div class="overflow-hidden rounded-xl">
      <img :src="serie?.poster_path" class="object-cover" />
    </div>
  </router-link>
  <button v-if="!!onRemove" @click="() => onRemove(movie?.id)" class="min-w-28 h-12 px-4 mt-4 font-medium bg-red-600 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-all hover:scale-95">
    <PhTrashSimple :size="18" weight="fill" class="flex-shrink-0"/>
    <span>Excluír favorito</span> 
  </button>
</template>
