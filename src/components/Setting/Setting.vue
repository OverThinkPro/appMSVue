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
          <li role="presentation" class="active"><a href="" data-target="#coalmine_info_tab" aria-controls="coalmine_info_tab" role="tab" data-toggle="tab" @click="clickCoalmineTab()">煤矿信息</a></li>
          <li role="presentation"><a href="" data-target="#period_setting_tab" aria-controls="period_setting_tab" role="tab" data-toggle="tab" @click="clickPeriodTab()">人员位置数据采集周期</a></li>
          <li role="presentation"><a href="" data-target="#alarm_type_tab" aria-controls="alarm_type_tab" role="tab" data-toggle="tab" @click="clickAlarmTypeTab()">报警声音</a></li>
          <li role="presentation"><a href="" data-target="#map_management_tab" aria-controls="map_management_tab" role="tab" data-toggle="tab" @click="clickMapTab()">地图底图</a></li>
          <li role="presentation"><a href="" data-target="#job_type_tab" aria-controls="job_type_tab" role="tab" data-toggle="tab" @click="clickJobTypeTab()">工种图例</a></li>
        </ul>
        <div class="tab-content">
          <!-- 煤矿信息 -->
          <div role="tabpanel" class="tab-pane active" id="coalmine_info_tab">
            <div class="table-box">
              <div class="show-info-group clear-bottom clear-border-radius">
                <div class="group-left">煤矿名称</div>
                <div class="group-right">{{coalmine.coalmineName}}</div>
                <div class="group-left">煤矿简称</div>
                <div class="group-right">{{coalmine.coalmineAbbr}}</div>
              </div>
              <div class="show-info-group clear-bottom clear-border-radius">
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
            <div class="btn-box fr">
              <button type="button" class="btn btn-primary modal-btn" data-toggle="modal" data-target="#update_coalmine_modal">修改</button>
            </div>
          </div>
          <!-- 人员位置数据采集周期 -->
          <div role="tabpanel" class="tab-pane" id="period_setting_tab">
            <div class="btn-box">
              <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#add_period_modal">添加周期信息</button>
              <button class="btn btn-primary fl" type="button" @click="checkPeriodSelect()">批量删除</button>
            </div>
            <div class="data-box content-box">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th><input type="checkbox" name="allPeriod" v-model="checkedOfPeriod" @click="selectAllPeriodCheckbox()"></th>
                    <th>序号</th>
                    <th>周期类型</th>
                    <th>周期值</th>
                    <th>描述</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(period, index) in periodList" :key="period.key">
                    <td><input type="checkbox" name="period" :value="period.periodId" /></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{period.periodName}}</td>
                    <td>{{period.periodNum}}</td>
                    <td>{{period.description}}</td>
                    <td>
                      <a href="" title="修改周期基本信息" data-toggle="modal" data-target="" @click="clickUpdatePeriod(period.periodId)"><i class="glyphicon glyphicon-edit"></i></a>&nbsp;|
                      <a href="javascript: void(0);" title="删除周期" @click="deletePeriod(period.periodId)"><i class="glyphicon glyphicon-trash"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 报警声音 -->
          <div role="tabpanel" class="tab-pane" id="alarm_type_tab">
            <div class="btn-box">
              <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#add_alarmType_modal">添加报警类型</button>
              <button class="btn btn-primary fl" type="button" @click="checkAlarmTypeSelect()">批量删除</button>
            </div>
            <div class="data-box content-box">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th><input type="checkbox" name="allAlarm" v-model="checkedOfAlarmType" @click="selectAllAlarmTypeCheckbox()"></th>
                    <th>序号</th>
                    <th>报警类型</th>
                    <th>启用声音</th>
                    <th>声音文件</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(alarmType, index) in alarmTypeList" :key="alarmType.key">
                    <td><input type="checkbox" name="alarmType" :value="alarmType.alarmTypeId" /></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ alarmType.alarmName }}</td>
                    <td v-if="alarmType.alarmInUse">启用</td>
                    <td v-else>禁用</td>
                    <!-- <td>{{ alarmType.alarmFile }}</td> -->
                    <td>
                      <audio v-if="alarmType.alarmFile!=''" controls   height="20" width="100">
                        <source :src="alarmType.alarmFile" type="audio/mpeg">
                        <!-- <source :src="horse.ogg" type="audio/ogg"> -->
                       <!-- <embed height="50" width="100" src="horse.mp3"> -->
                      </audio>

                    </td>
                    <td>
                      <a href="" title="修改报警类型" data-toggle="modal" data-target="" @click="clickUpdateAlarmType(alarmType.alarmTypeId)"><i class="glyphicon glyphicon-edit"></i></a>&nbsp;|
                      <a href="javascript: void(0);"  title="删除报警类型" @click="deleteAlarmType(alarmType.alarmTypeId)"><i class="glyphicon glyphicon-trash"></i></a>
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
              <div class="col-sm-12">
                <div class="thumbnail">
                 <!--  <img :src="mapPic" alt="底图" :onerror="defaultMap"> -->
                 <!--  <img src="http://localhost:9000/main/base/map/getMapPicByStream" alt="底图" :onerror="defaultMap"> -->
                  <img :src="mapPic" alt="底图" :onerror="defaultMap">
                  <!-- <img src="D:\install\apache-tomcat-8.0.35-windows-x64\apache-tomcat-8.0.35\webapps\appMSJava\fileLibrary\map\map.jpg" alt=""> -->
                </div>
              </div>
            </div>
          </div>
          <!-- 工种图例 -->
          <div role="tabpanel" class="tab-pane" id="job_type_tab">
            <div class="job-type-wrap">
              <div class="row">
                <div class="col-sm-6 col-md-2" style="height:230px" v-for="(jobType, index) in jobTypeList" :key="jobType.key">
                  <div class="thumbnail">
                    <img v-if="jobType.jobIconUrl!=''" :src="jobType.jobIconUrl" height="200" width="200" :onerror="defaultJobTypePic">
                    <img v-else src="../../assets/logo.png" height="200" width="200" :onerror="defaultJobTypePic">
                    <div class="caption">
                     <!-- <h3>{{jobType.jobName}}</h3> -->
                      <p><a href="" class="strong" data-toggle="modal" data-target="" @click="clickJobTypeName(jobType.jobId)">{{jobType.jobName}}</a></p>
                    </div>
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
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改煤矿信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">煤矿名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="coalmine.coalmineName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">煤矿简称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="coalmine.coalmineAbbr">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">核定产能(万吨/年)</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="coalmine.coalmineOutput">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">核定人数</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="coalmine.coalmineNum">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">矿井类型</div>
                <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="生产矿井" v-model="coalmine.coalmineType" >
                  <span>生产矿井</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="基建矿井" v-model="coalmine.coalmineType">
                  <span>基建矿井</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">瓦斯等级</div>
                <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="高瓦斯" v-model="coalmine.gasGrade">
                  <span>高瓦斯</span>
                  <input class="refresh" style="margin-left: 13.5%;" type="radio"  value="低瓦斯" v-model="coalmine.gasGrade">
                  <span>低瓦斯</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateCoalmine()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加报警声音模态框 -->
    <div class="modal fade" id="add_alarmType_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
              <div class="group-left">报警类型</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="alarmTypeNew.alarmName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">启用声音</div>
              <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="true" v-model="alarmTypeNew.alarmInUse">
                  <span>启用</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="false" v-model="alarmTypeNew.alarmInUse">
                  <span>禁用</span>
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">报警声音文件</div>
              <div class="group-right">
                <input type="file" class="alarm-file" data-show-preview="false" id="input-alarm-add">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addAlarmType()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改报警声音模态框 -->
    <div class="modal fade" id="update_alarmType_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
              <div class="group-left">报警类型</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="alarmTypeOld.alarmName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">启用声音</div>
              <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="true" v-model="alarmTypeOld.alarmInUse">
                  <span>启用</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="false" v-model="alarmTypeOld.alarmInUse">
                  <span>禁用</span>
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">报警声音文件</div>
              <div class="group-right">
                <input type="file" class="alarm-file" data-show-preview="false" id="input-alarm-update">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateAlarmType()">保存</button>
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
              <div class="group-left">周期类型</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodNew.periodName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">周期值</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodNew.periodNum">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">描述</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodNew.description">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addPeriod()">保存</button>
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
              <div class="group-left">周期类型</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodOld.periodName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">周期值</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodOld.periodNum">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">描述</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="periodOld.description">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updatePeriod()">保存</button>
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
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改地图底图</h4>
          </div>
          <div class="modal-body">
            <input id="input-gly" name="inputgly[]" type="file" class="file-loading" :accept="accepts">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateMap">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改工种图标模态框 -->
    <div class="modal fade" id="update_job_pic_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改工种图标</h4>
          </div>
          <div class="modal-body">
            <div class="input-group-line">
              <div class="group-left">工种类型</div>
              <div class="group-right">
                <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="jobType.jobName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">工种图标</div>
              <div class="group-right">
                <input type="file" class="file" data-show-preview="false" id="input-job">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateJobTypePic()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootbox from 'bootbox/bootbox.min';
