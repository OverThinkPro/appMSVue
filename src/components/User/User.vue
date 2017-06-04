<template lang="html">
  <div class="user">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">系统管理</li>
        <li><router-link to="/User">用户管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>用户管理</h3>
      </div>
      <div class="table-box outside-box">
        <div class="search-bar-box">
          <div class="search-bar">
            <div class="input-group search-bar-input fl">
              <span class="input-group-addon">用户名</span>
              <input class="form-control refresh" type="text" id="userNameParam">
            </div>
            <div class="search-bar-select fl">
              <select class="form-control refresh" id="userInUseParam">
                <option value="">- 请选择用户状态 -</option>
                <option value="1">启用</option>
                <option value="0">禁用</option>
              </select>
            </div>
            <div class="btn-group fr">
              <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
              <button class="btn btn-primary" type="button" @click="defaultLoadUserList()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <div class="btn-box">
          <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#add_user_modal">添加用户</button>
          <button class="btn btn-primary fl" type="button" @click="checkSelect('DELETE_USER')">批量删除</button>
        </div>
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th><input type="checkbox" name="allUser" v-model="checked" @click="selectAllUserCheckbox()"></th>
                <th>序号</th>
                <th>用户名</th>
                <th>是否启用</th>
                <th>创建时间</th>
                <th>最近登录时间</th>
                <th>角色</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in userListCache.userList" :key="user.key">
                <td><input type="checkbox" name="user" :value="user.userId" /></td>
                <td>{{ index + 1 }}</td>
                <td>{{ user.userName }}</td>
                <td v-if="user.inUse ==='1'">启用</td>
                <td v-else>禁用</td>
                <td>{{ user.createTime }}</td>
                <td>{{ user.lastLoginTime }}</td>
                <td>{{ user.roleName }}</td>
                <!-- <td v-if="user.roleName ===''">暂无</td>
                <td v-else>{{ user.roleName }}</td> -->
                <td>
                  <a href="" title="修改用户基本信息" data-toggle="modal" data-target=""><i class="glyphicon glyphicon-edit" @click="clickUpdateUser(user.userId)"></i></a>&nbsp;|
                  <a href="" title="设置用户角色" data-toggle="modal" data-target="" @click="clickGiveRoleToUser(user.userId)"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="删除用户"  @click="deleteUser(user.userId)"><i class="glyphicon glyphicon-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="userPagingBox">
            <div id="userPaging" class="pagination"></div>
          </nav>
        </div>
      </div>
    </main>
    <!-- 添加用户模态框 -->
    <div class="modal fade" id="add_user_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加用户信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">用户名</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="userNew.userName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">密码</div>
                <div class="group-right">
                  <input class="form-control refresh" type="password" name="" v-model="userNew.password
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="userNew.inUse">
                  <span>启用</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="userNew.inUse">
                  <span>禁用</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">创建时间</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="userNew.createTime
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">备注</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="userNew.remark">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addUser()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改用户模态框 -->
    <div class="modal fade" id="update_user_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改用户信息</h4>
          </div>
              <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">用户名</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="userOld.userName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">密码</div>
                <div class="group-right">
                  <input class="form-control refresh" type="password" name="" v-model="userOld.password
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="userOld.inUse">
                  <span>启用</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="userOld.inUse">
                  <span>禁用</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">创建时间</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="userOld.createTime
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">最近登录时间</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="userOld.lastLoginTime">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">备注</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="userOld.remark">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateUser()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 为用户分配角色模态框 -->
    <div class="modal fade" id="set_role_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">用户分配角色信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="checkbox" v-for="(role, index) in roleListOfUser">
                  <label>
                    <input type="checkbox" v-model="role.checked" :value="role.roleId">{{role.roleName}}
                  </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="giveRoleToUser(roleListOfUser)">保存</button>
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
export default {
  name: 'user',
  data () {
      return {
        /*userStatusCode: ['0','1'],
        userStatusName: ['启用', '禁用'],*/
        userNew:{},
        userOld:{},
        roleList: [],
        roleListOfUser:[],
        userListCache: {
          userList: [],
          total: 0
        },
        checked: false,
      };
  },
  mounted () {
    this.initEvent();
    this.defaultLoadUserList();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_user_modal").on('show.bs.modal', function() {
        self.userNew = {
          userId: '',
          userName: '',
          password: '123456',
          inUse: '1',
          createTime: self.current(),
          lastLoginTime: self.current(),
          remark: '',
        }
      });
    },

    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      $("input[name='user']:checked").each(function() { this.checked = false; });
    },

    /* 获得当前时间 */
    current () {
      return currentTime();
    },

    /* 得到查询条件 */
    getSearchParam () {
      let params = {}, userName, inUse;
      userName = $("#userNameParam").val();
      if (userName) { params.userName = userName; }
      inUse = $("#userInUseParam").find("option:selected").val();
      if (inUse) { params.inUse = inUse; }
      return params;
    },

    /* 分页 */
    defaultLoadUserList () {
      initPagination('userPagingBox', 'userPaging');
      this.loadUserListPaging(null);
    },

    /* 获得分页后的用户列表信息 */
    loadUserListPaging(page, isPaging) {
      let self = this;
      let params = self.getSearchParam();
      page = page || 1;
      axios.post('/base/user/p/' + page, params).then((response) => {
        let {meta,data} = response.data;
        if (meta.success) {
          if (data) {
            self.userListCache.userList = data.userList;
            self.userListCache.total = data.totalCounts;
            if (!isPaging) {
              $("#userPaging").page({
                total: self.userListCache.total,
                pageSize: 10,
                prevBtnText: '上一页',
                nextBtnText: '下一页',
                showInfo: true,
                infoFormat: '{start} ~ {end}条，共{total}条',
              }).on("pageClicked", function (event, pageNumber) {
                self.loadUserListPaging(pageNumber + 1, true);
              });
            }
          }
        } else {
          bootbox.alert({ title:'查看用户信息', message: meta.message});
        }
      });
    },

    /* 添加一个新的用户 */
    addUser() {
      let self = this;
      axios.post('/base/user', self.userNew).then((response) => {
        let meta = response.data.meta;
        if (meta.success) {
          let data = response.data.data;
          if (data && data.result == 1) { 
            bootbox.alert({ title:'添加用户信息', message: '用户信息添加成功!' }); 
          }else { 
            bootbox.alert({ title:'添加用户信息', message: '用户信息添加失败!' }); 
          }
          $("#add_user_modal").modal('hide');
          self.defaultLoadUserList();
        } else {
          bootbox.alert({ title:'添加用户信息', message: '服务器内部错误, 用户信息添加失败!'});
        }
      });
    },
    
    /* 选择要批量删除的用户信息 */
    checkSelect (type) {
      let self = this;
      let userIds = '';
      let size = $("input[name='user']").filter(':checked').length;
      
      if (size < 1) {
        bootbox.alert({ title:'选择用户', message: '请选择一条记录,再进行操作!' });
        return;
      } else {
        $("input[name='user']:checked").each(function() {
          userIds += $(this).val() + ',';
        });
        userIds = userIds.substring(0, userIds.length-1);
        self.deleteUser(userIds);
      }
    },
   
    /* 删除用户信息 */
    deleteUser (userIds) {
      let self = this;
      
      bootbox.confirm({
        title: '删除用户',
        message: '用户信息一旦删除，不可恢复，是否确定删除？',
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
            axios.delete('/base/user/', { params: { 'userIds': userIds }}).then((response) => {
              let { meta, data } = response.data;
              if (meta.success) {
                if (data && data.result) { 
                  bootbox.alert({ title:'删除用户信息', message: '用户信息删除成功!' }); 
                }else { 
                  bootbox.alert({ title:'删除用户信息', message: '用户信息删除失败!' }); 
                }
                self.defaultLoadUserList();
                $("input[name='user']:checked").each(function() { this.checked = false; });
              } else { 
                bootbox.alert({ title:'删除用户信息', message: meta.message }); 
              }
            });
          }
        }
      });
    },
    
    /* 点击修改按钮 */
    clickUpdateUser(userId){
      let self = this;
      self.userListCache.userList.forEach((user, index) => {
        if (user.userId == userId) {
          self.userOld = deepCopy(user);
          delete self.userOld.uber;
        }
      });
      $("#update_user_modal").modal('show');
    },

    /* 修改并更新用户信息 */
    updateUser () {
      let self = this;
      axios.put('/base/user/', self.userOld).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
            if (data && data.result == 1) { 
              bootbox.alert({ title:'修改用户信息',  message: '用户信息修改成功!' }); 
            }else { 
              bootbox.alert({ title:'修改用户信息',  message: '用户信息修改失败!' }); 
            }
            $("#update_user_modal").modal('hide');
            self.defaultLoadUserList();
        } else { 
          bootbox.alert({  title:'修改用户信息', message: meta.message }); 
        }
      });
    },

    /* 点击分配角色按钮 */
    clickGiveRoleToUser(userId){
      let self = this;
      axios.get('/base/role/').then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
            if (data) { 
              self.roleList = data.roleList;
              self.userListCache.userList.forEach((user, index) => {
                if (user.userId == userId) {
                  self.userOld = deepCopy(user);
                  delete self.userOld.uber;
                }
              });
              self.roleListOfUser=[];
              var roleIdsOfUser = self.userOld.roleId.split(',');
              for (var i = 0; i < self.roleList.length; i++) {
                self.roleListOfUser.push({
                  'userId':userId,
                  'roleId':self.roleList[i].roleId,
                  'roleName':self.roleList[i].roleName,
                  'checked':false,
                });
                for (var j = 0; j <roleIdsOfUser.length; j++) {
                  if(self.roleList[i].roleId == roleIdsOfUser[j]){
                     self.roleListOfUser[i].checked=true;
                  }
                }
              }
              $("#set_role_modal").modal('show');
            }else { 
              bootbox.alert({ title:'获得角色列表', message: '获取角色列表失败,请重试!' }); 
            }
        } else { 
          bootbox.alert({ title:'获得角色列表', message: meta.message }); 
        }
      });
    },

    /* 给用户分配角色 */
    giveRoleToUser(roleListOfUser){
      var roleIds = "";
      for (var i = 0; i < roleListOfUser.length; i++) {
        if(roleListOfUser[i].checked){
          roleIds += roleListOfUser[i].roleId + ',';
        }
      };
      roleIds = roleIds.substring(0, roleIds.length-1);
      axios.post('/base/user/role/', { 'userId': roleListOfUser[0].userId,'roleIds': roleIds}).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
          if (data && data.result) { 
            $("#set_role_modal").modal('hide');
            bootbox.alert({ title:'角色分配信息', message: '用户角色分配成功!' }); 
          }else { 
            bootbox.alert({ title:'角色分配信息', message: '用户角色分配失败!' }); 
          }
          this.defaultLoadUserList();
        } else { 
          bootbox.alert({ title:'角色分配信息', message: meta.message }); 
        }
      });
    },
    
    /* 复选框全选 */
    selectAllUserCheckbox(){
        //如果当前点击的多选框被选中
        if(this.checked){        
          $('input[type=checkbox][name=user]').prop("checked", true );
        }else{                
          $('input[type=checkbox][name=user]').prop("checked", false );
        }
    }
   /* loadUserPaging (page) {
      this.$store.dispatch('findUserBaseInfo', {'page' : page ,});
    },*/
  }
};
</script>

<style lang="css" scoped>
#user {
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
.checkbox label {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
 /*  font-size: 20px; */
  width: 500px;
  height: 40px;
}
.checkbox input{
  display: inline-block;
  height: 1em;
  width: 1em;
  border-radius: 4px;
  background-color: gray;  
}
</style>
