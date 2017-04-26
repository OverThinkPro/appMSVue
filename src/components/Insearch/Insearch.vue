<template lang="html">
  <div id="insearch" class="insearch-container">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">查询统计</li>
        <li><router-link to="/Insearch">实时查询</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>实时查询员工信息</h3>
      </div>
      <div class="search-bar-box sidebar sidebar-left">
        <div class="search-bar">
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" id="unitId" name="">
                <option value="">- 请选择部门 -</option>
                <option v-if="unitList != null" v-for="(unit, index) in unitList"
                    :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">员工姓名</span>
              <input id="staffName" class="form-control refresh" type="text" name="">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">员工编号</span>
              <input id="staffId" class="form-control refresh" type="text" name="">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">定位卡号</span>
              <input id="cardId" class="form-control refresh" type="text" name="" value="">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" id="regionId" name="">
                <option value="">- 请选择区域 -</option>
                <option v-if="regionList != null" v-for="(region, index) in regionList"
                    :key="region.key" :value="region.regionId">{{ region.regionName }}</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" id="readerId" name="">
                <option value="">- 请选择定位分站 -</option>
                <option v-if="readerList != null" v-for="(reader, index) in readerList"
                    :key="reader.key" :value="reader.readerId">{{ reader.readerName }}</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-default" type="reset" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-primary" type="button" @click="doInSearchOper()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <ul class="nav nav-tabs" role="tablist">
			    <li role="presentation" class="active"><a href="javascript: void(0);" data-target="#staff_map_tab" aria-controls="staff_map_tab" role="tab" data-toggle="tab">地图</a></li>
			    <li role="presentation"><a href="javascript: void(0);" data-target="#staff_list_tab" aria-controls="staff_list_tab" role="tab" data-toggle="tab">列表</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="staff_map_tab">
            <div class="map-box">
              <div id="map">

              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="staff_list_tab">
            <div class="btn-box">
              <button class="btn btn-primary fl" type="button"><i class="glyphicon glyphicon-export"></i>&nbsp;导出</button>
              <button class="btn btn-primary fl" type="button"><i class="glyphicon glyphicon-print"></i>&nbsp;打印</button>
            </div>
            <div class="data-box">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>姓名</th>
                    <!-- <th>编号</th> -->
                    <th>卡号</th>
                    <th>部门</th>
                    <th>区域</th>
                    <th>分站</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="staffListCache.staffList != null" v-for="(staff, index) in staffListCache.staffList">
                    <td>{{ index + 1 }}</td>
                    <td>{{ staff.staffName }}</td>
                    <!-- <td>{{ staff.cardId }}</td> -->
                    <td>{{ staff.cardId }}</td>
                    <td>{{ staff.unitName }}</td>
                    <td>{{ staff.regionName }}</td>
                    <td>{{ staff.readerName }}</td>
                  </tr>
                </tbody>
              </table>
              <nav class="pagination-box" id="staffPagingBox">
                <div id="staffPaging" class="pagination"></div>
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
import ol from 'openlayers/dist/ol';
import axios from 'axios';
import bootbox from 'bootbox';
import { initPagination } from '../../assets/script/initplugin';

export default {
  name: 'insearch',
  data () {
    return {
      insearchMap: {},
      currentlayer: {},
      staffListCache: {
        staffList: [],
        total: 0
      },
      staffMapCache: {
        staffList: [],
        total: 0
      },
      unitList: [],
      regionList: [],
      readerList: [],
      startInsearch: {}
    };
  },
  mounted () {
    this.loadMap();
    initLoad();
    this.doInSearchOper();
    this.defaultLoadUnitInfo();
    this.defaultLoadRegionInfo();
    this.defaultLoadReaderInfo();
  },
  beforeDestroy() {
    clearInterval(this.startInsearch);
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
        this.insearchMap = new ol.Map({
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
            maxZoom: 12
          })
        });
        this.insearchMap.on('click', function (evt) {
          var point = evt.coordinate; //鼠标单击点坐标
          alert(point);
        });
    },
    defaultLoadUnitInfo () {
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
    defaultLoadRegionInfo () {
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
    defaultLoadReaderInfo () {
      let self = this;

      axios.get('/base/reader/')
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.readerList = data.readerList;
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    doInSearchOper () {
      let self = this;
      initPagination('staffPagingBox', 'staffPaging');
      // 终止上一次实时查询定时器
      clearInterval(this.startInsearch);

      this.loadStaffList(null);
      this.loadStaffMap();
      // 开启新一次实时查询定时器
      this.startInsearch = setInterval(function() {
        self.loadStaffMap();
      }, 3000);
    },
    getSearchParam () {
      let params = {}, unitId, staffName, staffId, cardId, regionId, readerId;

      unitId = $("#unitId").find("option:selected").val();
      if (unitId) { params.unitId = unitId; }

      staffName = $("#staffName").val();
      if (staffName) { params.staffName = staffName; }

      staffId = $("#staffId").val();
      if (staffId) { params.staffId = staffId; }

      cardId = $("#cardId").val();
      if (cardId) { params.cardId = cardId; }

      regionId = $("#regionId").find("option:selected").val();
      if (regionId) { params.regionId = regionId; }

      readerId = $("#readerId").find("option:selected").val();
      if (readerId) { params.readerId = readerId; }

      return params;
    },
    /* 实时查询员工信息列表 */
    loadStaffList (page, isPaging) {
      let self = this;
      let params = this.getSearchParam();

      page = page || 1;
      axios.post('/realtime/staff/p/' + page, params)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.staffListCache.staffList = data.tlStaffList;
                self.staffListCache.total = data.total;

                if (!isPaging) {
                  $("#staffPaging").page({
                      total: self.staffListCache.total,
                      pageSize: 10,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条',
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadStaffList(pageNumber + 1, true);
                    });
                }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /* 实时查询员工地图位置信息 */
    loadStaffMap () {
      let self = this;
      let params = this.getSearchParam();

      axios.post('/map/staff/count/', params)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.staffMapCache.staffList = data.staffPointList;

                // 渲染人员位置图层
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

      let featureList = new Array();
      self.staffMapCache.staffList.forEach(function(staff, index) {
        let geometry = JSON.parse(staff.point),
            properties = { "name": staff.staff_name, "id": staff.staff_id, "staffInfoId": staff.staff_info_id};

        // 随机数仿真测试
        geometry.coordinates[0] += index * 100000 * Math.random();
        geometry.coordinates[1] += index * 1000 * Math.random();
        featureList.push(createPointFeature(geometry, properties));
      });


      let featureCollection = createFeatureCollection(featureList);
      let pointSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(featureCollection)
      });
      let pointLayer = new ol.layer.Vector({
        source: pointSource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#6699CC'
                })
            })
        })
      });
      if (self.currentlayer) {
        self.insearchMap.removeLayer(self.currentlayer);
      }
      self.currentlayer = pointLayer;

      self.insearchMap.addLayer(pointLayer);
      let newPoint = JSON.parse(self.staffMapCache.staffList[0].point);
      let newCenter = newPoint.coordinates;
      self.insearchMap.getView().setCenter(newCenter);

      function createPointFeature(geometry, properties) {
        let feature = {
          "type": "Feature",
          "geometry": geometry,
          "properties": properties
        };
        return feature;
      }

      function createFeatureCollection(features) {
        let featureCollection = {
          "type": "FeatureCollection",
          "features": features
        };
        return featureCollection;
      }
    }
  }
};
</script>

<style lang="css" scoped>
#insearch {
  width: 100%;
}

#map {
  width: 100%;
  height: 100%;
  min-height: 600px;
}
</style>
