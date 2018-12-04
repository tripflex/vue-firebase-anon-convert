import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import web from './web'
import auth from './auth'
import account from './account'

Vue.use(Router)

const routes = [
  ...web,
  ...auth,
  ...account
]

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  const anonSignUp = to.matched.some(record => record.name === 'SignUp') && store.state.currentUser && store.state.currentUser.isAnonymous

  // console.log( to )
  // console.log( from )
  // console.log(anonSignUp)

  store.dispatch('ROUTE_PENDING')

  store.dispatch('FETCH_AUTH').then(currentUser => {
    if (requiresGuest && currentUser && !anonSignUp) {
      next({
        name: 'Home'
      })
    } else if (requiresAuth && !currentUser) {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }

    store.dispatch('ROUTE_COMPLETE')
  })

  document.title = `${to.meta.title} - Vue Firebase Anon Accounts`
})

export default router
