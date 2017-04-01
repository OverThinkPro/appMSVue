import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Main from '@/components/Main/Main';
import Login from '@/components/Login/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    }
  ]
});
