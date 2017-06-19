<template lang="html">
  <div class="monthly">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li>考勤管理</li>
        <li><router-link to="Monthly">月考勤详细报表</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>月考勤详细报表</h3>
      </div>
      <div class="search-bar-box">
        <div class="search-bar">
          <div class="search-bar-select fl">
            <select class="form-control refresh" name="">
              <option value="">- 请选择部门 -</option>
              <option value="">部门一</option>
              <option value="">部门二</option>
            </select>
          </div>
          <div class="input-group search-bar-input fl">
            <span class="input-group-addon">开始日期</span>
            <input class="form-control refresh" type="text" readonly="readonly" placeholder="请选择开始日期" name="" value="">
          </div>
          <div class="input-group search-bar-input fl">
            <span class="input-group-addon">结束日期</span>
            <input class="form-control refresh" type="text" readonly="readonly" placeholder="请选择结束日期" name="" value="">
          </div>
          <div class="input-group btn-group fr">
            <button type="button" class="btn btn-default" @click=""><i class="glyphicon glyphicon-refresh"></i>重置</button>
            <button type="button" class="btn btn-primary" @click=""><i class="glyphicon glyphicon-search"></i>查询</button>
          </div>
        </div>
      </div>
      <div class="table-box content-box">
        <div class="btn-box">
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-export"></i>导出</button>
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-print"></i>打印</button>
        </div>
        <div class="data-box">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>卡号</th>
                <th>部门</th>
                <th>班名</th>
                <th>上班时间</th>
                <th>下班时间</th>
                <th>井下累计时长</th>
                <th>应出勤时长</th>
                <th>是否足班</th>
                <th>出入井次数</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'monthly',
  data () {
    return {

    };
  },
  mounted () {

  }
};
</script>

<style lang="css">
</style>
