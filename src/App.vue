<template>
  <div id="app" class="my-container">
    <v-header class="header-wrap"></v-header>
    <div class="content-wrap">
      <router-view></router-view>
    </div>
    <v-footer class="footer-wrap"></v-footer>
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.min';
// import 'bootstrap-table/dist/bootstrap-table.min';
import VHeader from './components/Header/Header.vue';
import VFooter from './components/Footer/Footer.vue';
import './assets/script/common';

export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    VHeader, VFooter
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
/*@import "../node_modules/bootstrap-table/dist/bootstrap-table.min.css";*/
@import "./assets/style/reset.css";
@import "./assets/style/common.css";

.my-container {
  text-align: center;
  width: 100%;
  /*height: 935px;*/
  height: 100%;
  font-family: arial;
}

.header-wrap {
  /*position: relative;*/
}

.content-wrap {
  position: relative;
  background-color: #EEE;
  min-height: 600px;
  font-size: 14px;
  color: #333;
}

.footer-wrap {
  /*position: fixed;*/
  height: 120px;
  /*bottom: 0;*/
}
</style>
