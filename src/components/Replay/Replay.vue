<template lang="html">
  <div class="replay">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">查询统计</li>
        <li><router-link to="/Replay">轨迹回放</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>历史轨迹查询</h3>
      </div>
      <div class="search-bar-box sidebar sidebar-left">
        <div class="search-bar">
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" name="">
                <option value="">- 请选择部门 -</option>
                <option value="">掘进1队</option>
                <option value="">掘进1队</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">员工姓名</span>
              <input class="form-control refresh" type="text">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">定位卡号</span>
              <input class="form-control refresh" type="text">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">开始时间</span>
              <input class="form-control refresh" type="text">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">结束时间</span>
              <input class="form-control refresh" type="text">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-default" type="button"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <div class="btn-box">
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-export"></i>&nbsp;导出</button>
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-print"></i>&nbsp;打印</button>
        </div>
        <div class="data-box content-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>序号</th>
                <th>时间</th>
                <th>位置</th>
                <th>分站</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </main>
    <div class="sidebar_toggle_box">
        <a id="sidebarToggle" title="查询条件"><i class="glyphicon glyphicon-triangle-right"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'replay',
  data () {
    return {

    };
  }
};
</script>

<style lang="css">
</style>
