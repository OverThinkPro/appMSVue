<template lang="html">
  <div id="unit">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">人员管理</li>
        <li><router-link to="/Unit">部门管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box" style="margin-bottom: 0;">
        <h3>部门管理</h3>
      </div>
      <div class="table-box outside-box" style="margin-top: 5px;">
        <div class="table-box-left fl">
          <div class="title-box content-box">
            <h5>部门列表</h5>
          </div>
          <ul id="unitTree" class="ztree"></ul>
        </div>
        <div class="table-box-right outside-box fr">
          <div class="search-bar-box">
            <div class="search-bar">
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">部门名称</span>
                <input id="unitName" type="text" class="form-control refresh">
              </div>
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">部门编号</span>
                <input id="unitId" type="text" class="form-control refresh">
              </div>
              <div class="input-group btn-group fr">
                <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
                <button type="button" class="btn btn-primary" @click="defaultLoadUnitTable()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
              </div>
            </div>
          </div>
          <div class="search-hr"></div>
          <div class="btn-box" style="margin-bottom: 0;">
            <div class="fl">
              <!-- <button type="button" class="btn btn-primary" @click="showAddUnitModal()" data-toggle="modal" data-target="">添加</button> -->
              <button type="button" class="btn btn-primary" @click="checkSelect('UPDATE_UNIT')" data-toggle="modal" data-target="">修改</button>
              <button type="button" class="btn btn-primary" @click="checkSelect('DELETE_UNIT')">删除</button>
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
                  <th>部门编号</th>
                  <th>部门名称</th>
                  <th>部门联系人</th>
                  <th>联系方式</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(unit, index) in unitListCache.unitList" :key="unit.key">
                  <td><input type="radio" name="unit" :value="unit.unitId" /></td>
                  <td>{{ index + 1 }}</td>
                  <td>{{ unit.unitId }}</td>
                  <td>{{ unit.unitName }}</td>
                  <td>{{ unit.contactPerson }}</td>
                  <td>{{ unit.telephone }}</td>
                  <td>{{ unit.remark }}</td>
                </tr>
              </tbody>
            </table>
            <nav class="pagination-box" id="unitPagingBox">
              <div id="unitPaging" class="pagination"></div>
            </nav>
          </div>
        </div>
      </div>
    </main>

    <!-- 添加部门模态框 -->
    <div class="modal fade" id="add_unit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加部门信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">上级部门编号</div>
                <div class="group-right">
                  <input class="form-control" disabled="disabled" type="text" name="" v-model="unit.upUnitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上级部门名称</div>
                <div class="group-right">
                  <input class="form-control" disabled="disabled" type="text" name="" v-model="unit.upUnitName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门编号</div>
                <div class="group-right">
                  <input class="form-control" disabled="disabled" type="text" name="" v-model="unit.unitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.unitName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">联系电话</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.telephone">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">联系人</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.contactPerson">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">负责人</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.header">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">创建时间</div>
                <div class="group-right">
                  <input id="createDate" class="form-control refresh" type="text" name="" readonly="readonly" v-model="unit.createDate">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" placeholder="选填..." v-model="unit.description">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">备注</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" placeholder="选填..." v-model="unit.remark">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addUnit()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改部门模态框 -->
    <div class="modal fade" id="update_unit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改部门信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">上级部门编号</div>
                <div class="group-right">
                  <input class="form-control" disabled="disabled" type="text" name="" v-model="unit.upUnitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上级部门名称</div>
                <div class="group-right">
                  <input class="form-control" disabled="disabled" type="text" name="" v-model="unit.upUnitName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门编号</div>
                <div class="group-right">
                  <input class="form-control" disabled="disabled" type="text" name="" v-model="unit.unitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门名称</div>
                <div class="group-right">
                  <input class="form-control" type="text" name="" v-model="unit.unitName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">联系电话</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.telephone">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">联系人</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.contactPerson">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">负责人</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.header">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">创建时间</div>
                <div class="group-right">
                  <input id="createDate2" class="form-control refresh" type="text" name="" readonly="readonly" v-model="unit.createDate">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" placeholder="选填..." v-model="unit.description">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">备注</div>
                <div class="group-right">
                  <input class="form-control" type="text" name="" v-model="unit.remark">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateUnit()">保存</button>
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
import { initPagination } from '../../assets/script/initplugin';

