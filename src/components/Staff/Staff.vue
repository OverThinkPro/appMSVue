<template lang="html">
  <div id="staff">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">人员管理</li>
        <li><router-link to="/Staff">员工管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box" style="margin-bottom: 0;">
        <h3>员工管理</h3>
      </div>
      <div class="table-box outside-box" style="margin-top: 5px;">
        <div class="table-box-left fl">
          <div class="title-box">
            <h5>部门列表</h5>
          </div>
          <ul id="unitTree" class="ztree"></ul>
        </div>
        <div class="table-box-right outside-box fr">
            <div class="search-bar-box">
              <div class="search-bar">
                <div class="search-bar-select fl">
                  <select class="form-control refresh" name="" id="unitId">
                    <option value="">- 请选择部门 -</option>
                    <option v-if="unitList != null" v-for="unit in unitList" :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
                  </select>
                </div>
                <div class="input-group search-bar-input fl">
                  <span class="input-group-addon">员工姓名</span>
                  <input type="text" class="form-control refresh" id="staffName">
                </div>
                <div class="input-group search-bar-input fl">
                  <span class="input-group-addon">员工编号</span>
                  <input type="text" class="form-control refresh" id="staffId">
                </div>
                <div class="search-bar-select fl">
                  <select class="form-control refresh" name="" id="jobId">
                    <option value="">- 请选择工种 -</option>
                    <option v-if="jobTypeList != null" v-for="jobType in jobTypeList" :key="jobType.key" :value="jobType.jobId">{{ jobType.jobName }}</option>
                  </select>
                </div>
                <div class="input-group btn-group fr">
                  <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>重置</button>
                  <button type="button" class="btn btn-primary" @click="defaultLoadStaffTable()"><i class="glyphicon glyphicon-search"></i>查询</button>
                </div>
              </div>
            </div>
            <div class="search-hr"></div>
            <div class="btn-box" style="margin-bottom: 0;">
              <div class="fl">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_staff_modal">添加</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="" @click="checkSelect('UPDATE_STAFF')">修改</button>
                <button type="button" class="btn btn-primary" @click="checkSelect('DELETE_STAFF')">删除</button>
              </div>
              <div class="fr">
                <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-export"></i>导出</button>
                <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-print"></i>打印</button>
              </div>
            </div>
            <div class="table-box data-box">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>选择</th>
                    <th>序号</th>
                    <th>姓名</th>
                    <th>员工编号</th>
                    <th>性别</th>
                    <th>出生年月</th>
                    <th>班组</th>
                    <th>工种</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="staffListCache.staffList != null" v-for="(staff, index) in staffListCache.staffList" :key="staff.key">
                    <td><input type="radio" name="staff" :value="staff.staffId"></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ staff.staffName }}</td>
                    <td>{{ staff.staffId }}</td>
                    <td>{{ staff.staffGender }}</td>
                    <td>{{ staff.staffBirthday }}</td>
                    <td>{{ unitId2UnitName(staff.unitId) }}</td>
                    <td>{{ jobId2JobName(staff.jobId) }}</td>
                  </tr>
                </tbody>
              </table>
              <nav class="pagination-box" id="staffPagingBox">
                <div id="staffPaging" class="pagination"></div>
              </nav>
            </div>
        </div>
      </div>
    </main>

    <!-- 添加员工信息模态框 -->
    <div class="modal fade" id="add_staff_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加员工信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">姓名</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.staffName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">姓名简称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" placeholder="选填..." v-model="staff.staffAbbr">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">工号</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.staffId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">性别</div>
                <div class="group-right">
                  <input style="margin-left: 20%;" checked="checked" type="radio" name="gender" value="男">
                  <span>男</span>
                  <input style="margin-left: 20%;" type="radio" name="gender" value="女">
                  <span>女</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">身份证号</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.staffIdCard">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">出生日期</div>
                <div class="group-right">
                  <input id="birthday" class="form-control refresh" type="text" name="" readonly="readonly" placeholder="请选择出生日期" v-model="staff.staffBirthday">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">籍贯</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.staffNativePlace">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">职务/工种</div>
                <div class="group-right">
                  <select class="form-control refresh" v-model="staff.jobId">
                    <option value="">- 请选择工种 -</option>
                    <option v-if="jobTypeList != null" v-for="jobType in jobTypeList" :key="jobType.key" :value="jobType.jobId">{{ jobType.jobName }}</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">职称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.title">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门</div>
                <div class="group-right">
                  <select class="form-control refresh" v-model="staff.unitId">
                    <option value="">- 请选择部门 -</option>
                    <option v-if="unitList != null" v-for="unit in unitList" :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">联系电话</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.staffTelephone">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">参加工作时间</div>
                <div class="group-right">
                  <input id="workDate" class="form-control refresh" type="text" name="" readonly="readonly" placeholder="请选择参加工作时间" v-model="staff.staffWorkDate">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addStaff()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改员工信息模态框 -->
    <div class="modal fade" id="update_staff_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改员工信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">姓名</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.staffName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">姓名简称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" placeholder="选填..." v-model="staff.staffAbbr">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">工号</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" readonly="readonly" v-model="staff.staffId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">性别</div>
                <div class="group-right">
                  <input style="margin-left: 20%;" checked="checked" type="radio" name="gender2" value="男">
                  <span>男</span>
                  <input style="margin-left: 20%;" type="radio" name="gender2" value="女">
                  <span>女</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">身份证号</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.staffIdCard">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">出生日期</div>
                <div class="group-right">
                  <input id="birthday2" class="form-control refresh" type="text" name="" readonly="readonly" placeholder="请选择出生日期" v-model="staff.staffBirthday">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">籍贯</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.staffNativePlace">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">职务/工种</div>
                <div class="group-right">
                  <select class="form-control refresh" v-model="staff.jobId">
                    <option value="">- 请选择工种 -</option>
                    <option v-if="jobTypeList != null" v-for="jobType in jobTypeList" :key="jobType.key" :value="jobType.jobId">{{ jobType.jobName }}</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">职称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.title">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门</div>
                <div class="group-right">
                  <select class="form-control refresh" v-model="staff.unitId">
                    <option value="">- 请选择部门 -</option>
                    <option v-if="unitList != null" v-for="unit in unitList" :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">联系电话</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.staffTelephone">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">参加工作时间</div>
                <div class="group-right">
                  <input id="workDate2" class="form-control refresh" type="text" name="" readonly="readonly" placeholder="请选择参加工作时间" v-model="staff.staffWorkDate">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateStaff()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import bootbox from 'bootbox/bootbox.min';
