import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"
import Feed from "../views/Feed.vue"
import Profile from "../views/Profile.vue"



const routes = [
   {
    path: '/',
    name: 'Login',
component: Login
  }, 
  
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },

  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
