<template lang="html">
  <div class="schedule">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">人员管理</li>
        <li><router-link to="/Job">班次管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box" style="margin-bottom: 0;">
        <h3>班次管理</h3>
      </div>
      <div class="table-box outside-box" style="margin-top: 5px;">
        <div class="table-box-left fl">
          <div class="title-box content-box">
            <h5>班制列表</h5>
          </div>
          <ul id="scheduleTree" class="ztree"></ul>
        </div>
        <div class="table-box-right outside-box fr">
          <div class="table-box data-box">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>班制</th>
                  <th>是否启用</th>
                  <th>倒班周期</th>
                  <th>倒班顺序</th>
                  <th>超时时长</th>
                  <th>最大井下累计时长</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="selectedSchedule != null">
                  <td>{{ selectedSchedule.dutyName }}</td>
                  <td>{{ selectedSchedule.isUse }}</td>
                  <td>{{ selectedSchedule.shiftCircle }}</td>
                  <td>{{ selectedSchedule.shiftOrder }}</td>
                  <td>{{ selectedSchedule.overtimeValue }}</td>
                  <td>{{ selectedSchedule.mostTimeValue }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="btn-box" style="margin-bottom: 0;">
            <div class="fl">
              <button type="button" class="btn btn-primary" @click="checkAddSchedule()">添加班次</button>
              <button type="button" class="btn btn-primary" @click="checkType('UPDATE_SCHEDULE')">修改班次</button>
              <button type="button" class="btn btn-primary" @click="checkType('DELETE_SCHEDULE')">删除班次</button>
              <button type="button" class="btn btn-primary" @click="checkType('ARRANGE_UNIT')">排班</button>
            </div>
          </div>
          <div class="table-box data-box">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>选择</th>
                  <th>序号</th>
                  <th>班次</th>
                  <th>上班时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(schedule, index) in scheduleListCache.scheduleList" :key="schedule.key">
                  <td><input type="radio" name="schedule" :value="schedule.dutyId" /></td>
                  <td>{{ index + 1 }}</td>
                  <td>{{ schedule.dutyName }}</td>
                  <td>{{ filterScheduleTime(schedule) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- 添加班制模态框 -->
    <div class="modal fade" id="add_schedule_method_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加班次制式信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">班次制式</div>
                <div class="group-right">
                  <input class="form-control" type="text" name="" v-model="schedule.dutyName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                  <input id="inUseInp" style="margin-left: 20%;" checked="checked" type="radio" name="use" value="1">
                  <label for="inUseInp">启用</label>
                  <input id="useInp" style="margin-left: 20%;" type="radio" name="use" value="0">
                  <label for="useInp">禁用</label>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">倒班周期</div>
                <div class="group-right">
                  <input id="oneChangeDutyInp" style="margin-left: 20%;" checked="checked" type="radio" name="changeDuty" value="1">
                  <label for="oneChangeDutyInp">1天</label>
                  <input id="weekChangeDuty" style="margin-left: 20%;" type="radio" name="changeDuty" value="0">
                  <label for="weekChangeDuty">1周</label>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">倒班顺序</div>
                <div class="group-right">
                  <input id="wiseChangeOrderInp" style="margin-left: 20%;" checked="checked" type="radio" name="changeOrder" value="1">
                  <label for="wiseChangeOrderInp">正版倒</label>
                  <input id="rewiseChangeOrderInp" style="margin-left: 20%;" type="radio" name="changeOrder" value="0">
                  <label for="rewiseChangeOrderInp">反班倒</label>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">超时时长</div>
                <div class="group-right">
                  <input id="overtimeLenInp" class="form-control" type="text" name="" placeholder="请选择超时时长" readonly="readonly" v-model="schedule.overtimeValue">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">最大井下累计时长</div>
                <div class="group-right">
                  <input id="maxtimeLenInp" class="form-control" type="text" name="" placeholder="请选择最大井下累计时长" readonly="readonly" v-model="schedule.mostTimeValue">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addScheduleMethod()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改班制模态框 -->
    <div class="modal fade" id="update_schedule_method_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改班次制式信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">班次制式</div>
                <div class="group-right">
                  <input id="updateDutyName" class="form-control" type="text" name="" v-model="schedule.dutyName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                  <input id="inUseInp2" style="margin-left: 20%;" checked="checked" type="radio" name="use2" value="1">
                  <label for="inUseInp2">启用</label>
                  <input id="useInp2" style="margin-left: 20%;" type="radio" name="use2" value="0">
                  <label for="useInp2">禁用</label>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">倒班周期</div>
                <div class="group-right">
                  <input id="oneChangeDutyInp2" style="margin-left: 20%;" checked="checked" type="radio" name="changeDuty2" value="1">
                  <label for="oneChangeDutyInp2">1天</label>
                  <input id="weekChangeDuty2" style="margin-left: 20%;" type="radio" name="changeDuty2" value="0">
                  <label for="weekChangeDuty2">1周</label>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">倒班顺序</div>
                <div class="group-right">
                  <input id="wiseChangeOrderInp2" style="margin-left: 20%;" checked="checked" type="radio" name="changeOrder2" value="1">
                  <label for="wiseChangeOrderInp2">正版倒</label>
                  <input id="rewiseChangeOrderInp2" style="margin-left: 20%;" type="radio" name="changeOrder2" value="0">
                  <label for="rewiseChangeOrderInp2">反班倒</label>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">超时时长</div>
                <div class="group-right">
                  <input id="overtimeLenInp2" class="form-control" type="text" name="" placeholder="请选择超时时长" readonly="readonly" v-model="schedule.overtimeValue">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">最大井下累计时长</div>
                <div class="group-right">
                  <input id="maxtimeLenInp2" class="form-control" type="text" name="" placeholder="请选择最大井下累计时长" readonly="readonly" v-model="schedule.mostTimeValue">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateScheduleMethod()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加班次模态框 -->
    <div class="modal fade" id="add_schedule_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加班次信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">班次名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="schedule.dutyName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上班时间</div>
                <div class="group-right">
                  <input id="scheduleDateStart" class="form-control refresh fl" style="width: 50%;" type="text" name="" placeholder="请选择班次开始时间" readonly="readonly" v-model="schedule.scheduleTime">
                  <input id="scheduleDateEnd" class="form-control refresh fr" style="width: 50%;" type="text" name="" placeholder="请选择班次结束时间" readonly="readonly" v-model="schedule.scheduleTime">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addSchedule()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改班次模态框 -->
    <div class="modal fade" id="update_schedule_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改班次信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">班制编号</div>
                <div class="group-right">
                  <input class="form-control" type="text" name="" readonly="readonly" v-model="schedule.upDutyId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">班次编号</div>
                <div class="group-right">
                  <input class="form-control" type="text" name="" readonly="readonly" v-model="schedule.dutyId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">班次名称</div>
                <div class="group-right">
                  <input class="form-control" type="text" name="" v-model="schedule.dutyName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上班时间</div>
                <div class="group-right">
                  <input id="scheduleDateS" class="form-control fl" style="width: 50%;" type="text" name="" placeholder="请选择班次开始时间" readonly="readonly" v-model="schedule.startTime">
                  <input id="scheduleDateE" class="form-control fr" style="width: 50%;" type="text" name="" placeholder="请选择班次结束时间" readonly="readonly" v-model="schedule.endTime">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateSchedule()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 排班模态框 -->
    <div class="modal fade" id="arrange_work_unit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">排班</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <ul id="unitTree" class="ztree"></ul>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jeDate from '../../assets/script/jedate/jquery.jedate.min';
import bootbox from 'bootbox/bootbox.min';
import axios from 'axios';
import ztree from '../../assets/script/ztree/jquery.ztree.core.min';
import exedit from '../../assets/script/ztree/jquery.ztree.exedit.min';
import { deepCopy } from '../../assets/script/extends';

export default {
  name: 'schedule',
  data () {
    return {
      treeSetting: {
        edit: {
          enable: true,
          showRenameBtn: this.showRenameBtn,
          showRemoveBtn: false,
          renameTitle: "修改班次制式信息",
        },
        view: {
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom
        },
        callback: {
          onClick: this.zTreeOnClick,
          beforeEditName: this.beforeEditName
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "dutyId",
            pIdKey: "upDutyId",
            rootPId: 0
          },
          key: {
            name: 'dutyName'
          }
        }
      },
      unitTreeSetting: {
        // callback: {
        //   onClick: this.zTreeOnClick
        // },
        data: {
          simpleData: {
            enable: true,
            idKey: "unitId",
            pIdKey: "upUnitId",
            rootPId: 0
          },
          key: {
            name: 'unitName'
          }
        }
      },
      scheduleList: [],
      scheduleListCache: {
        scheduleList: [],
        total: 0
      },
      schedule: {},
      scheduleId: '',
      selectedSchedule: {}
    };
  },
  mounted () {
    this.initEvent();
    this.defaultLoadScheduleTree();
  },
  methods: {
    initEvent () {
      let self = this;

      $("#scheduleDateStart, #scheduleDateEnd, #scheduleDateS, #scheduleDateE, #overtimeLenInp, #maxtimeLenInp, #overtimeLenInp2, #maxtimeLenInp2").jeDate({
        format: "hh:mm:ss",
        isTime: true,
        isinitVal: false,
      });

      $("#add_schedule_modal").on('show.bs.modal', function() {
        let upDutyId = self.schedule.upDutyId;

        self.schedule = {};
        self.schedule.upDutyId = upDutyId;
      });

      $("#arrange_work_unit_modal").on('show.bs.modal', function() {
        axios.get('/base/unit/unittree')
              .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.unitList) {
                    // 部门树数据配置
                    let unitList = data.unitList;
                    let zNodes = unitList;
                    zNodes[0].open = true;

                    // 初始化部门树
                    $.fn.zTree.init($("#unitTree"), self.unitTreeSetting, zNodes);
                  }
                }
              });
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    // 默认装载班制树
    defaultLoadScheduleTree () {
      let self = this;

      axios.get('/base/schedule/tree/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.scheduleList) {
                  // 部门树数据配置
                  let scheduleList = data.scheduleList;
                  let zNodes = scheduleList;
                  zNodes[0].open = true;

                  // 初始化部门树
                  $.fn.zTree.init($("#scheduleTree"), self.treeSetting, zNodes);
                }
              }
            });
    },
    /**
     * Start click tree node to load different table data.
     * description 点击班制树结点的事件
     */
    zTreeOnClick (event, treeId, treeNode) {
      let self = this,
          upDutyId = treeNode.dutyId;
      if (upDutyId != 1) {
        self.schedule.upDutyId = upDutyId;
        self.loadScheduleList(upDutyId);

        axios.get('/base/schedule/' + treeNode.dutyId)
              .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.schedule) {
                    self.selectedSchedule = data.schedule;
                  } else { bootbox.alert("班次制式信息装载失败!"); }
                } else { bootbox.alert("服务器内部错误,班次制式信息装载失败!"); }
              });
      }
    },
    /**
     * End click tree node to load  different table data.
     */
    addHoverDom (treeId, treeNode) {
      let self = this;

      if (treeNode.dutyId != 1) {
        return ;
      }

      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) { return; }
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='添加班次制式' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_" + treeNode.tId);
      if (btn) {
        btn.bind("click", function() {
          let zTree = $.fn.zTree.getZTreeObj("scheduleTree");
          zTree.selectNode(treeNode);

          $("#add_schedule_method_modal").modal('show');
        });
      }
    },
    removeHoverDom (treeId, treeNode) {
      $("#addBtn_" + treeNode.tId).unbind().remove();
    },
    showRenameBtn (treeId, treeNode) {
      let parentNode = treeNode.getParentNode();
      if (parentNode &&  parentNode.dutyId == 1) {
        return true;
      } else {
        return false;
      }
    },
    beforeEditName (treeId, treeNode) {
      let self = this;

      if (treeNode.dutyId != 1) {
        axios.get('/base/schedule/' + treeNode.dutyId)
              .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.schedule) {
                    self.schedule = data.schedule;

                    $("input[name='use2']:radio").each(function(index, value) {
                      if (this.value == self.schedule.isUse) {
                        this.checked = true;
                      }
                    });
                    $("input[name='changeDuty2']:radio").each(function(index, value) {
                      if (this.value == self.schedule.shiftCircle) {
                        this.checked = true;
                      }
                    });
                    $("input[name='changeOrder2']:radio").each(function(index, value) {
                      if (this.value == self.schedule.shiftOrder) {
                        this.checked = true;
                      }
                    });

                    $("#update_schedule_method_modal").modal('show');
                  } else { bootbox.alert("信息装载失败!"); }
                } else { bootbox.alert("服务器内部错误,信息装载失败!"); }
              });
      }
    },
    /**
     * End unit tree operation.
     * description 部门数操作
     */
    /**
     * Start schedule manage module.
     */
    filterScheduleTime (schedule) {
      return schedule.startTime + " ~ " + schedule.endTime;
    },
    refreshOper () {
      let self = this;
      $("input[name='schedule']:radio:checked").prop('checked', false);

      self.loadScheduleList();
      self.defaultLoadScheduleTree();
      self.schedule = {};
      self.selectedSchedule = {};
    },
    loadScheduleList (upDutyId) {
      let self = this;

      upDutyId = upDutyId || self.schedule.upDutyId;
      axios.get('/base/schedule/u/' + upDutyId)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.scheduleList) {
                  self.scheduleListCache.scheduleList = data.scheduleList;
                  self.scheduleListCache.total = data.total;
                }
              } else { bootbox.alert("服务器内部错误,班次信息加载失败!"); }
            });
    },
    checkAddSchedule () {
      let self = this;

      if (self.schedule.upDutyId) {
          $("#add_schedule_modal").modal('show');
      } else {
        bootbox.alert("请先选择一个班次制式,再进行操作!")
        return false;
      }
    },
    checkType (type) {
      let self = this,
          selectedSchedule = $("input[name='schedule']:radio:checked"),
          dutyId = selectedSchedule.val();

      if (selectedSchedule.length < 1) {
        bootbox.alert("请先选择一条记录,再进行操作!");
        return false;
      } else {
        let scheduleList = self.scheduleListCache.scheduleList;

        for (let i = 0; i < scheduleList.length; i++) {
          if (dutyId == scheduleList[i].dutyId) {
            self.schedule = deepCopy(scheduleList[i]);
            delete self.schedule.uber;
            delete self.schedule.children;

            break;
          }
        }

        if (type == 'UPDATE_SCHEDULE') {
          $("#update_schedule_modal").modal('show');
        } else if (type == 'DELETE_SCHEDULE') {
          self.deleteSchedule(dutyId);
        } else if (type == 'ARRANGE_UNIT') {
          $("#arrange_work_unit_modal").modal('show');
        }
      }
    },
   // 添加班次制式
   addScheduleMethod () {
     let self = this;

     self.schedule.isUse = $("input[name='use']:radio:checked").val();
     self.schedule.shiftCircle = $("input[name='changeDuty']:radio:checked").val();
     self.schedule.shiftOrder = $("input[name='changeOrder']:radio:checked").val();
     self.schedule.overtimeValue = $("#overtimeLenInp").val();
     self.schedule.mostTimeValue = $("#maxtimeLenInp").val();
     let current = new Date(),
         now = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
     self.schedule.startTime = now;
     self.schedule.endTime = now;
     axios.post('/base/schedule/', self.schedule)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) {
                  bootbox.alert("班次制式添加成功!");
                  $("#add_schedule_method_modal").modal('hide');
                  self.refreshOper();
                } else { bootbox.alert("班次制式添加失败!"); }
              } else { bootbox.alert("服务器内部错误,班次制式添加失败!"); }
            });
   },
   // 修改班次制式
   updateScheduleMethod () {
     let self = this,
         dutyId = self.schedule.dutyId;

     self.schedule = {};
     self.schedule.dutyId = dutyId;
     self.schedule.dutyName = $("#updateDutyName").val();
     self.schedule.isUse = $("input[name='use2']:radio:checked").val();
     self.schedule.shiftCircle = $("input[name='changeDuty2']:radio:checked").val();
     self.schedule.shiftOrder = $("input[name='changeOrder2']:radio:checked").val();
     self.schedule.overtimeValue = $("#overtimeLenInp2").val();
     self.schedule.mostTimeValue = $("#maxtimeLenInp2").val();

     axios.put('/base/schedule/', self.schedule)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) {
                  bootbox.alert("班次制式修改成功!");
                  $("#update_schedule_method_modal").modal('hide');
                  self.refreshOper();
                } else { bootbox.alert("班次制式修改失败!"); }
              } else { bootbox.alert("服务器内部错误,班次制式修改失败!"); }
            });
   },
   // 添加班次
   addSchedule () {
     let self = this;

     self.schedule.startTime = $("#scheduleDateStart").val();
     self.schedule.endTime = $("#scheduleDateEnd").val();
     axios.post('/base/schedule/', self.schedule)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) {
                  bootbox.alert("班次信息添加成功!");
                  $("#add_schedule_modal").modal('hide');
                  self.refreshOper();
                } else { bootbox.alert("班次信息添加失败!"); }
              } else { bootbox.alert("服务器内部错误,班次信息添加失败!"); }
            });
   },
   // 修改班次
   updateSchedule () {
     let self = this;

     self.schedule.startTime = $("#scheduleDateS").val();
     self.schedule.endTime = $("#scheduleDateE").val();
     axios.put('/base/schedule/', self.schedule)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) {
                  bootbox.alert("班次修改成功!");
                  $("#update_schedule_modal").modal('hide');
                  self.refreshOper();
                } else { bootbox.alert("班次修改失败!"); }
              } else { bootbox.alert("服务器内部错误,班次信息修改失败!"); }
            });
   },
   // 删除班次
   deleteSchedule (scheduleId) {
     let self = this;

     bootbox.confirm({
       message: '班次信息一旦删除,不可恢复,是否确定删除?',
       buttons: {
         confirm: {
           label: '确定'
         },
         cancel: {
           label: '取消'
         },
       },
       callback: function(result) {
         if (result) {
           axios.delete('/base/schedule/' + scheduleId)
                  .then((response) => {
                    let { meta, data } = response.data;

                    if (meta.success) {
                      if (data && data.result == 1) {
                        bootbox.alert("班次信息删除成功!");
                        self.refreshOper();
                      } else { bootbox.alert("班次信息删除失败!"); }
                    } else { bootbox.alert("服务器内部错误,班次信息删除失败!"); }
                  });
         }
       }
     })
   },
    /**
     * End schedule manage module.
     */
  }
};
</script>

<style lang="css" scoped>
@import '../../assets/script/ztree/zTreeStyle.css';
@import '../../assets/script/jedate/skin/jedate.css';

#schedule {
  width: 100%;
}

.outside-box {
  background-color: #EEE;
}

.ztree {
  min-height: 600px;
}

.table-box-left, .table-box-right {
  background-color: #FFF;
}

.table-box-left {
  min-height: 600px;
}
</style>
