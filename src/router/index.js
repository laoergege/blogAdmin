import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Login from '@/page/login'
import Editor from '@/components/Editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/editor'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'editor',
          name: 'editor',
          component: Editor
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
