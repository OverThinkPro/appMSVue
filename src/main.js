// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VeeValidate, {Validator} from 'vee-validate';
import router from './router';
import store from './vuex/store';
import axios from 'axios';

const config = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
};

const dictionary = {
    zh_CN: {
        messages: {
            required: (field) => field + '不能为空'
        }
    }
};
Validator.updateDictionary(dictionary);

Vue.use(VeeValidate, config);

// axios.defaults.baseURL = 'http://192.168.2.112:8080/appMSJava/api/v1/main/';
axios.defaults.baseURL = 'http://localhost:8080/appMSJava/api/v1/main/';
// axios.defaults.baseURL = '/main/';
// axios.defaults.baseURL = '/appMSJava/api/v1/main/';

Vue.config.productionTip = false;
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (to.path == '/Login') {
    window.sessionStorage.removeItem('user');
    // window.sessionStorage.removeItem('menuList');
  }
  let user = window.sessionStorage.getItem('user');
  if (!user && to.path != '/Login') {
    next({ path: '/Login' });
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
