import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Series from '../views/Series.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/movies', component: Movies },
  { path: '/series', component: Series },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
