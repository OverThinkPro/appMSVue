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
              <select class="form-control refresh" id="unit" name="">
                <option value="">- 请选择部门 -</option>
                <option value="">掘进1队</option>
                <option value="">掘进2队</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">员工姓名</span>
              <input class="form-control refresh" type="text" name="" value="">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">员工编号</span>
              <input class="form-control refresh" type="text" name="" value="">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">定位卡号</span>
              <input class="form-control refresh" type="text" name="" value="">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" id="region" name="">
                <option value="">- 请选择区域 -</option>
                <option value="">A平面</option>
                <option value="">A平面</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" id="reader" name="">
                <option value="">- 请选择定位分站 -</option>
                <option value="">分站1</option>
                <option value="">分站2</option>
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
              <button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
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
                    <th>编号</th>
                    <th>卡号</th>
                    <th>部门</th>
                    <th>区域</th>
                    <th>分站</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(staff, index) in staffList">
                    <td>{{ index + 1 }}</td>
                    <td>{{ staff.name }}</td>
                    <td>{{ staff.no }}</td>
                    <td>{{ staff.cardId }}</td>
                    <td>{{ staff.unit }}</td>
                    <td>{{ staff.region }}</td>
                    <td>{{ staff.reader }}</td>
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
import ol from 'openlayers/dist/ol';

export default {
  name: 'insearch',
  data () {
    return {
      staffList: [
        {
          name: '王梓良',
          no: '001',
          cardId: '2001001',
          unit: '采掘1队',
          region: '1#工作面',
          reader: '1#分站'
        },
        {
          name: '王梓良',
          no: '001',
          cardId: '2001001',
          unit: '采掘1队',
          region: '1#工作面',
          reader: '1#分站'
        },
        {
          name: '王梓良',
          no: '001',
          cardId: '2001001',
          unit: '采掘1队',
          region: '1#工作面',
          reader: '1#分站'
        },
        {
          name: '王梓良',
          no: '001',
          cardId: '2001001',
          unit: '采掘1队',
          region: '1#工作面',
          reader: '1#分站'
        },
        {
          name: '王梓良',
          no: '001',
          cardId: '2001001',
          unit: '采掘1队',
          region: '1#工作面',
          reader: '1#分站'
        },
        {
          name: '王梓良',
          no: '001',
          cardId: '2001001',
          unit: '采掘1队',
          region: '1#工作面',
          reader: '1#分站'
        }
      ]
    };
  },
  mounted () {
    this.loadMap();
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
