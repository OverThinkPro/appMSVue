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
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_unit_modal">添加</button>
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
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="unit.upUnitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上级部门名称</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="unit.upUnitName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="unit.unitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.unitName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">备注</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.remark">
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
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="unit.upUnitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上级部门名称</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="unit.upUnitName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="unit.unitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">部门名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.unitName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">备注</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="unit.remark">
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
import bootbox from 'bootbox/bootbox.min';
import axios from 'axios';
import ztree from '../../assets/script/ztree/jquery.ztree.core.min';
import { initPagination } from '../../assets/script/initplugin';

export default {
  name: 'unit',
  data () {
    return {
      unit: {},
      unitListCache: {
        unitList: [],
        total: 0
      }
    }
  },
  mounted () {
    this.initEvent();
    this.defaultLoadUnitTable();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_unit_modal").on('show.bs.modal', function() {
        self.unit.unitName = '';
        self.unit.remark = '';
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
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
    defaultLoadUnitTree () {
      axios.get('/base/unit/')
            .then((response) => {

            });
    },
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
    addUnit () {
      let self = this;

      axios.post('', self.unit)
            .then((response) => {

            });
    },
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
                $("#update_unit_modal").modal('hide');
                $("input[name='unit']:checked").prop('checked', false);
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
                      self.defaultLoadUnitTable();
                      $("input[name='unit']:checked").prop('checked', false);
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

#unit {
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
