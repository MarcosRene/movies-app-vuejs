<template>
  <header class="h-20 px-8 bg-zinc-800 flex items-center justify-between">
    <nav class="flex gap-6">
      <RouterLink to="/" class="text-zinc-100">Home</RouterLink>
      <RouterLink to="/movies" class="text-zinc-100">Filmes</RouterLink>
      <RouterLink to="/series" class="text-zinc-100">Séries</RouterLink>
    </nav>

    <RouterLink to="/favorites" class="underline">Favoritos</RouterLink>
  </header>

  <main class="px-8 py-10">
    <router-view></router-view>
  </main>
</template>
