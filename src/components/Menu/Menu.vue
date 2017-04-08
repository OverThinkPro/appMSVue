<template lang="html">
  <div class="menu">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">系统管理</li>
        <li><router-link to="/Menu">菜单管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box" style="margin-bottom: 0;">
        <h3>菜单管理</h3>
      </div>
      <div class="table-box outside-box" style="margin-top: 5px;">
        <div class="table-box-left fl">
          <div class="title-box content-box">
            <h5>菜单列表</h5>
          </div>
        </div>
        <div class="table-box-right outside-box fr">
          <div class="search-bar-box">
            <div class="search-bar">
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">菜单名称</span>
                <input type="text" class="form-control refresh">
              </div>
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">菜单编号</span>
                <input type="text" class="form-control refresh">
              </div>
              <div class="input-group search-bar-input fl">
                <select class="form-control refresh" name="">
                    <option value="">- 是否启用 -</option>
                    <option value="">启用</option>
                    <option value="">禁用</option>
                </select>
              </div>
              <div class="input-group btn-group fr">
                <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
                <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
              </div>
            </div>
          </div>
          <div class="search-hr"></div>
          <div class="btn-box" style="margin-bottom: 0;">
            <div class="fl">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_menu_modal">添加</button>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#update_menu_modal">修改</button>
              <button type="button" class="btn btn-primary" @click="deleteMenu()">删除</button>
            </div>
            <div class="fr">
              <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-export"></i>导出</button>
              <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-print"></i>打印</button>
            </div>
          </div>
          <div class="table-box data-box">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th><input type="checkbox" name="allMenu"></th>
                  <th>序号</th>
                  <th>菜单编号</th>
                  <th>菜单名称</th>
                  <th>是否启用</th>
                  <th>菜单URL</th>
                  <th>菜单描述</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(elem, index) in menuList" :key="elem.key">
                  <td><input type="checkbox" name="menu" :value="elem.moduleId" /></td>
                  <td>{{ index + 1 }}</td>
                  <td>{{ elem.moduleId }}</td>
                  <td>{{ elem.moduleName }}</td>
                  <td v-if="elem.inUse ==='1'">启用</td>
                  <td v-else>禁用</td>
                  <td>{{ elem.moduleUrl }}</td>
                  <td>{{ elem.description }}</td>
                </tr>
              </tbody>
            </table>
            <nav class="pagination-box">
              <ul class="pagination">
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&raquo;</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>

    <!-- 添加菜单模态框 -->
    <div class="modal fade" id="add_menu_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加菜单信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">上级菜单编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuNew.upModuleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上级菜单名称</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuNew.upModuleName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuNew.moduleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuNew.moduleName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                  <input type="radio" value="1" v-model="menuNew.inUse" checked>启用
                  <input type="radio" value="0" v-model="menuNew.inUse">禁用
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单URL</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuNew.moduleUrl">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuNew.description">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改菜单模态框 -->
    <div class="modal fade" id="update_menu_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改菜单信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">上级菜单编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuOld.upModuleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上级菜单名称</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuOld.upModuleName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuOld.moduleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuOld.moduleName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                  <input type="radio" value="1" v-model="menuOld.inUse" checked>启用
                  <input type="radio" value="0" v-model="menuOld.inUse">禁用
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单URL</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuOld.moduleUrl">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuOld.description">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootbox from 'bootbox/bootbox.min';

