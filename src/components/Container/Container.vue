<template lang="html">
  <div id="container-wrapper">
    <v-header class="header-wrap"></v-header>
    <router-view class="content-wrap"></router-view>
    <v-footer class="footer-wrap"></v-footer>
  </div>
</template>

<script>
import VHeader from '@/components/Header/Header.vue';
import VFooter from '@/components/Footer/Footer.vue';
import 'bootstrap-fileinput/js/fileinput.min';
import '../../assets/script/pagination/pagination';

export default {
  name: 'container-wrapper',
  data () {
    return {

    }
  },
  components: {
    VHeader, VFooter
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="css">
.header-wrap {}
.content-wrap {
  position: relative;
  background-color: #EEE;
  min-height: 700px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  zoom: 1;
}
.footer-wrap {
  height: 120px;
}
</style>