import axios from 'axios';
import { initPagination } from '../../assets/script/initplugin';
import { deepCopy } from '../../assets/script/extends';
import {currentTime} from '../../assets/script/date';
export default {
  name: 'setting',
  data () {
    return {
      baseUrl:"http://localhost:9000/main/",
      basePath:"../../../static",
      coalmine:{},

      periodNew:{},
      periodOld:{},
      periodList: [],

      alarmTypeNew:{},
      alarmTypeOld:{},
      alarmTypeList: [],

      jobType:{},
      jobTypeList: [],
      defaultJobTypePic:'this.src="' + require('../../assets/img/jobType/yellow.png') + '"',

      checkedOfPeriod: false,
      checkedOfAlarmType: false,

     // mapPic:"http://localhost:9000/main/base/map/getMapPicByStream",
     // picUrl:"./map.png",
      defaultMap:'this.src="' + require('./map.png') + '"',
      mapPic:"",
      accepts : { //允许的上传类型
          type : String,
          default : 'image/jpeg,image/jpg,image/png,image/gif'
      },
    };
  },
  mounted () {
    this.initEvent();
    this.loadCoalmine();
  },
  methods: {
    initEvent () {
      var self = this;
      
      $("#add_alarmType_modal").on('show.bs.modal', function() {
        self.alarmTypeNew = {
          alarmTypeId:"",
          alarmName:"",
          alarmInUse: true,
          alarmFile:"",
          remark:"",
        }
      });
      $("#add_period_modal").on('show.bs.modal', function() {
        self.periodNew = {
          periodId:"",
          periodName:"",
          periodNum:"1000",
          description:"",
          remark:"",
        }
      });
      $("#input-alarm-add").fileinput({
        language: 'zh',
        //uploadUrl: '',
        uploadAsync: true,
        removeLabel: '删除',
        //uploadLabel: '上传',
        cancelLabel: '取消',
        showUpload: false,   //是否显示上传按钮
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
       $("#input-alarm-update").fileinput({
        language: 'zh',
        //uploadUrl: '',
        uploadAsync: true,
        removeLabel: '删除',
        //uploadLabel: '上传',
        cancelLabel: '取消',
        showUpload: false,   //是否显示上传按钮
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
      $("#input-job").fileinput({
        language: 'zh',
        //uploadUrl: '',
        //uploadAsync: true,
        removeLabel: '删除',
        //uploadLabel: '上传',
        cancelLabel: '取消',
        showUpload: false,
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
          //uploadUrl: '/',
          //uploadAsync: true,
          removeLabel: '删除',
          uploadLabel: '上传',
          cancelLabel: '取消',
          showUpload: false,
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
      });
    },

    /* 获得当前时间 */
    current () {
      return currentTime();
    },


    clearSearch () {
      $("input[name='peroid']:checked").each(function() { this.checked = false; });
      $("input[name='alarmType']:checked").each(function() { this.checked = false; });
    },

    clickCoalmineTab(){  
      this.loadCoalmine();
    },

    clickPeriodTab(){ 
      this.loadPeriodList(); 
    },

    clickAlarmTypeTab(){ 
      this.loadAlarmTypeList(); 
    },
    
    clickMapTab(){ 
      let self = this;
      self.mapPic = self.baseUrl+"/base/map/getMapPicByStream"; 
    },
    
    clickJobTypeTab(){ 
      this.defaultLoadJobType(); 
    },

    /* 默认加载周期列表 */
    loadPeriodList() {
      let self = this;
      axios.get('/base/period/').then((response) => {
        let {meta,data} = response.data;
        if (meta.success) {
          if (data) {
            self.periodList = data.periodList;
          }
        } else {
          bootbox.alert({ title:'查看周期信息', message: meta.message });
        }
      });
    },

    /* 添加一个新的周期 */
    addPeriod() {
      let self = this;
      axios.post('/base/period/', self.periodNew).then((response) => {
        let meta = response.data.meta;
        if (meta.success) {
          let data = response.data.data;
          if (data && data.result == 1) { 
            $("#add_period_modal").modal('hide');
            self.loadPeriodList();
            bootbox.alert({ title:'添加周期信息',  message: '周期信息添加成功!' }); 
          }else { 
            bootbox.alert({ title:'添加周期信息',  message: '周期信息添加失败!' }); 
          }
        } else {
          bootbox.alert({ title:'添加周期信息',  message: '服务器内部错误, 周期信息添加失败!'});
        }
      });
    },

    /* 选择要批量删除的周期信息 */
    checkPeriodSelect () {
      let self = this;
      let periodIds = '';
      let size = $("input[name='period']").filter(':checked').length;
      if (size < 1) {
        bootbox.alert({title:'选择周期', message: '请选择一条记录,再进行操作!'});
        return;
      }else{
        $("input[name='period']:checked").each(function() {
          periodIds += $(this).val() + ',';
        });
        periodIds = periodIds.substring(0, periodIds.length-1);
        self.deletePeriod(periodIds);
      }
    },

    /* 删除周期信息 */
    deletePeriod (periodIds) {
      let self = this;
      bootbox.confirm({
        title: '删除周期',
        message: '周期信息一旦删除，不可恢复，是否确定删除？',
        buttons: {
          confirm: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        },
        callback: function(result) {
          if (result) {
            axios.delete('/base/period/', { params: { 'periodIds': periodIds }}).then((response) => {
              let { meta, data } = response.data;
              if (meta.success) {
                if (data && data.result) { 
                  bootbox.alert({ title:'删除周期信息', message: '周期信息删除成功!' }); 
                }else { 
                  bootbox.alert({ title:'删除周期信息', message: '周期信息删除失败!' }); 
                }
                $("input[name='period']:checked").each(function() { this.checked = false; });
                self.loadPeriodList();
              } else { 
                bootbox.alert({ title:'删除周期信息', message: meta.message }); 
              }
            });
          }
        }
      });
    },

    /* 点击修改按钮 */
    clickUpdatePeriod(periodId){
      let self = this;
      self.periodList.forEach((period, index) => {
        if (period.periodId == periodId) {
          self.periodOld = deepCopy(period);
          delete self.periodOld.uber;
        }
      });
      $("#update_period_modal").modal('show');
    },

    /* 修改并更新周期信息 */
    updatePeriod() {
      let self = this;
      axios.put('/base/period/', self.periodOld).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
            if (data && data.result == 1) { 
              bootbox.alert({ title:'修改周期信息', message: '周期信息修改成功!' }); 
            }else { 
              bootbox.alert({ title:'修改周期信息', message: '周期信息修改失败!' }); 
            }
            $("#update_period_modal").modal('hide');
            self.loadPeriodList();
        } else { 
          bootbox.alert({ title:'修改周期信息', message: meta.message }); 
        }
      });
    },
    /* 周期复选框全选 */
    selectAllPeriodCheckbox(){
      //如果当前点击的多选框被选中
      if(this.checkedOfPeriod){        
        $('input[type=checkbox][name=period]').prop("checked", true );
      }else{                
        $('input[type=checkbox][name=period]').prop("checked", false );
      }
    },

    /* 默认加载报警类型列表 */
    loadAlarmTypeList() {
      let self = this;
      axios.get('/base/alarmType/').then((response) => {
        let {meta,data} = response.data;
        if (meta.success) {
          if (data) {
            self.alarmTypeList = data.alarmSettingList;
            for (var i = 0; i < self.alarmTypeList.length; i++) {
              let url = self.alarmTypeList[i].alarmFile;
              if(url && url!=null && url!=""){
                self.alarmTypeList[i].alarmFile = self.baseUrl + "/base/alarmType/getAlarmSoundByStream?alarmSoundUrl="+ url+"&rand="+ self.current();
              }else{
                self.alarmTypeList[i].alarmFile="";
              }
            };
          }
        } else {
          bootbox.alert({ title:'查看报警类型信息', message: meta.message });
        }
      });
    },


    /* 添加一个新的报警类型 */
    addAlarmType() {
      let self = this;
      axios.post('/base/alarmType/', self.alarmTypeNew).then((response) => {
        let meta = response.data.meta;
        if (meta.success) {
          let data = response.data.data;
          if (data && data.result == 1 && data.alarmTypeId!="") {
            if($('#input-alarm-add')[0].files.length>0){
              const formData = new FormData();
              formData.append('file', $('#input-alarm-add')[0].files[0]); 
              //alert(data.alarmTypeId);
              formData.append('alarmTypeId', data.alarmTypeId); 
              self.uploadAlarmTypePicInAdd(formData);
            }else{
              bootbox.alert({ title:'添加报警类型信息', message: '报警类型信息添加成功!' }); 
              $("#add_alarmType_modal").modal('hide');
              self.loadAlarmTypeList();
            }
          } else {
            bootbox.alert({ title:'添加报警类型信息',  message: '服务器内部错误, 报警类型添加失败!'});
          }
        } else {
          bootbox.alert({ title:'添加报警类型信息',  message: '服务器内部错误, 报警类型添加失败!'});
        }
      });
    },
    /* 新增报警类型的声音文件文件的上传 */
    uploadAlarmTypePicInAdd(formData){
      let self = this;
      axios.post('/base/alarmType/upload', formData, {
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
            if (data && data.result == 1) { 
              bootbox.alert({ title:'添加报警类型信息', message: '报警类型信息添加成功!' }); 
            }else { 
              bootbox.alert({ title:'添加报警类型信息',  message: '报警类型信息添加失败!' }); 
            }
            $("#add_alarmType_modal").modal('hide');
            self.loadAlarmTypeList();
        } else { 
          bootbox.alert({ title:'添加报警类型信息',  message: '报警类型信息添加失败!' });
        }
      });
    },
    /* 选择要批量删除的报警类型信息 */
    checkAlarmTypeSelect () {
      let self = this;
      let alarmTypeIds = '';
      let size = $("input[name='alarmType']").filter(':checked').length;
      if (size < 1) {
        bootbox.alert({ title:'选择报警类型', message: '请选择一条记录,再进行操作!'});
        return;
      }else{
        $("input[name='alarmType']:checked").each(function() {
          alarmTypeIds += $(this).val() + ',';
        });
        alarmTypeIds = alarmTypeIds.substring(0, alarmTypeIds.length-1);
        self.deleteAlarmType(alarmTypeIds);
      }
    },

    /* 删除报警类型信息 */
    deleteAlarmType (alarmTypeIds) {
      let self = this;
      bootbox.confirm({
        title: '删除报警类型',
        message: '报警类型信息一旦删除，不可恢复，是否确定删除？',
        buttons: {
          confirm: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        },
        callback: function(result) {
          if (result) {
            axios.delete('/base/alarmType/', { params: { 'alarmTypeIds': alarmTypeIds }}).then((response) => {
              let { meta, data } = response.data;
              if (meta.success) {
                if (data && data.result) { 
                  bootbox.alert({ title:'删除报警类型信息', message: '报警类型信息删除成功!'}); 
                }else { 
                  bootbox.alert({ title:'删除报警类型信息', message: '报警类型信息删除失败!'}); 
                }
                $("input[name='alarmType']:checked").each(function() { this.checked = false; });
                self.loadAlarmTypeList();
              } else { 
                bootbox.alert({title:'删除报警类型信息', message: meta.message }); 
              }
            });
          }
        }
      });
    },
    /* 点击修改按钮 */
    clickUpdateAlarmType(alarmTypeId){
      let self = this;
      self.alarmTypeList.forEach((alarmType, index) => {
        if (alarmType.alarmTypeId == alarmTypeId) {
          self.alarmTypeOld = deepCopy(alarmType);
          delete self.alarmTypeOld.uber;
        }
      });
      $("#update_alarmType_modal").modal('show');
    },

    /* 修改并更新报警类型信息 */
    updateAlarmType() {
      let self = this;
      axios.put('/base/alarmType/', self.alarmTypeOld).then((response) => {
        let meta = response.data.meta;
        if (meta.success) {
          //alert(meta.success);
          let data = response.data.data;
          if (data && data.result == 1) {
            if($('#input-alarm-update')[0].files.length>0){
              const formData = new FormData();
              formData.append('file', $('#input-alarm-update')[0].files[0]); 
              formData.append('alarmTypeId', self.alarmTypeOld.alarmTypeId); 
              self.uploadAlarmTypePicInUpdate(formData);
            }else{
              $("#update_alarmType_modal").modal('hide');
              bootbox.alert({ title:'修改报警类型信息', message: '报警类型信息修改成功!' });  
              self.loadAlarmTypeList();
            }
          } else {
            $("#update_alarmType_modal").modal('hide');
            bootbox.alert({ title:'修改报警类型信息',  message: '服务器内部错误, 报警类型修改失败!'});
          }
        }else {
          $("#update_alarmType_modal").modal('hide');
          bootbox.alert({ title:'修改报警类型信息',  message: '服务器内部错误, 报警类型修改失败!'});
        }
      });
    },
    /* 更新后的报警类型文件的上传 */
    uploadAlarmTypePicInUpdate(formData){
      let self = this;
      axios.post('/base/alarmType/upload', formData, {
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
            if (data && data.result == 1) { 
              //$("#update_alarmType_modal").modal('hide');
              bootbox.alert({ title:'修改报警类型信息', message: '报警类型信息修改成功!' }); 
            }else { 
             // $("#update_alarmType_modal").modal('hide');
              bootbox.alert({ title:'修改报警类型信息', message: '报警类型信息修改失败!' }); 
            }
            $("#update_alarmType_modal").modal('hide');
            self.loadAlarmTypeList();
        } else { 
          $("#update_alarmType_modal").modal('hide');
          bootbox.alert({ title:'修改报警类型信息', message: meta.message }); 
        }
      });
    },
    /* 报警类型复选框全选 */
    selectAllAlarmTypeCheckbox(){
      //如果当前点击的多选框被选中
      if(this.checkedOfAlarmType){        
        $('input[type=checkbox][name=alarmType]').prop("checked", true );
      }else{                
        $('input[type=checkbox][name=alarmType]').prop("checked", false );
      }
    },

    /* 默认加载煤矿信息 */
    loadCoalmine() {
      let self = this;
      axios.get("/base/setting/coalmine").then((response) => {
        let {meta,data} = response.data;
        if (meta.success) {
          self.coalmine = data.coalmineInfo;
        } else {
          bootbox.alert({
            title:"煤矿信息",
            message: meta.message
          });
        }
      });
    },

    /* 修改煤矿信息 */
    updateCoalmine() {
      let self = this;
      axios.put('/base/coalmine/', self.coalmine).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
            if (data && data.result == 1) { 
              bootbox.alert({ title:'修改煤矿信息', message: '煤矿信息修改成功!' }); 
            }else { 
              bootbox.alert({title:'修改煤矿信息',  message: '煤矿信息修改失败!' }); 
            }
            $("#update_coalmine_modal").modal('hide');
        } else { 
          bootbox.alert({ title:'修改煤矿信息', message: meta.message }); 
        }
      });
    },

    /* 默认加载工种信息 */
    defaultLoadJobType () {
      let self = this;
      axios.get('/base/jobtype/').then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
          self.jobTypeList = data.jobTypeList;
          for (var i = 0; i < self.jobTypeList.length; i++) {
            let url = self.jobTypeList[i].jobIconUrl;
            if(url && url!=null && url!=""){
              self.jobTypeList[i].jobIconUrl = self.baseUrl + "/base/jobType/getJobPicByStream?jobIconUrl="+ url+"&rand="+ self.current();
            }else{
              self.jobTypeList[i].jobIconUrl="";
            }
          };
        } else {
          bootbox.alert({
            message: meta.message
          });
        }
      });
    },

    /* 点击修改工种图例 */
    clickJobTypeName(jobId){
      let self = this;
      self.jobTypeList.forEach((jobType, index) => {
        if (jobType.jobId == jobId) {
          self.jobType = deepCopy(jobType);
          delete self.jobType.uber;
        }
      });
      $("#update_job_pic_modal").modal('show');
    },

    // 修改工种图例信息
    updateJobTypePic () {
      let self = this;
      const formData = new FormData();
      formData.append('file', $('#input-job')[0].files[0]); 
      formData.append('jobId', self.jobType.jobId); 
      
      axios.post('/base/jobtype/upload', formData,{
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
            if (data && data.result == 1) { 
              bootbox.alert({ title:"工种图例", message: '工种图例修改成功!' }); 
            }else { 
              bootbox.alert({ title:"工种图例", message: '工种信息修改失败!' }); 
            }
            $("#update_job_pic_modal").modal('hide');
            self.defaultLoadJobType();
        } else { bootbox.alert({ title:"工种图例", message: meta.message }); }
      });
    },

    /* 上传文件 */
    updateMap(){
      let self = this;
      const formData = new FormData();
      formData.append('file',  $("#input-gly")[0].files[0]);  
      axios.post('/base/map/upload', formData, {
          method: 'post',
          headers: {'Content-Type': 'multipart/form-data'}
      }).then((response) => {//根据服务器返回进行处理
        let { meta,data } = response.data;
        if (meta.success) {
          $("#update_map_modal").modal('hide');
          bootbox.alert({ title:"上传底图", message: '成功!' }); 
          /*this.mapPic = require("D:/install/apache-tomcat-8.0.35-windows-x64/apache-tomcat-8.0.35/webapps/appMSJava/fileLibrary/map/map.jpg");*/
          self.mapPic = self.baseUrl + "/base/map/getMapPicByStream?rand="+ self.current();
        }else{ 
          bootbox.alert({ title:"上传底图", message: '失败!' });
          $("#update_map_modal").modal('hide'); 
        }
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
.job-type-wrap{
  margin:25px 20px; 
}
/* #alarm_type_tab{
  margin-bottom: 30px;
} */
.table > tbody > tr > td{
  line-height: 1.4;
}
</style>
