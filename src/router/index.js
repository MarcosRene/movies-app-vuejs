import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue')
const Movies = () => import('../pages/Movies.vue')
const Series = () => import('../pages/Series.vue')
const Favorites = () => import('../pages/Favorites.vue')
const Details = () => import('../pages/Details.vue')
const SeriesDetails = () => import('../pages/SeriesDetails.vue')

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
