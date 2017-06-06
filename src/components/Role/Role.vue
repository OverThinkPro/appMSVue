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
              <input class="form-control refresh" type="text" id="roleNameParam">
            </div>
            <div class="search-bar-select fl">
              <select class="form-control refresh" id="roleInUseParam">
                <option value="">- 请选择角色状态 -</option>
                <option value="1">启用</option>
                <option value="0">禁用</option>
              </select>
            </div>
            <div class="btn-group fr">
              <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
              <button class="btn btn-primary" type="button" @click="defaultLoadRoleList()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <div class="btn-box">
          <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#add_role_modal">添加角色</button>
          <button class="btn btn-primary fl" type="button"  @click="checkSelect('DELETE_ROLE')">批量删除</button>
        </div>
        <div class="data-box content-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th><input type="checkbox" name="allRole" v-model="checked" @click="selectAllRoleCheckbox()"></th>
                <th>序号</th>
                <th>角色名称</th>
                <th>是否启用</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in roleListCache.roleList" :key="role.key">
                <td><input type="checkbox" name="role" :value="role.roleId" /></td>
                <td>{{ index + 1 }}</td>
                <td>{{ role.roleName }}</td>
                <td v-if="role.inUse ==='1'">启用</td>
                <td v-else>禁用</td>
                <td>{{ role.description }}</td>
                <td>
                  <a href="" title="修改角色基本信息" data-toggle="modal" data-target=""><i class="glyphicon glyphicon-edit" @click="clickUpdateRole(role.roleId)"></i></a>&nbsp;|
                  <a href="" title="设置角色权限" data-toggle="modal" data-target=""  @click="clickGiveModuleToRole(role.roleId)"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="删除角色" @click="deleteRole(role.roleId)"><i class="glyphicon glyphicon-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="rolePagingBox">
            <div id="rolePaging" class="pagination"></div>
          </nav>
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
              <form data-vv-scope="add_role_form">
                <div class="input-group-line">
                  <div class="group-left">角色名称</div>
                  <div class="group-right"  :class="{'is-danger':errors.has('add_role_form.add_roleName')}">
                    <input class="form-control refresh" v-validate="'required'" type="text" name="add_roleName" v-model="roleNew.roleName
                    ">
                  </div>
                  <span v-show="errors.has('add_role_form.add_roleName')" class="word-danger">{{ errors.first('add_role_form.add_roleName') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">是否启用</div>
                  <div class="group-right">
                    <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="roleNew.inUse">
                    <span>启用</span>
                    <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="roleNew.inUse">
                    <span>禁用</span>
                  </div>
                </div>
                <div class="input-group-line">
                  <div class="group-left">角色描述</div>
                  <div class="group-right">
                    <input class="form-control refresh" type="text" name="" v-model="roleNew.description">
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addRole()">保存</button>
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
              <form data-vv-scope="update_role_form">
                <div class="input-group-line">
                  <div class="group-left">角色名称</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_role_form.update_roleName')}">
                    <input class="form-control refresh" type="text" v-validate="'required'" name="update_roleName" v-model="roleOld.roleName
                    ">
                  </div>
                  <span v-show="errors.has('update_role_form.update_roleName')" class="word-danger">{{ errors.first('update_role_form.update_roleName') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">是否启用</div>
                  <div class="group-right">
                    <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="roleOld.inUse">
                    <span>启用</span>
                    <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="roleOld.inUse">
                    <span>禁用</span>
                  </div>
                </div>
                <div class="input-group-line">
                  <div class="group-left">角色描述</div>
                  <div class="group-right">
                    <input class="form-control refresh" type="text" name="" v-model="roleOld.description">
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn"  @click="updateRole()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 为角色添加权限模态框 -->
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
              <div id="tree-container">
                <ul id="moduleTree" class="ztree"></ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="giveModulesToRole()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootbox from 'bootbox/bootbox.min';
import axios from 'axios';
import {currentTime} from '../../assets/script/date';
import { initPagination } from '../../assets/script/initplugin';
import { deepCopy } from '../../assets/script/extends';
import ztree from '../../assets/script/ztree/jquery.ztree.core.min';
import exedit from '../../assets/script/ztree/jquery.ztree.exedit.min';
import excheck from '../../assets/script/ztree/jquery.ztree.excheck.min';
import { Validator } from 'vee-validate';
export default {
  name: 'role',
  data () {
      return {
        /*roleStatusCode: ['0','1'],
        roleStatusName: ['启用', '禁用'],*/
        roleNew:{},
        roleOld:{},
        moduleList: [],
        moduleListOfRole:[],
        roleListCache: {
          roleList: [],
          total: 0
        },
        roleId:'',
        checked: false,
        treeSetting: {
          check : {
            enable : true,
            chkStyle: "checkbox",
            chkboxType: { "Y" : "ps", "N" : "ps" }
          },
          data: {
            simpleData: {
              enable: true,
              idKey: "moduleId",
              pIdKey: "upModuleId",
              rootPId: 1
            },
            key: {
              name: 'moduleName'
            }
          },
        },
      };
  },
  mounted () {
    this.initEvent();
    this.defaultLoadRoleList();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_role_modal").on('show.bs.modal', function() {
        self.roleNew = {
          'roleId': '',
          'roleName': '',
          'inUse': '1',
          'description':'',
        }
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      $("input[name='role']:checked").each(function() { this.checked = false; });
    },

    /* 获得当前时间 */
    current () {
      return currentTime();
    },

    /* 得到查询条件 */
    getSearchParam () {
      let params = {}, roleName, inUse;
      roleName = $("#roleNameParam").val();
      if (roleName) { params.roleName = roleName; }
      inUse = $("#roleInUseParam").find("option:selected").val();
      if (inUse) { params.inUse = inUse; }
      return params;
    },

    /* 分页 */
    defaultLoadRoleList () {
      initPagination('rolePagingBox', 'rolePaging');
      this.loadRoleListPaging(null);
    },

    /* 获得分页后的角色列表信息 */
    loadRoleListPaging(page, isPaging) {
      let self = this;
      let params = self.getSearchParam();
      page = page || 1;
      axios.post('/base/role/p/' + page, params).then((response) => {
        let {meta,data} = response.data;
        if (meta.success) {
          if (data) {
            self.roleListCache.roleList = data.roleList;
            self.roleListCache.total = data.totalCounts;
            if (!isPaging) {
              $("#rolePaging").page({
                total: self.roleListCache.total,
                pageSize: 10,
                prevBtnText: '上一页',
                nextBtnText: '下一页',
                showInfo: true,
                infoFormat: '{start} ~ {end}条，共{total}条',
              }).on("pageClicked", function (event, pageNumber) {
                self.loadRoleListPaging(pageNumber + 1, true);
              });
            }
          }
        } else {
          bootbox.alert({ title:'查看角色信息', message: meta.message });
        }
      });
    },

    /* 添加一个新的角色 */
    addRole() {
      let self = this;
      this.$validator.validateAll("add_role_form").then(() => {
        axios.post('/base/role', self.roleNew).then((response) => {
          let meta = response.data.meta;
          if (meta.success) {
            let data = response.data.data;
            if (data && data.result == 1) {
              bootbox.alert({ title:'添加角色信息', message: '角色信息添加成功!' });
            }else {
              bootbox.alert({ title:'添加角色信息', message: '角色信息添加失败!' });
            }
            $("#add_role_modal").modal('hide');
            self.defaultLoadRoleList();
          } else {
            bootbox.alert({ title:'添加角色信息', message: '服务器内部错误, 角色信息添加失败!'});
          }
        });
      }).catch(() => {

      });
    },

    /* 选择要批量删除的角色信息 */
    checkSelect (type) {
      let self = this;
      let roleIds = '';
      let size = $("input[name='role']").filter(':checked').length;
      if (size < 1) {
        bootbox.alert({ title:'选择角色', message: '请选择一条记录,再进行操作!' });
        return;
      }else{
        $("input[name='role']:checked").each(function() {
          roleIds += $(this).val() + ',';
        });
        roleIds = roleIds.substring(0, roleIds.length-1);
        self.deleteRole(roleIds);
      }
    },

    /* 删除角色信息 */
    deleteRole (roleIds) {
      let self = this;
      bootbox.confirm({
        title: '删除角色',
        message: '角色信息一旦删除，不可恢复，是否确定删除？',
        buttons: {
          confirm: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        },
        callback: function(result) {
          if (result) {
            axios.delete('/base/role/', { params: { 'roleIds': roleIds }}).then((response) => {
              let { meta, data } = response.data;
              if (meta.success) {
                if (data && data.result) {
                  bootbox.alert({ title:'删除角色信息', message: '角色信息删除成功!' });
                }else {
                  bootbox.alert({ title:'删除角色信息', message: '角色信息删除失败!' });
                }
                $("input[name='role']:checked").each(function() { this.checked = false; });
                self.defaultLoadRoleList();
              } else {
                bootbox.alert({ title:'删除角色信息', message: meta.message });
              }
            });
          }
        }
      });
    },

    /* 点击修改按钮 */
    clickUpdateRole(roleId){
      let self = this;
      self.roleListCache.roleList.forEach((role, index) => {
        if (role.roleId == roleId) {
          self.roleOld = deepCopy(role);
          delete self.roleOld.uber;
        }
      });
      self.errors.clear('update_role_form');
      $("#update_role_modal").modal('show');
    },

    /* 修改并更新角色信息 */
    updateRole() {
      let self = this;
      this.$validator.validateAll("update_role_form").then(() => {
        axios.put('/base/role/', self.roleOld).then((response) => {
          let { meta, data } = response.data;
          if (meta.success) {
              if (data && data.result == 1) {
                bootbox.alert({ title:'修改角色信息', message: '角色信息修改成功!' });
              }else {
                bootbox.alert({ title:'修改角色信息', message: '角色信息修改失败!' });
              }
              $("#update_role_modal").modal('hide');
              self.defaultLoadRoleList();
          } else {
            bootbox.alert({  title:'修改角色信息', message: meta.message });
          }
        });
      }).catch(() => {

      });
    },

    /* 点击分配角色按钮 */
    clickGiveModuleToRole(roleId){
      let self = this;
      self.roleId = roleId;
      axios.get('/base/module/moduleTree').then((response) => {
        let {meta, data} = response.data;
        if (meta.success) {
          if (data) {
            let zNodes = data.moduleList;
            $.fn.zTree.init($("#moduleTree"), self.treeSetting, zNodes);
            var treeObj = $.fn.zTree.getZTreeObj("moduleTree");
            treeObj.expandAll(true);
            self.getModulesOfRole(roleId);
          }
        }else{
          bootbox.alert({ title:'角色分配权限', message: '权限分配失败!' });
        }
      });
    },

    /* 获得该角色拥有的权限 */
    getModulesOfRole(roleId){
      let self = this;
      axios.get('/base/role/module/'+roleId).then((response) => {
        let {meta, data} = response.data;
        if (meta.success) {
          if (data) {
            self.moduleListOfRole = data.moduleListOfRole;
            var treeObj = $.fn.zTree.getZTreeObj("moduleTree");
            var nodes = treeObj.transformToArray(treeObj.getNodes());

            for (var i = 0; i < nodes.length; i++) {
              for (var j = 0; j < self.moduleListOfRole.length; j++) {
                if (nodes[i].moduleId == self.moduleListOfRole[j].module_id) {
                  treeObj.checkNode(nodes[i], true, false);
                }
              }
              if(i == nodes.length-1){
                $("#set_priviledge_modal").modal('show');
              }
            }
          }
        }else{
          bootbox.alert({ title:'角色分配权限',  message: '权限分配失败!' });
        }
      });
    },

    /* 保存分配给角色的权限 */
    giveModulesToRole(){
      let self = this;
      var moduleIds = "";
      var treeObj = $.fn.zTree.getZTreeObj("moduleTree");
      var nodes = treeObj.getCheckedNodes(true);
      for (var i = 0; i < nodes.length; i++) {
        moduleIds += nodes[i].moduleId + ',';
      }
      moduleIds = moduleIds.substring(0, moduleIds.length-1);
      axios.post('/base/role/module/', { 'roleId':self.roleId,'moduleIds': moduleIds}).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
          if (data && data.result) {
            $("#set_priviledge_modal").modal('hide');
            bootbox.alert({ title:'权限分配信息', message: '角色权限分配成功!' });
          }else {
            $("#set_priviledge_modal").modal('hide');
            bootbox.alert({ title:'权限分配信息', message: '角色权限分配失败!' });
          }
          this.defaultLoadRoleList();
        } else {
          $("#set_priviledge_modal").modal('hide');
          bootbox.alert({ title:'权限分配信息', message: meta.message });
        }
      });
    },
    /* 复选框全选 */
    selectAllRoleCheckbox(){
        //如果当前点击的多选框被选中
        if(this.checked){
          $('input[type=checkbox][name=role]').prop("checked", true );
        }else{
          $('input[type=checkbox][name=role]').prop("checked", false );
        }
    },
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
.outside-box{
  background-color: #fff;
}
.ztree li span.button.chk{
  height: 14px;
}
#tree-container{
  width:250px;
  background-color: white;
  margin:0px auto;
}
</style>
