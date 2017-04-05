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
                <input type="text" class="form-control refresh">
              </div>
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">部门编号</span>
                <input type="text" class="form-control refresh">
              </div>
              <div class="input-group btn-group fr">
                <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
                <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
              </div>
            </div>
          </div>
          <div class="search-hr"></div>
          <div class="btn-box" style="margin-bottom: 0;">
            <div class="fl">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_unit_modal">添加</button>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#update_unit_modal">修改</button>
              <button type="button" class="btn btn-primary" @click="deleteUnit()">删除</button>
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
                  <th><input type="checkbox" name="allUnit"></th>
                  <th>序号</th>
                  <th>部门编号</th>
                  <th>部门名称</th>
                  <th>部门简称</th>
                  <th>联系方式</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(elem, index) in unitList" :key="elem.key">
                  <td><input type="checkbox" name="unit" :value="elem.unitId" /></td>
                  <td>{{ index + 1 }}</td>
                  <td>{{ elem.unitId }}</td>
                  <td>{{ elem.unitName }}</td>
                  <td>{{ elem.unitAbbr }}</td>
                  <td>{{ elem.telephone }}</td>
                  <td>{{ elem.remark }}</td>
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
            <button type="button" class="btn btn-primary modal-btn">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootbox from 'bootbox/bootbox.min';

export default {
  name: 'unit',
  data () {
    return {
      unit: {
        upUnitId: '001',
        upUnitName: '屯兰煤矿',
        unitId: '001001',
        unitName: '掘进1队',
        remark: '机电科机电科机电科机电科机电科'
      },
      unitList: [
        {
          unitId: '1000001',
          unitName: '掘进1队',
          unitAbbr: '掘1',
          telephone: '18435156270',
          remark: '掘进'
        },
        {
          unitId: '1000001',
          unitName: '掘进1队',
          unitAbbr: '掘1',
          telephone: '18435156270',
          remark: '掘进'
        },
        {
          unitId: '1000001',
          unitName: '掘进1队',
          unitAbbr: '掘1',
          telephone: '18435156270',
          remark: '掘进'
        },
        {
          unitId: '1000001',
          unitName: '掘进1队',
          unitAbbr: '掘1',
          telephone: '18435156270',
          remark: '掘进'
        }
      ]
    }
  },
  mounted () {
    this.initEvent();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_unit_modal, #update_unit_modal").on('show.bs.modal', function() {
        self.unit = {
          upUnitId: '001',
          upUnitName: '屯兰煤矿',
          unitId: '001001',
          unitName: '掘进1队',
          remark: '机电科机电科机电科机电科机电科'
        };
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    deleteUnit () {
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
        callback: function() {
          bootbox.alert("删除成功!");
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
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
