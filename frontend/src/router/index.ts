import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import GameMenu from '../views/GameMenu.vue'
import Game from '../views/Game.vue'
import Leaderboard from '../views/Leaderboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import GameResults from '../views/GameResults.vue'


const routes = [
  { 
    name: "menu",
    path: '/', 
    props: true,
    component: GameMenu 
  },
  { 
    path: '/game', 
    props: true,
    component: Game 
  },
  { 
    path: '/leaderboard', 
    component: Leaderboard 
  },
  { 
    path: '/login', 
    component: Login 
  },
  { 
    path: '/register', 
    component: Register 
  },
  { 
    name: 'gameResults',
    path: '/results', 
    component: GameResults,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router