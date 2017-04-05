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
        </div>
        <div class="table-box-right outside-box fr">
            <div class="search-bar-box">
              <div class="search-bar">
                <div class="search-bar-select fl">
                  <select class="form-control refresh" name="">
                    <option value="">- 请选择部门 -</option>
                    <option value="">掘进1队</option>
                    <option value="">掘进2队</option>
                  </select>
                </div>
                <div class="input-group search-bar-input fl">
                  <span class="input-group-addon">员工姓名</span>
                  <input type="text" class="form-control refresh">
                </div>
                <div class="input-group search-bar-input fl">
                  <span class="input-group-addon">员工编号</span>
                  <input type="text" class="form-control refresh">
                </div>
                <div class="search-bar-select fl">
                  <select class="form-control refresh" name="">
                    <option value="">- 请选择工种 -</option>
                    <option value="">工种1</option>
                    <option value="">工种2</option>
                  </select>
                </div>
                <div class="input-group btn-group fr">
                  <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>重置</button>
                  <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>查询</button>
                </div>
              </div>
            </div>
            <div class="search-hr"></div>
            <div class="btn-box" style="margin-bottom: 0;">
              <div class="fl">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_staff_modal">添加</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#update_staff_modal">修改</button>
                <button type="button" class="btn btn-primary" @click="deleteStaff()">删除</button>
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
                    <th><input type="checkbox" name="allStaff" value=""></th>
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
                  <tr v-for="(elem, index) in staffList" :key="elem.key">
                    <td><input type="checkbox" name="staff" :value="elem.no"></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ elem.staffName }}</td>
                    <td>{{ elem.no }}</td>
                    <td>{{ elem.sex }}</td>
                    <td>{{ elem.birthday }}</td>
                    <td>{{ elem.unit }}</td>
                    <td>{{ elem.job }}</td>
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
                <div class="group-left">工号</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.no">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">身份证号</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.cardId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">出生年月</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.birthday">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">籍贯</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.origin">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">职务/工种</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.job">
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
                  <input class="form-control refresh" type="text" name="" v-model="staff.unitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">联系电话</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.telephone">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">参加工作时间</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.workTime">
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
                <div class="group-left">工号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="staff.no">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">身份证号</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.cardId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">出生年月</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.birthday">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">籍贯</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.origin">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">职务/工种</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.job">
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
                  <input class="form-control refresh" type="text" name="" v-model="staff.unitId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">联系电话</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.telephone">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">参加工作时间</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="staff.workTime">
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
  name: 'staff',
  data () {
    return {
      staff: {
        staffName: '李权良',
        no: '001001',
        cardId: '411082199411010633',
        birthday: '1876-10-23',
        origin: '山西太原',
        sex: '男',
        job: '检修工',
        title: '高级检修工',
        unitId: '机电科',
        telephone: '18435156270',
        workTime: '2017-10-20 8:00'
      },
      staffList: [
        {
          staffName: '李权良',
          no: '001001',
          sex: '男',
          birthday: '1876-10-23',
          unit: '机电科',
          job: '检修工'
        },
        {
          staffName: '李权良',
          no: '001001',
          sex: '男',
          birthday: '1876-10-23',
          unit: '机电科',
          job: '检修工'
        },
        {
          staffName: '李权良',
          no: '001001',
          sex: '男',
          birthday: '1876-10-23',
          unit: '机电科',
          job: '检修工'
        },
        {
          staffName: '李权良',
          no: '001001',
          sex: '男',
          birthday: '1876-10-23',
          unit: '机电科',
          job: '检修工'
        }
      ]
    };
  },
  mounted () {
    this.initEvent();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_staff_modal, #update_staff_modal").on('show.bs.modal', function() {
        self.staff = {
          staffName: '李权良',
          no: '001001',
          cardId: '411082199411010633',
          birthday: '1876-10-23',
          origin: '山西太原',
          sex: '男',
          job: '检修工',
          title: '高级检修工',
          unitId: '机电科',
          telephone: '18435156270',
          workTime: '2017-10-20 8:00'
        };
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    deleteStaff () {
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
        callback: function() {
          bootbox.alert("删除成功!");
        }
      })
    }
  }
};
</script>

<style lang="css" scoped>
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
