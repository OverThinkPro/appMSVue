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
              <input class="form-control refresh" type="text" >
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-input">
              <input class="form-control refresh" type="text" placeholder="请选择开始时间" >
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-input">
              <input class="form-control refresh" type="text" placeholder="请选择结束时间">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh">
                <option value="">- 请选择区域 -</option>
                <option value="">区域1</option>
                <option value="">区域1</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select id="alarmTypeSelect" class="form-control refresh" >
                <option value="0">超时报警</option>
                <option value="1">超员报警</option>
                <option value="2">限制区域报警</option>
                <option value="3">呼叫报警</option>
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
              <button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="alarmType == 0" class="table-box outside-box">
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
              <tr v-for="(elem, index) in overtimeList" :key="elem.key">
                <td>{{ index + 1 }}</td>
                <td>{{ elem.name }}</td>
                <td>{{ elem.no }}</td>
                <td>{{ elem.unit }}</td>
                <td>{{ elem.region }}</td>
                <td>{{ elem.alarmTime }}</td>
                <td>{{ elem.alarmType }}</td>
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
                <th>区域</th>
                <th>应到人数</th>
                <th>实到人数</th>
                <th>报警时间</th>
                <th>报警类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(elem, index) in overmanList" :key="elem.key">
                <td>{{ index + 1 }}</td>
                <td>{{ elem.region }}</td>
                <td>{{ elem.reqNum }}</td>
                <td>{{ elem.realNum }}</td>
                <td>{{ elem.alarmTime }}</td>
                <td>{{ elem.alarmType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
                <th>姓名</th>
                <th>卡号</th>
                <th>部门</th>
                <th>区域</th>
                <th>报警时间</th>
                <th>报警类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(elem, index) in regionLimitList" :key="elem.key">
                <td>{{ index + 1 }}</td>
                <td>{{ elem.name }}</td>
                <td>{{ elem.no }}</td>
                <td>{{ elem.unit }}</td>
                <td>{{ elem.region }}</td>
                <td>{{ elem.alarmTime }}</td>
                <td>{{ elem.alarmType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
              <tr v-for="(elem, index) in staffCallList" :key="elem.key">
                <td>{{ index + 1 }}</td>
                <td>{{ elem.name }}</td>
                <td>{{ elem.no }}</td>
                <td>{{ elem.unit }}</td>
                <td>{{ elem.region }}</td>
                <td>{{ elem.alarmTime }}</td>
                <td>{{ elem.alarmType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
    </main>
    <div class="sidebar_toggle_box">
        <a id="sidebarToggle" title="查询条件"><i class="glyphicon glyphicon-triangle-right"></i></a>
    </div>
  </div>
</template>

<script>
import initLoad from '../../assets/script/sidemenu';

export default {
  name: 'alarm',
  data () {
    return {
      alarmTypes: ['超时报警', '超员报警', '限制区域报警', '呼叫告警'],
      alarmType: 0,
      overtimeList: [
        {
          name: '丁英杰',
          no: '201320030303',
          unit: '掘进1队',
          region: 'A平面',
          alarmTime: '2017-04-01 21:00',
          alarmType: '超时报警'
        },
        {
          name: '丁英杰',
          no: '201320030303',
          unit: '掘进1队',
          region: 'A平面',
          alarmTime: '2017-04-01 21:00',
          alarmType: '超时报警'
        },
        {
          name: '丁英杰',
          no: '201320030303',
          unit: '掘进1队',
          region: 'A平面',
          alarmTime: '2017-04-01 21:00',
          alarmType: '超时报警'
        }
      ],
      overmanList: [
        {
          region: 'A平面',
          reqNum: 13,
          realNum: 15,
          alarmTime: '2017-04-01 21:00',
          alarmType: '超员报警'
        },
        {
          region: 'A平面',
          reqNum: 13,
          realNum: 15,
          alarmTime: '2017-04-01 21:00',
          alarmType: '超员报警'
        },
        {
          region: 'A平面',
          reqNum: 13,
          realNum: 15,
          alarmTime: '2017-04-01 21:00',
          alarmType: '超员报警'
        }
      ],
      regionLimitList: [
        {
          name: '丁英杰',
          no: '201320030303',
          unit: '掘进1队',
          region: 'A平面',
          alarmTime: '2017-04-01 21:00',
          alarmType: '限制区域报警'
        },
        {
          name: '丁英杰',
          no: '201320030303',
          unit: '掘进1队',
          region: 'A平面',
          alarmTime: '2017-04-01 21:00',
          alarmType: '限制区域报警'
        },
        {
          name: '丁英杰',
          no: '201320030303',
          unit: '掘进1队',
          region: 'A平面',
          alarmTime: '2017-04-01 21:00',
          alarmType: '限制区域报警'
        }
      ],
      staffCallList: [
        {
          name: '丁英杰',
          no: '201320030303',
          unit: '掘进1队',
          region: 'A平面',
          alarmTime: '2017-04-01 21:00',
          alarmType: '呼叫告警'
        },
        {
          name: '丁英杰',
          no: '201320030303',
          unit: '掘进1队',
          region: 'A平面',
          alarmTime: '2017-04-01 21:00',
          alarmType: '呼叫告警'
        },
        {
          name: '丁英杰',
          no: '201320030303',
          unit: '掘进1队',
          region: 'A平面',
          alarmTime: '2017-04-01 21:00',
          alarmType: '呼叫告警'
        }
      ]
    };
  },
  mounted () {
    this.checkType();
    initLoad();
  },
  methods: {
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
    }
  }
};
</script>

<style lang="css">

</style>
