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
              <select id="unitId" class="form-control refresh">
                <option value="">- 请选择部门 -</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">员工姓名</span>
              <input id="staffName" class="form-control refresh" type="text">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">定位卡号</span>
              <input id="cardId" class="form-control refresh" type="text">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">开始时间</span>
              <input id="startTime" class="form-control refresh" type="text">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">结束时间</span>
              <input id="endTime" class="form-control refresh" type="text">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-primary" type="button" @click="doReplaySearch()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="javascript: void(0);" data-toggle="tab" data-target="#staff_map_tab" role="tab" aria-controls="">地图</a></li>
          <li role="presentation"><a href="javascript: void(0);" data-toggle="tab" data-target="#staff_list_tab" role="tab" aria-controls="">列表</a></li>
        </ul>
        <div class="tab-content">
          <div id="staff_map_tab" class="tab-pane active" role="tabpanel">
            <div class="map-box">
              <div id="map">

              </div>
            </div>
          </div>
          <div id="staff_list_tab" class="tab-pane" role="tabpanel">
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
                <tbody>
                  <tr v-for="(staff, index) in staffListCache.staffList" :key="staff.key">
                    <td>{{ index + 1 }}</td>
                    <td>{{ staff.time }}</td>
                    <td>{{ staff.position }}</td>
                    <td>{{ staff.reader }}</td>
                  </tr>
                </tbody>
              </table>
              <nav class="pagination-box" id="replayPagingBox">
                <ul id="replayPaging" class="pagination"></ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="sidebar_toggle_box">
        <a id="sidebarToggle" title="查询条件"><i class="glyphicon glyphicon-triangle-right"></i></a>
    </div>
  </div>
</template>

<script>
import initLoad from '../../assets/script/sidemenu';
import ol from 'openlayers';
import axios from 'axios';
import { initPagination } from '../../assets/script/initplugin';
import bootbox from 'bootbox/bootbox.min';

export default {
  name: 'replay',
  data () {
    return {
      staffListCache: {
        staffList: [],
        total: 0
      }
    };
  },
  mounted () {
    this.loadMap();
    initLoad();
  },
  methods: {
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    loadMap () {
        var wuhan = ol.proj.fromLonLat([114.21, 30.37]),
        taiyuan = ol.proj.fromLonLat([112.53, 37.87]),
        beijing = ol.proj.fromLonLat([12950000, 4860000]);
        var view = new ol.View({
          center: taiyuan,
          minZoom: 8,
          zoom: 3
        });
        var map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: taiyuan,
            zoom: 8,
            minZoom: 6,
            maxZoom: 12,
            rotation: Math.PI / 6
          })
        });
    },
    getSearchParam () {
      let params = {},
          unitId, staffName, cardId, startTime, endTime;

      unitId = $("#unitId").find("option:selected").val();
      if (unitId) { params.unitId = unitId; }

      staffName = $("#staffName").val();
      if (staffName) { params.staffName = staffName; }

      cardId = $("#cardId").val();
      if (cardId) { params.cardId = cardId; }

      startTime = $("#startTime").val();
      if (startTime) { params.startTime = startTime; }

      endTime = $("#endTime").val();
      if (endTime) { params.endTime = endTime; }

      return params;
    },
    /* 执行历史轨迹查询 */
    doReplaySearch () {
      this.loadStaffList();
      this.loadStaffMap();
    },
    /* 轨迹回放列表 */
    loadStaffList () {
      initPagination('replayPagingBox', 'replayPaging');
      this.loadStaffListPaging(null);
    },
    loadStaffListPaging (page) {
      let self = this;
      let params = this.getSearchParam();

      axios.post("/history/staff/count/p/" + page, params)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.staffListCache.staffList = data.staffList;
                self.staffListCache.total = data.total;

                $("#replayPaging").page({
                  total: self.staffListCache.total,
                  pageSize: 6,
                  prevBtnText: '上一页',
                  nextBtnText: '下一页',
                  showInfo: true,
                  infoFormat: '{start} ~ {end}条，共{total}条',
                }).on("pageClicked", function (event, pageNumber) {
                  self.loadStaffListPaging(pageNumber + 1);
                });
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /* 轨迹回放地图 */
    loadStaffMap () {

    }
  }
};
</script>

<style lang="css">
#replay {
    width: 100%;
}

#map {
  width: 100%;
  height: 100%;
  min-height: 600px;
}
</style>
