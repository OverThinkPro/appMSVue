<template lang="html">
  <div class="alarm">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">查询统计</li>
        <li><router-link to="/Alarm">历史报警查询</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>历史报警查询</h3>
      </div>
      <div class="search-bar-box sidebar sidebar-left">
        <div class="search-bar">
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select id="unitId" class="form-control refresh" name="">
                <option value="">- 请选择部门 -</option>
                <option v-if="unitList != null" v-for="(unit, index) in unitList"
                    :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">员工姓名</span>
              <input id="staffName" class="form-control refresh" type="text" >
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-input">
              <input id="startTime" class="form-control refresh" type="text" readonly="readonly" placeholder="请选择开始时间" >
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-input">
              <input id="endTime" class="form-control refresh" type="text" readonly="readonly" placeholder="请选择结束时间">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select id="regionId" class="form-control refresh">
                <option value="">- 请选择区域 -</option>
                <option v-if="regionList != null" v-for="(region, index) in regionList"
                    :key="region.key" :value="region.regionId">{{ region.regionName }}</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select id="alarmTypeSelect" class="form-control refresh" >
                <option value="1">超时报警</option>
                <option value="2">超员报警</option>
                <option value="3">限制区域报警</option>
                <option value="4">呼叫报警</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button @click="doAlarmSearch()" class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 超时报警 -->
      <div v-if="alarmType == 1" class="table-box outside-box">
        <div class="btn-box">
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-export"></i>&nbsp;导出</button>
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-print"></i>&nbsp;打印</button>
        </div>
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>卡号</th>
                <th>部门</th>
                <th>区域</th>
                <th>报警时间</th>
                <th>报警类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(overtime, index) in resultListCache.resultList" :key="overtime.key">
                <td>{{ index + 1 }}</td>
                <td>{{ overtime.name }}</td>
                <td>{{ overtime.no }}</td>
                <td>{{ overtime.unit }}</td>
                <td>{{ overtime.region }}</td>
                <td>{{ overtime.alarmTime }}</td>
                <td>{{ overtime.alarmType }}</td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="overtimePagingBox">
            <div id="overtimePaging" class="pagination"></div>
          </nav>
        </div>
      </div>
      <!-- 超员报警 -->
      <div v-if="alarmType == 2" class="table-box outside-box">
        <div class="btn-box">
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-export"></i>&nbsp;导出</button>
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-print"></i>&nbsp;打印</button>
        </div>
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>序号</th>
                <th>区域</th>
                <th>应到人数</th>
                <th>实到人数</th>
                <th>报警时间</th>
                <th>报警类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(overman, index) in resultListCache.resultList" :key="overman.key">
                <td>{{ index + 1 }}</td>
                <td>{{ overman.region }}</td>
                <td>{{ overman.reqNum }}</td>
                <td>{{ overman.realNum }}</td>
                <td>{{ overman.alarmTime }}</td>
                <td>{{ overman.alarmType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="pagination-box" id="overmanPagingBox">
          <div id="overmanPaging" class="pagination"></div>
        </nav>
      </div>
      <!--  限制区域报警 -->
      <div v-if="alarmType == 3" class="table-box outside-box">
        <div class="btn-box">
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-export"></i>&nbsp;导出</button>
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-print"></i>&nbsp;打印</button>
        </div>
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>卡号</th>
                <th>部门</th>
                <th>区域</th>
                <th>报警时间</th>
                <th>报警类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(limitRegion, index) in resultListCache.resultList" :key="limitRegion.key">
                <td>{{ index + 1 }}</td>
                <td>{{ limitRegion.name }}</td>
                <td>{{ limitRegion.no }}</td>
                <td>{{ limitRegion.unit }}</td>
                <td>{{ limitRegion.region }}</td>
                <td>{{ limitRegion.alarmTime }}</td>
                <td>{{ limitRegion.alarmType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="pagination-box" id="limitRegionPagingBox">
          <div id="limitRegionPaging" class="pagination"></div>
        </nav>
      </div>
      <!-- 呼叫报警 -->
      <div v-if="alarmType == 4" class="table-box outside-box">
        <div class="btn-box">
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-export"></i>&nbsp;导出</button>
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-print"></i>&nbsp;打印</button>
        </div>
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>卡号</th>
                <th>部门</th>
                <th>区域</th>
                <th>报警时间</th>
                <th>报警类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(staffCall, index) in resultListCache.resultList" :key="staffCall.key">
                <td>{{ index + 1 }}</td>
                <td>{{ staffCall.name }}</td>
                <td>{{ staffCall.no }}</td>
                <td>{{ staffCall.unit }}</td>
                <td>{{ staffCall.region }}</td>
                <td>{{ staffCall.alarmTime }}</td>
                <td>{{ staffCall.alarmType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="pagination-box" id="staffCallPagingBox">
          <div id="staffCallPaging" class="pagination"></div>
        </nav>
      </div>
    </main>
    <div class="sidebar_toggle_box">
        <a id="sidebarToggle" title="查询条件"><i class="glyphicon glyphicon-triangle-right"></i></a>
    </div>
  </div>
</template>

<script>
import initLoad from '../../assets/script/sidemenu';
import { initPagination } from '../../assets/script/initplugin';
import axios from 'axios';
import bootbox from 'bootbox/bootbox.min';
// 日历&时间插件
import jeDate from '../../assets/script/jedate/jquery.jedate.min';

export default {
  name: 'alarm',
  data () {
    return {
      alarmType: 1,
      resultListCache: {
        resultList: [],
        total: 0
      },
      unitList: [],
      regionList: []
    };
  },
  mounted () {
    this.checkType();
    initLoad();
    this.initEvent();
  },
  methods: {
    initEvent () {
      $("#startTime").jeDate({
        format: "YYYY-MM-DD hh:mm:ss",
        isTime: true
      });

      $("#endTime").jeDate({
        format: "YYYY-MM-DD hh:mm:ss",
        isTime: true
      });
    },
    checkType() {
      var self = this;
      $("#alarmTypeSelect").change(function() {
        var selectedValue = $("#alarmTypeSelect").val();
        self.alarmType = selectedValue;
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      this.alarmType = 1;
    },
    /* 默认查询 */
    defaultLoadUnit () {
      let self = this;
      axios.get('/base/unit/')
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.unitList = data.unitList;
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    defaultLoadRegion () {
      let self = this;

      axios.get('/base/region/')
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.regionList = data.regionList;
              } else {
                bootbox.alert({
                  message: meta.message
                })
              }
            });
    },
    /* 获取查询条件 */
    getSearchParam () {
      let params = {};
      let unitId, staffName, startTime, endTime, regionId;

      unitId = $("#unitId").find("option:selected").val();
      if (unitId) { params.unitId = unitId; }

      staffName = $("#staffName").val();
      if (staffName) { params.staffNanme = staffName; }

      startTime = $("#startTime").val();
      if (startTime) { params.startTime = startTime; }

      endTime = $("#endTime").val();
      if (endTime) { params.endTime = endTime; }

      regionId = $("#regionId").find("option:selected").val();
      if (regionId) { params.regionId = regionId; }

      return params;
    },
    doAlarmSearch () {
      let methods = {};
      let self = this;
      methods['0'] = (function OverTimeList() { self.loadOverTimeList(); })();
      methods['1'] = (function OverManList() { self.loadOverManList(); });
      methods['2'] = (function LimitRegionList() { self.loadLimitRegionList(); });
      methods['3'] = (function staffCallList() { self.loadStaffCallList(); });

      methods[this.alarmType]();
    },
    /* 超时报警 */
    loadOverTimeList () {
      initPagination('overTimePagingBox', 'overTimePaging');
      this.loadOverTimeListPaging(null);
    },
    loadOverTimeListPaging (page) {
      let self = this;
      let params = this.getSearchParam();

      page = page || 1;
      axios.post('/history/alarm/type/' + self.alarmType + '/p/' + page, params)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.resultListCache.resultList = data.staffList;
                self.resultListCache.total = data.total;

                $("#overTimePaging").page({
                  total: self.resultListCache.total,
                  pageSize: 6,
                  prevBtnText: '上一页',
                  nextBtnText: '下一页',
                  showInfo: true,
                  infoFormat: '{start} ~ {end}条，共{total}条',
                }).on("pageClicked", function (event, pageNumber) {
                  self.loadOverTimeListPaging(pageNumber + 1);
                });
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /* 超员报警 */
    loadOverManList () {
      initPagination('overManPagingBox', 'overManPaging');
      this.loadOverManListPaging(null);
    },
    loadOverManListPaging (page) {
      let self = this;
      let params = this.getSearchParam();

      page = page || 1;
      axios.post('/history/alarm/type/' + self.alarmType + '/p/' + page, params)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.resultListCache.resultList = data.staffList;
                self.resultListCache.total = data.total;

                $("#overManPaging").page({
                  total: self.resultListCache.total,
                  pageSize: 6,
                  prevBtnText: '上一页',
                  nextBtnText: '下一页',
                  showInfo: true,
                  infoFormat: '{start} ~ {end}条，共{total}条',
                }).on("pageClicked", function (event, pageNumber) {
                  self.loadOverTimeListPaging(pageNumber + 1);
                });
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /* 限制区域报警 */
    loadLimitRegionList () {
      initPagination('limitRegionPagingBox', 'limitRegionPaging');
      this.loadOverManListPaging(null);
    },
    loadLimitRegionListPaging (page) {
      let self = this;
      let params = this.getSearchParam();

      page = page || 1;
      axios.post('/history/alarm/type/' + self.alarmType + '/p/' + page, params)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.resultListCache.resultList = data.staffList;
                self.resultListCache.total = data.total;

                $("#limitRegionPaging").page({
                  total: self.resultListCache.total,
                  pageSize: 6,
                  prevBtnText: '上一页',
                  nextBtnText: '下一页',
                  showInfo: true,
                  infoFormat: '{start} ~ {end}条，共{total}条',
                }).on("pageClicked", function (event, pageNumber) {
                  self.loadOverTimeListPaging(pageNumber + 1);
                });
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /* 呼叫报警 */
    loadStaffCallList () {
      initPagination('staffCallPagingBox', 'staffCallPaging');
      this.loadOverManListPaging(null);
    },
    loadStaffCallListPaging (page) {
      let self = this;
      let params = this.getSearchParam();

      page = page || 1;
      axios.post('/history/alarm/type/' + self.alarmType + '/p/' + page, params)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.resultListCache.resultList = data.staffList;
                self.resultListCache.total = data.total;

                $("#staffCallPaging").page({
                  total: self.resultListCache.total,
                  pageSize: 6,
                  prevBtnText: '上一页',
                  nextBtnText: '下一页',
                  showInfo: true,
                  infoFormat: '{start} ~ {end}条，共{total}条',
                }).on("pageClicked", function (event, pageNumber) {
                  self.loadOverTimeListPaging(pageNumber + 1);
                });
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    }
  }
};
</script>

<style scoped>
@import '../../assets/script/jedate/skin/jedate.css';
</style>
