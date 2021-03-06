import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/kkbox',
    name: 'kkbox',
    // route level code-splitting
    // this generates a separate chunk (kkbox.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "kkbox" */ '../views/kkbox.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
