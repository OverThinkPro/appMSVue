<template lang="html">
  <div class="setting">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">系统管理</li>
        <li><router-link to="/Setting">参数设置</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>参数设置</h3>
      </div>
      <div class="table-box outside-box">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="javascript: void(0);" data-target="#coalmine_info_tab" aria-controls="coalmine_info_tab" role="tab" data-toggle="tab">煤矿信息</a></li>
          <li role="presentation"><a href="javascript: void(0);" data-target="#period_setting_tab" aria-controls="period_setting_tab" role="tab" data-toggle="tab">人员位置数据采集周期</a></li>
          <li role="presentation"><a href="javascript: void(0);" data-target="#alarm_type_tab" aria-controls="alarm_type_tab" role="tab" data-toggle="tab">报警声音</a></li>
          <li role="presentation"><a href="javascript: void(0);" data-target="#map_management_tab" aria-controls="map_management_tab" role="tab" data-toggle="tab">地图底图</a></li>
          <li role="presentation"><a href="javascript: void(0);" data-target="#job_type_tab" aria-controls="job_type_tab" role="tab" data-toggle="tab">工种图例</a></li>
        </ul>
        <div class="tab-content">
          <!-- 煤矿信息 -->
          <div role="tabpanel" class="tab-pane active" id="coalmine_info_tab">
            <div class="table-box" style="width:80%;">
              <div class="show-info-group clear-border-radius">
                <div class="group-left">煤矿名称</div>
                <div class="group-right">{{coalmine.coalmineName}}</div>
                <div class="group-left">煤矿简称</div>
                <div class="group-right">{{coalmine.coalmineAbbr}}</div>
              </div>
              <div class="show-info-group clear-border-radius">
                <div class="group-left">核定产能(万吨/年)</div>
                <div class="group-right">{{coalmine.coalmineOutput}}</div>
                <div class="group-left">核定人数</div>
                <div class="group-right">{{coalmine.coalmineNum}}</div>
              </div>
              <div class="show-info-group clear-border-radius">
                <div class="group-left">矿井类型</div>
                <div class="group-right">{{coalmine.coalmineType}}</div>
                <div class="group-left">瓦斯等级</div>
                <div class="group-right">{{coalmine.gasGrade}}</div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary modal-btn" data-toggle="modal" data-target="#update_coalmine_modal">修改</button>
            </div>
          </div>
          <!-- 人员位置数据采集周期 -->
          <div role="tabpanel" class="tab-pane" id="period_setting_tab">
            <div class="btn-box">
              <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#add_period_modal">添加周期信息</button>
              <button class="btn btn-primary fl" type="button">批量删除</button>
            </div>
            <div class="data-box content-box">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th><input type="checkbox" name="allPeriod"></th>
                    <th>序号</th>
                    <th>周期类型</th>
                    <th>周期值</th>
                    <th>描述</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(period, index) in periodList" :key="period.key">
                    <td><input type="checkbox" name="period" value="period.periodId" /></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{period.periodName}}</td>
                    <td>{{period.periodNum}}</td>
                    <td>{{period.description}}</td>
                    <td>
                      <a href="javascript: void(0);" title="修改周期基本信息" data-toggle="modal" data-target="#update_period_modal"><i class="glyphicon glyphicon-edit"></i></a>&nbsp;|
                      <a href="javascript: void(0);" title="删除周期"><i class="glyphicon glyphicon-trash"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 报警声音 -->
          <div role="tabpanel" class="tab-pane" id="alarm_type_tab">
            <div class="btn-box">
              <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#add_alarm_modal">添加报警类型</button>
              <button class="btn btn-primary fl" type="button">批量删除</button>
            </div>
            <div class="data-box content-box">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th><input type="checkbox" name="allAlarm"></th>
                    <th>序号</th>
                    <th>报警类型</th>
                    <th>启用声音</th>
                    <th>声音文件</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(alarmType, index) in alarmTypeList" :key="alarmType.key">
                    <td><input type="checkbox" name="alarmType" value="alarmType.alarmTypeId" /></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ alarmType.alarmName }}</td>
                    <td v-if="alarmType.alarmInUse ==='1' ">启用</td>
                    <td v-else>禁用</td>
                    <td>{{ alarmType.alarmFile }}</td>
                    <td>
                      <a href="javascript: void(0);" title="修改报警类型基本信息" data-toggle="modal" data-target="#update_alarm_modal"><i class="glyphicon glyphicon-edit"></i></a>&nbsp;|
                      <a href="javascript: void(0);" title="删除报警类型"><i class="glyphicon glyphicon-trash"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 地图管理 -->
          <div role="tabpanel" class="tab-pane" id="map_management_tab">
            <div class="btn-box">
              <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#update_map_modal">修改底图</button>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="thumbnail">
                  <img src="./map.png" alt="底图">
                </div>
              </div>
            </div>
          </div>
          <!-- 工种图例 -->
         <div role="tabpanel" class="tab-pane" id="job_type_tab">
           <div class="row">
             <div class="col-sm-6 col-md-2" v-for="(jobType, index) in jobTypeList" :key="jobType.key">
               <div class="thumbnail">
                 <img src="../../assets/logo.png" height="200" width="200" >
                 <div class="caption">
                   <!-- <h3>{{jobType.jobName}}</h3> -->
                   <p><a href="#" class="strong" data-toggle="modal" data-target="#update_job_modal">{{jobType.jobName}}</a></p>
                 </div>
               </div>
             </div>
           </div>
         </div>
        </div>
      </div>
    </main>
    <!-- 修改煤矿信息模态框 -->
    <div class="modal fade" id="update_coalmine_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改煤矿信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left special-group-left">煤矿名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="coalmine.coalmineName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left special-group-left">煤矿简称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="coalmine.coalmineAbbr">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left special-group-left">核定产能(万吨/年)</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="coalmine.coalmineOutput">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left special-group-left">核定人数</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="coalmine.coalmineNum">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left special-group-left">矿井类型</div>
                <div class="group-right">
                    <input type="radio" value="生产矿井" v-model="coalmine.coalmineType" checked>生产矿井
                    <input type="radio" value="基建矿井" v-model="coalmine.coalmineType">基建矿井
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left special-group-left">瓦斯等级</div>
                <div class="group-right">
                  <input type="radio" value="高瓦斯" v-model="coalmine.gasGrade" checked>高瓦斯
                  <input type="radio" value="低瓦斯" v-model="coalmine.gasGrade">低瓦斯
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
    <!-- 添加报警声音模态框 -->
    <div class="modal fade" id="add_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加报警声音信息</h4>
          </div>
          <div class="modal-body">
            <div class="input-group-line">
              <div class="group-left special-group-left">报警类型</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="alarmTypeNew.alarmName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left special-group-left">启用声音</div>
              <div class="group-right">
                <input type="radio" value="1" v-model="alarmTypeNew.alarmInUse">启用
                <input type="radio" value="0" v-model="alarmTypeNew.alarmInUse">禁用
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left special-group-left">报警声音文件</div>
              <div class="group-right">
                <input type="file" class="alarm-file" data-show-preview="false"/>
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
    <!-- 修改报警声音模态框 -->
    <div class="modal fade" id="update_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改报警声音信息</h4>
          </div>
          <div class="modal-body">
            <div class="input-group-line">
              <div class="group-left special-group-left">报警类型</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="alarmTypeOld.alarmName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left special-group-left">启用声音</div>
              <div class="group-right">
                <input type="radio" value="1" v-model="alarmTypeOld.alarmInUse">启用
                <input type="radio" value="0" v-model="alarmTypeOld.alarmInUse">禁用
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left special-group-left">报警声音文件</div>
              <div class="group-right">
                <input type="file" class="alarm-file" data-show-preview="false"/>
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
    <!-- 添加周期信息模态框 -->
    <div class="modal fade" id="add_period_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加周期信息</h4>
          </div>
          <div class="modal-body">
            <div class="input-group-line">
              <div class="group-left special-group-left">周期类型</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodNew.periodName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left special-group-left">周期值</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodNew.periodNum">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left special-group-left">描述</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodNew.description">
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
    <!-- 修改周期信息模态框 -->
    <div class="modal fade" id="update_period_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改周期信息</h4>
          </div>
          <div class="modal-body">
            <div class="input-group-line">
              <div class="group-left special-group-left">周期类型</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodOld.periodName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left special-group-left">周期值</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodOld.periodNum">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left special-group-left">描述</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodOld.description">
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

    <!-- 修改地图底图模态框 -->
    <div class="modal fade" id="update_map_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改地图底图</h4>
          </div>
          <div class="modal-body">
            <input id="input-gly" name="inputgly[]" type="file" multiple class="file-loading">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改工种图标模态框 -->
    <div class="modal fade" id="update_job_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改工种图标</h4>
          </div>
          <div class="modal-body">
            <div class="input-group-line">
              <div class="group-left special-group-left">工种类型</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="jobType.jobName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left special-group-left">公种图标</div>
              <div class="group-right">
                <input type="file" class="job-file" data-show-preview="false"/>
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
export default {
  name: 'setting',
  data () {
    return {
      map:"./map.png",
      coalmine:{
        coalmineId:"1",
        coalmineName:"山西省第一矿井",
        coalmineAbbr:"一矿井",
        coalmineNum:"240",
        coalmineOutput:"233",
        coalmineType:"生产矿井",
        gasGrade:"低瓦斯",
      },
      periodNew:{},
      periodOld:{},
      periodList:[
        {
          periodId:"P100001",
          periodName:"位置数据采集周期",
          periodNum:"1000",
          description:"设置井下分站以多长周期采集人员位置信息",
          remark:"",
        },
        {
          periodId:"P100002",
          periodName:"历史数据保存周期",
          periodNum:"1000",
          description:"设置多长时间将内存位置数据保存到数据库中",
          remark:"",
        },
        {
          periodId:"P100003",
          periodName:"页面实时数据刷新频率",
          periodNum:"1000",
          description:"设置页面多长时间刷新一次",
          remark:"",
        },
      ],
      alarmTypeNew:{},
      alarmTypeOld:{},
      alarmTypeList:[
        {
          alarmTypeId:"AT100001",
          alarmName:"超时报警",
          alarmInUse:"1",
          alarmFile:"../../assets/logo.png",
          remark:"",
        },
        {
          alarmTypeId:"AT100002",
          alarmName:"超员报警",
          alarmInUse:"1",
          alarmFile:"../../assets/logo.png",
          remark:"",
        },
        {
          alarmTypeId:"AT100003",
          alarmName:"限制区域报警",
          alarmInUse:"1",
          alarmFile:"../../assets/logo.png",
          remark:"",
        },
        {
          alarmTypeId:"AT100004",
          alarmName:"呼叫报警",
          alarmInUse:"0",
          alarmFile:"../../assets/logo.png",
          remark:"",
        },
      ],
      jobType:{},
      jobTypeList:[
        {
          jobId:"JT100001",
          jobName:"掘进工",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
        {
          jobId:"JT100002",
          jobName:"瓦检员",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
        {
          jobId:"JT100003",
          jobName:"放炮员",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
        {
          jobId:"JT100004",
          jobName:"采煤工",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
        {
          jobId:"JT100005",
          jobName:"安检员",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
        {
          jobId:"JT100001",
          jobName:"掘进工",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
        {
          jobId:"JT100002",
          jobName:"瓦检员",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
        {
          jobId:"JT100003",
          jobName:"放炮员",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
        {
          jobId:"JT100004",
          jobName:"采煤工",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
        {
          jobId:"JT100005",
          jobName:"安检员",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        },
      ],
    };
  },
  mounted () {
    this.initEvent();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_alarm_modal").on('show.bs.modal', function() {
        self.alarmTypeNew = {
          alarmTypeId:"AT100009",
          alarmName:"",
          alarmInUse:"1",
          alarmFile:"",
          remark:"",
        }
      });
      $("#update_alarm_modal").on('show.bs.modal', function() {
        self.alarmTypeOld = {
          alarmTypeId:"AT100003",
          alarmName:"限制区域报警",
          alarmInUse:"1",
          alarmFile:"../../assets/logo.png",
          remark:"",
        };
      });
      $("#update_job_modal").on('show.bs.modal', function() {
        self.jobType = {
          jobId:"JT100001",
          jobName:"掘进工",
          jobIconUrl:"../../assets/logo.png",
          remark:"",
        };
      });
      $("#add_period_modal").on('show.bs.modal', function() {
        self.periodNew = {
          periodId:"P100009",
          periodName:"",
          periodNum:"1000",
          description:"",
          remark:"",
        }
      });
      $("#update_period_modal").on('show.bs.modal', function() {
        self.periodOld = {
          periodId:"P100001",
          periodName:"位置数据采集周期",
          periodNum:"1000",
          description:"设置井下分站以多长周期采集人员位置信息",
          remark:"",
        };
      });
      $(".alarm-file").fileinput({
        language: 'zh',
        uploadUrl: '',
        uploadAsync: true,
        removeLabel: '删除',
        uploadLabel: '上传',
        cancelLabel: '取消',
        //showUpload: true,   //是否显示上传按钮
        browseLabel: '选择文件',
        initialCaption: '选择音频格式文件',
        msgValidationError:'文件上传错误',
        uploadExtraData: {},
        allowedFileExtensions : ['wav', 'ogg', 'mp3'],  //允许的文件类型
        overwriteInitial: false,
        //maxFileSize: 1000,  //文件的最大大小
        maxFilesNum: 1,     //最多文件数量
        enctype: 'multipart/form-data',
        slugCallback: function(filename) {
          return filename.replace('(', '_').replace(']', '_');
        }
      });
      $(".job-file").fileinput({
        language: 'zh',
        uploadUrl: '',
        uploadAsync: true,
        removeLabel: '删除',
        uploadLabel: '上传',
        cancelLabel: '取消',
        showUpload: true,
        browseLabel: '上传图例',
        initialCaption: '选择图片格式文件,支持jpg、jpeg、png格式',
        msgValidationError:'文件上传错误',
        uploadExtraData: {},
        allowedFileExtensions : ['png', 'jpg', 'jpeg'],
        overwriteInitial: false,
        maxFilesNum: 1,
        enctype: 'multipart/form-data',
        slugCallback: function(filename) {
          return filename.replace('(', '_').replace(']', '_');
        }
      });
      $("#input-gly").fileinput({
          theme: "gly",
          language: 'zh',
          uploadUrl: '/',
          uploadAsync: true,
          removeLabel: '删除',
          uploadLabel: '上传',
          cancelLabel: '取消',
          showUpload: true,
          browseLabel: '上传底图',
          initialCaption: '选择图片格式文件,支持jpg、jpeg、png格式，大小不超过2.0M',
          msgValidationError:'文件上传错误',
          uploadExtraData: {},
          allowedFileExtensions : ['png', 'jpg', 'jpeg'],
          overwriteInitial: false,
          maxFilesNum: 1,
          enctype: 'multipart/form-data',
          slugCallback: function(filename) {
            return filename.replace('(', '_').replace(']', '_');
          },
         /* allowedPreviewTypes: ['image'],
          allowedFileTypes: ['image'],*/
      });
    },
  }
};
</script>

<style lang="css" scoped>
#setting {
  width: 100%;
}
.show-info-group{
  border: solid 1px #f5f5f5;
}
.radio{
  margin: 0px 0px;
}
.special-group-left{
  background-color: #eee;
  text-align: center;
  /*width:250px;*/
}

</style>
