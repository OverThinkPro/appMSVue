<template lang="html">
  <div class="user">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">系统管理</li>
        <li><router-link to="/User">用户管理</router-link></li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
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
#user {
  width: 100%;
}
</style>
