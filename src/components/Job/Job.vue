<template lang="html">
  <div class="job">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">人员管理</li>
        <li><router-link to="/Job">工种管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box">
        <h3>特殊工种管理</h3>
      </div>
      <div class="table-box outside-box" style="padding-left: 0; padding-right: 0;">
        <div class="search-bar-box" style="padding-left: 10px; padding-right: 10px;">
          <div class="search-bar">
            <div class="search-bar-select fl">
              <select class="form-control" name="">
                <option value="">- 请选择工种 -</option>
                <option value="">工种1</option>
                <option value="">工种2</option>
              </select>
            </div>
            <div class="input-group search-bar-input fl">
              <span class="input-group-addon">工种编号</span>
              <input type="text" class="form-control">
            </div>
            <div class="input-group btn-group fr">
              <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>重置</button>
              <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>查询</button>
            </div>
          </div>
        </div>
        <div class="search-hr"></div>
        <div class="btn-box" style="padding-left: 10px; padding-right: 10px;">
          <div class="fl">
            <button type="button" class="btn btn-primary">添加</button>
            <button type="button" class="btn btn-primary">修改</button>
            <button type="button" class="btn btn-primary">删除</button>
          </div>
          <div class="fr">
            <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-export"></i>导出</button>
            <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-print"></i>打印</button>
          </div>
        </div>
        <div class="data-box" style="padding-left: 10px; padding-right: 10px;">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th><input type="checkbox" name="allJob"></th>
                <th>序号</th>
                <th>工种名称</th>
                <th>工种编号</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(elem, index) in jobList" :key="elem.key">
                <td><input type="checkbox" name="job" :value="elem.jobId"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ elem.jobName }}</td>
                <td>{{ elem.jobId }}</td>
                <td>{{ elem.remark }}</td>
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
    </main>
  </div>
</template>

<script>
export default {
  name: 'job',
  data () {
    return {
      jobList: [
        {
          jobName: '掘进工',
          jobId: '001',
          remark: '掘进工'
        },
        {
          jobName: '掘进工',
          jobId: '001',
          remark: '掘进工'
        },
        {
          jobName: '掘进工',
          jobId: '001',
          remark: '掘进工'
        },
        {
          jobName: '掘进工',
          jobId: '001',
          remark: '掘进工'
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

<style lang="css" scoped>
#job {
  width: 100%;
}
</style>
