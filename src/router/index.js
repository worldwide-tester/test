import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import UsersList from '../views/UsersList.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/About',
    name: 'About',
    component: About,
    meta: { requiresAuth: true },
  },
  {
    path: '/UsersList',
    name: 'UsersList',
    component: UsersList,
    meta: { requiresAuth: true },
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.state.token){
      next({path: '/login'})
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router
