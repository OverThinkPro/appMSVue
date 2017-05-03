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
          <div class="btn-box" style="margin-bottom: 0;">
            <div class="fl">
              <button type="button" class="btn btn-primary">添加班次</button>
              <button type="button" class="btn btn-primary">修改班次</button>
              <button type="button" class="btn btn-primary">删除班次</button>
              <button type="button" class="btn btn-primary">排班</button>
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
                <tr v-for="(schedule, index) in scheduleList" :key="schedule.key">
                  <td><input type="radio" name="schedule" :value="schedule.scheduleId" /></td>
                  <td>{{ index + 1 }}</td>
                  <td>{{ schedule.scheduleName }}</td>
                  <td>{{ schedule.scheduleTime }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
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
            idKey: "scheduleId",
            pIdKey: "upUnitId",
            rootPId: 0
          },
          key: {
            name: 'scheduleName'
          }
        }
      },
      scheduleList: [{
        scheduleId: '1',
        scheduleName: '早班',
        scheduleTime: '08:00~16:00'
      },
      {
        scheduleId: '1',
        scheduleName: '中班',
        scheduleTime: '08:00~16:00'
      },
      {
        scheduleId: '1',
        scheduleName: '晚班',
        scheduleTime: '08:00~16:00'
      }],
      scheduleListCache: {
        scheduleList: [],
        total: 0
      },
      scheduleId: ''
    };
  },
  mounted () {

  },
  methods: {
    initEvent () {
      let self = this;

      // $("#createDate, #createDate2").jeDate({
      //   format: "YYYY-MM-DD",
      //   isTime: false,
      //   isinitVal: false,
      // });
    },
    // 默认装载班制树
    defaultLoadScheduleTree () {
      let self = this;

      $.fn.zTree.init($("#scheduleTree"), self.treeSetting, self.scheduleList);
      // axios.get('/base/schedule/')
      //       .then((response) => {
      //         let { meta, data } = response.data;
      //
      //         if (meta.success) {
      //           if (data && data.scheduleList) {
      //             // 部门树数据配置
      //             let scheduleList = data.scheduleList;
      //             let zNodes = scheduleList;
      //             zNodes[0].open = true;
      //
      //             // 初始化部门树
      //             $.fn.zTree.init($("#scheduleTree"), self.treeSetting, zNodes);
      //           }
      //         }
      //       });
    },
    /**
     * Start click tree node to load different table data.
     * description 点击班制树结点的事件
     */
    zTreeOnClick (event, treeId, treeNode) {
      let self = this;

      self.scheduleId = treeNode.scheduleId;
      self.loadTableData(null);
    },
    loadTableData (page) {
      let self = this;

      page = page || 1;
      axios.get('/base/unit/up/' + self.upUnitId + '/p/' + page)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.scheduleList) {
                  self.scheduleList = data.scheduleList;
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

          // axios.get('/base/unit/up/' + treeNode.unitId)
          //       .then((response) => {
          //           let meta = response.data.meta;
          //
          //           if (meta.success) {
          //             if (response.data.data) {
          //               let currentUnitId = response.data.data.currentUnitId;
          //
          //               self.unit = {
          //                 upUnitId: treeNode.unitId,
          //                 upUnitName: treeNode.unitName,
          //                 unitId: currentUnitId
          //               };
          //               $("#add_unit_modal").modal('show');
          //             }
          //           } else {
          //             bootbox.alert({
          //               message: '新增部门编号生成失败!'
          //             })
          //           }
          //       });
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
