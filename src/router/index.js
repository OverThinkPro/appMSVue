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

import Unit from '@/components/Unit/Unit';
import Staff from '@/components/Staff/Staff';
import Job from '@/components/Job/Job';
import Schedule from '@/components/Schedule/Schedule';

import Card from '@/components/Card/Card';

import Reader from '@/components/Reader/Reader';

import User from '@/components/User/User';
import Role from '@/components/Role/Role';
import Menu from '@/components/Menu/Menu';
import Setting from '@/components/Setting/Setting';
import Region from '@/components/Region/Region';

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
    },
    {
      path: '/Unit',
      name: 'Unit',
      component: Unit
    },
    {
      path: '/Staff',
      name: 'Staff',
      component: Staff
    },
    {
      path: '/Job',
      name: 'Job',
      component: Job
    },
    {
      path: '/Schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/Card',
      name: 'Card',
      component: Card
    },
    {
      path: '/Reader',
      name: 'Reader',
      component: Reader
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/Role',
      name: 'Role',
      component: Role
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/Region',
      name: 'Region',
      component: Region
    }
  ]
});
