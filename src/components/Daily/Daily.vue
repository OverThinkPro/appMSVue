<template lang="html">
  <div class="daily">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">查询统计</li>
        <li><router-link to="/Daily">日考勤报表</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>日考勤报表</h3>
      </div>
      <div class="search-bar-box">
        <div class="search-bar">
          <div class="search-bar-select fl">
            <select class="form-control refresh" name="unitIdSel">
              <option value="">- 请选择部门 -</option>
              <option v-if="unitList != null" v-for="unit in unitList" :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
            </select>
          </div>
          <div class="input-group search-bar-input fl">
            <span class="input-group-addon">开始日期</span>
            <input id="startDate" class="form-control refresh" type="text" readonly="readonly" placeholder="请选择开始日期" name="startDateInp">
          </div>
          <div class="input-group search-bar-input fl">
            <span class="input-group-addon">结束日期</span>
            <input id="endDate" class="form-control refresh" type="text" readonly="readonly" placeholder="请选择结束日期" name="endDateInp">
          </div>
          <div class="input-group btn-group fr">
            <button type="button" class="btn btn-default" @click=""><i class="glyphicon glyphicon-refresh"></i>重置</button>
            <button type="button" class="btn btn-primary" @click=""><i class="glyphicon glyphicon-search"></i>查询</button>
          </div>
        </div>
      </div>
      <div class="table-box content-box">
        <div class="btn-box">
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-export"></i>导出</button>
          <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-print"></i>打印</button>
        </div>
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>卡号</th>
                <th>部门</th>
                <th>班名</th>
                <th>上班时间</th>
                <th>下班时间</th>
                <th>井下累计时长</th>
                <th>应出勤时长</th>
                <th>是否足班</th>
                <th>出入井次数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="dailyListCache.dailyList != null" v-for="(daily, index) in dailyListCache.dailyList" :key="daily.key">
                <td>{{ index + 1 }}</td>
                <td>{{ daily.staffName }}</td>
                <td>{{ daily.cardId }}</td>
                <td>{{ daily.unitName }}</td>
                <td>{{ daily.scheduleName }}</td>
                <td>{{ daily.startTime }}</td>
                <td>{{ daily.endTime }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="dailyListPagingBox">
            <div id="dailyListPaging" class="pagination"></div>
          </nav>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import bootbox from 'bootbox/bootbox.min';
import axios from 'axios';
import jeDate from '../../assets/script/jedate/jquery.jedate.min';
import { initPagination } from '../../assets/script/initplugin';

export default {
  name: 'daily',
  data () {
    return {
      unitList: [],
      dailyListCache: {
        dailyList: [],
        total: 0
      }
    };
  },
  mounted () {
    this.initEvent();
  },
  methods: {
    initEvent () {
      let self = this;

      $("#startDate, #endDate").jeDate({
        format: 'YYYY-MM-DD',
        isTime: false,
        isinitial: false
      });
    },
    defaultLoadUnit () {
      let self = this;

      axios.get('/base/unit/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.unitList) {
                  self.unitList=  data.unitList;
                } else { bootbox.alert("部门信息装载失败!"); }
              } else { bootbox.alert("服务器内部错误,部门信息装载失败!"); }
            });
    },
    getSearchParams () {
      let params = {},
          unitId, startDate, endDate;

      unitId = $("select[name='unitIdSel']").find("option:selected").val();
      if (unitId) { params.unitId = unitId; }

      startDate = $("input[name='startDateInp']").val();
      if (startDate) { params.startDate = startDate; }

      endDate = $("input[name='endDateInp']").val();
      if (endDate) { params.endDate = endDate; }

      return params;
    },
    loadDailyList () {
      initPagination('dailyListPagingBox', 'dailyListPaging');
      this.loadDailyListPaging(null);
    },
    loadDailyListPaging (page, isPaging) {
      let self = this,
          params = self.getSearchParams();

      page = page || 1;
      axios.post('/base/daily/p/' + page, params)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.dailyList) {
                  self.dailyListCache.dailyList = data.dailyList;
                  self.dailyListCache.total = data.total;

                  if (!isPaging) {
                    $("#dailyListPaging").page({
                      total: self.dailyListCache.total,
                      pageSize: 10,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条',
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadDailyListPaging(pageNumber + 1, true);
                    });
                  }
                } else { bootbox.alert("日考勤信息查询失败!"); }
              } else { bootbox.alert("服务器内部错误,日考勤信息查询失败!"); }
            });
    }
  }
};
</script>

<style lang="css">
#daily {
  width: 100%;
}
</style>
