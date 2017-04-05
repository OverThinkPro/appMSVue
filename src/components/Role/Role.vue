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
              <input class="form-control" type="text" name="">
            </div>
            <div class="search-bar-select fl">
              <select class="form-control" name="">
                <option value="">- 请选择角色状态 -</option>
                <option value="0">启用</option>
                <option value="1">禁用</option>
              </select>
            </div>
            <div class="btn-group fr">
              <button class="btn btn-default" type="button"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
              <button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <div class="btn-box">
          <button class="btn btn-primary fl" type="button">添加角色</button>
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
                <th>备注</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in roleList" :key="role.key">
                <td><input type="checkbox" name="role" value="role.roleId" /></td>
                <td>{{ index + 1 }}</td>
                <td>{{ role.roleName }}</td>
                <td v-if="role.isUse">启用</td>
                <td v-else>禁用</td>
                <td>{{ role.description }}</td>
                <td>{{ role.remark }}</td>
                <td>
                  <a href="javascript: void(0);" title="修改角色基本信息" data-toggle="modal" data-target="#set_reader_parameter_modal"><i class="glyphicon glyphicon-edit"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="设置角色权限" data-toggle="modal" data-target="#mark_reader_modal"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="删除角色"><i class="glyphicon glyphicon-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      roleList: [
        {
          roleId: 'R100001',
          roleName: '系统管理员',
          isUse: true,
          description: '系统管理员',
          remark: '系统管理员',
        },
        {
          roleId: 'R100001',
          roleName: '系统管理员',
          isUse: true,
          description: '系统管理员',
          remark: '系统管理员',
        },
        {
          roleId: 'R100001',
          roleName: '系统管理员',
          isUse: false,
          description: '系统管理员',
          remark: '系统管理员',
        },
        {
          roleId: 'R100001',
          roleName: '系统管理员',
          isUse: true,
          description: '系统管理员',
          remark: '系统管理员',
        }
      ]
    };
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style lang="css">
#role {
  width: 100%;
}
</style>
