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
              <span class="input-group-addon">用户名称</span>
              <input class="form-control refresh" type="text" name="">
            </div>
            <div class="search-bar-select fl">
              <select class="form-control refresh" name="">
                <option value="">- 请选择用户状态 -</option>
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
          <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#add_user_modal">添加用户</button>
          <button class="btn btn-primary fl" type="button" @click="deleteUser()">批量删除</button>
        </div>
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th><input type="checkbox" name="allUser"></th>
                <th>序号</th>
                <th>用户名</th>
                <th>是否启用</th>
                <th>创建时间</th>
                <th>最近登录时间</th>
                <th>备注</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users.userList" :key="user.key">
                <td><input type="checkbox" name="user" value="user.userId" /></td>
                <td>{{ index + 1 }}</td>
                <td>{{ user.userName }}</td>
                <td v-if="user.inUse ==='1'">启用</td>
                <td v-else>禁用</td>
                <td>{{ user.createTime }}</td>
                <td>{{ user.lastLoginTime }}</td>
                <td v-if="user.remark ==='' ">暂无</td>
                <td v-else>{{ user.remark }}</td>
                <td>
                  <a href="javascript: void(0);" title="修改用户基本信息" data-toggle="modal" data-target="#update_user_modal"><i class="glyphicon glyphicon-edit"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="设置用户角色" data-toggle="modal" data-target="#set_role_modal"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="删除用户"  @click="deleteUser()"><i class="glyphicon glyphicon-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
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
                <div class="group-left">用户编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="userNew.userId">
                </div>
              </div>
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
            <button type="button" class="btn btn-primary modal-btn">保存</button>
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
                <div class="group-left">用户编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="userOld.userId">
                </div>
              </div>
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
            <button type="button" class="btn btn-primary modal-btn">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 为用户添加角色模态框 -->
    <div class="modal fade" id="set_role_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">用户添加角色信息</h4>
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
import {currentTime} from '../../assets/script/date';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data () {
      return {
        /*userStatusCode: ['0','1'],
        userStatusName: ['启用', '禁用'],*/
        userNew:{},
        userOld:{},
        /*userList: [
        {
          userId: 'U100001',
          userName: '郝莎莎',
          inUse: '1',
          createTime:'2017-04-07 17:00:00',
          lastLoginTime: '2017-04-07 17:00:00',
          remark: '',
        },
        {
          userId: 'U100002',
          userName: '张亚超',
          inUse: '1',
          createTime:'2017-04-07 17:00:00',
          lastLoginTime: '2017-04-07 17:00:00',
          remark: '',
        },
        {
          userId: 'U100003',
          userName: '丁英杰',
          inUse: '1',
          createTime:'2017-04-07 17:00:00',
          lastLoginTime: '2017-04-07 17:00:00',
          remark: '',
        }
      ]*/
      };
  },
  mounted () {
   // this.initEvent();
    this.loadUserPaging (1);
  },
  computed: {
    ...mapGetters(['users']),
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_user_modal").on('show.bs.modal', function() {
        self.userNew = {
          userId: 'U100004',
          userName: '',
          password: '123456',
          inUse: '1',
          createTime: self.current(),
          lastLoginTime: '2017-04-07 17:00:00',
          remark: '',
        }
      });
      $("#update_user_modal").on('show.bs.modal', function() {
        self.userOld = {
          userId: 'U100001',
          userName: '郝莎莎',
          password: '123456',
          inUse: '1',
          createTime:'2017-04-07 17:00:00',
          lastLoginTime: '2017-04-07 17:00:00',
          remark: '',
        };
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    current () {
      return currentTime();
    },
    deleteUser () {
      bootbox.confirm({
        message: "用户一旦删除，不可恢复！是否确定删除当前所选用户？",
        buttons: {
          confirm: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        },
        callback: function () {
          bootbox.alert({
            message: "删除成功",
          });
        }
      });
    },
    loadUserPaging (page) {
      this.$store.dispatch('findUserBaseInfo', {'page' : page ,});
    },
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
</style>
