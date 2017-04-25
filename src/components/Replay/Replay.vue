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
                <option v-if="unitList != null" v-for="(unit, index) in unitList"
                    :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
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
            <div class="ss-bar-input">
              <input id="startTime" class="form-control refresh" type="text" readonly="readonly" placeholder="请选择开始时间">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-input">
              <input id="endTime" class="form-control refresh" type="text" readonly="readonly" placeholder="请选择结束时间">
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
                    <th>姓名</th>
                    <th>卡号</th>
                    <th>时间</th>
                    <th>位置</th>
                    <th>分站</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="staffListCache.staffList != null" v-for="(staff, index) in staffListCache.staffList" :key="staff.key">
                    <td>{{ index + 1 }}</td>
                    <td>{{ staff.staffName }}</td>
                    <td>{{ staff.cardId }}</td>
                    <td>{{ staff.daqDate }}</td>
                    <td>{{ staff.geoPoint }}</td>
                    <td>{{ staff.readerName }}</td>
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
import jeDate from '../../assets/script/jedate/jquery.jedate.min';

export default {
  name: 'replay',
  data () {
    return {
      staffListCache: {
        staffList: [],
        total: 0
      },
      staffMapCache: {
        staffList: []
      },
      unitList: [],
      replayMap: {}
    };
  },
  mounted () {
    this.loadMap();
    initLoad();
    this.initEvent();
    this.defaultLoadUnit();
  },
  methods: {
    initEvent () {
      $("#startTime").jeDate({
        format: "YYYY-MM-DD hh:mm:ss",
        isTime: true,
        isinitVal: false
      });

      $("#endTime").jeDate({
        format: "YYYY-MM-DD hh:mm:ss",
        isTime: true,
        okfun: function(val) {

        }
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    loadMap () {
        var wuhan = ol.proj.fromLonLat([114.21, 30.37]),
        taiyuan = ol.proj.fromLonLat([112.53, 37.87]),
        beijing = ol.proj.fromLonLat([12950000, 4860000]),
        center = ol.proj.fromLonLat([116.3908, 39]);
        var view = new ol.View({
          center: center,
          minZoom: 8,
          zoom: 3
        });

        this.replayMap = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: center,
            zoom: 8,
            minZoom: 6,
            maxZoom: 12
          })
        });
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
    loadStaffListPaging (page, isPaging) {
      let self = this;

      let staffName = $("#staffName").val();
      let cardId = $("#cardId").val();
      if (!staffName && !cardId) {
        bootbox.alert({
          message: '查询条件: 员工姓名和定位卡号不能同时为空!'
        });
        return ;
      }
      let params = this.getSearchParam();

      page = page || 1;
      axios.post("/history/staff/count/p/" + page, params)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.staffListCache.staffList = data.pastdocList;
                self.staffListCache.total = data.total;

                if (!isPaging) {
                  $("#replayPaging").page({
                    total: self.staffListCache.total,
                    pageSize: 10,
                    prevBtnText: '上一页',
                    nextBtnText: '下一页',
                    showInfo: true,
                    infoFormat: '{start} ~ {end}条，共{total}条',
                  }).on("pageClicked", function (event, pageNumber) {
                    self.loadStaffListPaging(pageNumber + 1, true);
                  });
                }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /* 轨迹回放地图 */
    loadStaffMap () {
      let self = this;

      let params = this.getSearchParam();

      axios.post("/map/history/staff/count/", params)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.staffMapCache.staffList = data.listMapPoint;
                // 在地图上显示轨迹
                self.doMapPointLayer();
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    doMapPointLayer () {
      let self = this;
      let pointList = new Array();
      var replayLayer = new ol.layer.Vector({
          source: new ol.source.Vector({})
      });

      self.replayMap.addLayer(replayLayer);
      // 获取全部坐标点
      self.staffMapCache.staffList.forEach(function(staff, index) {
        let x = staff.pointx + index, y = staff.pointy;
        let pointFeature = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([parseFloat(x), parseFloat(y)], 'EPSG:4326', 'EPSG:3857'))
        });

        let propertiesList = new Array();
        propertiesList.push(staff.staff_id, staff.staff_name, staff.staff_info_his_id, x, y);
        pointFeature.setProperties(propertiesList);

        if (pointFeature != null) {
          pointList.push(pointFeature);
        }
      });

      let j = 0;
      let iconStyle = new ol.style.Style({
          fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255, 255, 255, 0.6)'
          }),
          stroke: new ol.style.Stroke({ //边界样式
            color: '#319FD3',
            width: 10
          }),
          text: new ol.style.Text({ //文本样式
            font: '30px Calibri,sans-serif',
            fill: new ol.style.Fill({
              color: '#000'
            }),
            stroke: new ol.style.Stroke({
              color: '#fff',
              width: 10
            })
          })
      });

      let newCenter = pointList[0].getGeometry().getCoordinates();
      self.replayMap.getView().setCenter(newCenter);
      var stopTime = setInterval(function() {
        if (j + 1 <= pointList.length) {
          if (j > 0) {
            let doubleCoordinatePoint = new Array();
            let coordinateFirst = pointList[j - 1].getGeometry().getCoordinates();
            let coordinateSecond = pointList[j].getGeometry().getCoordinates();
            doubleCoordinatePoint.push(coordinateFirst, coordinateSecond);

            let lineString = new ol.geom.LineString(doubleCoordinatePoint);

            let lineFeature = new ol.Feature({
              geometry: lineString
            });

            replayLayer.getSource().addFeature(lineFeature);
            pointList[j - 1].setStyle(null);
          }
          pointList[j].setStyle(iconStyle);
          replayLayer.getSource().addFeature(pointList[j]);
        } else {
          clearInterval(stopTime);
        }
        j++;
      }, 3000);
    }
  }
};
</script>

<style lang="css">
@import '../../assets/script/jedate/skin/jedate.css';

#replay {
    width: 100%;
}

#map {
  width: 100%;
  height: 100%;
  min-height: 600px;
}
</style>
