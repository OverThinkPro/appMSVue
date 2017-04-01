// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import vuex from 'vuex';
// import N3Components from 'N3-components';

Vue.config.productionTip = false;

Vue.use(vuex);
// Vue.use(N3Components);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
