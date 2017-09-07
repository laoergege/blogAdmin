import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Login from '@/page/login'
import Editor from '@/components/Editor'
import NotFound from '@/page/not-found'
import store from '../store/store';
import Err from '@/page/error';
import BooksList from '@/components/BooksList';
import PostsList from '@/components/PostsList';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/bookslist',
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter: (to, from, next) => {
        if (store.state.islogin) {
          next();
        } else if (localStorage.getItem('token')) {
          store.dispatch('authToken').then(
            (result) => {
              if (result)
                next();
              else
                next('/login');
            }
          );
        } else {
          next('/login')
        }
      },
      component: Home,
      children: [
        {
          path: 'bookslist',
          name: 'bookslist',
          components: {
            left: BooksList,
            right: null
          }
        },
        {
          path: ':book',
          name: 'editor',
          components: {
            left: PostsList,
            right: Editor
          },
          children: [
            { path: 'all' },
            { path: ':article' }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    { path: 'error', name: 'error', component: Err },
    { path: '*', alias: '/404', component: NotFound }
  ]
})
