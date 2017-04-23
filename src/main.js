// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import axios from 'axios';
import Paginate from './components/Paginate/Paginate.vue';

// axios.defaults.baseURL = 'http://192.168.2.105:8080/appMSJava/api/v1/main/';
axios.defaults.baseURL = '/main/';

Vue.component('paginate', Paginate);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
