import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const Movies = () => import('../views/Movies.vue')
const Series = () => import('../views/Series.vue')
const Favorites = () => import('../views/Favorites.vue')
const Details = () => import('../views/Details.vue')
const SeriesDetails = () => import('../views/SeriesDetails.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/movies', component: Movies },
  { path: '/series', component: Series },
  { path: '/favorites', component: Favorites },
  { path: '/movie/:id', component: Details },
  { path: '/serie/:id', component: SeriesDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