export default {
  name: 'unit',
  data () {
    return {
      treeSetting: {
        view: {
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom
        },
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
      upUnitId: '',
      unit: {},
      unitListCache: {
        unitList: [],
        total: 0
      }
    }
  },
  mounted () {
    this.initEvent();
    this.defaultLoadUnitTree();
    this.defaultLoadUnitTable();
  },
  methods: {
    initEvent () {
      let self = this;

      $("#createDate, #createDate2").jeDate({
        format: "YYYY-MM-DD",
        isTime: false,
        isinitVal: false
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      $("input[name='unit']:checked").each(function() { this.checked = false; });
    },
    getSearchParam () {
      let params = {},
          unitId, unitName;

      unitId = $("#unitId").val();
      if (unitId) { params.unitId = unitId; }

      unitName = $("#unitName").val();
      if (unitName) { params.unitName = unitName; }

      return params;
    },
    /**
     * Start unit tree operation.
     * description 部门树操作
     */
    // 默认装载部门树
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
    /**
     * Start click tree node to load different table data.
     * description 点击部门树结点的事件
     */
    zTreeOnClick (event, treeId, treeNode) {
      let self = this;

      initPagination('unitPagingBox', 'unitPaging');
      self.upUnitId = treeNode.unitId;
      self.loadTableData(null);
    },
    loadTableData (page, isPaging) {
      let self = this;

      page = page || 1;
      axios.get('/base/unit/up/' + self.upUnitId + '/p/' + page)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                if (data) {
                  self.unitListCache.unitList = data.unitList;
                  self.unitListCache.total = data.total;

                  if (!isPaging) {
                    $("#unitPaging").page({
                      total: self.unitListCache.total,
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
    addHoverDom (treeId, treeNode) {
      let self = this;

      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) { return; }
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_" + treeNode.tId);
      if (btn) {
        btn.bind("click", function() {
          let zTree = $.fn.zTree.getZTreeObj("unitTree");
          zTree.selectNode(treeNode);

          axios.get('/base/unit/up/' + treeNode.unitId)
                .then((response) => {
                    let meta = response.data.meta;

                    if (meta.success) {
                      if (response.data.data) {
                        let currentUnitId = response.data.data.currentUnitId;

                        self.unit = {
                          upUnitId: treeNode.unitId,
                          upUnitName: treeNode.unitName,
                          unitId: currentUnitId
                        };
                        $("#add_unit_modal").modal('show');
                      }
                    } else {
                      bootbox.alert({
                        message: '新增部门编号生成失败!'
                      })
                    }
                });
        });
      }
    },
    removeHoverDom (treeId, treeNode) {
      $("#addBtn_" + treeNode.tId).unbind().remove();
    },
    /**
     * End unit tree operation.
     * description 部门数操作
     */
    defaultLoadUnitTable () {
      initPagination('unitPagingBox', 'unitPaging');
      this.loadUnitListPaging(null);
    },
    loadUnitListPaging (page, isPaging) {
      let self = this;
      let params = this.getSearchParam();

      page = page || 1;
      axios.get('/base/unit/p/' + page, { params: params })
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                if (response.data.data) {
                  let data = response.data.data;

                  self.unitListCache.unitList = data.unitList;
                  self.unitListCache.total = data.total;

                  if (!isPaging) {
                    $("#unitPaging").page({
                      total: self.unitListCache.total,
                      pageSize: 10,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条',
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadUnitListPaging(pageNumber + 1, true);
                    });
                  }
                }
              }
            });
    },
    /* 检测选中的表格记录数 */
    checkSelect (type) {
      let self = this;
      let size = $("input[name='unit']").filter(':checked').length;

      if (size < 1) {
        bootbox.alert({
          message: '请选择一条记录,再进行添加部门'
        });
        return;
      } else if (size == 1) {
        let unitId = $("input[name='unit']:checked").val();

        if (type == 'UPDATE_UNIT') {
          self.unitListCache.unitList.forEach((unit, index) => {
            if (unit.unitId == unitId) {
              self.unit = unit;
            }
          });
          $("#update_unit_modal").modal('show');
        } else if (type == 'DELETE_UNIT') {
          self.deleteUnit(unitId);
        }
      }
    },
    // 添加部门信息
    addUnit () {
      let self = this;

      axios.post('/base/unit/', self.unit)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                if (response.data.data) {
                  if (response.data.data.result == 1) {
                    bootbox.alert({
                      message: '添加成功!'
                    });

                    $("#add_unit_modal").modal("hide");
                    self.defaultLoadUnitTree();
                    self.defaultLoadUnitTable();
                  }
                }
              } else {
                bootbox.alert({
                  message: '添加部门失败!'
                });
              }
            });
    },
    // 修改部门信息
    updateUnit () {
      let self = this;

      axios.put('/base/unit/', self.unit)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                bootbox.alert({
                  message: meta.message
                });
                self.unit = {};

                $("input[name='unit']:checked").each(function() { this.checked = false; });
                $("#update_unit_modal").modal('hide');
                self.defaultLoadUnitTree();
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    deleteUnit (unitId) {
      let self = this;

      bootbox.confirm({
        message: '部门一旦删除，不可恢复，是否确定删除？',
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
            axios.delete('/base/unit/', { params: { "unitId": unitId}})
                  .then((response) => {
                    let meta = response.data.meta;

                    if (meta.success) {
                      bootbox.alert({
                        message: meta.message
                      });
                      $("input[name='unit']:checked").each(function() { this.checked = false; });
                      self.defaultLoadUnitTree();
                      self.defaultLoadUnitTable();
                    } else {
                      bootbox.alert({
                        message: meta.message
                      });
                    }
                  });
          }
        }
      });
    }
  }
}
</script>

<style lang="css" scoped>
@import '../../assets/script/ztree/zTreeStyle.css';
@import '../../assets/script/jedate/skin/jedate.css';

#unit {
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
