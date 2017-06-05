<template>
  <div id="nav" class="navbar" role="navigation"
    data-0="line-height: 100px; height: 100px; background: rgba(0, 0, 0, 0.3);"
    data-300="line-height: 60px; height: 60px; background: rgba(0, 0, 0, 1);">
    <div class="container nav-container">
      <ul class="nav navbar-nav">
        <template v-for="menu in menuList">
          <li v-if="!menu.children || menu.children.length === 0">
            <router-link :to="menu.moduleUrl">{{ menu.moduleName }}</span></router-link>
          </li>
          <li v-else-if="menu.children || menu.children.length > 0" class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
              aria-haspopup="true" aria-expended="false">{{ menu.moduleName }}&nbsp;<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li v-for="item in menu.children"><router-link :to="item.moduleUrl">{{ item.moduleName }}</router-link></li>
            </ul>
          </li>
        </template>
      </ul>
      <div id="list-wrap-hidden">
        <button id="menuHidden"><i class="glyphicon glyphicon-menu-left"></i></button>
      </div>
    </div>
  </div>
</template>
<script>
import bootbox from 'bootbox';
import axios from 'axios';
import initNavToggle from '../../assets/script/common';

export default {
  name: "nav",
  data() {
    return {
      menuList: []
    }
  },
  mounted() {
    initNavToggle();
    this.loadMenuList();
  },
  methods: {
    loadMenuList () {
      let self = this,
          user = window.sessionStorage.getItem('user');

      if (user) {
        let userId = (JSON.parse(user)).userId;
        axios.get('/user/url/' + userId)
              .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.menuList) {
                    self.menuList = data.menuList;

                    // let menuOnlyList = data.urlOnly;
                    // window.sessionStorage.setItem('menuList', JSON.stringify(menuOnlyList));
                  } else { bootbox.alert("系统菜单装载失败!"); }
                } else { bootbox.alert("服务器内部错误,系统菜单装载失败!"); }
              });
      }
    }
  }
}
</script>
<style scoped>
#nav {
  line-height: 50px;
  height: 50px;
  border-radius: 0;
  border: 0;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  margin-bottom: 0;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1380px) {
  .container {
    width: 1350px;
  }
}

.navbar-nav {
  width: 100%;
}
.navbar-nav li {
  width: 12%;
  height: 50px;
  line-height: 50px;
}

.navbar-nav li ul {
  width: 8%;
}

.navbar-nav > li a {
  display: block;
  height: 100%;
  line-height: 100%;
  font-size: 15px;
  font-weight: 400;
  color: white;
}

.dropdown-menu {
  background-color: rgba(0, 0, 0, 0.6);
  border: 0;
  padding: 0;
}

.dropdown-menu > li {
  display: block;
  height: 34px;
  line-height: 34px;
  width: 100%;
}

.dropdown-menu > li > a {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 2px 20px 2px 20px;
  text-align: center;
}

.nav li a:focus, .nav li a:hover {
  color: #70B9B0;
  text-decoration: none;
  /*background-color: rgba(0, 0, 0, 0.6);*/
}

#nav #list-wrap-hidden {
  position: fixed;
  right: 0;
  height: 50px;
  z-index: 1024;
}

#list-wrap-hidden button {
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 18px;
  border: 0;
}
</style>
