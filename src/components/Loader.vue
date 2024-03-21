<script setup>
import { PhCircleNotch } from "@phosphor-icons/vue";
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="animate-spin bg-transparent">
      <PhCircleNotch :size="48" />
    </div>
  </div>
</template>
