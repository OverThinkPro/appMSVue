<template lang="html">
  <div class="job">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">人员管理</li>
        <li><router-link to="/Job">工种管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>特殊工种管理</h3>
      </div>
      <div class="table-box outside-box">
        <div class="search-bar-box">
          <div class="search-bar">
            <div class="search-bar-select fl">
              <select class="form-control refresh" name="" id="jobTypeId">
                <option value="">- 请选择工种 -</option>
                <option v-if="jobTypeList != null" v-for="jobType in jobTypeList" :value="jobType.jobId">{{ jobType.jobName }}</option>
              </select>
            </div>
            <!-- <div class="input-group search-bar-input fl">
              <span class="input-group-addon">工种编号</span>
              <input type="text" class="form-control refresh">
            </div> -->
            <div class="input-group btn-group fr">
              <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>重置</button>
              <button type="button" class="btn btn-primary" @click="defaultLoadJobTypeList()"><i class="glyphicon glyphicon-search"></i>查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <div class="btn-box">
          <div class="fl">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_job_modal" @click="errors.clear('add_job_form')">添加</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="" @click="checkSelect('UPDATE_JOBTYPE')">修改</button>
            <button type="button" class="btn btn-primary" @click="checkSelect('DELETE_JOBTYPE')">删除</button>
          </div>
          <div class="fr">
            <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-export"></i>导出</button>
            <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-print"></i>打印</button>
          </div>
        </div>
        <div class="data-box" style="padding-left: 10px; padding-right: 10px;">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>删除</th>
                <th>序号</th>
                <th>工种名称</th>
                <th>工种编号</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(jobType, index) in jobTypeListCache.jobTypeList" :key="jobType.key">
                <td><input type="radio" name="jobType" :value="jobType.jobId"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ jobType.jobCode }}</td>
                <td>{{ jobType.jobName }}</td>
                <td>{{ jobType.remark }}</td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="jobTypePagingBox">
            <div id="jobTypePaging" class="pagination"></div>
          </nav>
        </div>
      </div>
    </main>

    <!-- 添加工种模态框 -->
    <div class="modal fade" id="add_job_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加工种信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <form data-vv-scope="add_job_form">
                <div class="input-group-line">
                  <div class="group-left">工种编号</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_job_form.add_jobCode')}">
                    <input class="form-control refresh" type="text" v-validate="'required'" name="add_jobCode" v-model="jobType.jobCode">
                  </div>
                  <span v-show="errors.has('add_job_form.add_jobCode')" class="word-danger">{{ errors.first('add_job_form.add_jobCode') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">工种名称</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_job_form.add_jobName')}">
                    <input class="form-control refresh" type="text" v-validate="'required'" name="add_jobName" v-model="jobType.jobName">
                  </div>
                  <span v-show="errors.has('add_job_form.add_jobName')" class="word-danger">{{ errors.first('add_job_form.add_jobName') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">备注</div>
                  <div class="group-right">
                    <input class="form-control refresh" type="text" name="" v-model="jobType.remark">
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addJobType()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改工种模态框 -->
    <div class="modal fade" id="update_job_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改工种信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <form data-vv-scope="update_job_form">
                <div class="input-group-line">
                  <div class="group-left">工种编号</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_job_form.update_jobCode')}">
                    <input class="form-control" type="text" name="update_jobCode" v-validate="'required'" v-model="jobType.jobCode">
                  </div>
                  <span v-show="errors.has('update_job_form.update_jobCode')" class="word-danger">{{ errors.first('update_job_form.update_jobCode') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">工种名称</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_job_form.update_jobName')}">
                    <input class="form-control" type="text" name="update_jobName" v-validate="'required'" v-model="jobType.jobName">
                  </div>
                  <span v-show="errors.has('update_job_form.update_jobName')" class="word-danger">{{ errors.first('update_job_form.update_jobName') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">备注</div>
                  <div class="group-right">
                    <input class="form-control" type="text" name="" v-model="jobType.remark">
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateJobType()">保存</button>
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
import { initPagination } from '../../assets/script/initplugin';
import { deepCopy } from '../../assets/script/extends';

export default {
  name: 'job',
  data () {
    return {
      job: {},
      jobTypeListCache: {
        jobTypeList: [],
        total: 0
      },
      jobType: {},
      jobTypeList: [],
    };
  },
  mounted () {
    this.initEvent();
    this.defaultLoadJobType();
    this.defaultLoadJobTypeList();
  },
  methods: {
    initEvent () {
      $("#add_job_modal").on('show.bs.modal', () => {
        this.job = {};
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    getParams () {
      let params = {},
          jobTypeId;

      jobTypeId = $("#jobTypeId").find("option:checked").val();

      if (jobTypeId) { params.jobId = jobTypeId; }

      return params;
    },
    /**
     * Start default load data operation.
     */
     defaultLoadJobType () {
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
     defaultLoadJobTypeList () {
       initPagination('jobTypePagingBox', 'jobTypePaging');
       this.loadJobTypeListPaging(null);
     },
     loadJobTypeListPaging(page, isPaging) {
       let self = this,
           params = self.getParams();

       page = page || 1;

       axios.get('/base/jobtype/p/' + page, { params: { "jobId": params.jobId }})
              .then((response) => {
                let meta = response.data.meta;

                if (meta.success) {
                  let data = response.data.data;

                  if (data) {
                    self.jobTypeListCache.jobTypeList = data.jobTypeList;
                    self.jobTypeListCache.total = data.total;

                    if (!isPaging) {
                      $("#jobTypePaging").page({
                        total: self.jobTypeListCache.total,
                        pageSize: 10,
                        prevBtnText: '上一页',
                        nextBtnText: '下一页',
                        showInfo: true,
                        infoFormat: '{start} ~ {end}条，共{total}条',
                      }).on("pageClicked", function (event, pageNumber) {
                        self.loadJobTypeListPaging(pageNumber + 1, true);
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
     * End default load data operation.
     */
    /**
     * Start job type operation.
     */
     /* 检测选中的表格记录数 */
   checkSelect (type) {
     let self = this;
     let size = $("input[name='jobType']").filter(':checked').length;

     if (size < 1) {
       bootbox.alert({
         message: '请选择一条记录,再进行操作!'
       });
       return;
     } else if (size == 1) {
       let jobId = $("input[name='jobType']:checked").val();

       if (type == 'UPDATE_JOBTYPE') {
         self.jobTypeListCache.jobTypeList.forEach((jobType, index) => {
           if (jobType.jobId == jobId) {
             self.jobType = deepCopy(jobType);
             delete self.jobType.uber;
           }
         });

         self.errors.clear('update_job_form');
         $("#update_job_modal").modal('show');
       } else if (type == 'DELETE_JOBTYPE') {
         self.deleteJobType(jobId);
       }
     }
   },
   // 添加工种信息
   addJobType () {
    let self = this;

    this.$validator.validateAll('add_job_form').then(() => {

      axios.post('/base/jobtype/', self.jobType)
            .then((response) => {
              let meta = response.data.meta;

              if (meta.success) {
                let data = response.data.data;

                if (data && data.result == 1) { bootbox.alert({ message: '工种信息添加成功!' }); }
                                         else { bootbox.alert({ message: '工种信息添加失败!' }); }
                $("#add_job_modal").modal('hide');
                $("input[name='jobType']:checked").each(function() { this.checked = false; });
                self.defaultLoadJobTypeList();
              } else {
                bootbox.alert({
                  message: '服务器内部错误, 工种信息添加失败!'
                });
              }
            });
        }).catch(() => {

        });
    },
    // 删除工种信息
    deleteJobType (jobId) {
      let self = this;

      bootbox.confirm({
        message: '工种信息一旦删除，不可恢复，是否确定删除？',
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
            axios.delete('/base/jobtype/', { params: { 'jobId': jobId }})
                  .then((response) => {
                    let { meta, data } = response.data;

                    if (meta.success) {
                      if (data && data.result == 1) { bootbox.alert({ message: '工种信息删除成功!' }); }
                                               else { bootbox.alert({ message: '工种信息删除失败!' }); }
                      $("input[name='jobType']:checked").each(function() { this.checked = false; });
                      self.defaultLoadJobTypeList();
                    } else { bootbox.alert({message: meta.message }); }
                  });
          }
        }
      });
    },
    // 修改工种信息
    updateJobType () {
      let self = this;

      this.$validator.validateAll('update_job_form').then(() => {

      axios.put('/base/jobtype/', self.jobType)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                  if (data && data.result == 1) { bootbox.alert({ message: '工种信息修改成功!' }); }
                                           else { bootbox.alert({ message: '工种信息修改失败!' }); }
                  $("#update_job_modal").modal('hide');
                  $("input[name='jobType']:checked").each(function() { this.checked = false; });
                  self.defaultLoadJobTypeList();
              } else { bootbox.alert({ message: meta.message }); }
            });
          }).catch(() => {

          });
    }
    /**
     * End job type operation.
     */
  }
};
</script>

<style lang="css" scoped>
#job {
  width: 100%;
}
</style>
