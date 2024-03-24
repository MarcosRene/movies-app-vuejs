<script setup>
import { PhTrashSimple } from '@phosphor-icons/vue'

function generateLink(data) {
  if (!data?.media_type) {
    return `/movie/${data?.id}`
  }

  const mediaType = {
    movie: `/movie/${data.id}`,
    tv: `/serie/${data.id}`
  }

  return mediaType[data.media_type]
}

defineProps({
  data: {
    type: Object,
    required: true,
  },
  onRemove: {
    type: Function,
  },
})
</script>

<template>
  <router-link :to="generateLink(data)">
    <div
      class="overflow-hidden rounded-xl transition-transform transform hover:-translate-y-2"
    >
      <img :src="data?.poster_path" class="object-cover" />
    </div>
  </router-link>
  <button
    v-if="!!onRemove"
    @click="() => onRemove(data?.id)"
    class="min-w-28 h-12 px-4 mt-4 font-medium bg-red-600 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-all hover:scale-95"
  >
    <PhTrashSimple :size="18" weight="fill" class="flex-shrink-0" />
    <span>Excluír favorito</span>
  </button>
</template>
