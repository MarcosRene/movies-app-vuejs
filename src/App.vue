<script setup></script>

<template>
  <header
    class="h-20 px-8 border-b-[1px] border-gray-50/[0.06] flex items-center justify-evenly md:justify-between fixed inset-0 z-10 backdrop-blur-xl"
  >
    <router-link to="/">
      <img
        src="./assets/logo.svg"
        alt="Movies App Logo"
        class="hidden w-20 md:block"
      />
    </router-link>

    <nav class="flex gap-6">
      <router-link
        to="/"
        class="text-zinc-100"
        active-class="text-red-500 font-semibold"
        >Home</router-link
      >
      <router-link
        to="/movies"
        class="text-zinc-100"
        active-class="text-red-500 font-semibold"
        >Filmes</router-link
      >
      <router-link
        to="/series"
        class="text-zinc-100"
        active-class="text-red-500 font-semibold"
        >Séries</router-link
      >
      <router-link
        to="/favorites"
        class="text-zinc-100 underline"
        active-class="text-red-500 font-semibold"
        >Favoritos</router-link
      >
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>
