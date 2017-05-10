<template>
  <div id="header">
      <div id="system-pic">
        <h3>煤矿井下精确人员定位系统</h3>
      </div>
      <div id="system-user">
        <div class="fl system-user-left">
          <div id="clock"></div>
        </div>
        <div class="fr system-user-right">
          <label><i class="glyphicon glyphicon-user" style="margin: 0 5px;"></i></label>
          <label class="user-name" id="userName">{{ user.userName }}</label>
          <!-- <div style="display:none;">
            <input type="text" id="userId" value="U100001" />
          </div> -->
          <div class="system-user-manage">
            <a href="#"><i class="glyphicon glyphicon-pencil"></i>修改密码</a>
            &nbsp;&nbsp;<a href="javascript: void(0);" @click="exitSystem()"><i class="glyphicon glyphicon-off"></i>退出系统</a>
          </div>
        </div>
      </div>
      <v-nav class="nav-wrap"></v-nav>
      <div id="list-wrap-show" style="display: none;">
        <button id="menuShow"><i class="glyphicon glyphicon-menu-right"></i></button>
      </div>
  </div>
</template>
<script>
import VNav from '../../components/Nav/Nav.vue';

export default {
  name: "header",
  data() {
    return {
      user: {}
    }
  },
  mounted () {
    this.showTime();
    this.loadUserInfo();
  },
  methods: {
    showTime () {
      setInterval(function () {
        var now = new Date();
        var weekday = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

        var timeStr = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日&nbsp;"
                    + weekday[now.getDay()] + "&nbsp;"
                    + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

        $("#clock").html(timeStr);
      }, 1000);
    },
    loadUserInfo () {
      let self = this;

      self.user = JSON.parse(window.sessionStorage.getItem('user'));
    },
    exitSystem () {
      window.sessionStorage.removeItem('user');
      this.$router.push("/Login");
    }
  },
  components: {
    VNav
  }
};
</script>
<style scoped>
#header {
  width: 100%;
}

#system-pic {
  width: 100%;
  height: 80px;
  text-align: left;
  padding-left: 30px;
  background-color: #337AB7;
}

#system-pic > h3 {
  margin: 0 0;
  padding: 20px 10px;
  font-family: Microsoft YaHei, STXingkai, Arial;
  font-size: 32px;
  color: #EFEFEF;
  letter-spacing: 10px;
}

#system-user {
  height: 32px;
  line-height: 32px;
  background-color: #FFF;
  border-bottom: 1px solid #CCC;
  overflow: hidden;
}

.system-user-left {
  margin-left: 80px;
}

#clock {
  font-weight: bold;
}

.system-user-right {
  margin-right: 80px;
}

.system-user-right label {
  font-size: 16px;
}

.system-user-right .user-name {
  font-weight: 500;
}

.system-user-manage {
  display: inline-block;
  margin-left: 20px;
}

.system-user-manage a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  color: grey;
}

.system-user-manage a:hover {
  color: #70B9B0;
}

#header #list-wrap-show {
  position: fixed;
  right: 0;
  height: 50px;
  z-index: 1024;
}

#list-wrap-show button {
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 18px;
  border: 0;
}
</style>
