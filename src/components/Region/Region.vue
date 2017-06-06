<template lang="html">
  <div class="region">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">区域设置</li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>区域设置</h3>
      </div>
      <div class="search-bar-box sidebar sidebar-left">
        <div class="search-bar">
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" id="regionType" name="regionTypeSel">
                <option value="">- 请选择区域类型 -</option>
                <option value="井口区域">井口区域</option>
                <option value="普通区域">普通区域</option>
                <option value="危险区域">危险区域</option>
                <option value="重点区域">重点区域</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">区域名称</span>
              <input class="form-control refresh" type="text" name="regionNameInp">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-default" type="reset" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-primary" type="button" @click="loadRegionList()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box" id="regionTabs">
        <ul class="nav nav-tabs" role="tablist" id="regionULTab">
          <li role="presentation" class="active"><a href="javascript: void(0);" data-target="#region_map_tab" aria-controls="region_map_tab" role="tab" data-toggle="tab">地图</a></li>
          <li role="presentation"><a href="javascript: void(0);" data-target="#region_list_tab" aria-controls="region_list_tab" role="tab" data-toggle="tab">列表</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="region_map_tab">
            <div class="btn-box">
              <div class="fr">
                <button type="button" @click="fullScreen()" class="btn btn-primary fr" title="地图全屏查看">
                  <i class="glyphicon glyphicon-fullscreen"></i>&nbsp;全屏查看
                </button>
                <button id="save_update_region" type="button" @click="saveModifyCheck()" class="btn btn-primary fr" title="保存修改区域">
                  <i class="glyphicon glyphicon-transfer"></i>&nbsp;保存修改区域
                </button>
                <div class="input-group fr">
                  <select class="operation" name="regionMapOperSel">
                    <option value="NONE">- 操作 -</option>
                    <option value="NEW">添加</option>
                    <option value="REMOVE">移除</option>
                    <option value="UPDATE_MORE">多个修改</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="map-box">
              <div id="map"></div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="region_list_tab">
            <div class="btn-box">
              <div class="fl">
                <button type="button" class="btn btn-primary" @click="checkType('UPDATE_REGION')">修改</button>
                <button type="button" class="btn btn-primary" @click="checkType('DELETE_REGION')">删除区域</button>
              </div>
              <div class="fr">
                <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-export"></i>导出</button>
                <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-print"></i>打印</button>
              </div>
            </div>
            <div class="data-box">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>选择</th>
                    <th>序号</th>
                    <th>区域名称</th>
                    <th>区域类型</th>
                    <th>超员设置</th>
                    <th>描述</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="regionListCache.regionList != null" v-for="(region, index) in regionListCache.regionList" :key="region.key">
                    <td><input type="radio" name="region" :value="region.regionId" /></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ region.regionName }}</td>
                    <td>{{ region.regionType }}</td>
                    <td>{{ region.regionMaxPeople }}</td>
                    <td>{{ region.description }}</td>
                    <td>
                      <a href="javascript: void(0);" title="修改区域" @click="openModal('MOVE_REGION', region)"><i class="glyphicon glyphicon-transfer"></i></a>&nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
              <nav class="pagination-box" id="regionListPagingBox">
                <div id="regionListPaging" class="pagination"></div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="sidebar_toggle_box">
        <a id="sidebarToggle" title="查询条件"><i class="glyphicon glyphicon-triangle-right"></i></a>
    </div>
    <!-- 添加区域模态框 -->
    <div class="modal fade" id="add_region_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加区域信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <form data-vv-scope="add_region_form">
              <!-- <div class="input-group-line">
                <div class="group-left">区域编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="region.regionId">
                </div>
              </div> -->
                <div class="input-group-line">
                  <div class="group-left">区域名称</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_region_form.add_regionName')}">
                    <input class="form-control refresh" type="text" v-validate="'required'" name="add_regionName" v-model="region.regionName">
                  </div>
                  <span v-show="errors.has('add_region_form.add_regionName')" class="word-danger">{{ errors.first('add_region_form.add_regionName') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">区域类型</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_region_form.add_regionType')}">
                    <select class="form-control refresh" v-validate="'required'" name="add_regionType"  v-model="region.regionType">
                      <option value="">- 请选择区域类型 -</option>
                      <option value="普通区域">普通区域</option>
                      <option value="井口区域">井口区域</option>
                      <option value="危险区域">危险区域</option>
                      <option value="重点区域">重点区域</option>
                    </select>
                  </div>
                  <span v-show="errors.has('add_region_form.add_regionType')" class="word-danger">{{ errors.first('add_region_form.add_regionType') ? "必选项" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">超员设置</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_region_form.add_regionMaxPeople')}">
                    <input class="form-control refresh" type="text" v-validate="'required|numeric'" name="add_regionMaxPeople"   placeholder="请输入最大人数限制..." v-model="region.regionMaxPeople">
                  </div>
                  <span v-show="errors.has('add_region_form.add_regionMaxPeople')" class="word-danger">{{ errors.first('add_region_form.add_regionMaxPeople') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">区域描述</div>
                  <div class="group-right">
                    <input class="form-control refresh" type="text" name="" v-model="region.description">
                  </div>
                </div>
                <div class="input-group-line">
                  <div class="group-left">备注</div>
                  <div class="group-right">
                    <input class="form-control refresh" type="text" name="" v-model="region.remark">
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addRegionOper()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改区域模态框 -->
    <div class="modal fade" id="update_region_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改区域信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <form data-vv-scope="update_region_form">
                <div class="input-group-line">
                  <div class="group-left">区域编号</div>
                  <div class="group-right">
                    <input class="form-control" disabled="disabled" type="text" name="" v-model="region.regionId">
                  </div>
                </div>
                <div class="input-group-line">
                  <div class="group-left">区域名称</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_region_form.update_regionName')}">
                    <input class="form-control" type="text" v-validate="'required'" name="update_regionName"  v-model="region.regionName
                    ">
                  </div>
                  <span v-show="errors.has('update_region_form.update_regionName')" class="word-danger">{{ errors.first('update_region_form.update_regionName') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">区域类型</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_region_form.update_regionType')}">
                    <select class="form-control"  v-validate="'required'" name="update_regionType" v-model="region.regionType">
                      <option value="">- 请选择区域类型 -</option>
                      <option value="井口区域">井口区域</option>
                      <option value="普通区域">普通区域</option>
                      <option value="危险区域">危险区域</option>
                      <option value="重点区域">重点区域</option>
                    </select>
                  </div>
                  <span v-show="errors.has('update_region_form.update_regionType')" class="word-danger">{{ errors.first('update_region_form.update_regionType') ? "必选项" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">超员设置</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_region_form.update_regionMaxPeople')}">
                    <input class="form-control" type="text"  v-validate="'required|numeric'" name="update_regionMaxPeople" v-model="region.regionMaxPeople">
                  </div>
                  <span v-show="errors.has('update_region_form.update_regionMaxPeople')" class="word-danger">{{ errors.first('update_region_form.update_regionMaxPeople') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">区域描述</div>
                  <div class="group-right">
                    <input class="form-control" type="text" name="" v-model="region.description">
                  </div>
                </div>
                <div class="input-group-line">
                  <div class="group-left">备注</div>
                  <div class="group-right">
                    <input class="form-control" type="text" name="" v-model="region.remark">
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateRegionOper()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ol from 'openlayers/dist/ol';
import bootbox from 'bootbox';
import axios from 'axios';
import initLoad from '../../assets/script/sidemenu';
import fullscreen from '../../assets/script/fullscreen';
import { initPagination } from '../../assets/script/initplugin';
import { deepCopy } from '../../assets/script/extends';
import { Validator } from 'vee-validate';

export default {
  name: 'region',
  data () {
    return {
      mapCache: {
        regionMap: {},
        regionView: {},
        regionStyle: {},
        highLightStyle: {},
        regionSource: {},
        regionLayer: {},
        drawLayer: {},
      },
      mapEvent: {
        addHandler: {},
        removeHandler: {},
        updateMoreHandler: {},
        polygonDraw: {},
        select: {},
        modify: {}
      },
      updateRegionMap: {},
      region:{},
      regionList: [],
      regionListCache: {
        regionList: [],
        total: 0
      },
    };
  },
  mounted () {
    initLoad();
    this.initEvent();
    this.loadMap();
    this.loadRegionList();
  },
  methods: {
    initEvent () {
      let self = this;

      $("#save_update_region").prop('disabled', true);
      $("select[name='regionMapOperSel']").on('change', function() {
        let currentMap = self.mapCache.regionMap;
        $("#save_update_region").prop('disabled', true);

        // 移除全部事件
        self.clearEvent();
        self.region = {};
        self.updateRegionMap = {};
        if (this.value == 'NEW') {
          self.addDrawPolygonEvent(currentMap);
        } else if (this.value == 'UPDATE_MORE') {
          $("#save_update_region").prop('disabled', false);
          $("#save_update_region").attr('data-content', 'UPDATE_MORE');
          self.addModifyPolygonEvent(currentMap);
        }
      });

      $("#add_region_modal").on('show.bs.modal', function() {
        let geoPolygon = self.region.geoPolygon;

        self.region = {};
        self.region.regionType = '';
        self.region.geoPolygon = geoPolygon;
      });
    },
    fullScreen () {
      fullscreen('map');
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    /**
     * ------------------------------------------------------------
     * Start map function module.
     */
    loadMap () {
      let self = this;

      let beijing = ol.proj.fromLonLat([12950000, 4860000]);
      $("#map .ol-viewport").remove();

      /**
       *  初始化地图元素
       */
      // 视图
      self.mapCache.regionView = new ol.View({
        center: [-7352981.95804323, 4148924.9077592203],
        zoom: 15,
        minZoom: 3,
        maxZoom: 20,
        rotation: Math.PI/35
      });
      // 普通区域样式
      self.mapCache.regionStyle = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new ol.style.Stroke({
          color: '#319FD3',
          width: 4
        })
      });
      // 高亮区域样式
      self.mapCache.highLightStyle = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new ol.style.Stroke({
          color: 'red',
          width: 4
        })
      });
      // 地图
      self.mapCache.regionMap = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Image({
            source: new ol.source.ImageWMS({
              url: 'http://192.168.2.105:8080/geoserver/wms',
              params: {
                'LAYERS': 'myditu',
                'VERSION': '1.1.0'
              },
              serverType: 'geoserver'
            })
          })
        ],
        view: self.mapCache.regionView
      });
      // 添加移除事件
      self.addRemovePolygonEvent(self.mapCache.regionMap);
      // 渲染区域图层
      self.loadRegionMapLayer(self.mapCache.regionMap);
    },
    loadRegionMapLayer (currentMap) {
      let self = this;

      currentMap = currentMap || self.mapCache.regionMap;

      if (self.mapCache.regionLayer) {
        self.mapCache.regionMap.removeLayer(self.mapCache.regionLayer);
      }
      axios.get('/base/map/region/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.regionList) {
                  let regionList = data.regionList,
                      featureList = new Array(), featureCollection;

                  regionList.forEach(function(region, index) {
                    let geometry = JSON.parse(region.geoPolygon),
                        newFeature = self.createFeature(geometry, { "type": "Polygon", "id": region.regionId, "name": region.regionName });

                    featureList.push(newFeature);
                  });

                  featureCollection = self.createFeatureCollection(featureList);
                  self.mapCache.regionSource = new ol.source.Vector({
                    features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
                      dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                      featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                    })
                  });
                  self.mapCache.regionLayer = new ol.layer.Vector({
                    source: self.mapCache.regionSource,
                    style: self.mapCache.regionStyle
                  });
                  currentMap.addLayer(self.mapCache.regionLayer);

                  // 添加地图绘图事件
                  // self.addDrawPolygonEvent(currentMap);
                } else { bootbox.alert("区域图层装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域图层装载失败!"); }
            });
    },
    /**
     * Start map event module.
     */
    clearEvent () {
      let self = this;

      // 移除添加区域事件
      self.mapCache.regionMap.removeInteraction(self.mapEvent.polygonDraw);
      // 移除修改区域事件
      self.mapCache.regionMap.removeInteraction(self.mapEvent.select);
      self.mapCache.regionMap.removeInteraction(self.mapEvent.modify);
    },
    addDrawPolygonEvent (currentMap) {
      let self = this;

      currentMap = currentMap || self.mapCache.regionMap;
      // 绘图图层初始化
      self.mapEvent.polygonDraw = new ol.interaction.Draw({
        type: 'Polygon',
        source: self.mapCache.regionSource
      });
      // 绘图结束事件监听
      self.mapEvent.polygonDraw.on('drawend', function(event) {
        let createPolygonJson = self.createPolygonJson(event.feature.getGeometry().getCoordinates());
        self.region.geoPolygon = createPolygonJson;
        self.errors.clear('add_region_form');
        $("#add_region_modal").modal('show');
      });

      currentMap.addInteraction(self.mapEvent.polygonDraw);
    },
    addModifyPolygonEvent (currentMap, selectedFeature) {
      let self = this;

      currentMap = currentMap || self.mapCache.regionMap;
      // 地图选择元素事件
      self.mapEvent.select = selectedFeature
        ? new ol.interaction.Select({ features: selectedFeature })
        : new ol.interaction.Select();
      currentMap.addInteraction(self.mapEvent.select);
      // 地图修改元素事件
      self.mapEvent.modify = new ol.interaction.Modify({
        features: self.mapEvent.select.getFeatures()
      });
      currentMap.addInteraction(self.mapEvent.modify);

      let selectedFeatures = self.mapEvent.select.getFeatures();
      self.mapEvent.select.on('change:active', function() {
        selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
      });

      currentMap.on('click', function(event) {
        let feature = event.map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
          return feature;
        });

        if (feature) {
          let regionId = feature.get('id');
          self.updateRegionMap[regionId] = feature;
        }
      });
    },
    addRemovePolygonEvent (currentMap) {
      let self = this;

      currentMap = currentMap || self.mapCache.regionMap;
      currentMap.on('click', function(event) {
        let feature = event.map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
          return feature;
        });

        let type = $("select[name='regionMapOperSel']").find("option:selected").val();
        if (feature && type == 'REMOVE') {
          let regionId = feature.get('id');
          self.deleteRegionOper(regionId, feature);
        }
      });
    },
    openModal (type, region) {
      let self = this;

      if (type == 'MOVE_REGION') {
        self.clearEvent();
        $("select[name='regionMapOperSel']").find("option:eq(0)").prop('selected', true);

        $("#regionULTab li.active, .tab-pane.active").removeClass('active');
        $("#regionULTab li:eq(0), .tab-pane:eq(0)").addClass('active');
        // 启用修改保存选择框
        $("#save_update_region").prop('disabled', false);
        $("#save_update_region").attr('data-content', 'UPDATE_ONE');

        self.showRegionHighLight(region);

        let featureList = self.mapCache.regionSource.getFeatures(),
            selectedFeature;
        for (let i = 0; i < featureList.length; i++) {
          if (featureList[i].get('id') == region.regionId) {
            selectedFeature = featureList[i];
            break;
          }
        }
        self.region = {};
        self.region.regionId = region.regionId;
        self.addModifyPolygonEvent(self.mapCache.regionMap, selectedFeature);
      }
    },
    /**
     * End map event module.
     */
    /**
     * Start map function module.
     */
    showRegionHighLight (region) {
      let self = this;

      let featureList = self.mapCache.regionSource.getFeatures();
      let geometry = JSON.parse(region.geoPolygon);
      self.selectedFeature = self.createFeature(geometry, { "type": "Polygon", "id": region.regionId, "name": region.regionName });
      for (let i = 0; i < featureList.length; i++) {
          if (featureList[i].get('id') == region.regionId) {
            featureList[i].setStyle(self.mapCache.highLightStyle);
          } else {
            featureList[i].setStyle(self.mapCache.regionStyle);
          }
      }
    },
    // 检测是单个修改/批量修改
    saveModifyCheck () {
      let self = this;
      let type = $("#save_update_region").attr('data-content');

      if (type == 'UPDATE_ONE') {
        self.updateOnlyRegionPos();
      } else if (type == 'UPDATE_MORE') {
        self.updateMoreRegionPos();
      }
    },
    // 修改单个区域位置
    updateOnlyRegionPos () {
      let self = this;

      if (!self.region) {
        bootbox.alert("当前操作无效!");
        return ;
      }

      let regionId = self.region.regionId;
      let featureList = self.mapCache.regionSource.getFeatures();
      for (let i = 0; i < featureList.length; i++) {
        if (featureList[i].get('id') == regionId) {
          self.region.geoPolygon = self.createPolygonJson(featureList[i].getGeometry().getCoordinates());
          break;
        }
      }
      let regionList = new Array();
      regionList.push(self.region);
      axios.put('/base/map/region/', regionList)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) {
                  bootbox.alert("区域位置修改成功!");
                  self.region = {};
                  $("#save_update_region").prop('disabled', true);
                  self.loadRegionList();
                  self.loadRegionMapLayer();
                } else { bootbox.alert("区域位置修改失败!"); }
              } else { bootbox.alert("服务器内部错误,区域位置修改失败!"); }
            });
    },
    // 修改多个区域位置
    updateMoreRegionPos () {
      let self = this;

      // 解析修改区域的字典数据
      let regionList = self.map2ListUtil(self.updateRegionMap);

      axios.put('/base/map/region/', regionList)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result > 0) {
                  bootbox.alert("区域位置批量修改成功!");
                  self.updateRegionMap = {};
                  self.loadReaderList();
                  self.loadRegionMapLayer();
                }
              } else { bootbox.alert("区域位置批量修改失败!"); }
            });
    },
    map2ListUtil (regionMap) {
      let self = this;
      let regionList = new Array(), region;

      for (let i in regionMap) {
        let feature = regionMap[i];
        region = new Object();
        region.regionId = feature.get('id');
        region.geoPolygon = self.createPolygonJson(feature.getGeometry().getCoordinates());
        regionList.push(region);
      }

      return regionList;
    },
    /**
     * End map function module.
     */
    // 构造元素
    createFeature(geometry, properties) {
      return {
        "type": "Feature",
        "geometry": geometry,
        "properties": properties
      };
    },
    createFeatureCollection (features) {
      return {
        "type": "FeatureCollection",
        "features": features
      };
    },
    createPolygonJson (coordinates) {
      let pointList = coordinates[0];
      let geoPolygon = "Polygon((";

      pointList.forEach(function(coordinate, index) {
        let pointCoordinate = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
        geoPolygon += (pointCoordinate[0] + " " + pointCoordinate[1]) + ",";
      });
      geoPolygon = geoPolygon.substring(0, geoPolygon.length - 1) + "))";

      return geoPolygon;
    },
    /**
     * End map function module.
     * ------------------------------------------------------------
     */
    getSearchParams () {
      let params = {},
          regionType, regionName;

      regionType = $("select[name='regionTypeSel']").find("option:selected").val();
      if (regionType) { params.regionType = regionType; }

      regionName = $("input[name='regionNameInp']").val();
      if (regionName) { params.regionName = regionName; }
      return params;
    },
    loadRegionList () {
      initPagination('regionListPagingBox', 'regionListPaging');
      this.loadRegionListPaging(null);
    },
    loadRegionListPaging (page, isPaging) {
      let self = this,
          params = self.getSearchParams();

      page = page || 1;
      axios.post('/base/region/p/' + page, params)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.regionList) {
                  self.regionListCache.regionList = data.regionList;
                  self.regionListCache.total = data.total;

                  if (!isPaging) {
                    $("#regionListPaging").page({
                      total: self.regionListCache.total,
                      pageSize: 10,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条',
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadRegionListPaging(pageNumber + 1, true);
                    });
                  }
                } else {
                  bootbox.alert("区域信息查询失败!");
                }
              } else { bootbox.alert("服务器内部错误,区域信息查询失败!"); }
          });
    },
    /**
     * Start region function module.
     */
    checkType (type) {
      let self = this,
          selectedRegion = $("input[name='region']:radio:checked"),
          regionId = selectedRegion.val();

      if (selectedRegion.length < 1) {
        bootbox.alert("请先选择一条记录,在进行操作!");
        return false;
      } else {
        if (type == 'UPDATE_REGION') {
          let regionList = self.regionListCache.regionList;

          for (let i = 0; i < regionList.length; i++) {
            if (regionId == regionList[i].regionId) {
              self.region = deepCopy(regionList[i]);
              delete self.region.uber;
            }
            self.errors.clear('update_region_form');
            $("#update_region_modal").modal('show');
          }
        } else if (type == 'DELETE_REGION') {
          self.deleteRegionOper(regionId);
        }
      }
    },
    // 添加区域
    addRegionOper () {
      let self = this;
      this.$validator.validateAll("add_region_form").then(() => {
        axios.post('/base/region/', self.region)
              .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.result == 1) {
                    bootbox.alert("区域信息添加成功!");
                    $("#add_region_modal").modal('hide');
                    self.region = {};
                    self.loadRegionList();
                    self.loadRegionMapLayer();
                  } else { bootbox.alert("区域信息添加失败!"); }
                } else { bootbox.alert("服务器内部错误,区域信息添加失败!"); }
              });
      }).catch(() => {

      });
    },
    // 修改区域
    updateRegionOper () {
      let self = this;
      this.$validator.validateAll("update_region_form").then(() => {
        delete self.region.geoPolygon;
        axios.put('/base/region/', self.region)
              .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.result == 1) {
                    bootbox.alert("区域信息修改成功!");
                    $("#update_region_modal").modal('hide');
                    self.region = {};
                    $("input[name='region']:radio:checked").prop('checked', false);
                    self.loadRegionList();
                    self.loadRegionMapLayer();
                  } else { bootbox.alert("区域信息修改失败!"); }
                } else { bootbox.alert("服务器内部错误,区域信息修改失败!"); }
              });
      }).catch(() => {

      });
    },
    // 删除区域
    deleteRegionOper (regionId, feature) {
      let self = this;

      bootbox.confirm({
        message: "区域一旦删除，不可恢复！是否确定删除当前所选区域？",
        buttons: {
          confirm: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        },
        callback: function (result) {
          if (result) {
            axios.delete('/base/region/' + regionId)
                  .then((response) => {
                    let { meta, data } = response.data;

                    if (meta.success) {
                      if (data && data.result == 1) {
                        bootbox.alert("区域信息删除成功!");
                        self.region = {};
                        $("input[name='region']:radio:checked").prop('checked', false);
                        self.loadRegionList();
                        self.loadRegionMapLayer();
                      } else { bootbox.alert("区域信息删除失败!"); }
                    } else { bootbox.alert("服务器内部错误,区域信息删除失败!"); }
                  });
          }
        }
      });
    },
  /**
   * End region function module.
   */
  }
};
</script>

<style lang="css" scoped>
#region {
  width: 100%;
}
#map {
  width: 100%;
  height: 100%;
  min-height: 600px;
}

#add_region_modal {
  z-index: 2000;
}
</style>
