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
              <select class="form-control refresh" id="regionType" name="">
                <option value="">- 请选择区域类型 -</option>
                <option value="普通区域">普通区域</option>
                <option value="井口区域">井口区域</option>
                <option value="危险区域">危险区域</option>
                <option value="重点区域">重点区域</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">区域名称</span>
              <input class="form-control refresh" type="text" name="" value="">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-button">
              <button class="btn btn-default" type="reset" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
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
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="javascript: void(0);" data-target="#region_map_tab" aria-controls="region_map_tab" role="tab" data-toggle="tab">地图</a></li>
          <li role="presentation"><a href="javascript: void(0);" data-target="#region_list_tab" aria-controls="region_list_tab" role="tab" data-toggle="tab">列表</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="region_map_tab">
            <div class="map-box" style="width: 100%;">
              <div id="map">
             
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="region_list_tab">
            <div class="btn-box">
              <div class="fl">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_region_modal">添加</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#update_region_modal">修改</button>
                <button type="button" class="btn btn-primary" @click="deleteRegion()">删除</button>
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
                    <th><input type="checkbox" name="allRegion"></th>
                    <th>序号</th>
                    <th>区域名称</th>
                    <th>区域类型</th>
                    <th>超员设置</th>
                    <th>位置</th>
                    <th>描述</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(region, index) in regionList" :key="region.key">
                    <td><input type="checkbox" name="region" value="region.regionId" /></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ region.regionName }}</td>
                    <td>{{ region.regionType }}</td>
                    <td>{{ region.regionMaxPeople }}</td>
                    <td>{{ region.geoPolygon }}</td>
                    <td>{{ region.description }}</td>
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
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="regionNew.regionId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="regionNew.regionName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域位置</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="regionNew.geoPolygon
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域类型</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="regionNew.regionType">
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
                  <input class="form-control refresh" type="text" name="" v-model="regionNew.regionMaxPeople">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="regionNew.description">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">备注</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="regionNew.remark">
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
            <h4 class="modal-title">添加区域信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">区域编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="regionOld.regionId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="regionOld.regionName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域位置</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="regionOld.geoPolygon
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域类型</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="regionOld.regionType">
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
                  <input class="form-control refresh" type="text" name="" v-model="regionOld.regionMaxPeople">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">区域描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="regionOld.description">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">备注</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="regionOld.remark">
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

  </div>
</template>

<script>
import bootbox from 'bootbox';
import initLoad from '../../assets/script/sidemenu';
import ol from 'openlayers/dist/ol';

export default {
  name: 'region',
  data () {
    return {
      regionNew:{},
      regionOld:{},
      regionList: [
        {
          regionId: 'R10001',
          regionName: '1#工作面',
          regionType: '井口区域',
          regionMaxPeople: '12',
          geoPolygon: '',
          description: '',
          remark: ''
        },
        {
          regionId: 'R10001',
          regionName: '2#工作面',
          regionType: '井口区域',
          regionMaxPeople: '12',
          geoPolygon: '',
          description: '',
          remark: ''
        },
        {
          regionId: 'R10001',
          regionName: '1#工作面',
          regionType: '井口区域',
          regionMaxPeople: '12',
          geoPolygon: '',
          description: '',
          remark: ''
        },
        {
          regionId: 'R10001',
          regionName: '1#工作面',
          regionType: '井口区域',
          regionMaxPeople: '12',
          geoPolygon: '',
          description: '',
          remark: ''
        },
        {
          regionId: 'R10001',
          regionName: '1#工作面',
          regionType: '井口区域',
          regionMaxPeople: '12',
          geoPolygon: '',
          description: '',
          remark: ''
        },
        {
          regionId: 'R10001',
          regionName: '1#工作面',
          regionType: '井口区域',
          regionMaxPeople: '12',
          geoPolygon: '',
          description: '',
          remark: ''
        }
      ]
    };
  },
  mounted () {
    this.loadMap();
    initLoad();
    this.initEvent();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_region_modal").on('show.bs.modal', function() {
        self.regionNew = {
          regionId: 'R10004',
          regionName: '',
          regionType: '井口区域',
          regionMaxPeople: '10',
          geoPolygon: '',
          description: '',
          remark: ''
        }
      });
      $("#update_region_modal").on('show.bs.modal', function() {
        self.regionOld = {
          regionId: 'R10001',
          regionName: '1#工作面',
          regionType: '井口区域',
          regionMaxPeople: '12',
          geoPolygon: '',
          description: '',
          remark: ''
        };
      });
    },
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
    deleteRegion () {
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
        callback: function () {
          bootbox.alert({
            message: "删除成功",
          });
        }
      });
    },
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
