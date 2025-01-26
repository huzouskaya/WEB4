import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import GameMenu from '../views/GameMenu.vue'
import Game from '../views/Game.vue'
import Leaderboard from '../views/Leaderboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'


const routes = [
  { path: '/', component: GameMenu },
  { path: '/game', component: Game },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router