/**
 * Created by Zychaowill on 2017/04/21 11:19
 */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/appMSJava/api/v1/main/';

import main from './modules/main/index';
import user from './modules/user/index';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      main: main,
      user: user,
    }
});