import axios from 'axios';
import ztree from '../../assets/script/ztree/jquery.ztree.core.min';
import jeDate from '../../assets/script/jedate/jquery.jedate.min';
import { initPagination } from '../../assets/script/initplugin';
import { deepCopy } from '../../assets/script/extends';

export default {
  name: 'staff',
  data () {
    return {
      treeSetting: {
        callback: {
          onClick: this.zTreeOnClick
        },
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
      unitId: '',
      staff: {},
      staffListCache: {
        staffList: [],
        total: 0
      },
      unitList: [],
      jobTypeList: []
    };
  },
  mounted () {
    this.initEvent();
    this.defaultLoadUnitTree();
    this.defaultLoadUnit();
    this.defaultLoadJob();
    this.defaultLoadStaffTable();
  },
  methods: {
    initEvent () {
      var self = this;

      $("#workDate, #workDate2, #birthday, #birthday2").jeDate({
        format: 'YYYY-MM-DD',
        isTime: false,
        isinitVal: false
      });

      $("#add_staff_modal").on('show.bs.modal', function() {
        self.staff = {};
        self.staff.jobId = self.staff.unitId = '';
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      $("input[name='staff']:checked").each(function() { this.checked = false; });
    },
    getSearchParam () {
      let params = {},
          unitId, staffName, staffId, jobId;

      unitId = $("#unitId").val();
      if (unitId) { params.unitId = unitId; }

      staffName = $("#staffName").val();
      if (staffName) { params.staffName = staffName; }

      staffId = $("#staffId").val();
      if (staffId) { params.staffId = staffId; }

      jobId = $("#jobId").val();
      if (jobId) { params.jobId = jobId; }

      return params;
    },
    /**
     * Start filters.
     */
   unitId2UnitName (unitId) {
     let result;
     this.unitList.forEach(function(unit, index) {
       if (unit.unitId == unitId) {
         result = unit.unitName;
       }
     });
     return result;
   },
   jobId2JobName (jobId) {
     let result;

     this.jobTypeList.forEach(function(jobType, index) {
       if (jobType.jobId == jobId) {
         result = jobType.jobName;
       }
     });
     return result;
   },
   /**
    * End filters.
    */
    /**
     * Start click unit tree node to load staff table data
     * and default load search data set.
     */
    defaultLoadUnitTree () {
      let self = this;

      axios.get('/base/unit/unittree')
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                if (response.data.data) {
                  // 部门树数据配置
                  let unitList = response.data.data.unitList;
                  let zNodes = unitList;
                  zNodes[0].open = true;

                  // 初始化部门树
                  $.fn.zTree.init($("#unitTree"), self.treeSetting, zNodes);
                }
              }
            });
    },
    zTreeOnClick (event, treeId, treeNode) {
      let self = this;

      initPagination('staffPagingBox', 'staffPaging');
      self.unitId = treeNode.unitId;
      self.loadTableData(null);
    },
    loadTableData (page, isPaging) {
      let self = this;

      page = page || 1;
      axios.get('/base/staff/u/' + self.unitId + '/p/' + page)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                if (data) {
                  self.staffListCache.staffList = data.staffList;
                  self.staffListCache.total = data.total;

                  if (!isPaging) {
                    $("#staffPaging").page({
                      total: self.staffListCache.total,
                      pageSize: 10,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条',
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadTableData(pageNumber + 1, true);
                    });
                  }
                }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    /**
     * End click tree node to load  different table data.
     */
    // 默认装载查询框结果集data set
    defaultLoadUnit () {
      let self = this;
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
    defaultLoadJob () {
      let self = this;
      axios.get('/base/jobtype/')
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                self.jobTypeList = data.jobTypeList;
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
   /**
    * End click unit tree node to load staff table data
    * and default load search data set.
    */
    defaultLoadStaffTable () {
      initPagination('staffPagingBox', 'staffPaging');
      this.loadStaffListPaging(null);
    },
    loadStaffListPaging (page, isPaging) {
      let self = this;
      let params = this.getSearchParam();

      page = page || 1;
      axios.get('/base/staff/p/' + page, { params: params })
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                if (response.data.data) {
                  let data = response.data.data;

                  self.staffListCache.staffList = data.staffList;
                  self.staffListCache.total = data.total;

                  if (!isPaging) {
                    $("#staffPaging").page({
                      total: self.staffListCache.total,
                      pageSize: 10,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条',
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadStaffListPaging(pageNumber + 1, true);
                    });
                  }
                }
              }
            });
    },
    /* 检测选中的表格记录数 */
    checkSelect (type) {
      let self = this;
      let size = $("input[name='staff']").filter(':checked').length;

      if (size < 1) {
        bootbox.alert({
          message: '请选择一条记录,再进行操作!'
        });
        return;
      } else if (size == 1) {
        let staffId = $("input[name='staff']:checked").val();

        if (type == 'UPDATE_STAFF') {
          self.staffListCache.staffList.forEach((staff, index) => {
            if (staff.staffId == staffId) {
              self.staff = deepCopy(staff);
              delete self.staff.uber;

              $("input[name='gender2']").each(function() { if (this.value == self.staff.staffGender) { this.checked = true; } });
            }
          });
          $("#update_staff_modal").modal('show');
        } else if (type == 'DELETE_STAFF') {
          self.deleteStaff(staffId);
        }
      }
    },
    // 添加员工信息
    addStaff () {
      let self = this;

      // 获取非绑定数据
      self.staff.staffGender = $("input:radio[name='gender']:checked").val();
      self.staff.staffBirthday = $("#birthday").val();
      self.staff.staffWorkDate = $("#workDate").val();

      axios.post('/base/staff/', self.staff)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) { bootbox.alert({ message: '员工信息添加成功!' }); }
                                         else { bootbox.alert({ message: '员工信息添加失败!' }); }
                $("#add_staff_modal").modal('hide');
                self.defaultLoadStaffTable();
                $("input[name='staff']:checked").each(function() { this.checked = false; });
              } else {
                bootbox.alert({ message: meta.message });
              }
            });
    },
    // 删除员工信息
    deleteStaff (staffId) {
      let self = this;

      bootbox.confirm({
        message: '员工信息一旦删除，不可恢复，是否确定删除？',
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
            axios.delete('/base/staff/', { params: { "staffId": staffId }})
                  .then((response) => {
                    let meta = response.data.meta;

                    if (meta.success) {
                      let data = response.data.data;

                      if (data && data.result == 1) {
                        bootbox.alert({
                          message: '删除成功!'
                        });

                        self.defaultLoadStaffTable();
                        $("input[name='staff']:checked").each(function() { this.checked = false; });
                      } else {
                        bootbox.alert({
                          message: '服务器错误,删除失败!'
                        });
                      }
                    } else {
                      bootbox.alert({
                        message: meta.message
                      });
                    }
                  });
          }
        }
      });
    },
    // 修改员工信息
    updateStaff () {
      let self = this;

      // 获取非绑定数据
      self.staff.staffGender = $("input:radio[name='gender2']:checked").val();
      self.staff.staffBirthday = $("#birthday2").val();
      self.staff.staffWorkDate = $("#workDate2").val();

      axios.put('/base/staff/', self.staff)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) { bootbox.alert({ message: '员工信息修改成功!' }); }
                                         else { bootbox.alert({ message: '员工信息修改失败!' }); }
                $("#update_staff_modal").modal('hide');
                self.defaultLoadStaffTable();
                $("input[name='staff']:checked").each(function() { this.checked = false; });
              } else {
                bootbox.alert({ message: meta.message });
              }
            });
    }
  }
};
</script>

<style lang="css" scoped>
@import "../../assets/script/ztree/zTreeStyle.css";
@import "../../assets/script/jedate/skin/jedate.css";

#staff {
  width: 100%;
}

.outside-box {
  background-color: #EEE;
}

.table-box-left, .table-box-right {
  background-color: #FFF;
  overflow: hidden;
  zoom: 1;
}

.table-box-left {
  min-height: 600px;
}

.search-bar-select, .search-bar-input {
  width: 19%;
}
</style>
