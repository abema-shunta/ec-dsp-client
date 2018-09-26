import Vue from 'vue'
import Router from 'vue-router'
import Accounts from '@/components/Accounts'
import Login from '@/components/Login'
import NotFoundComponent from '@/components/NotFoundComponents'

import auth from '@/auth.js'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [{
    path: '*',
    component: NotFoundComponent
  },
  {
    path: '/',
    component: Accounts,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/logout',
    beforeEnter(to, from, next) {
      auth.logout()
      next('/')
    }
  }
  ]
})
