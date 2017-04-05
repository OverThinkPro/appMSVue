<template>
  <div id="nav" class="navbar" role="navigation"
    data-0="line-height: 100px; height: 100px; background: rgba(0, 0, 0, 0.3);"
    data-300="line-height: 60px; height: 60px; background: rgba(0, 0, 0, 1);">
    <div class="container nav-container">
      <ul class="nav navbar-nav">
        <template v-for="menu in menuList">
          <li v-if="!menu.children || menu.children.length === 0">
            <router-link :to="menu.url">{{ menu.module_name }}</span></router-link>
          </li>
          <li v-else-if="menu.children || menu.childrend.length > 0" class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
              aria-haspopup="true" aria-expended="false">{{ menu.module_name }}&nbsp;<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li v-for="item in menu.children"><router-link :to="item.url">{{ item.module_name }}</router-link></li>
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
export default {
  name: "nav",
  data() {
    return {
      menuList:[
        {'module_id': '10', 'module_name': '首页',  'up_module_id': '1',"url": "/Main",
         'children': [],
        },
        {'module_id': '11', 'module_name': '查询统计', 'up_module_id': '1', "url": "/",
         'children': [
            {'module_id': '1101', 'module_name': '实时查询',  'up_module_id': '11',"url": "/Insearch",
             'children': [],
            },
            {'module_id': '1102', 'module_name': '历史报警查询',  'up_module_id': '11',"url": "/Alarm",
             'children': [],
            },
            {'module_id': '1103', 'module_name': '历史轨迹回放',  'up_module_id': '11',"url": "/Replay",
             'children': [],
            },
          ]
        },
        {'module_id': '12', 'module_name': '考勤管理', 'up_module_id': '1', "url": "/",
         'children': [
            {'module_id': '1201', 'module_name': '日考勤报表',  'up_module_id': '12',"url": "/Daily",
             'children': [],
            },
            {'module_id': '1202', 'module_name': '月考勤详情报表',  'up_module_id': '12',"url": "/Monthly",
             'children': [],
            },
            {'module_id': '1203', 'module_name': '月考勤统计报表',  'up_module_id': '12',"url": "/",
             'children': [],
            },
          ],
        },
        {'module_id': '13', 'module_name': '人员管理', 'up_module_id': '1', "url": "/",
         'children': [
            {'module_id': '1301', 'module_name': '部门管理',  'up_module_id': '13',"url": "/Unit",
             'children': [],
            },
            {'module_id': '1302', 'module_name': '员工管理',  'up_module_id': '13',"url": "/Staff",
             'children': [],
            },
            {'module_id': '1303', 'module_name': '工种管理',  'up_module_id': '13',"url": "/Job",
             'children': [],
            },
            {'module_id': '1304', 'module_name': '班次管理',  'up_module_id': '13',"url": "/Schedule",
             'children': [],
            },
          ],
        },
        {'module_id': '14', 'module_name': '定位卡管理',  'up_module_id': '1',"url": "/Card",
         'children': [],
        },
        {'module_id': '15', 'module_name': '分站管理',  'up_module_id': '1',"url": "/Reader",
         'children': [],
        },
        {'module_id': '16', 'module_name': '系统管理', 'up_module_id': '1', "url": "/",
         'children': [
            {'module_id': '1601', 'module_name': '用户管理',  'up_module_id': '16',"url": "/User",
             'children': [],
            },
            {'module_id': '1602', 'module_name': '角色管理',  'up_module_id': '16',"url": "/Role",
             'children': [],
            },
            {'module_id': '1603', 'module_name': '菜单管理',  'up_module_id': '16',"url": "/Menu",
             'children': [],
            },
            {'module_id': '1603', 'module_name': '字典管理',  'up_module_id': '16',"url": "/Dictionary",
             'children': [],
            },
            {'module_id': '1604', 'module_name': '参数设置',  'up_module_id': '16',"url": "/Setting",
             'children': [],
            },
            {'module_id': '1605', 'module_name': '区域设置',  'up_module_id': '16',"url": "/Region",
             'children': [],
            },
          ],
        },
      ]
    }
  },
  mounted() {
    // alert("userId: " + $("#userId").val());
  },
  methods: {

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

.navbar-nav {
  width: 100%;
}
.navbar-nav li {
  width: 14%;
  height: 50px;
  line-height: 50px;
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
