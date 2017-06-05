<template>
  <div class="notfound">
    <!-- <p class="page-container">404 page not found</p> -->
    <!-- 代码 开始 -->
    <div id="container"><img class="png" src="./404.png" /> <img class="png msg" src="./404_msg.png" />
      <p><a href="javascript:void(0);" @click="gotoLogin()"><img class="png" src="./404_to_index.png" /></a> </p>
    </div>
    <div id="cloud" class="png"></div>
    <!-- 代码 结束 -->

  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    gotoLogin () {
      window.sessionStorage.removeItem('user');
      this.$router.push("/Login");
    }
  }
}
</script>
<style lang="css" scoped>
/*.page-container {
    font-size: 20px;
    text-align: center;
    color: rgb(192, 204, 218);
    height: 800px;
}*/

body, div {
    margin: 0;
    padding: 0;
}
.notfound {
    background: url("./error_bg.jpg") repeat-x scroll 0 0 #67ACE4;
}
#container {
    margin: 0 auto;
    padding-top: 50px;
    text-align: center;
    width: 560px;
}
#container img {
    border: medium none;
    margin-bottom: 50px;
}
#container .error {
    height: 200px;
    position: relative;
}
#container .error img {
    bottom: -50px;
    position: absolute;
    right: -50px;
}
#container .msg {
    margin-bottom: 65px;
}
#cloud {
    background: url("./error_cloud.png") repeat-x scroll 0 0 transparent;
    bottom: 0;
    height: 170px;
    position: absolute;
    width: 100%;
}
</style>
