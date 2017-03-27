<template>
  <div id="app" class="my-container">
    <v-header class="head"></v-header>
    <router-view></router-view>
    <v-footer class="foot"></v-footer>
  </div>
</template>

<script>
import VHeader from './components/Header/Header.vue';
import VFooter from './components/Footer/Footer.vue';

export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    VHeader, VFooter
  }
};
</script>

<style>
.my-container {
  flex: auto;
  text-align: center;
}

#app .head {

}

#app .foot {
  position: fixed;
  bottom: 0;
}
</style>
