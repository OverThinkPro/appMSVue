<template lang="html">
  <div class="dictionary">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">系统管理</li>
        <li><router-link to="/Dictionary">字典管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box" style="margin-bottom: 0;">
        <h3>字典管理</h3>
      </div>
      <div class="table-box outside-box" style="margin-top: 5px;">
        <div class="table-box-left fl">
          <div class="title-box content-box">
            <h5>字典列表</h5>
          </div>
          <ul id="dictionaryTree" class="ztree"></ul>
        </div>
        <div class="table-box-right outside-box fr">
          <div class="search-bar-box">
            <div class="search-bar">
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">字典名称</span>
                <input type="text" class="form-control refresh" id="dictionaryNameParam">
              </div>
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">字典编号</span>
                <input type="text" class="form-control refresh"  id="dictionaryIdParam">
              </div>
              <div class="input-group search-bar-input fl">
                <select class="form-control refresh" name="" id="dictionaryInUseParam">
                    <option value="">- 是否启用 -</option>
                    <option value="1">启用</option>
                    <option value="0">禁用</option>
                </select>
              </div>
              <div class="input-group btn-group fr">
                <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
                <button type="button" class="btn btn-primary"  @click="defaultLoadDictionaryTable()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
              </div>
            </div>
          </div>
          <div class="search-hr"></div>
          <div class="btn-box" style="margin-bottom: 0;">
            <div class="fl">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="" @click="checkSelect('UPDATE_DICTIONARY')">修改</button>
              <button type="button" class="btn btn-primary"  @click="checkSelect('DELETE_MODULE')">批量删除</button>
            </div>
            <!-- <div class="fr">
              <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-export"></i>导出</button>
              <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-print"></i>打印</button>
            </div> -->
          </div>
          <div class="table-box data-box">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th><input type="checkbox" name="allDictionary" v-model="checked" @click="selectAllDictionaryCheckbox()"></th>
                  <th>序号</th>
                  <th>字典编号</th>
                  <th>字典名称</th>
                  <th>是否启用</th>
                  <th>数据类型</th>
                  <th>字典描述</th>
                  <th>字典等级</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(elem, index) in dictionaryListCache.dictionaryList" :key="elem.key">
                  <td><input type="checkbox" name="dictionary" :value="elem.dictionaryId" /></td>
                  <td>{{ index + 1 }}</td>
                  <td>{{ elem.dictionaryId }}</td>
                  <td>{{ elem.dictionaryName }}</td>
                  <td v-if="elem.inUse ==='1'">启用</td>
                  <td v-else>禁用</td>
                  <td>{{ elem.dataType }}</td>
                  <td>{{ elem.description }}</td>
                  <td v-if="elem.baseDic ==='1'">基本数据字典</td>
                  <td v-else>非基本数据字典</td>
                </tr>
              </tbody>
            </table>
            <nav class="pagination-box" id="dictionaryPagingBox">
              <div id="dictionaryPaging" class="pagination"></div>
            </nav>
          </div>
        </div>
      </div>
    </main>
    <!-- 添加字典模态框 -->
    <div class="modal fade" id="add_dictionary_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加字典信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">上级字典编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="dictionaryNew.upDictionaryId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上级字典名称</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="dictionaryNew.upDictionaryName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">字典编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="dictionaryNew.dictionaryId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">字典名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="dictionaryNew.dictionaryName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">英语名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="dictionaryNew.englishName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                    <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="dictionaryNew.inUse">
                    <span>启用</span>
                    <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="dictionaryNew.inUse">
                    <span>禁用</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">数据类型</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="dictionaryNew.dataType">
                    <option value="字符型">字符型</option>
                    <option value="整型">整型</option>
                    <option value="单精度浮点型">单精度浮点型</option>
                    <option value="双精度浮点型">双精度浮点型</option>
                    <option value="布尔型">布尔型</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">字典等级</div>
                <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="dictionaryNew.baseDic">
                  <span>基本数据字典</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="dictionaryNew.baseDic">
                  <span>非基本数据字典</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">字典描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="dictionaryNew.description">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">备注</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="dictionaryNew.remark">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addDictionary()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改字典模态框 -->
    <div class="modal fade" id="update_dictionary_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改字典信息</h4>
          </div>
          <div class="modal-body">
            <div class="input-group-line">
              <div class="group-left">上级字典编号</div>
              <div class="group-right">
                <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="dictionaryOld.upDictionaryId">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">上级字典名称</div>
              <div class="group-right">
                <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="dictionaryOld.upDictionaryName
                ">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">字典编号</div>
              <div class="group-right">
                <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="dictionaryOld.dictionaryId">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">字典名称</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="dictionaryOld.dictionaryName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">英语名称</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="dictionaryOld.englishName">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">是否启用</div>
              <div class="group-right" v-if="upDictionaryInUse">
                <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="dictionaryOld.inUse" >
                <span>启用</span>
                <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="dictionaryOld.inUse">
                <span>禁用</span>
              </div>
              <div class="group-right" v-else>
                <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="dictionaryOld.inUse" disabled>
                <span>启用</span>
                <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="dictionaryOld.inUse" disabled>
                <span>禁用</span>
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">数据类型</div>
              <div class="group-right">
                <select class="form-control refresh" name="" v-model="dictionaryOld.dataType">
                  <option value="字符型">字符型</option>
                  <option value="整型">整型</option>
                  <option value="单精度浮点型">单精度浮点型</option>
                  <option value="双精度浮点型">双精度浮点型</option>
                  <option value="布尔型">布尔型</option>
                </select>
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">字典等级</div>
              <div class="group-right">
                <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="dictionaryOld.baseDic">
                <span>基本数据字典</span>
                <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="dictionaryOld.baseDic">
                <span>非基本数据字典</span>
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">字典描述</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="dictionaryOld.description">
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">备注</div>
              <div class="group-right">
                <input class="form-control refresh" type="text" name="" v-model="dictionaryOld.remark">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateDictionary()">保存</button>
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
import ztree from '../../assets/script/ztree/jquery.ztree.core.min';
import exedit from '../../assets/script/ztree/jquery.ztree.exedit.min'
export default {
  name: 'dictionary',
  data () {
    return {
      /*dictionaryStatusCode: ['0','1'],
      dictionaryStatusName: ['启用', '禁用'],*/
      dictionaryNew:{},
      dictionaryOld:{},
      upDictionaryInUse:true,
      baseDicIsSelected:false,
      dictionaryTreeCache:{
        dictionaryList: []
      },
      dictionaryListCache: {
        dictionaryList: [],
        total: 0
      },
      checked: false,
      upDictionaryId: '1',
      treeSetting: {
        view: {
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom,
          selectedMulti: false,      
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "dictionaryId",
            pIdKey: "upDictionaryId",
            rootPId: 1
          },
          key: {
            name: 'dictionaryName'
          }
        },
        edit: {
          enable: true, 
          showRemoveBtn: this.showRemoveBtn,
          showRenameBtn: this.showRenameBtn,
          removeTitle: "删除节点",
          renameTitle: "编辑节点名称",
        },
        callback: {
          onClick: this.zTreeOnClick,
          beforeRemove: this.beforeRemove,  
          beforeEditName: this.beforeEditName,
        },
      },
    }
  },
  mounted () {
    this.initEvent();
    this.defaultLoadDictionaryTree();
    this.defaultLoadDictionaryTable();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_dictionary_modal").on('show.bs.modal', function() {
      });
    },

    /* 重置 */
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      $("input[name='dictionary']:checked").each(function() { this.checked = false; });
    },

    // 默认装载部门树
    defaultLoadDictionaryTree () {
      let self = this;
      axios.get('/base/dictionary/dictionaryTree').then((response) => {
        let {meta, data} = response.data;
        if (meta.success) {
          if (data) {
            self.dictionaryTreeCache.dictionaryList = data.dictionaryList;
            let zNodes = data.dictionaryList;
            zNodes[0].open = true;
            $.fn.zTree.init($("#dictionaryTree"), self.treeSetting, zNodes);
            //var treeObj = $.fn.zTree.getZTreeObj("dictionaryTree"); 
            //treeObj.expandAll(true); 
          }
        }
      });
    },
    /* 点击树节点的触发事件 */
    zTreeOnClick (event, treeId, treeNode) {
      let self = this;
      initPagination('dictionaryPagingBox', 'dictionaryPaging');
      self.upDictionaryId = treeNode.dictionaryId;
      self.loadDictionaryListPagingByUpDictionary(null);
    },

     /* 点击上级节点获得分页后的子字典列表信息 */
    loadDictionaryListPagingByUpDictionary(page, isPaging) {
      let self = this;
      page = page || 1;
      axios.get('/base/dictionary/up/' + self.upDictionaryId + '/p/' + page).then((response) => {
        let {meta,data} = response.data;
        if (meta.success && data) {
            self.dictionaryListCache.dictionaryList = data.dictionaryList;
            self.dictionaryListCache.total = data.totalCounts;
            if (!isPaging) {
              $("#dictionaryPaging").page({
                total: self.dictionaryListCache.total,
                pageSize: 10,
                prevBtnText: '上一页',
                nextBtnText: '下一页',
                showInfo: true,
                infoFormat: '{start} ~ {end}条，共{total}条',
              }).on("pageClicked", function (event, pageNumber) {
                self.loadDictionaryListPagingByUpDictionary(pageNumber + 1, true);
              });
            }
        } else {
          bootbox.alert({
            title:'查看字典信息',
            message: meta.message
          });
        }
      });
    },

    /* 决定删除按钮/图标是否显示，这里的根节点决定不显示 */
    showRemoveBtn(treeId, treeNode) {
      if(treeNode.dictionaryId=="1"){
        return false;
      }else{
        return true;
      }
    },

    /* 决定重命名按钮/图标是否显示，这里的根节点决定不显示  */
    showRenameBtn(treeId, treeNode) {
      if(treeNode.dictionaryId=="1"){
        return false;
      }else{
        return true;
      }
    },
        /* 修改节点信息 */
    beforeEditName(treeId, treeNode) {
      let self = this;
      self.clickUpdateDictionary(treeNode.dictionaryId);
    },
  
    /* 删除节点信息 */
    beforeRemove(treeId, treeNode) {
      let self = this;
      self.deleteDictionary(treeNode.dictionaryId);
      return false;
    },

    /* 添加按钮显示*/
    addHoverDom(treeId, treeNode) {
      let self = this;
      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) { return; }
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='add node' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_" + treeNode.tId);
      if (btn) {
        btn.bind("click", function() {
          let zTree = $.fn.zTree.getZTreeObj("dictionaryTree");
          zTree.selectNode(treeNode);
          axios.get('/base/dictionary/up/' + treeNode.dictionaryId).then((response) => {
            let {meta, data} = response.data;
            if (meta.success) {
              if (data) {
                self.dictionaryNew={};
                self.dictionaryNew.upDictionaryId = treeNode.dictionaryId;
                self.dictionaryNew.upDictionaryName = treeNode.dictionaryName;
                self.dictionaryNew.dictionaryId = data.currentDictionaryId;
                self.dictionaryNew.inUse = '1';
                self.dictionaryNew.baseDic = '0'; //默认是非基础数据字典
              }
              $("#add_dictionary_modal").modal('show');
            } else {
              bootbox.alert({title:'新增字典', message: '新增字典编号生成失败!'})
            }
          });
        });
      }
    },
    
    /* 添加按钮不显示*/
    removeHoverDom (treeId, treeNode) {
      $("#addBtn_" + treeNode.tId).unbind().remove();
    },

    /* 得到查询条件 */
    getSearchParam () {
      let params = {}, dictionaryName,dictionaryId, inUse;
      dictionaryName = $("#dictionaryNameParam").val();
      if (dictionaryName) { params.dictionaryName = dictionaryName; }
      dictionaryId = $("#dictionaryIdParam").val();
      if (dictionaryId) { params.dictionaryId = dictionaryId; }
      inUse = $("#dictionaryInUseParam").find("option:selected").val();
      if (inUse) { params.inUse = inUse; }
      return params;
    },

    /* 分页 */
    defaultLoadDictionaryTable () {
      initPagination('dictionaryPagingBox', 'dictionaryPaging');
      this.loadDictionaryListPagingByCondition(null);
    },

    /* 获得分页后的字典列表信息 */
    loadDictionaryListPagingByCondition(page, isPaging) {
      let self = this;
      let params = self.getSearchParam();
      page = page || 1;
      axios.post('/base/dictionary/p/' + page, params).then((response) => {
        let {meta,data} = response.data;
        if (meta.success && data) {
            self.dictionaryListCache.dictionaryList = data.dictionaryList;
            self.dictionaryListCache.total = data.totalCounts;
            //alert("page"+page);
            if (!isPaging) {
              $("#dictionaryPaging").page({
                total: self.dictionaryListCache.total,
                pageSize: 10,
                prevBtnText: '上一页',
                nextBtnText: '下一页',
                showInfo: true,
                infoFormat: '{start} ~ {end}条，共{total}条',
              }).on("pageClicked", function (event, pageNumber) {
                self.loadDictionaryListPagingByCondition(pageNumber + 1, true);
              });
            }
        } else {
          bootbox.alert({ title:'查看字典信息', message: meta.message });
        }
      });
    },
    /* 添加一个新的字典 */
    addDictionary() {
      let self = this;
      axios.post('/base/dictionary', self.dictionaryNew).then((response) => {
        let meta = response.data.meta;
        if (meta.success) {
          let data = response.data.data;
          if (data && data.result == 1) { 
            bootbox.alert({ title:'添加字典信息', message: '字典信息添加成功!' }); 
          }else { 
            bootbox.alert({ title:'添加字典信息', message: '字典信息添加失败!' }); 
          }
          $("#add_dictionary_modal").modal('hide');
          self.defaultLoadDictionaryTree();
          self.defaultLoadDictionaryTable();
        } else {
          bootbox.alert({ title:'添加字典信息', message: '服务器内部错误, 字典信息添加失败!'});
        }
      });
    },
    
    /* 选择要批量删除的字典信息 */
    checkSelect (type) {
      let self = this;
      let size = $("input[name='dictionary']").filter(':checked').length;
      if (size < 1) {
        bootbox.alert({ title:'选择字典', message: '请选择一条记录,再进行操作!'});
        return;
      }else if (size == 1) {
        let dictionaryId = '';
        $("input[name='dictionary']:checked").each(function() {
          dictionaryId += $(this).val();
        });
        if (type == 'UPDATE_DICTIONARY') {
          self.clickUpdateDictionary(dictionaryId);
        }else{
          self.deleteDictionary(dictionaryId);
        }
      }else{
        if (type == 'UPDATE_DICTIONARY') {
          bootbox.alert({ title:'选择字典', message: '只能选择一项进行修改,请重试!'});
          return;
        }else{
          self.getDeleteIds();
        }
       
      }
    },
    /* 获得要批量删除的字典编号 */
    getDeleteIds(){
      let self = this;
      let dictionaryIds = '';
      self.baseDicIsSelected = false;
      $("input[name='dictionary']:checked").each(function() {
        dictionaryIds += $(this).val() + ',';
        if($(this).closest("tr").find("td:last").text()=="基本数据字典"){
          self.baseDicIsSelected = true;
        }
      });
      dictionaryIds = dictionaryIds.substring(0, dictionaryIds.length-1);
      this.deleteDictionary(dictionaryIds);
    },

    /* 删除字典信息 */
    deleteDictionary(dictionaryIds){
      let self = this;
      if(dictionaryIds.indexOf(",")==-1){
        self.dictionaryTreeCache.dictionaryList.forEach((dictionary, index) => {
          if (dictionary.dictionaryId ==  dictionaryIds) {
            if(dictionary.baseDic == "1"){
              self.baseDicIsSelected = true;
            }else{
              self.baseDicIsSelected = false;
            }
          }
        });
      }
      if(self.baseDicIsSelected){
        bootbox.alert({ title:'删除字典信息', message: '基本数据字典禁止删除，请重新选择非基本数据字典进行删除!' }); 
      }else{
        bootbox.confirm({
          title: '删除字典',
          message: '字典信息一旦删除，不可恢复，是否确定删除？',
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
              axios.delete('/base/dictionary/', { params: { 'dictionaryIds': dictionaryIds }}).then((response) => {
                let { meta, data } = response.data;
                if (meta.success) {
                  if (data && data.result) { 
                    bootbox.alert({ title:'删除字典信息', message: '字典信息删除成功!' }); 
                  }else { 
                    bootbox.alert({ title:'删除字典信息', message: '字典信息删除失败!' }); 
                  }
                  $("input[name='dictionary']:checked").each(function() { this.checked = false; });
                  self.defaultLoadDictionaryTree();
                  self.defaultLoadDictionaryTable();
                } else { 
                  bootbox.alert({ title:'删除字典信息', message: meta.message }); 
                }
              });
            }
          }
        });
      }
    },
    /* 点击修改按钮 */
    clickUpdateDictionary(dictionaryId){
      let self = this;
      self.dictionaryOld={};
      self.dictionaryTreeCache.dictionaryList.forEach((dictionary, index) => {
        if (dictionary.dictionaryId == dictionaryId) {
          self.dictionaryOld = deepCopy(dictionary);
          delete self.dictionaryOld.uber;
        }
      });
       self.dictionaryTreeCache.dictionaryList.forEach((dictionary, index) => {
        if (dictionary.dictionaryId ==  self.dictionaryOld.upDictionaryId) {
          if(dictionary.dictionaryId=='1' || dictionary.inUse=='1'){
            self.upDictionaryInUse = true;
          }else{
            self.upDictionaryInUse = false;
          }
        }
      });
      $("#update_dictionary_modal").modal('show');
    },

    /* 修改并更新字典信息 */
    updateDictionary () {
      let self = this;
      axios.put('/base/dictionary/', self.dictionaryOld).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
            if (data && data.result >= 1) { 
              bootbox.alert({ title:'修改字典信息', message: '字典信息修改成功!' }); 
            }else { 
              bootbox.alert({ title:'修改字典信息', message: '字典信息修改失败!' }); 
            }
            $("#update_dictionary_modal").modal('hide');
            $("input[name='dictionary']:checked").each(function() { this.checked = false; });
            self.defaultLoadDictionaryTree();
            self.defaultLoadDictionaryTable();
        } else { 
          bootbox.alert({ title:'修改字典信息', message: meta.message }); 
        }
      });
    },

    /* 复选框全选 */
    selectAllDictionaryCheckbox(){
        //如果当前点击的多选框被选中
        if(this.checked){        
          $('input[type=checkbox][name=dictionary]').prop("checked", true );
        }else{                
          $('input[type=checkbox][name=dictionary]').prop("checked", false );
        }
    },
    
  }
}
</script>

<style lang="css" scoped>
#dictionary {
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
