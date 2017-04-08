<template lang="html">
  <div class="role">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">系统管理</li>
        <li><router-link to="/Role">角色管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>角色管理</h3>
      </div>
      <div class="table-box outside-box">
        <div class="search-bar-box">
          <div class="search-bar">
            <div class="input-group search-bar-input fl">
              <span class="input-group-addon">角色名称</span>
              <input class="form-control refresh" type="text" name="">
            </div>
            <div class="search-bar-select fl">
              <select class="form-control refresh" name="">
                <option value="">- 请选择角色状态 -</option>
                <option value="0">启用</option>
                <option value="1">禁用</option>
              </select>
            </div>
            <div class="btn-group fr">
              <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
              <button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <div class="btn-box">
          <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#add_role_modal">添加角色</button>
          <button class="btn btn-primary fl" type="button">批量删除</button>
        </div>
        <div class="data-box content-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th><input type="checkbox" name="allRole"></th>
                <th>序号</th>
                <th>角色名称</th>
                <th>是否启用</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in roleList" :key="role.key">
                <td><input type="checkbox" name="role" value="role.roleId" /></td>
                <td>{{ index + 1 }}</td>
                <td>{{ role.roleName }}</td>
                <td v-if="role.inUse ==='1'">启用</td>
                <td v-else>禁用</td>
                <td>{{ role.description }}</td>
                <td>
                  <a href="javascript: void(0);" title="修改角色基本信息" data-toggle="modal" data-target="#update_role_modal"><i class="glyphicon glyphicon-edit"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="设置角色权限" data-toggle="modal" data-target="#set_priviledge_modal"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="删除角色"><i class="glyphicon glyphicon-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <!-- 添加角色模态框 -->
    <div class="modal fade" id="add_role_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加角色信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">角色编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="roleNew.roleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">角色名称</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="roleNew.roleName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                  <input type="radio" value="1" v-model="roleNew.inUse" checked>启用
                  <input type="radio" value="0" v-model="roleNew.inUse">禁用
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">角色描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="roleNew.description">
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
    <!-- 修改角色模态框 -->
    <div class="modal fade" id="update_role_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改角色信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">角色编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="roleOld.roleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">角色名称</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="roleOld.roleName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                  <input type="radio" value="1" v-model="roleOld.inUse" checked>启用
                  <input type="radio" value="0" v-model="roleOld.inUse">禁用
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">角色描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="roleOld.description">
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
    <!-- 为用户添加权限模态框 -->
    <div class="modal fade" id="set_priviledge_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">角色添加权限信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              
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
  name: 'role',
  data () {
    return {
      roleNew:{},
      roleOld:{},
      roleList: [
        {
          roleId: 'R100001',
          roleName: '系统管理员',
          inUse: '1',
          description: '系统管理员',
        },
        {
          roleId: 'R100001',
          roleName: '系统管理员',
          inUse: '1',
          description: '系统管理员',
        },
        {
          roleId: 'R100001',
          roleName: '系统管理员',
          inUse: '0',
          description: '系统管理员',
        },
        {
          roleId: 'R100001',
          roleName: '系统管理员',
          inUse: '1',
          description: '系统管理员',
        }
      ]
    };
  },
  mounted () {
     this.initEvent();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_role_modal").on('show.bs.modal', function() {
        self.roleNew = {
          'roleId': 'R100002', 
          'roleName': '',  
          'inUse': '1',
          'description':'', 
        }
      });
      $("#update_role_modal").on('show.bs.modal', function() {
        self.roleOld = {
          'roleId': 'R100001', 
          'roleName': '系统管理员',  
          'inUse': '1',
          'description':'系统管理员', 
        };
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    }
  }
};
</script>

<style lang="css" scoped>
#role {
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