export default {
  name: 'menu',
  data () {
    return {
      menuNew:{},
      menuOld:{},
      menuList:[
        {'moduleId': '10', 'moduleName': '首页',  'upModuleId': '1','inUse': '1','description':'首页', "moduleUrl": "/Main",
         'children': [],
        },
        {'moduleId': '11', 'moduleName': '查询统计', 'upModuleId': '1', 'inUse': '1','description':'查询统计', "moduleUrl": "/",
         'children': [
            {'moduleId': '1101', 'moduleName': '实时查询',  'upModuleId': '11','inUse': '1','description':'实时查询', "moduleUrl": "/Insearch",
             'children': [],
            },
            {'moduleId': '1102', 'moduleName': '历史报警查询',  'upModuleId': '11','inUse': '1','description':'历史报警查询', "moduleUrl": "/Alarm",
             'children': [],
            },
            {'moduleId': '1103', 'moduleName': '历史轨迹回放',  'upModuleId': '11','inUse': '1','description':'历史轨迹回放', "moduleUrl": "/Replay",
             'children': [],
            },
          ]
        },
        {'moduleId': '12', 'moduleName': '考勤管理', 'upModuleId': '1', 'inUse': '1','description':'考勤管理', "moduleUrl": "/",
         'children': [
            {'moduleId': '1201', 'moduleName': '日考勤报表',  'upModuleId': '12','inUse': '1','description':'日考勤报表', "moduleUrl": "/Daily",
             'children': [],
            },
            {'moduleId': '1202', 'moduleName': '月考勤详情报表',  'upModuleId': '12','inUse': '1','description':'月考勤详情报表', "moduleUrl": "/Monthly",
             'children': [],
            },
            {'moduleId': '1203', 'moduleName': '月考勤统计报表',  'upModuleId': '12','inUse': '1','description':'月考勤统计报表', "moduleUrl": "/",
             'children': [],
            },
          ],
        },
        {'moduleId': '13', 'moduleName': '人员管理', 'upModuleId': '1', 'inUse': '1','description':'人员管理', "moduleUrl": "/",
         'children': [
            {'moduleId': '1301', 'moduleName': '菜单管理',  'upModuleId': '13','inUse': '1','description':'菜单管理', "moduleUrl": "/Unit",
             'children': [],
            },
            {'moduleId': '1302', 'moduleName': '员工管理',  'upModuleId': '13','inUse': '1','description':'员工管理', "moduleUrl": "/Staff",
             'children': [],
            },
            {'moduleId': '1303', 'moduleName': '工种管理',  'upModuleId': '13','inUse': '1','description':'员工管理', "moduleUrl": "/Job",
             'children': [],
            },
            {'moduleId': '1304', 'moduleName': '班次管理',  'upModuleId': '13','inUse': '1','description':'班次管理', "moduleUrl": "/Schedule",
             'children': [],
            },
          ],
        },
        {'moduleId': '14', 'moduleName': '定位卡管理',  'upModuleId': '1','inUse': '1','description':'定位卡管理', "moduleUrl": "/Card",
         'children': [],
        },
        {'moduleId': '15', 'moduleName': '分站管理',  'upModuleId': '1','inUse': '1','description':'分站管理', "moduleUrl": "/Reader",
         'children': [],
        },
        {'moduleId': '16', 'moduleName': '区域设置',  'upModuleId': '16','inUse': '1','description':'区域设置', "moduleUrl": "/Region",
         'children': [],
        },
        {'moduleId': '17', 'moduleName': '系统管理', 'upModuleId': '1', 'inUse': '1','description':'系统管理', "moduleUrl": "/",
         'children': [
            {'moduleId': '1701', 'moduleName': '用户管理',  'upModuleId': '17','inUse': '1','description':'用户管理', "moduleUrl": "/User",
             'children': [],
            },
            {'moduleId': '1702', 'moduleName': '角色管理',  'upModuleId': '17','inUse': '1','description':'角色管理', "moduleUrl": "/Role",
             'children': [],
            },
            {'moduleId': '1703', 'moduleName': '菜单管理',  'upModuleId': '17','inUse': '1','description':'菜单管理', "moduleUrl": "/Menu",
             'children': [],
            },
            {'moduleId': '1703', 'moduleName': '字典管理',  'upModuleId': '17','inUse': '1','description':'字典管理', "moduleUrl": "/Dictionary",
             'children': [],
            },
            {'moduleId': '1704', 'moduleName': '参数设置',  'upModuleId': '17','inUse': '1','description':'参数设置', "moduleUrl": "/Setting",
             'children': [],
            },
            {'moduleId': '1705', 'moduleName': '日志管理',  'upModuleId': '17','inUse': '1','description':'日志管理', "moduleUrl": "/Log",
             'children': [],
            }
          ],
        },
      ]
    };
  },
 mounted () {
    this.initEvent();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_menu_modal").on('show.bs.modal', function() {
        self.menuNew = {
          'moduleId': '19', 
          'moduleName': '',  
          'upModuleId': '1',
          'upModuleName': '1',
          'inUse': '1',
          'description':'', 
          "moduleUrl": "#",
          'children': [], 
        }
      });
      $("#update_menu_modal").on('show.bs.modal', function() {
        self.menuOld = {
          'moduleId': '10', 
          'moduleName': '首页',  
          'upModuleId': '1',
          'upModuleName': '1',
          'inUse': '1',
          'description':'首页', 
          "moduleUrl": "/Main",
          'children': [],
        };
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    deleteMenu () {
      bootbox.confirm({
        message: '菜单菜单一旦删除，不可恢复，是否确定删除？',
        buttons: {
          confirm: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        },
        callback: function() {
          bootbox.alert("删除成功!");
        }
      });
    },
  }
};
</script>

<style lang="css" scoped>
#menu {
  width: 100%;
}
.outside-box {
  background-color: #EEE;
}

.table-box-left, .table-box-right {
  background-color: #FFF;
}

.table-box-left {
  min-height: 600px;
}
</style>
