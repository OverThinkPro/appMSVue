// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import axios from 'axios';

// axios.defaults.baseURL = 'http://192.168.2.105:8080/appMSJava/api/v1/main/';
// axios.defaults.baseURL = 'http://localhost:8080/appMSJava/api/v1/main/';
axios.defaults.baseURL = '/main/';

Vue.config.productionTip = false;
/* eslint-disable no-new */
// router.beforeEach((to, from, next) => {
//   if (to.path == '/Login') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/Login') {
//     next({ path: '/Login' });
//   } else {
//     next();
//   }
// });

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
