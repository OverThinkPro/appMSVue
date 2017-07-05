<template>
  <div id="main" class="main-container">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">实时监测</li>
      </ol>
    </div>
    <main>
      <div class="main-left fl content-box">
        <div class="btn-box">
          <div class="fl">
            <button type="button" @click="loadRegionCount()" class="btn btn-primary" data-toggle="modal" data-target="#evacuate_modal">撤离呼叫</button>
            <button type="button" @click="loadCallbackInfo()" class="btn btn-primary" data-toggle="modal" data-target="#callback_modal">回电呼叫</button>
          </div>
          <div class="fr">
            <button type="button" @click="fullScreen()" class="btn btn-primary fr" title="地图全屏查看">
              <i class="glyphicon glyphicon-fullscreen"></i>&nbsp;全屏查看
            </button>
            <div class="fr">
                <div class="input-group">
                  <span>图层:</span>
                  <input type="checkbox" name="layers" checked="checked" value="stafflayer" id="staffLayer"/><span>人员位置&nbsp;&nbsp;</span>
                  <input type="checkbox" name="layers" checked="checked" value="readerlayer" id="readerLayer" /><span>分站&nbsp;&nbsp;</span>
                  <input type="checkbox" name="layers" checked="checked" value="regionlayer" id="regionLayer" /><span style="margin-right: 25px;">区域</span>
                </div>
            </div>
          </div>
        </div>
        <div class="map-box">
          <div id="map">
             <div id="popup" class="ol-popup">
               <a href="#" id="popup-closer" class="ol-popup-closer"></a>
               <div id="popup-content"></div>
             </div>
          </div>
          <div id="scale-line">

          </div>
        </div>
      </div>
      <div class="main-right fl content-box">
        <div class="wrap-info coalmine-wrap">
          <div class="s-title-box">
            <h5>基本信息</h5>
          </div>
          <div class="document-line">
            <label class="label-line-left">核定产能</label>
            <label class="label-line-right">{{ coalmineInfo.coalmineOutput }}万吨/年</label>
          </div>
          <div class="document-line">
            <label class="label-line-left">核定人数</label>
            <label class="label-line-right">{{ coalmineInfo.coalmineNum }}人</label>
          </div>
          <div class="document-line">
            <label class="label-line-left">井下人数</label>
            <label class="label-line-right">{{ coalmineInfo.currentTotalStaff }}人</label>
          </div>
          <div class="document-line">
            <label class="label-line-left">值班领导</label>
            <label class="label-line-right">{{ coalmineInfo.currentLeader }}</label>
          </div>
        </div>
        <div class="wrap-info onduty-wrap">
          <div class="s-title-box">
            <h5>当班人数</h5>
          </div>
          <div class="document-line" v-if="realUnit != null" v-for="(unit, index) in realUnit" :key="unit.key">
            <label class="label-line-left">{{ unit.unit_name }}</label>
            <label class="label-line-right">
              <a href="javascript:void(0)" @click="loadUnitStaff(unit.unit_id)" data-toggle="modal" data-target="#unit_staff_modal">{{ unit.total }}人</a>
              <a href="javascript:void(0)" @click="loadMapStaffHighLight(unit.unit_id)" title="地图显示人员信息"><i class="glyphicon glyphicon-globe"></i></a>
            </label>
          </div>
        </div>
        <div class="wrap-info region-wrap">
          <div class="s-title-box">
            <h5>区域人数</h5>
          </div>
          <div class="document-line" v-if="realRegion != null" v-for="(region, index) in realRegion" :key="region.key">
            <label class="label-line-left">{{ region.region_name }}</label>
            <label class="label-line-right">
              <a href="javascript:void(0)" @click="loadRegionStaff(region)" data-toggle="modal" data-target="#region_staff_modal">{{ region.total }}人</a>
              <a href="javascript:void(0)" @click="loadEvacuateInfo(region)" title="查看撤离呼叫状态" data-toggle="modal" data-target="#evacuate_state_modal"><i class="glyphicon glyphicon-list-alt"></i></a>
            </label>
          </div>
        </div>
        <div class="wrap-info alarm-wrap">
          <div class="s-title-box">
            <h5>实时报警信息</h5>
          </div>
          <div class="document-line" v-if="realAlarm != null" v-for="(alarm, index) in realAlarm" :key="alarm.key">
            <label class="label-line-left">{{ alarm.alarm_name }}</label>
            <label class="label-line-right">
              <a href="javascript:void(0)" style="margin-right: 5px;" @click="checkLoadAlarmType(alarm.alarm_type_id)" data-toggle="modal" :data-target="alarmTypes[alarm.alarm_name]" title="查看报警详情"><i class="glyphicon glyphicon-bullhorn"></i>&nbsp;{{ alarm.total }}条</a>
              <input type="checkbox" checked="checked" :data-cbinput="alarm.alarm_type_id" title="是否周期内重复报警" /><span style="color: #333;">重复</span>
            </label>
          </div>
        </div>
      </div>
    </main>

    <!-- 撤离呼叫模态框 -->
    <div class="modal fade" id="evacuate_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">撤离呼叫</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <!-- <div class="modal-search-bar">
                  <div class="ms-bar-select">
                    <select class="form-control">
                      <option value="">- 请选择区域 -</option>
                      <template v-if="staffListCache.realStaffList != null" v-for="(region, index) in staffListCache.realStaffList">
                        <option value="region.region_id">{{ region.region_name }}</option>
                      </template>
                    </select>
                  </div>
              </div> -->
              <!-- <div class="hr"></div> -->
              <div class="btn-box">
                <button type="button" @click="insertEvacuateCallInfo()" class="btn btn-primary fl"><i class="glyphicon glyphicon-phone-alt"></i>&nbsp;呼叫</button>
              </div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th><input type="checkbox" name="checkAllRegion" /></th>
                      <th>区域名称</th>
                      <th>当前人数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="staffListCache.realStaffList != null" v-for="(region, index) in staffListCache.realStaffList" :key="region.key">
                      <td><input type="checkbox" :value="region.region_id" name="region"/></td>
                      <td>{{ region.region_name }}</td>
                      <td>{{ region.total }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="regionCountPagingBox">
                    <div id="regionCountPaging" class="pagination"></div>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 回电呼叫模态框 -->
    <div class="modal fade" id="callback_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearchInfo()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">回电呼叫</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box outside-box">
              <div class="modal-search-bar">
                <div class="ms-bar-select fl">
                  <select id="unitSelectVal" class="form-control refresh">
                    <option value="">- 请选择部门 -</option>
                    <option v-if="unitList != null" v-for="(unit, index) in unitList" :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
                  </select>
                </div>
                <div class="input-group ms-bar-input fl">
                    <span class="input-group-addon">员工姓名</span>
                    <input id="staffNameVal" type="text" class="form-control refresh" />
                </div>
                <div class="btn-group input-group ms-bar-button fr">
                  <button type="button" @click="clearSearchInfo()" class="btn btn-default"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
                  <button type="button" @click="loadCallbackInfo()" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
                </div>
              </div>
              <div class="gray-hr"></div>
              <div class="btn-box">
                <button type="button" @click="insertCallbackStaffInfo()" class="btn btn-primary fl"><i class="glyphicon glyphicon-phone-alt"></i>&nbsp;呼叫</button>
              </div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th><input type="checkbox" name="checkAllStaff" /></th>
                      <th>部门名称</th>
                      <th>人员名称</th>
                      <th>工种</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="staffListCache.realStaffList != null" v-for="(staff, index) in staffListCache.realStaffList">
                      <td><input type="checkbox" name="staff" :value="staff.staffId" /></td>
                      <td>{{ staff.unitName }}</td>
                      <td>{{ staff.staffName }}</td>
                      <td>{{ staff.jobName }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="callbackPagingBox">
                  <div id="callbackPaging" class="pagination"></div>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearchInfo()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 班组人员信息模态框 -->
    <div class="modal fade" id="unit_staff_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">班组人员信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box outside-box">
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>姓名</th>
                      <th>入井时间</th>
                      <th>所在位置</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="staffListCache.realStaffList != null" v-for="(staff, index) in staffListCache.realStaffList" :key="staff.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ staff.staffName }}</td>
                      <td>{{ staff.enteringDate }}</td>
                      <td>{{ staff.readerName }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="staffUnitPagingBox">
                  <div id="staffUnitPaging" class="pagination"></div>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 区域人员基本信息模态框 -->
    <div class="modal fade" id="region_staff_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">区域人员基本信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box outside-box">
              <div class="show-info-group clear-bottom clear-radius-bottom" >
                <div class="s-group-left">区域</div>
                <div class="s-group-right">{{ regionShowInfo.regionName }}</div>
              </div>
              <div class="show-info-group clear-radius-top">
                <div class="s-group-left">人数</div>
                <div class="s-group-right">{{ regionShowInfo.total }}人</div>
              </div>
              <div class="white-hr"></div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>姓名</th>
                      <th>入井时间</th>
                      <th>工种</th>
                      <th>班组</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="staffListCache.realStaffList != null" v-for="(staff, index) in staffListCache.realStaffList" :key="staff.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ staff.staffName }}</td>
                      <td>{{ staff.enteringDate }}</td>
                      <td>{{ staff.jobName }}</td>
                      <td>{{ staff.unitName }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="regionStaffPagingBox">
                  <div id="regionStaffPaging" class="pagination"></div>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 撤离呼叫状态信息模态框 -->
    <div class="modal fade" id="evacuate_state_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">撤离呼叫状态信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box outside-box">
              <div class="show-info-group clear-bottom clear-radius-bottom">
                <div class="s-group-left">区域</div>
                <div class="s-group-right">{{ regionShowInfo.regionName }}</div>
              </div>
              <div class="show-info-group clear-bottom clear-border-radius">
                <div class="s-group-left">人数</div>
                <div class="s-group-right">{{ regionShowInfo.total }}人</div>
              </div>
              <div class="show-info-group clear-bottom clear-radius">
                <div class="s-group-left">已呼叫</div>
                <div class="s-group-right">{{ staffListCache.calledNum }}人</div>
              </div>
              <div class="show-info-group clear-radius-top">
                <div class="s-group-left">呼叫人次</div>
                <div class="s-group-right">{{ staffListCache.callCount }}人次</div>
              </div>
              <div class="white-hr"></div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>姓名</th>
                      <th>入井时间</th>
                      <th>工种</th>
                      <th>班组</th>
                      <th>呼叫状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(evacuate, index) in staffListCache.realStaffList" :key="evacuate.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ evacuate.staffName }}</td>
                      <td>{{ evacuate.enteringTime }}</td>
                      <td>{{ evacuate.jobName }}</td>
                      <td>{{ evacuate.unitName }}</td>
                      <td>{{ status[evacuate.callStatus] }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="evacuateDetailPagingBox">
                  <div id="evacuateDetailPaging" class="pagination"></div>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 超时报警信息模态框 -->
    <div class="modal fade" id="overtime_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">超时报警信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>卡号</th>
                      <th>姓名</th>
                      <th>到岗时间</th>
                      <th>到岗位置</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="alarmListCache.alarmResultList != null" v-for="(staff, index) in alarmListCache.alarmResultList" :key="staff.key">
                      <td>{{ staff.cardId }}</td>
                      <td>{{ staff.staffName }}</td>
                      <td>{{ staff.arrivalTime }}</td>
                      <td>{{ staff.regionName }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="overtimePagingBox">
                  <div id="overtimePaging" class="pagination"></div>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 超员报警信息模态框 -->
    <div class="modal fade" id="overman_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">超员报警信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>区域名称</th>
                      <th>应到人数</th>
                      <th>实到人数</th>
                      <th>处理情况</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="alarmListCache.alarmResultList != null" v-for="(region, index) in alarmListCache.alarmResultList" :key="region.key">
                      <td>{{ region.regionName }}</td>
                      <td>{{ region.reqNumber }}</td>
                      <td>{{ region.realNumber }}</td>
                      <td>{{ filterAlarmHandler(region.alarmInHandle) }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="overmanPagingBox">
                  <div id="overmanPaging" class="pagination"></div>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 限制区域报警信息模态框 -->
    <div class="modal fade" id="region_limit_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">限制区域报警信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>区域名称</th>
                      <th>员工卡号</th>
                      <th>员工姓名</th>
                      <th>处理情况</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="alarmListCache.alarmResultList != null" v-for="(region, index) in alarmListCache.alarmResultList" :key="region.key">
                      <td>{{ region.regionName }}</td>
                      <td>{{ region.cardId }}</td>
                      <td>{{ region.staffName }}</td>
                      <td>{{ filterAlarmHandler(region.alarmInHandle) }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="limitregionPagingBox">
                  <div id="limitregionPaging" class="pagination"></div>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 呼叫报警信息模态框 -->
    <div class="modal fade" id="staff_call_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">呼叫报警信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="table-box">
                <div class="btn-box">
                  <button type="button" class="btn btn-primary fl" name="button" @click="doHandleStaffAlarm()">撤离呼叫</button>
                </div>
                <div class="data-box">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>选择</th>
                        <th>呼叫员工</th>
                        <th>所在区域名称</th>
                        <th>呼叫时间</th>
                        <th>处理情况</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="alarmListCache.alarmResultList != null" v-for="(alarm, index) in alarmListCache.alarmResultList" :key="alarm.key">
                        <td><input type="checkbox" name="staffAlarmInp" :value="alarm.alarmId" /></td>
                        <td>{{ alarm.staffName }}</td>
                        <td>{{ alarm.readerId }}</td>
                        <td>{{ alarm.alarmStartTime }}</td>
                        <td>{{ filterAlarmHandler(alarm.alarmInHandle) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <nav class="pagination-box" id="alarmInfoPagingBox">
                    <div id="alarmInfoPaging" class="pagination"></div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearchInfo()">退出</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import ol from 'openlayers/dist/ol';
import { mapGetters } from 'vuex';
import bootbox from 'bootbox/bootbox.min';
import axios from 'axios';
import fullscreen from '../../assets/script/fullscreen';
import { initPagination } from '../../assets/script/initplugin';
import { checkOnListener } from '../../assets/script/listener';
import { play } from '../../assets/script/audio';

export default {
  name: "main",
  data() {
    return {
      // 地图容器的缓存
      mapCache: {
        // 弹出框的缓存信息
        popupInfo: {
          container: {},
          content: {},
          closer: {}
        },
        popup: {},
        // 实时地图
        realMap: {},
        /**
         * [staffLayer description] 人员图层
         * @type {Object}
         */
        staffLayer: {},
        staffSource: {},
        /**
         * [readerLayer description] 分站图层
         * @type {Object}
         */
        readerLayer: {},
        readerSource: {},
        /**
         * [regionLayer description] 区域图层
         * @type {Object}
         */
        regionLayer: {},
        regionSource: {},
        /**
         * 样式
         * @type {Object}
         */
        staffStyle: {},
        readerStyle: {},
        regionStyle: {},
        hightLightStyle: {},
        // 展示图层与否
        showlayer: [true, true, true]
      },
      // 实时渲染图层方法
      startRealStaffLayer: {},
      /* 报警类型,显示模态框时使用 */
      alarmTypes: {
        '超时报警': '#overtime_alarm_modal',
        '超员报警': '#overman_alarm_modal',
        '限制区域报警': '#region_limit_alarm_modal',
        '呼叫报警': '#staff_call_alarm_modal'
      },
      // 报警信息分页包装盒
      alarmBox: {
        '1': {
          'parent': 'overtimePagingBox',
          'child': 'overtimePaging'
        },
        '2': {
          'parent': 'overmanPagingBox',
          'child': 'overmanPaging'
        },
        '3': {
          'parent': 'limitregionPagingBox',
          'child': 'limitregionPaging'
        },
        '4': {
          'parent': 'alarmInfoPagingBox',
          'child': 'alarmInfoPaging'
        }
      },
      repeatList: {
        '1': true,
        '2': true,
        '3': true,
        '4': true
      },
      status: ['未呼叫', '已呼叫'],
      unitId: '',
      regionId: '',
      regionShowInfo: {
        regionoName: '',
        total: 0
      },
      alarmTypeId: '',
      staffListCache: {
        realStaffList: [],
        total: 0
      },
      alarmListCache: {
        alarmResultList: [],
        total: 0
      },
      unitList: [],
      startRealCount: {}
    };
  },
  mounted () {
    let self = this;

    this.initEvent();
    this.loadMap();
    this.loadCoalmineInfo();
    this.loadCountRealtimeInfo();

    // 开启实时统计
    self.startRealCount = setInterval(function() {
      self.loadCoalmineInfo();
      self.loadCountRealtimeInfo();
    }, 3000);
  },
  computed: {
    ...mapGetters(['coalmineInfo', 'realUnit', 'staffReal', 'realRegion', 'realAlarm', 'staffAlarm', 'pagination'])
  },
  destroyed () {
    let self = this;

    clearInterval(self.startRealStaffLayer);
    clearInterval(self.startRealCount);
  },
  methods: {
    initEvent () {
      let self = this;
      /* 模态框中全选、取消全选功能 */
      // 撤离呼叫模态框
      $("input[name='checkAllStaff']").click(function() {
        let child = $("input[name='staff']");
        if (this.checked) {
          child.each(function() {
            this.checked = true;
          });
        } else {
          child.each(function() {
            this.checked = false;
          });
        }
      });
      // 回电呼叫
      $("input[name='checkAllRegion']").click(function() {
        let child = $("input[name='region']");
        if (this.checked) {
          child.each(function() {
            this.checked = true;
          });
        } else {
          child.each(function() {
            this.checked = false;
          });
        }
      });

      $("#callback_modal").on('shown.bs.modal', self.loadUnitList());

      /* Start map container element init */
      self.mapCache.popupInfo = {
          container: document.getElementById("popup"),
          content: document.getElementById('popup-content'),
          closer: document.getElementById('popup-closer')
      };
      self.mapCache.popup = new ol.Overlay(({
        element: self.mapCache.popupInfo.container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      }));
      self.mapCache.popupInfo.closer.onclick = function() {
        self.mapCache.popup.setPosition(undefined);
        self.mapCache.popupInfo.closer.blur();
        return false;
      };
      self.mapCache.hightLightStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({
                color: 'red'
            })
        })
      });
      /* End map container element init */
    },
    /**
     * ----------------------------------------------------------------------
     * Start map function module.
     * description 地图功能模块
     * author Zychaowill
     */
    loadMap () {
        let self = this,
            taiyuan = ol.proj.fromLonLat([112.53, 37.87]);

        //实例化比例尺控件
        var scaleLineControl = new ol.control.ScaleLine({
            units:"metric",                      //设置比例尺单位，有degrees、imperial、us、nautical或metric
            className: 'custom-scale-line',      //设置比例尺的样式
            target: document.getElementById('scale-line') //显示比例尺的目标容器
        });
  			self.mapCache.realMap = new ol.Map({
  				target: 'map',
  				layers: [
  					// new ol.layer.Tile({
  					// 	source: new ol.source.OSM()
  					// }),
            // new ol.layer.Image({
            //   source: new ol.source.ImageWMS({
            //     url: 'http://localhost:8080/geoserver/wms',
            //     params: {
            //       'LAYERS': 'myditu',
            //       'VERSION': '1.1.0'
            //     },
            //     serverType: 'geoserver'
            //   })
            // })
  				],
  				view: new ol.View({
  					// center: [-7352991.95804323, 4148924.9077592203],
            center: [-7352980.04648007, 4148932.82139267],
  					zoom: 22.2,
  					minZoom: 2,
  					// maxZoom: 20,
            rotation: Math.PI/35
  				}),
          //加载控件到地图容器
          //加载比例尺控件
          controls:ol.control.defaults().extend([scaleLineControl])
  			});
        // self.mapCache.realMap.on('click', function (evt) {
        //   var point = evt.coordinate; //鼠标单击点坐标
        //   alert(point);
        // });
        // 装载人员位置图层
        // self.loadMapStaffLayer();

        // 添加人员、分站、区域图层
        self.mapCache.staffSource = new ol.source.Vector();
        self.mapCache.staffStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: '#6699CC'
                })
            })
        });
        self.mapCache.staffStyle = new ol.style.Style({
          image: new ol.style.Icon({
            src: 'static/jobTypePics/1.png',
            scale: 0.1
          })
        });
        self.mapCache.staffLayer = new ol.layer.Vector({
          source: self.mapCache.staffSource,
          style: self.mapCache.staffStyle
        });

        self.mapCache.readerSource = new ol.source.Vector();
        self.mapCache.readerStyle = new ol.style.Style({
          image: new ol.style.Icon(({
            src: 'static/icon/reader.png',
            scale: 0.4,  //图标缩放比例
          })),
        });
        self.mapCache.readerLayer = new ol.layer.Vector({
          source: self.mapCache.readerSource,
          style: self.mapCache.readerStyle
        });

        self.mapCache.regionSource = new ol.source.Vector();
        self.mapCache.regionStyle = new ol.style.Style({
          // stroke: new ol.style.Stroke({
          //   color: '#D6ABD0',
          //   width: 2
          // })
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)'
          }),
          stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 4
          })
        });
        self.mapCache.regionLayer = new ol.layer.Vector({
          source: self.mapCache.regionSource,
          style: self.mapCache.regionStyle
        });
        self.mapCache.realMap.addLayer(self.mapCache.regionLayer);
        self.mapCache.realMap.addLayer(self.mapCache.readerLayer);
        self.mapCache.realMap.addLayer(self.mapCache.staffLayer);

        // 添加元素响应图层
        self.mapCache.realMap.addOverlay(self.mapCache.popup);
        self.mapCache.realMap.on('click', function(event) {
          let coordinate = event.coordinate;
          let feature = event.map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
            if (layer == self.mapCache.staffLayer) {
              return feature;
            }
          });
          if (feature && feature.get('type') == 'Point') {
            self.renderFeaturePopup(coordinate, feature);
          }
        });

        // 添加图层的toggle show 事件
        self.addLayerChangeListener(document.getElementById('staffLayer'), self.mapCache.staffLayer, 0);
        self.addLayerChangeListener(document.getElementById('readerLayer'), self.mapCache.readerLayer, 1);
        self.addLayerChangeListener(document.getElementById('regionLayer'), self.mapCache.regionLayer, 2);

        // 开启实时人员图层
        self.startRealStaffRender();

        // self.loadMapStaffLayer();
        self.loadMapReaderLayer();
        self.loadMapRegionLayer();
    },
    /**
     * description 地图事件、common方法模块
     */
    // 渲染popup
    renderFeaturePopup (coordinate, feature) {
      let self = this;
      let staffId = feature.get('id'),
          staffName = feature.get('name'),
          unitName = feature.get('unitName');

      let featureInfo = {
        'geo': coordinate,
        'att': {
           staffId: staffId,
           staffName: staffName,
           unitName: unitName
        }
      };

      self.setFeatureInfo(featureInfo);
      self.mapCache.popup.setPosition(coordinate);
    },
    setFeatureInfo (featureInfo) {
      let containerDiv = document.createElement('div');
      containerDiv.className = 'popup-container';

      let att = featureInfo.att;
      let table = "<table class='table table-hover table-bordered'><tr><td>员工编号</td><td>" + att.staffId + "</td></tr>"
          + "<tr><td>员工姓名</td><td>" + att.staffName + "</td>"
          + "</tr><tr><td>部门名称</td><td>" + att.unitName + "</td>"
          + "</tr></table>";
      let t_info = $(table);
      // containerDiv.innerText = '员工编号: ' + att.staffId + " 员工姓名: " + att.staffName + " 部门名称: " + att.unitName;
      $(containerDiv).append(t_info);

      this.mapCache.popupInfo.content.innerHTML = '';
      this.mapCache.popupInfo.content.appendChild(containerDiv);
      setTimeout(function() {
        $("#popup-closer").trigger('click');
      }, 3000);
    },
    setInnerText (element, text) {
        if (typeof element.textContent == "string") {
            element.textContent = text;
        } else {
            element.innerText = text;
        }
    },
    // 添加图层toggleShow监听事件
    addLayerChangeListener (element, layer, layerNo) {
      let self = this;

      if (element) {
        element.onclick = function () {
            if (element.checked) {
              layer.setVisible(true);
              self.mapCache.showlayer[layerNo] = true;
              if (layerNo == 0) {
                self.startRealStaffRender();
              }
            } else {
              self.mapCache.popupInfo.content.innerHTML = '';
              self.mapCache.popup.setPosition(undefined);
              layer.setVisible(false);
              self.mapCache.showlayer[layerNo] = false;
            }
        };
      }
    },
    // 生产Feature
    createFeature (geometry, properties) {
      let feature = {
        "type": "Feature",
        "geometry": geometry,
        "properties": properties
      };
      return feature;
    },
    // 生产FeatureCollection
    createFeatureCollection (features) {
      let featureCollection = {
        "type": "FeatureCollection",
        "features": features
      };
      return featureCollection;
    },
    /**
     * description 地图图层功能模块
     */
    doMapRealInfo () {
      // 以待后用
    },
    /**
     *  渲染人员位置图层
     */
    startRealStaffRender () {
      let self = this;

      self.startRealStaffLayer = setInterval(function() {
        self.loadMapStaffLayer();
      }, 2000);
    },
    loadMapStaffLayer () {
      let self = this;

      if (!self.mapCache.showlayer[0]) {
        clearInterval(self.startRealStaffLayer);
        return ;
      }

      axios.get('/map/realtime/staff/')
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                if (response.data.data) {
                    let data = response.data.data;

                    // 渲染人员实时位置图层
                    let staffPointList = data.staffPointList;
                    self.doMapStaffLayer(staffPointList);
                }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    doMapStaffLayer (staffPointList) {
      let self = this;

      /* 清除所有tooltip */
      $(".ol-overlay-container:not(:last)").remove();

      // 构造Features集合
      let featureList = new Array();
      staffPointList.forEach(function(staff, index) {
        let geometry = JSON.parse(staff.point),
            properties = {"type": "Point", "id": staff.staff_id, "name": staff.staff_name, "staffInfoId": staff.staff_info_id, "unitId": staff.unit_id, "unitName": staff.unit_name, "jobId": staff.job_id, "jobIconUrl": staff.job_icon_url, "distance": staff.distance, "coordinate": geometry.coordinates};

        // 装载员工pointFeature
        // geometry.coordinates[0] *= 1.00015;
        featureList.push(self.createFeature(geometry, properties));
      });

      // 构造FeatureCollection装配的数据源
      let featureCollection = self.createFeatureCollection(featureList);
      self.mapCache.staffSource = new ol.source.Vector({
        // features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
        //   dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
        //   featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
        // })
        features: new ol.format.GeoJSON().readFeatures(featureCollection)
      });
      self.mapCache.staffLayer.setSource(self.mapCache.staffSource);

      // 设置不同样式
      let staffFeatureList = self.mapCache.staffSource.getFeatures();
      staffFeatureList.forEach(function(feature, index) {
        feature.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
              src: 'static/' + feature.get('jobIconUrl'),
              scale: 0.1
            })
        }));
        self.createMeasureTooltip(feature.get('distance'), feature.get('coordinate'));
      });

      // 设置地图视图中心
      // let newPoint = JSON.parse(staffPointList[0].point);
      // let coordinates = newPoint.coordinates;
      // self.mapCache.realMap.getView().setCenter(coordinates);
    },
    createMeasureTooltip(output, coordinate) {
      let self = this;
      let measureTooltipElement, measureTooltip;

      measureTooltipElement = document.createElement('div');
      // measureTooltipElement.className = 'tooltip tooltip-measure';
      /* Begin 设置人与分站实时距离提示框 */
      measureTooltipElement.innerHTML = output + "m";
      // measureTooltipElement.style="border-top: 6px solid rgba(0, 0, 0, 0.5);border-right: 6px solid transparent;border-left: 6px solid transparent;content: '';position: absolute;bottom: -6px;margin-left: -7px;left: 50%;";
      // measureTooltipElement.style="position:relative;background:rgba(0, 0, 0, 0.5);border-radius:4px;color:white;padding:4px 8px;opacity:0.7;white-space:nowrap;";
      measureTooltip = new ol.Overlay({
          element: measureTooltipElement,
          offset: [0, -15],
          positioning: 'bottom-center'
      });
      measureTooltip.setPosition(coordinate);
      /* End 设置人与分站实时距离提示框 */
      self.mapCache.realMap.addOverlay(measureTooltip);
    },
    loadMapStaffHighLight (unitId) {
      let self = this,
          featureList = self.mapCache.staffSource.getFeatures();

      for (let i = 0; i < featureList.length; i++) {
        if (featureList[i].get('unitId') == unitId) {
          featureList[i].setStyle(self.mapCache.hightLightStyle);
        }
      }
    },
    /**
     *  渲染分站图层
     */
    loadMapReaderLayer() {
      let self = this,
          currentMap = self.mapCache.realMap;

      if (!self.mapCache.showlayer[1]) {
        return ;
      }

      axios.get('/base/map/reader/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.readerList) {
                  let readerList = data.readerList,
                      featureList = new Array(), featureCollection;

                  readerList.forEach(function(reader, index) {
                    let geometry = JSON.parse(reader.geoPoint),
                        pointFeature = self.createFeature(geometry, { "type": "Point", "id": reader.readerId});

                    featureList.push(pointFeature);
                  });

                  featureCollection = self.createFeatureCollection(featureList);
                  self.mapCache.readerSource = new ol.source.Vector({
                    // features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
                    //   dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                    //   featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                    // })
                    features: new ol.format.GeoJSON().readFeatures(featureCollection)
                  });

                  // 改变分站图层数据源
                  self.mapCache.readerLayer.setSource(self.mapCache.readerSource);
                  // currentMap.getView().setCenter(featureList[0].geometry.coordinates);
                } else { bootbox.alert("区域图层装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域图层装载失败!"); }
            });
    },
    /**
     *  渲染区域图层
     */
    loadMapRegionLayer () {
      let self = this,
          currentMap = self.mapCache.realMap;

      if (!self.mapCache.showlayer[2]) {
        return ;
      }

      axios.get('/base/map/region/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.regionList) {
                  let regionList = data.regionList,
                      featureList = new Array(), featureCollection;

                  regionList.forEach(function(region, index) {
                    let geometry = JSON.parse(region.geoPolygon);

                    featureList.push(self.createFeature(geometry, { "type": "Polygon", "id": region.regionId, "name": region.regionName }));
                  });

                  featureCollection = self.createFeatureCollection(featureList);
                  self.mapCache.regionSource = new ol.source.Vector({
                    // features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
                    //   dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                    //   featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                    // })
                    features: new ol.format.GeoJSON().readFeatures(featureCollection)
                  });

                  self.mapCache.regionLayer.setSource(self.mapCache.regionSource);
                  // console.log("----------", featureList[0].geometry.coordinates);
                  // currentMap.getView().setCenter(featureList[0].geometry.coordinates);
                } else { bootbox.alert("区域图层装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域图层装载失败!"); }
            });
    },
    /**
     * End map function module.
     * ----------------------------------------------------------------------
     */
    /* 清除查询条件内容 */
    clearSearchInfo () {
      $("input.refresh").val("");
      $("select.refresh").children('option').eq(0).prop('selected', true);
      $("input[name='staffAlarmInp']").filter(":checked").prop('checked', false);
    },
    /**
     * ----------------------------------------------------------------------
     * Start realtime count module.
     */
    /* 查询矿井基本信息 */
    loadCoalmineInfo () {
      this.$store.dispatch('findCoalmineBaseInfo');
    },
    /* 实时统计 */
    loadCountRealtimeInfo () {
      let self = this;

      this.$store.dispatch('countRealtimeInfo');
      let realAlarmList = this.realAlarm, alarmQueue = {};

      // 复原
      // for (let i in self.repeatList) {
        // self.repeatList[i] = true;
      // }
      // $("input[data-cbinput]:checkbox").prop('checked', 'checked');

      for (let i = 0; i < realAlarmList.length; i++) {
        alarmQueue[realAlarmList[i].alarm_type_id] = realAlarmList[i].alarm_file;
      }

      let cbinput = $("input[data-cbinput]:checkbox");
      for (let cb = 0; cb < cbinput.length; cb++) {
        let temp = cbinput[cb];
        self.repeatList[$(temp).attr('data-cbinput')] = $(temp).prop('checked');
      }

      for (let i in alarmQueue) {
        if (self.repeatList[i]) {
          play(i, alarmQueue[i]);
        }
      }
    },
    /* 全屏查看地图 */
    fullScreen () {
      fullscreen('map');
    },
    /* 实时统计部门员工 */
    loadUnitStaff (unitId) {
      this.unitId = unitId;

      initPagination('staffUnitPagingBox', 'staffUnitPaging');
      this.loadUnitStaffPaging(null);
    },
    loadUnitStaffPaging (page, isPaging) {
      var self = this;
      page = page ? page : 1;
      axios.get('/realtime/staff/unit/' + this.unitId + '/p/' + page)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.staffListCache.realStaffList = data.tlStaffList;
                self.staffListCache.countTotalPages = data.countTotalPages;

                if (!isPaging) {
                  $("#staffUnitPaging").page({
                    total: self.staffListCache.countTotalPages,
                    pageSize: 6,
                    prevBtnText: '上一页',
                    nextBtnText: '下一页',
                    showInfo: true,
                    infoFormat: '{start} ~ {end}条，共{total}条',
                  }).on("pageClicked", function (event, pageNumber) {
                    self.loadUnitStaffPaging(pageNumber + 1, true);
                  });
                }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /* 实时统计区域员工 */
    loadRegionStaff (region) {
      // 赋值给regionShowInfo供模态框显示信息使用
      this.regionShowInfo.regionName = region.region_name;
      this.regionShowInfo.total = region.total;
      this.regionId = region.region_id;

      initPagination('regionStaffPagingBox', 'regionStaffPaging');
      this.loadRegionStaffPaging(null);
    },
    loadRegionStaffPaging (page, isPaging) {
      let self = this;
      page = page ? page : 1;
      axios.get('/realtime/staff/region/' + this.regionId + '/p/' + page)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.staffListCache.realStaffList = data.tlStaffList;
                self.staffListCache.countTotalPages = data.countTotalPages;

                if (!isPaging) {
                  $("#regionStaffPaging").page({
                    total: self.staffListCache.countTotalPages,
                    pageSize: 6,
                    pageBtnCount: 5,
                    prevBtnText: '上一页',
                    nextBtnText: '下一页',
                    showInfo: true,
                    infoFormat: '{start} ~ {end}条，共{total}条',
                  }).on("pageClicked", function (event, pageNumber) {
                    self.loadRegionStaffPaging(pageNumber + 1, true);
                  });
                }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /* 统计撤离呼叫信息 */
    loadEvacuateInfo (region) {
      // 赋值给regionShowInfo供模态框显示信息使用
      this.regionShowInfo.regionName = region.region_name;
      this.regionShowInfo.total = region.total;
      this.regionId = region.region_id;

      initPagination('evacuateDetailPagingBox', 'evacuateDetailPaging');
      this.loadEvacuateInfoPaging(null);
    },
    loadEvacuateInfoPaging (page, isPaging) {
      let self = this;

      page = (page ? page : 1);
      axios.get('/realtime/evacuate/region/' + this.regionId + '/p/' + page)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.staffListCache.realStaffList = data.evacuationDetails;
                self.staffListCache.countTotalPages = data.countTotalPages;
                self.staffListCache.calledNum = data.calledNum;
                self.staffListCache.callCount = data.callCount;

                if (!isPaging) {
                  $("#evacuateDetailPaging").page({
                    total: self.staffListCache.countTotalPages,
                    pageSize: 6,
                    pageBtnCount: 5,
                    prevBtnText: '上一页',
                    nextBtnText: '下一页',
                    showInfo: true,
                    infoFormat: '{start} ~ {end}条，共{total}条',
                  }).on("pageClicked", function (event, pageNumber) {
                    self.loadEvacuateInfoPaging(pageNumber + 1, true);
                  });
                }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /* 实时查询报警信息 */
    filterAlarmHandler (alarmInHandle) {
      return alarmInHandle ? '已处理' : '未处理';
    },
    checkLoadAlarmType (alarmTypeId) {
      let self = this;

      self.alarmTypeId = alarmTypeId;

      let parent = self.alarmBox[alarmTypeId].parent,
          child = self.alarmBox[alarmTypeId].child;

      initPagination(parent, child);
      self.loadAlarmInfo();
    },
    // 员工呼叫报警信息
    loadAlarmInfo () {
      this.loadAlarmInfoPaging(null);
    },
    loadAlarmInfoPaging (page, isPaging) {
      let self = this;

      page = page || 1;
      axios.get('/realtime/alarm/' + self.alarmTypeId + '/p/' + page)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.alarmListCache.alarmResultList = data.alarmResult;
                self.alarmListCache.total = data.total;

                if (!isPaging) {
                  let pagingContainer = self.alarmBox[self.alarmTypeId].child;
                  $("#" + pagingContainer).page({
                    total: self.alarmListCache.total,
                    pageSize: 6,
                    pageBtnCount: 5,
                    prevBtnText: '上一页',
                    nextBtnText: '下一页',
                    showInfo: true,
                    infoFormat: '{start} ~ {end}条，共{total}条',
                  }).on("pageClicked", function (event, pageNumber) {
                    self.loadAlarmInfoPaging(pageNumber + 1, true);
                  });
                }
              } else { bootbox.alert({ message: meta.message }); }
            });
    },
    doHandleStaffAlarm () {
      let self = this;
      let alarmIdArr = [], params = {};

      if ($("input[name='staffAlarmInp']").filter(":checked").length <= 0) {
        bootbox.alert({
          message: '请先选择至少一个员工呼叫,再进行操作!'
        });
        return;
      }

      $("input[name='staffAlarmInp']:checkbox:checked").each(function(index, alarm) {
        alarmIdArr.push($(alarm).val());
      });

      params.alarmIdArr = alarmIdArr;
      axios.post('/staff/alarm', $.param(params))
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                bootbox.alert("员工呼叫处理成功!");
              } else {
                bootbox.alert("员工呼叫处理失败!");
              }
              $("input[name='staffAlarmInp']").filter(":checked").prop('checked', false);
              $("#staff_call_alarm_modal").modal('hide');
            });
    },
    /**
     * ----------------------------------------------------------------------
     * End realtime count module.
     */
    /* 撤离呼叫 */
    loadRegionCount () {
      initPagination('regionCountPagingBox', 'regionCountPaging');
      this.loadRegionCountPaging(null);
    },
    loadRegionCountPaging (page, isPaging) {
      let self = this;
      page = page || 1;
      axios.get('/base/region/count/' + '/p/' + page)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                 self.staffListCache.realStaffList = data.realStaffByRegion;
                 self.staffListCache.countTotalPages = data.countTotalPages;

                 if (!isPaging) {
                   $("#regionCountPaging").page({
                     total: self.staffListCache.countTotalPages,
                     pageSize: 6,
                     prevBtnText: '上一页',
                     nextBtnText: '下一页',
                     showInfo: true,
                     infoFormat: '{start} ~ {end}条，共{total}条',
                   }).on("pageClicked", function (event, pageNumber) {
                     self.loadRegionCountPaging(pageNumber + 1, true);
                   });
                 }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    insertEvacuateCallInfo () {
      let regionIdArr = [];

      if ($("input[name='region']").filter(":checked").length <= 0) {
        bootbox.alert({
          message: '请先选择至少一个区域,再进行呼叫操作!'
        });
        return;
      }
      $("input[name='region']").filter(":checked").each(function() {
        regionIdArr.push($(this).val());
      });


      this.$store.dispatch('insertEvacuateCallInfo', regionIdArr);
    },
    /* 回电呼叫 */
    loadUnitList () {
      let self = this;

      self.unitList = [];
      axios.get('/base/unit/')
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.unitList = data.unitList;
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    loadCallbackInfo () {
      initPagination('callbackPagingBox', 'callbackPaging');
      this.loadCallbackInfoPaging(null);
    },
    loadCallbackInfoPaging (page, isPaging) {
      let self = this;
      let params = {};
      page = page || 1;

      params.unitId = $('#unitSelectVal').find('option:selected').val();
      params.staffName = $("#staffNameVal").val();

      // console.log("params: ", params);
      // test unitId: , staffName: hss
      // params.unitId = 16,
      // params.staffName = 'hss';
      axios.get('/base/staff/count/p/' + page, { params: params})
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.staffListCache.realStaffList = data.realStaffByCondition;
                self.staffListCache.countTotalPages = data.countTotalPages;

                if (!isPaging) {
                  $("#callbackPaging").page({
                    total: self.staffListCache.countTotalPages,
                    pageSize: 6,
                    prevBtnText: '上一页',
                    nextBtnText: '下一页',
                    showInfo: true,
                    infoFormat: '{start} ~ {end}条，共{total}条',
                  }).on("pageClicked", function (event, pageNumber) {
                    self.loadCallbackInfoPaging(pageNumber + 1, true);
                  });
                }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    insertCallbackStaffInfo () {
      let staffIdArr = [];

      if ($("input[name='staff']").filter(":checked").length <= 0) {
        bootbox.alert({
          message: '请先选择至少一个员工,再进行回电呼叫操作!'
        });
        return;
      }

      $("input[name='staff']").filter(":checked").each(function() {
        staffIdArr.push($(this).val());
      });

      this.$store.dispatch('insertCallbackStaffInfo', staffIdArr);
    }
  }
}
</script>
<style scoped>
@import "../../../node_modules/openlayers/dist/ol.css";

#main {
  width: 100%;
  min-height: 700px;
  overflow: hidden;
  zoom: 1;
}

main {
  overflow: hidden;
  zoom: 1;
}

.main-left {
  width: 77%;
  min-height: 700px;
  margin-right: 1%;
}

.btn-box {
  overflow: hidden;
}

.btn-box span {
  display: inline-block;
  height: 34px;
  vertical-align: middle;
  padding: 6px 6px 6px 0;
}

#map {
  width: 100%;
  height: 100%;
  min-height: 600px;
}

/* Start popup style */
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after, .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
/* End popup style */

.main-right {
  width: 22%;
  min-height: 700px;
}

.wrap-info .label-line-right {
  color: red;
  font-weight: 400;
}

.label-line-right a {
  margin-right: 25px;
  color: red;
  text-decoration: none;
}

.label-line-right a:hover {
  background-color: white;
  color: #70B9B0;
}
</style>
