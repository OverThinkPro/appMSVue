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
			              	<input class="form-control refresh" type="text" name="">
			            </div>
			            <div class="input-group search-bar-input fl">
				            <span class="input-group-addon">开始时间</span>
				            <input class="form-control refresh" type="text" name="">
			            </div>
			            <div class="input-group search-bar-input fl">
			              	<span class="input-group-addon">结束时间</span>
			              	<input class="form-control refresh" type="text" name="">
			            </div>
			            <div class="btn-group fr">
			              	<button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
			              	<button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
			            </div>
		          	</div>
		        </div>
		    </div>
	      	<div class="table-box outside-box">
	        	<div class="data-box content-box">
		          	<table class="table table-bordered table-hover">
		            	<thead>
		              		<tr>
				                <th><input type="checkbox" name="allLog"></th>
				                <th>序号</th>
				                <th>日志编号</th>
				                <th>用户名</th>
				                <th>操作类型</th>
				                <th>操作内容</th>
				                <th>操作时间</th>
			              	</tr>
			            </thead>
			            <tbody>
			              	<tr v-for="(log, index) in logList" :key="log.key">
				                <td><input type="checkbox" name="log" value="log.logId" /></td>
				                <td>{{ index + 1 }}</td>
				                <td>{{ log.logId }}</td>
				                <td>{{ log.userName }}</td>
				                <td>{{ log.opType }}</td>
				                <td>{{ log.opContent }}</td>
				                <td>{{ log.opDate }}</td>
			              	</tr>
			            </tbody>
		          	</table>
		        </div>
		    </div>
		</main>
  	</div>
</template>

<script>
import bootbox from 'bootbox/bootbox.min';
import initLoad from '../../assets/script/sidemenu';
export default {
  name: 'log',
  data () {
    return {
      logList: [
        {
          logId: 'R100001',
          userId:'U100001',
          userName: '郝莎莎',
          opType: '删除',
          opContent: '删除了一条日志',
          opDate:'2001-02-16 20:38:40',
        },
        {
          logId: 'R100001',
          userId:'U100001',
          userName: '郝莎莎',
          opType: '删除',
          opContent: '删除了一条日志',
          opDate:'2001-02-16 20:38:40',
        },
        {
          logId: 'R100001',
          userId:'U100001',
          userName: '郝莎莎',
          opType: '删除',
          opContent: '删除了一条日志',
          opDate:'2001-02-16 20:38:40',
        },
        {
          logId: 'R100001',
          userId:'U100001',
          userName: '郝莎莎',
          opType: '删除',
          opContent: '删除了一条日志',
          opDate:'2001-02-16 20:38:40',
        }
      ]
    };
  },
  mounted () {
  },
  methods: {
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    }
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
</style>
