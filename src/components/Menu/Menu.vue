<template lang="html">
  <div class="menu">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">系统管理</li>
        <li><router-link to="/Menu">菜单管理</router-link></li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {

    };
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style lang="css">
#menu {
  width: 100%;
}
</style>
