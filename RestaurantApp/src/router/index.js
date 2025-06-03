// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SelectTable from '../views/SelectTable.vue'
import Menu from '../views/Menu.vue'
import Cart from '../views/Cart.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/table', name: 'SelectTable', component: SelectTable },
  { path: '/menu', name: 'Menu', component: Menu },
  { path: '/cart', name: 'Cart', component: Cart },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
