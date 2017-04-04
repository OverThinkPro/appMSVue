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
              <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
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
                  <tr v-for="(elem, index) in staffList" :key="elem.key">
                    <td>{{ index + 1 }}</td>
                    <td>{{ elem.time }}</td>
                    <td>{{ elem.position }}</td>
                    <td>{{ elem.reader }}</td>
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
  </div>
</template>

<script>
import initLoad from '../../assets/script/sidemenu';
import ol from 'openlayers';

export default {
  name: 'replay',
  data () {
    return {
      staffList: [
        {
          time: '8:00',
          position: 'A平面',
          reader: '分站1'
        },
        {
          time: '9:00',
          position: 'B平面',
          reader: '分站2'
        },
        {
          time: '10:00',
          position: 'C平面',
          reader: '分站3'
        },
        {
          time: '11:00',
          position: 'D平面',
          reader: '分站4'
        }
      ]
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
