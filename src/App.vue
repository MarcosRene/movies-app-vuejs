<script setup></script>

<template>
  <header class="h-20 px-8 bg-zinc-800 flex items-center justify-between">
    <img src="./assets/logo.svg" alt="Movies App Logo" class="w-20" />

    <nav class="flex gap-6">
      <router-link to="/" class="text-zinc-100">Home</router-link>
      <router-link to="/movies" class="text-zinc-100">Filmes</router-link>
      <router-link to="/series" class="">Séries</router-link>
      <router-link to="/favorites" class="text-zinc-100 underline"
        >Favoritos</router-link
      >
    </nav>
  </header>

  <main class="px-8 py-10">
    <router-view />
  </main>
</template>
