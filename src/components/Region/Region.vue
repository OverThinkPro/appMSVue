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
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="javascript: void(0);" data-target="#region_map_tab" aria-controls="region_map_tab" role="tab" data-toggle="tab">地图</a></li>
          <li role="presentation"><a href="javascript: void(0);" data-target="#region_list_tab" aria-controls="region_list_tab" role="tab" data-toggle="tab">列表</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="region_map_tab">
            <div class="btn-box">
              <div class="fr">
                <!-- <button type="button" class="btn btn-primary" @click="show()">show</button> -->
                <button type="button" @click="fullScreen()" class="btn btn-primary fr" title="地图全屏查看">
                  <i class="glyphicon glyphicon-fullscreen"></i>&nbsp;全屏查看
                </button>
                <div class="input-group fr">
                  <select class="">
                    <option value="">标注工具</option>
                    <option value="标注">标注</option>
                    <option value="移除">移除</option>
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
                <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_region_modal">添加</button> -->
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
                      <a href="javascript: void(0);" title="修改区域" @click="openModal('MOVE_READER', region.regionId)"><i class="glyphicon glyphicon-transfer"></i></a>&nbsp;
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
              <div class="input-group-line">
                <div class="group-left">区域编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="region.regionId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="region.regionName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域类型</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="region.regionType">
                    <option value="">- 请选择区域类型 -</option>
                    <option value="普通区域">普通区域</option>
                    <option value="井口区域">井口区域</option>
                    <option value="危险区域">危险区域</option>
                    <option value="重点区域">重点区域</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">超员设置</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" placeholder="请输入最大人数限制..." v-model="region.regionMaxPeople">
                </div>
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
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn">保存</button>
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
              <div class="input-group-line">
                <div class="group-left">区域编号</div>
                <div class="group-right">
                  <input class="form-control" disabled="disabled" type="text" name="" v-model="region.regionId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域名称</div>
                <div class="group-right">
                  <input class="form-control" type="text" name="" v-model="region.regionName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域类型</div>
                <div class="group-right">
                  <select class="form-control" name="" v-model="region.regionType">
                    <option value="">- 请选择区域类型 -</option>
                    <option value="井口区域">井口区域</option>
                    <option value="普通区域">普通区域</option>
                    <option value="危险区域">危险区域</option>
                    <option value="重点区域">重点区域</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">超员设置</div>
                <div class="group-right">
                  <input class="form-control" type="text" name="" v-model="region.regionMaxPeople">
                </div>
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
      },
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
    show () {
      let self = this;

      // let source = self.mapCache.regionLayer.getSource();
      // let featureList = source.getFeatures();
      // for (let i = 0; i < featureList.length; i++) {
      //   if (featureList[i].get('id') == 'd') {
      //     featureList[i].setStyle(self.mapCache.highLightStyle);
      //     console.log("id: ", featureList[i].getGeometry().getCoordinates());
      //   }
      // }

    },
    initEvent () {
      let self = this;

      $("#add_region_modal").on('show.bs.modal', function() {
        self.region = {};
        self.region.regionType = '';
      });

      $("#update_region_modal").on('shown.bs.modal', function() {

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
     * Start map function module.
     */
    loadMap () {
      let self = this;

      let beijing = ol.proj.fromLonLat([12950000, 4860000]);
      $("#map .ol-viewport").remove();
      // 视图
      self.mapCache.regionView = new ol.View({
        center: [0, 0],
        zoom: 6,
        minZoom: 3,
        maxZoom: 12
      });
      // 普通区域样式
      self.mapCache.regionStyle = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new ol.style.Stroke({
          color: '#319FD3',
          width: 2
        })
      });
      // 高亮区域样式
      self.mapCache.highLightStyle = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new ol.style.Stroke({
          color: 'red',
          width: 2
        })
      });
      // 地图
      self.mapCache.regionMap = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: self.mapCache.regionView
      });
      // 添加地图点击事件
      self.mapCache.regionMap.on('click', function(event) {
        let feature = event.map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
          return feature;
        });

        if (feature) {
          console.log(feature.getGeometry().getCoordinates());
        }
      });
      // 渲染区域图层
      self.loadRegionMapLayer(self.mapCache.regionMap);
    },
    loadRegionMapLayer (currentMap) {
      let self = this;

      currentMap = currentMap || self.mapCache.regionMap;
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
                  self.mapCache.regionLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                      features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
                        dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                        featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                      })
                    }),
                    style: self.mapCache.regionStyle
                  });
                  currentMap.addLayer(self.mapCache.regionLayer);
                } else { bootbox.alert("区域图层装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域图层装载失败!"); }
            });
    },
    openModal (type, regionId) {

    },
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
    /**
     * End map function module.
     */
    getSearchParams () {
      let params = {},
          regionType, regionName;

      regionType = $("input[name='regionTypeSel']").find("option:selected").val();
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
                } else {
                  bootbox.alert("区域信息查询失败!");
                }
              } else { bootbox.alert("服务器内部错误,区域信息查询失败!"); }
            }
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

      axios.post('/base/region/', self.region)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) {
                  bootbox.alert("区域信息添加成功!");
                  $("#add_region_modal").modal('hide');
                  self.region = {};
                  self.loadRegionList();
                } else { bootbox.alert("区域信息添加失败!"); }
              } else { bootbox.alert("服务器内部错误,区域信息添加失败!"); }
            });
    },
    // 修改区域
    updateRegionOper () {
      let self = this;

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
                } else { bootbox.alert("区域信息修改失败!"); }
              } else { bootbox.alert("服务器内部错误,区域信息修改失败!"); }
            });
    },
    // 删除区域
    deleteRegionOper (regionId) {
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
</style>
