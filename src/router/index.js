import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login/Login';
import Main from '@/components/Main/Main';

import Insearch from '@/components/Insearch/Insearch';
import Alarm from '@/components/Alarm/Alarm';
import Replay from '@/components/Replay/Replay';

import Daily from '@/components/Daily/Daily';
import Monthly from '@/components/Monthly/Monthly';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
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
    },
    {
      path: '/Insearch',
      name: 'Insearch',
      component: Insearch
    },
    {
      path: '/Alarm',
      name: 'Alarm',
      component: Alarm
    },
    {
      path: '/Replay',
      name: 'Replay',
      component: Replay
    },
    {
      path: '/Daily',
      name: 'Daily',
      component: Daily
    },
    {
      path: '/Monthly',
      name: 'Monthly',
      component: Monthly
    }
  ]
});
