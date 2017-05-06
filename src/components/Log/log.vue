<template lang="html">
  	<div class="log">
	    <div class="bread-box">
	      	<ol class="breadcrumb">
	       		<li class="active">系统管理</li>
	        	<li><router-link to="/Log">日志管理</router-link></li>
	      </ol>
	    </div>
	    <main>
	      	<div class="title-box content-box">
	        	<h3>日志管理</h3>
	     	</div>
	     	<div class="table-box outside-box">
		        <div class="search-bar-box">
		          	<div class="search-bar">
			            <div class="input-group search-bar-input fl">
			              	<span class="input-group-addon">用户名</span>
			              	<input class="form-control refresh" type="text" name="" id="userNameParam">
			            </div>
			            <div class="input-group search-bar-input fl">
				            <span class="input-group-addon">开始时间</span>
				            <input class="form-control refresh" type="text"  readonly="readonly" name=""  id="beginTimeParam">
			            </div>
			            <div class="input-group search-bar-input fl">
			              	<span class="input-group-addon">结束时间</span>
			              	<input class="form-control refresh" type="text"  readonly="readonly" name=""  id="endTimeParam">
			            </div>
			            <div class="btn-group fr">
			              	<button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
			              	<button class="btn btn-primary" type="button" @click="defaultLoadLogList()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
			            </div>
		          	</div>
		        </div>
		    </div>
	      	<div class="table-box outside-box">
	        	<div class="data-box content-box">
		          	<table class="table table-bordered table-hover">
		            	<thead>
		              		<tr>
				               <!--  <th><input type="checkbox" name="allLog"></th> -->
				                <th>序号</th>
				                <th>日志编号</th>
				                <th>用户名</th>
				                <th>操作类型</th>
				                <th>操作内容</th>
				                <th>操作时间</th>
			              	</tr>
			            </thead>
			            <tbody>
			              	<tr v-for="(log, index) in logListCache.logList" :key="log.key">
				                <!-- <td><input type="checkbox" name="log" value="log.logId" /></td> -->
				                <td>{{ index + 1 }}</td>
				                <td>{{ log.logId }}</td>
				                <td>{{ log.userName }}</td>
				                <td>{{ log.opType }}</td>
				                <td>{{ log.opContent }}</td>
				                <td>{{ log.opDate }}</td>
			              	</tr>
			            </tbody>
		          	</table>
		          	<nav class="pagination-box" id="logPagingBox">
		                <ul id="logPaging" class="pagination"></ul>
		            </nav>
		        </div>
		    </div>
		</main>
  	</div>
</template>

<script>
import axios from 'axios';
import { initPagination } from '../../assets/script/initplugin';
import bootbox from 'bootbox/bootbox.min';
import initLoad from '../../assets/script/sidemenu';
import jeDate from '../../assets/script/jedate/jquery.jedate.min';

export default {
  name: 'log',
  data () {
    return {
    	logListCache:{
    		logList: [],
    		total: 0,
    	}
    };
  },
  mounted () {
  	this.initEvent();
    this.defaultLoadLogList();
  },
  methods: {
  	initEvent(){
  		$("#beginTimeParam").jeDate({
	        format: "YYYY-MM-DD hh:mm:ss",
	        isTime: true,
	        isinitVal: false
	    });

	    $("#endTimeParam").jeDate({
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

    /* 得到查询条件 */
    getSearchParam () {
      let params = {}, userName, beginTime, endTime;
      userName = $("#userNameParam").val();
      if (userName) { params.userName = userName; }
      beginTime = $("#beginTimeParam").val();
      if (beginTime) { params.beginTime = beginTime; }
      endTime = $("#endTimeParam").val();
      if (endTime) { params.endTime = endTime; }
      return params;
    },

    /* 分页 */
    defaultLoadLogList () {
      initPagination('logPagingBox', 'logPaging');
      this.loadLogListPaging(null);
    },

    /* 获得分页后的日志列表信息 */
    loadLogListPaging(page, isPaging) {
      let self = this;
      let params = self.getSearchParam();
      page = page || 1;
      axios.post('/base/log/p/' + page, params).then((response) => {
        let {meta,data} = response.data;
        if (meta.success) {
          if (data) {
            self.logListCache.logList = data.logList;
            self.logListCache.total = data.totalCounts;
            if (!isPaging) {
              $("#logPaging").page({
                total: self.logListCache.total,
                pageSize: 10,
                prevBtnText: '上一页',
                nextBtnText: '下一页',
                showInfo: true,
                infoFormat: '{start} ~ {end}条，共{total}条',
              }).on("pageClicked", function (event, pageNumber) {
                self.loadLogListPaging(pageNumber + 1, true);
              });
            }
          }
        } else {
          bootbox.alert({
            title:'查看日志信息',
            message: meta.message
          });
        }
      });
    },

  }
};
</script>

<style lang="css" scoped>
#log {
  width: 100%;
}
.outside-box {
  background-color: #EEE;
}

.table-box-left, .table-box-right {
  background-color: #FFF;
}

.table-box-left {
  min-height: 600px;
}
.outside-box{
  background-color: #fff;
}
</style>
