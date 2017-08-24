import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Login from '@/page/login'
import Editor from '@/components/Editor'
import NotFound from '@/page/not-found'
import store from '../store/store';

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
      beforeEnter: async (to, from, next) => {
        if (localStorage.getItem('token')) {
          let result = await store.dispatch('authToken');
          if (result)
            next();
          else
            next('/login');
        }else{
          next('/login');
        }
      },
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
    },
    { path: '*', component: NotFound }
  ]
})
