<template>
  <div id="main" class="main-container">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">首页</li>
      </ol>
    </div>
    <main>
      <div class="main-left fl content-box">
        <div class="btn-box">
          <div class="fl">
            <button type="button" @click="loadRegionCount(null)" class="btn btn-primary" data-toggle="modal" data-target="#evacuate_modal">撤离呼叫</button>
            <button type="button" @click="loadCallbackInfo(null, null)" class="btn btn-primary" data-toggle="modal" data-target="#callback_modal">回电呼叫</button>
          </div>
          <div class="fr">
            <button type="button" @click="fullScreen()" class="btn btn-primary fr" title="地图全屏查看">
              <i class="glyphicon glyphicon-fullscreen"></i>&nbsp;全屏查看
            </button>
            <div class="input-group fr">
              <select class="">
                <option value="">-请选择工具-</option>
                <option value="">标注</option>
                <option value="">移动</option>
              </select>
            </div>
            <div class="fr">
                <div class="input-group">
                  <span>图层:</span>
                  <input type="checkbox" /><span>人员位置&nbsp;&nbsp;</span>
                  <input type="checkbox" /><span style="margin-right: 25px;">分站</span>
                </div>
            </div>
          </div>
        </div>
        <div class="map-box">
          <div id="map"></div>
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
              <a href="javascript:void(0)" @click="" title="地图显示人员信息"><i class="glyphicon glyphicon-globe"></i></a>
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
              <a href="javascript:void(0)" @click="loadAlarmInfo(alarm.alarm_type_id)" data-toggle="modal" :data-target="alarmTypes[alarm.alarm_name]" title="查看报警详情"><i class="glyphicon glyphicon-bullhorn"></i>&nbsp;{{ alarm.total }}条</a>
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
              <div class="modal-search-bar">
                  <div class="ms-bar-select">
                    <select class="form-control">
                      <option value="">- 请选择区域 -</option>
                      <template v-if="regionCall.realStaffByRegion != null" v-for="(region, index) in regionCall.realStaffByRegion">
                        <option value="region.region_id">{{ region.region_name }}</option>
                      </template>
                    </select>
                  </div>
              </div>
              <div class="hr"></div>
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
                    <tr v-if="regionCall.realStaffByRegion != null" v-for="(region, index) in regionCall.realStaffByRegion" :key="region.key">
                      <td><input type="checkbox" :value="region.region_id" name="region"/></td>
                      <td>{{ region.region_name }}</td>
                      <td>{{ region.total }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box">
                  <!-- <ul class="pagination"> -->
                    <!-- <template v-for="page in regionCall.countTotalPages">
                      <li><a href="javascript:void(0)" @click="loadRegionCount(page)">{{ page }}</a></li>
                    </template> -->
                    <!-- <paginate
                      :pageCount="pagination.pageCount"
                      :pageRange="pagination.pageRange"
                      :currentPage="currentPage"
                      :clickHandler="loadRegionCount"
                      :prevText="pagination.prevText"
                      :nextText="pagination.nextText"
                      :containerClass="pagination.containerClass"></paginate> -->
                    <div id="regionCountPaging">

                    </div>
                  <!-- </ul> -->
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
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">回电呼叫</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box outside-box">
              <div class="modal-search-bar">
                <div class="ms-bar-select fl">
                  <select class="form-control refresh">
                    <option value="">- 请选择部门 -</option>
                    <option v-if="unitList != null" v-for="(unit, index) in unitList" :key="unit.key" :value="unit.unit_id">{{ unit.unit_name }}</option>
                  </select>
                </div>
                <div class="input-group ms-bar-input fl">
                    <span class="input-group-addon">员工姓名</span>
                    <input type="text" class="form-control refresh" />
                </div>
                <div class="btn-group input-group ms-bar-button fr">
                  <button type="button" @click="clearSearchInfo()" class="btn btn-default"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
                  <button type="button" @click="loadCallbackInfo(null, null)" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
                </div>
              </div>
              <div class="gray-hr"></div>
              <div class="btn-box">
                <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-phone-alt"></i>&nbsp;呼叫</button>
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
                    <tr v-if="" v-for="elem in elemArray" :key="elem.key">
                      <td><input type="checkbox" name="staff" /></td>
                      <td>掘进1队</td>
                      <td>张三</td>
                      <td>掘进工</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box">
                  <paginate
                    :pageCount="pagination.pageCount"
                    :pageRange="pagination.pageRange"
                    :initialPage="pagination.initialPage"
                    :clickHandler="loadRegionCount"
                    :prevText="pagination.prevText"
                    :nextText="pagination.nextText"
                    :containerClass="pagination.containerClass"></paginate>
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
                    <tr v-if="staffReal.tlStaffList != null" v-for="(staff, index) in staffReal.tlStaffList" :key="staff.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ staff.staffName }}</td>
                      <td>{{ staff.enteringDate }}</td>
                      <td>{{ staff.readerName }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box">
                  <!-- <ul class="pagination">
                      <template v-for="page in staffReal.countTotalPages">
                        <li><a href="javascript: void(0)" @click="loadUnitStaff(null, page)">{{ page }}</a></li>
                      </template>
                  </ul> -->
                  <paginate
                    :pageCount="pagination.pageCount"
                    :pageRange="pagination.pageRange"
                    :initialPage="pagination.initialPage"
                    :clickHandler="loadUnitStaffPaging"
                    :prevText="pagination.prevText"
                    :nextText="pagination.nextText"
                    :containerClass="pagination.containerClass"></paginate>
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
                    <tr v-if="staffReal.tlStaffList != null" v-for="(staff, index) in staffReal.tlStaffList" :key="staff.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ staff.staffName }}</td>
                      <td>{{ staff.enteringDate }}</td>
                      <td>{{ staff.jobName }}</td>
                      <td>{{ staff.unitName }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box">
                  <!-- <ul class="pagination">
                    <template v-for="page in staffReal.countTotalPages">
                      <li><a href="javascript: void(0)" @click="loadRegionStaff(null, page)">{{ page }}</a></li>
                    </template>
                  </ul> -->
                  <paginate
                    :pageCount="pagination.pageCount"
                    :pageRange="pagination.pageRange"
                    :clickHandler="loadRegionStaffPaging"
                    :prevText="pagination.prevText"
                    :nextText="pagination.nextText"
                    :containerClass="pagination.containerClass"
                    ref="curr_page"
                    ></paginate>
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
                <div class="s-group-right">{{ staffReal.calledNum }}人</div>
              </div>
              <div class="show-info-group clear-radius-top">
                <div class="s-group-left">呼叫人次</div>
                <div class="s-group-right">{{ staffReal.callCount }}人次</div>
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
                    <tr v-for="(evacuate, index) in staffReal.evacuationDetails" :key="evacuate.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ evacuate.staffName }}</td>
                      <td>{{ evacuate.enteringTime }}</td>
                      <td>{{ evacuate.jobName }}</td>
                      <td>{{ evacuate.unitName }}</td>
                      <td>{{ status[evacuate.callStatus] }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box">
                  <!-- <ul class="pagination">
                    <template v-for="page in staffReal.countTotalPages">
                      <li><a href="javascript: void(0)" @click="loadEvacuateInfo(null, page)">{{ page }}</a></li>
                    </template>
                  </ul> -->
                  <paginate
                    :pageCount="pagination.pageCount"
                    :pageRange="pagination.pageRange"
                    :initialPage="pagination.initialPage"
                    :clickHandler="loadEvacuateInfoPaging"
                    :prevText="pagination.prevText"
                    :nextText="pagination.nextText"
                    :containerClass="pagination.containerClass"></paginate>
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
                    <tr>
                      <td>001</td>
                      <td>张三</td>
                      <td>8:20</td>
                      <td>A工作面</td>
                    </tr>
                    <tr>
                      <td>002</td>
                      <td>李四</td>
                      <td>8:20</td>
                      <td>B工作面</td>
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A工作面</td>
                      <td>15</td>
                      <td>16</td>
                    </tr>
                    <tr>
                      <td>B工作面</td>
                      <td>16</td>
                      <td>17</td>
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
                      <th>-</th>
                      <th>-</th>
                      <th>-</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
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
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>呼叫员工</th>
                      <th>所在区域名称</th>
                      <th>呼叫时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="staffAlarm != null" v-for="(staff, index) in staffAlarm.staffAlarmList" :key="staff.key">
                      <td>{{ staff.staffName }}</td>
                      <td>{{ staff.readerId }}</td>
                      <td>{{ staff.alarmStartTime }}</td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box">
                  <!-- <ul class="pagination">
                    <template v-for="page in staffAlarm.countTotalPages">
                      <li><a href="javascript: void(0)" @click="loadAlarmInfo(null, page)">{{ page }}</a></li>
                    </template>
                  </ul> -->
                  <paginate
                    :pageCount="pagination.pageCount"
                    :pageRange="pagination.pageRange"
                    :initialPage="pagination.initialPage"
                    :clickHandler="loadAlarmInfoPaging"
                    :prevText="pagination.prevText"
                    :nextText="pagination.nextText"
                    :containerClass="pagination.containerClass"></paginate>
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

  </div>
</template>
<script>
import ol from 'openlayers/dist/ol';
import { mapGetters } from 'vuex';
import bootbox from 'bootbox/bootbox.min';

export default {
  name: "main",
  data() {
    return {
      alarmTypes: {
        '超时报警': '#overtime_alarm_modal',
        '超员报警': '#overman_alarm_modal',
        '限制区域报警': '#region_limit_alarm_modal',
        '呼叫报警': '#staff_call_alarm_modal'
      },
      status: ['未呼叫', '已呼叫'],
      unitId: '',
      regionId: '',
      regionShowInfo: {
        regionoName: '',
        total: 0
      },
      alarmTypeId: '',
      regionCallCache: {
        index: 0,
        cacheStaffList: [],
        total: 1
      }
    };
  },
  mounted () {
    this.initEvent();
    this.loadMap();
    this.loadCoalmineInfo();
    this.loadCountRealtimeInfo();
  },
  computed: {
    ...mapGetters(['coalmineInfo', 'realUnit', 'staffReal', 'realRegion', 'realAlarm', 'staffAlarm', 'regionCall', 'pagination'])
  },
  methods: {
    initEvent () {
      $(".modal").on('shown.bs.modal', () => {

      });
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
    loadCoalmineInfo () {
      this.$store.dispatch('findCoalmineBaseInfo');
    },
    loadCountRealtimeInfo () {
      this.$store.dispatch('countRealtimeInfo');
    },
    fullScreen () {
      var invokeFieldOrMethod = function(element, method) {
        var usablePrefixMethod;
        ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
         if (usablePrefixMethod) return;
         if (prefix === "") {
             // 无前缀，方法首字母小写
             method = method.slice(0,1).toLowerCase() + method.slice(1);
         }
         var typePrefixMethod = typeof element[prefix + method];
         if (typePrefixMethod + "" !== "undefined") {
             if (typePrefixMethod === "function") {
                 usablePrefixMethod = element[prefix + method]();
             } else {
                 usablePrefixMethod = element[prefix + method];
             }
         }
     });
       return usablePrefixMethod;
     };

     //进入全屏
     function launchFullscreen(element) {
        //此方法不可以在異步任務中執行，否則火狐無法全屏
         if(element.requestFullscreen) {
           element.requestFullscreen();
         } else if(element.mozRequestFullScreen) {
           element.mozRequestFullScreen();
         } else if(element.msRequestFullscreen){
           element.msRequestFullscreen();
         } else if(element.oRequestFullscreen){
            element.oRequestFullscreen();
        }
        else if(element.webkitRequestFullscreen)
         {
           element.webkitRequestFullScreen();
         }else{

            var docHtml  = document.documentElement;
            var docBody  = document.body;
            var videobox  = document.getElementById('map');
            var  cssText = 'width:100%;height:100%;overflow:hidden;';
            docHtml.style.cssText = cssText;
            docBody.style.cssText = cssText;
            videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
            document.IsFullScreen = true;

          }
       }
        //退出全屏
       function exitFullscreen() {
           if (document.exitFullscreen) {
              document.exitFullscreen();
           } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
           } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
           } else if(document.oRequestFullscreen){
              document.oCancelFullScreen();
            }else if (document.webkitExitFullscreen){
              document.webkitExitFullscreen();
           }else{
              var docHtml  = document.documentElement;
              var docBody  = document.body;
              var videobox  = document.getElementById('map');
              docHtml.style.cssText = "";
              docBody.style.cssText = "";
              videobox.style.cssText = "";
              document.IsFullScreen = false;
           }
      }
      // document.getElementById('fullScreenBtn').addEventListener('click',function(){
          launchFullscreen(document.getElementById('map'));
          // window.setTimeout(function exit(){
              if(invokeFieldOrMethod(document,'FullScreen')
                  || invokeFieldOrMethod(document,'IsFullScreen')
                  || document.IsFullScreen) {
                    exitFullscreen();
              }
          // },5*1000);
      // },false);
    },
    loadUnitStaff (unitId) {
      this.unitId = unitId;
      this.$store.dispatch('findUnitStaffByUnitId', { 'unitId' : unitId, 'page' : null });
    },
    loadUnitStaffPaging (page) {
      this.$store.dispatch('findUnitStaffByUnitId', { 'unitId' : this.unitId, 'page' : page });
    },
    loadRegionStaff (region) {
      // 赋值给regionShowInfo供模态框显示信息使用
      this.regionShowInfo.regionName = region.region_name;
      this.regionShowInfo.total = region.total;
      this.regionId = region.region_id;

      this.$store.dispatch('findRegionStaffByRegionId', { 'regionId' : region.region_id, 'page' : null });
    },
    loadRegionStaffPaging (page) {
      this.$store.dispatch('findRegionStaffByRegionId', { 'regionId' : this.regionId, 'page' : page });
    },
    loadEvacuateInfo (region) {
      // 赋值给regionShowInfo供模态框显示信息使用
      this.regionShowInfo.regionName = region.region_name;
      this.regionShowInfo.total = region.total;
      this.regionId = region.region_id;

      this.$store.dispatch('findEvacuateStaffByRegionId', { 'regionId' : region.region_id, 'page' : null });
    },
    loadEvacuateInfoPaging (page) {
      this.$store.dispatch('findEvacuateStaffByRegionId', { 'regionId' : this.regionId, 'page' : page });
    },
    loadAlarmInfo (alarmTypeId) {
      this.alarmTypeId = alarmTypeId;
      this.$store.dispatch('findAlarmBaseInfo', { 'alarm_type_id' : alarmTypeId, 'page' : null });
    },
    loadAlarmInfoPaging (page) {
      this.$store.dispatch('findAlarmBaseInfo', { 'alarm_type_id' : this.alarmTypeId, 'page' : page });
    },
    loadRegionCount (page) {
      // this.doLoadRegionCount(page);
      page = page || 1;
      axios.get('/base/region/count/' + '/p/' + page)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                // data.realStaffByRegion;
                // data.countTotalPages;

                var that = this;
                laypage({
                  cont: $('#regionCountPaging'),
                  pages: 11,
                  skin: '#337AB7',
                  curr: page || 1,
                  last: 11,
                  prev: '<<',
                  next: '>>',
                  jump: function(obj, first) {
                    if (!first) {
                      that.loadRegionCount(obj.curr);
                    }
                  }
                });
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    doLoadRegionCount (page) {
      page = page ? page : 1;
      this.$store.dispatch('countRegionInfo', page);
    },
    insertEvacuateCallInfo () {
      let regionIdArr = [];

      $("input[name='region']").filter(":checked").each(function() {
        regionIdArr.push($(this).val());
      });

      this.$store.dispatch('insertEvacuateCallInfo', regionIdArr);
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
  width: 75%;
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

.main-right {
  width: 24%;
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
