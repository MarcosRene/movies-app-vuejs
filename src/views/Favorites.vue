<script setup></script>

<template>
  <section class="py-32 px-8 flex items-center justify-center">
    <div  class="text-center flex flex-col gap-2">
      <h1 class="font-bold text-2xl">Lista de favoritos vazia</h1>
      <span class="block text-base">Que tal adicionar seus filmes e sérias favoritas aqui?</span>
      <router-link to="/" class="font-medium text-red-500 underline transform transition hover:-translate-x-2">
        Ir para lista de filmes e séries.
      </router-link>    
    </div>
  </section>
</template>
