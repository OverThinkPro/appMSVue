<template>
  <div id="app" class="my-container">
    <router-view class="content-wrap"></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap-validator/dist/validator.min';

export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "./assets/style/reset.css";
@import "./assets/style/common.css";

.my-container {
  text-align: center;
  width: 100%;
  height: 100%;
  font-family: arial;
}
</style>
