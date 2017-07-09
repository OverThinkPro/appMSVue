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
                <div id="popup" class="ol-popup">
                  <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                  <div id="popup-content"></div>
                </div>
              </div>
              <div id="scale-line">

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
      mapCache: {
        // 弹出框的缓存信息
        popupInfo: {
          container: {},
          content: {},
          closer: {}
        },
        popup: {},
        // 实时地图
        insearchMap: {},
        /**
         * [staffLayer description] 人员图层
         * @type {Object}
         */
        staffLayer: {},
        staffSource: {},
        /**
         * [readerLayer description] 分站图层
         * @type {Object}
         */
        readerLayer: {},
        readerSource: {},
        /**
         * [regionLayer description] 区域图层
         * @type {Object}
         */
        regionLayer: {},
        regionSource: {},
        /**
         * 样式
         * @type {Object}
         */
        staffStyle: {},
        readerStyle: {},
        regionStyle: {},
        hightLightStyle: {},
      },
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
    this.initEvent();
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
    initEvent () {
      let self = this;

      /* Start map container element init */
      self.mapCache.popupInfo = {
          container: document.getElementById("popup"),
          content: document.getElementById('popup-content'),
          closer: document.getElementById('popup-closer')
      };
      self.mapCache.popup = new ol.Overlay(({
        element: self.mapCache.popupInfo.container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      }));
      self.mapCache.popupInfo.closer.onclick = function() {
        self.mapCache.popup.setPosition(undefined);
        self.mapCache.popupInfo.closer.blur();
        return false;
      };
      self.mapCache.hightLightStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({
                color: 'red'
            })
        })
      });
      /* End map container element init */
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    /**
     * ----------------------------------------------------------------------
     * Start map function module.
     * description 地图功能模块
     * author Zychaowill
     */
    loadMap () {
      let self = this;

      //实例化比例尺控件
      var scaleLineControl = new ol.control.ScaleLine({
          units:"metric",                      //设置比例尺单位，有degrees、imperial、us、nautical或metric
          className: 'custom-scale-line',      //设置比例尺的样式
          target: document.getElementById('scale-line') //显示比例尺的目标容器
      });
      self.mapCache.insearchMap = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Image({
            source: new ol.source.ImageWMS({
              url: 'http://localhost:8080/geoserver/wms',
              params: {
                'LAYERS': 'myditu',
                'VERSION': '1.1.0'
              },
              serverType: 'geoserver'
            })
          })
        ],
        view: new ol.View({
          center: [-7352980.04648007, 4148932.82139267],
          zoom: 22.2,
          minZoom: 2,
          // maxZoom: 20,
          rotation: Math.PI/35
        }),
        //加载控件到地图容器
        //加载比例尺控件
        controls:ol.control.defaults().extend([scaleLineControl])
      });

      self.mapCache.hightLightStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({
                color: 'red'
            })
        })
      });
      // 添加人员、分站、区域图层
      self.mapCache.staffSource = new ol.source.Vector();
      self.mapCache.staffStyle = new ol.style.Style({
          image: new ol.style.Circle({
              radius: 5,
              fill: new ol.style.Fill({
                  color: '#6699CC'
              })
          })
      });
      self.mapCache.staffStyle = new ol.style.Style({
        image: new ol.style.Icon({
          src: 'static/jobTypePics/1.png',
          scale: 0.1
        })
      });
      self.mapCache.staffLayer = new ol.layer.Vector({
        source: self.mapCache.staffSource,
        style: self.mapCache.staffStyle
      });

      self.mapCache.readerSource = new ol.source.Vector();
      self.mapCache.readerStyle = new ol.style.Style({
        image: new ol.style.Icon(({
          src: 'static/icon/reader.png',
          scale: 0.4,  //图标缩放比例
        })),
      });
      self.mapCache.readerLayer = new ol.layer.Vector({
        source: self.mapCache.readerSource,
        style: self.mapCache.readerStyle
      });

      self.mapCache.regionSource = new ol.source.Vector();
      self.mapCache.regionStyle = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new ol.style.Stroke({
          color: '#319FD3',
          width: 2
        })
      });
      self.mapCache.regionLayer = new ol.layer.Vector({
        source: self.mapCache.regionSource,
        style: self.mapCache.regionStyle
      });

      self.mapCache.insearchMap.addLayer(self.mapCache.regionLayer);
      self.mapCache.insearchMap.addLayer(self.mapCache.readerLayer);
      self.mapCache.insearchMap.addLayer(self.mapCache.staffLayer);

      self.mapCache.insearchMap.on('click', function(event) {
        let coordinate = event.coordinate;
        let feature = event.map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
          if (layer == self.mapCache.staffLayer) {
            return feature;
          }
        });
        if (feature && feature.get('type') == 'Point') {
          self.renderFeaturePopup(coordinate, feature);
        }
      });
    },
    // 渲染popup
    renderFeaturePopup (coordinate, feature) {
      let self = this;
      let staffId = feature.get('id'),
          staffName = feature.get('name'),
          unitName = feature.get('unitName');

      let featureInfo = {
        'geo': coordinate,
        'att': {
           staffId: staffId,
           staffName: staffName,
           unitName: unitName
        }
      };

      self.setFeatureInfo(featureInfo);
      self.mapCache.popup.setPosition(coordinate);
    },
    setFeatureInfo (featureInfo) {
      let containerDiv = document.createElement('div');
      containerDiv.className = 'popup-container';

      let att = featureInfo.att;
      containerDiv.innerText = '员工编号: ' + att.staffId + " 员工姓名: " + att.staffName + " 部门名称: " + att.unitName;

      this.mapCache.popupInfo.content.innerHTML = '';
      this.mapCache.popupInfo.content.appendChild(containerDiv);
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
      clearInterval(self.startInsearch);

      self.loadStaffList(null);
      self.loadStaffMap();
      // 开启新一次实时查询定时器
      self.mapCache.startInsearch = setInterval(function() {
        self.loadMapRegionLayer();
        self.loadMapReaderLayer();
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
            properties = {"type": "Point", "id": staff.staff_id, "name": staff.staff_name, "staffInfoId": staff.staff_info_id, "unitId": staff.unit_id, "unitName": staff.unit_name, "jobId": staff.job_id, "jobIconUrl": staff.job_icon_url};

        // 随机数仿真测试
        // geometry.coordinates[0] += index * 100000 * Math.random();
        // geometry.coordinates[1] += index * 1000 * Math.random();
        featureList.push(self.createFeature(geometry, properties));
      });


      let featureCollection = self.createFeatureCollection(featureList);
      self.mapCache.staffSource = new ol.source.Vector({
        // features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
        //   dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
        //   featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
        // })
        features: new ol.format.GeoJSON().readFeatures(featureCollection)
      });
      self.mapCache.staffLayer.setSource(self.mapCache.staffSource);

      // 设置不同样式
      let staffFeatureList = self.mapCache.staffSource.getFeatures();

      staffFeatureList.forEach(function(feature, index) {
        feature.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
              src: 'static/' + feature.get('jobIconUrl'),
              scale: 0.1
            })
        }));
      });

      // 设置地图视角中心位置
      // let newPoint = JSON.parse(self.staffMapCache.staffList[0].point);
      // let newCenter = newPoint.coordinates;
      // self.insearchMap.getView().setCenter(newCenter);
    },
    loadMapStaffHighLight () {
      let self = this,
          featureList = self.mapCache.staffSource.getFeatures();


    },
    /**
     *  渲染分站图层
     */
    loadMapReaderLayer() {
      let self = this,
          currentMap = self.mapCache.insearchMap;

      axios.get('/base/map/reader/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.readerList) {
                  let readerList = data.readerList,
                      featureList = new Array(), featureCollection;

                  readerList.forEach(function(reader, index) {
                    let geometry = JSON.parse(reader.geoPoint),
                        pointFeature = self.createFeature(geometry, { "type": "Point", "id": reader.readerId});

                    featureList.push(pointFeature);
                  });

                  featureCollection = self.createFeatureCollection(featureList);
                  self.mapCache.readerSource = new ol.source.Vector({
                    // features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
                    //   dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                    //   featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                    // })
                    features: new ol.format.GeoJSON().readFeatures(featureCollection)
                  });

                  // 改变分站图层数据源
                  self.mapCache.readerLayer.setSource(self.mapCache.readerSource);
                  // currentMap.getView().setCenter(featureList[0].geometry.coordinates);
                } else { bootbox.alert("区域图层装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域图层装载失败!"); }
            });
    },
    /**
     *  渲染区域图层
     */
    loadMapRegionLayer () {
      let self = this,
          currentMap = self.mapCache.insearchMap;

      axios.get('/base/map/region/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.regionList) {
                  let regionList = data.regionList,
                      featureList = new Array(), featureCollection;

                  regionList.forEach(function(region, index) {
                    let geometry = JSON.parse(region.geoPolygon);

                    featureList.push(self.createFeature(geometry, { "type": "Polygon", "id": region.regionId, "name": region.regionName }));
                  });

                  featureCollection = self.createFeatureCollection(featureList);
                  self.mapCache.regionSource = new ol.source.Vector({
                    // features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
                    //   dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                    //   featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                    // })
                    features: new ol.format.GeoJSON().readFeatures(featureCollection)
                  });

                  self.mapCache.regionLayer.setSource(self.mapCache.regionSource);
                  // console.log("----------", featureList[0].geometry.coordinates);
                  // currentMap.getView().setCenter(featureList[0].geometry.coordinates);
                } else { bootbox.alert("区域图层装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域图层装载失败!"); }
            });
    },
    createFeature(geometry, properties) {
      let feature = {
        "type": "Feature",
        "geometry": geometry,
        "properties": properties
      };
      return feature;
    },
    createFeatureCollection(features) {
      let featureCollection = {
        "type": "FeatureCollection",
        "features": features
      };
      return featureCollection;
    }
    /**
     * End map function module.
     * ----------------------------------------------------------------------
     */
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
