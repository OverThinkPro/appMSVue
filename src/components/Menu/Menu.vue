<template lang="html">
  <div class="menu">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">系统管理</li>
        <li><router-link to="/Menu">菜单管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box" style="margin-bottom: 0;">
        <h3>菜单管理</h3>
      </div>
      <div class="table-box outside-box" style="margin-top: 5px;">
        <div class="table-box-left fl">
          <div class="title-box content-box">
            <h5>菜单列表</h5>
          </div>
          <ul id="moduleTree" class="ztree"></ul>
        </div>
        <div class="table-box-right outside-box fr">
          <div class="search-bar-box">
            <div class="search-bar">
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">菜单名称</span>
                <input type="text" class="form-control refresh" id="moduleNameParam">
              </div>
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">菜单编号</span>
                <input type="text" class="form-control refresh" id="moduleIdParam">
              </div>
              <div class="input-group search-bar-input fl">
                <select class="form-control refresh" name="" id="moduleInUseParam">
                    <option value="">- 是否启用 -</option>
                    <option value="1">启用</option>
                    <option value="0">禁用</option>
                </select>
              </div>
              <div class="input-group btn-group fr">
                <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
                <button type="button" class="btn btn-primary" @click="defaultLoadModuleTable()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
              </div>
            </div>
          </div>
          <div class="search-hr"></div>
          <div class="btn-box" style="margin-bottom: 0;">
            <div class="fl">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="" @click="checkSelect('UPDATE_MODULE')">修改</button>
              <button type="button" class="btn btn-primary" @click="checkSelect('DELETE_MODULE')">批量删除</button>
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
                  <th><input type="checkbox" name="allMenu" v-model="checked" @click="selectAllModuleCheckbox()"></th>
                  <th>序号</th>
                  <th>菜单编号</th>
                  <th>菜单名称</th>
                  <th>是否启用</th>
                  <th>菜单URL</th>
                  <th>菜单描述</th>
                  <th>菜单等级</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(module, index) in moduleListCache.moduleList" :key="module.key">
                  <td><input type="checkbox" name="menu" :value="module.moduleId" /></td>
                  <td>{{ index + 1 }}</td>
                  <td>{{ module.moduleId }}</td>
                  <td>{{ module.moduleName }}</td>
                  <td v-if="module.inUse ==='1'">启用</td>
                  <td v-else>禁用</td>
                  <td>{{ module.moduleUrl }}</td>
                  <td>{{ module.description }}</td>
                  <td v-if="module.baseModule ==='1'">基本模块</td>
                  <td v-else>非基本模块</td>
                </tr>
              </tbody>
            </table>
            <nav class="pagination-box" id="modulePagingBox">
              <div id="modulePaging" class="pagination"></div>
            </nav>
          </div>
        </div>
      </div>
    </main>

    <!-- 添加菜单模态框 -->
    <div class="modal fade" id="add_menu_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加菜单信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">上级菜单编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuNew.upModuleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上级菜单名称</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuNew.upModuleName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuNew.moduleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuNew.moduleName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="menuNew.inUse">
                  <span>启用</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="menuNew.inUse">
                  <span>禁用</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单URL</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuNew.moduleUrl">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">功能等级</div>
                <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="menuNew.baseModule">
                  <span>基本模块</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="menuNew.baseModule">
                  <span>非基本模块</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuNew.description">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addModule()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改菜单模态框 -->
    <div class="modal fade" id="update_menu_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改菜单信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="input-group-line">
                <div class="group-left">上级菜单编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuOld.upModuleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">上级菜单名称</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuOld.upModuleName
                  ">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单编号</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disabled" type="text" name="" v-model="menuOld.moduleId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuOld.moduleName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">是否启用</div>
                <div class="group-right" v-if="upMenuInUse">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="menuOld.inUse" >
                  <span>启用</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="menuOld.inUse">
                  <span>禁用</span>
                </div>
                <div class="group-right" v-else>
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="menuOld.inUse" disabled>
                  <span>启用</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="menuOld.inUse" disabled>
                  <span>禁用</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单URL</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuOld.moduleUrl">
                </div>
              </div>
               <div class="input-group-line">
                <div class="group-left">功能等级</div>
                <div class="group-right">
                  <input class="refresh" style="margin-left: 2%;" checked="checked" type="radio" value="1" v-model="menuOld.baseModule">
                  <span>基本模块</span>
                  <input class="refresh" style="margin-left: 10%;" type="radio" value="0" v-model="menuOld.baseModule">
                  <span>非基本模块</span>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">菜单描述</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="menuOld.description">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn"  @click="updateModule()">保存</button>
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
  name: 'module',
  data () {
    return {
      /*moduleStatusCode: ['0','1'],
      moduleStatusName: ['启用', '禁用'],*/
      menuNew:{},
      menuOld:{},
      upMenuInUse:true,
      baseModuleIsSelected:false,
      moduleTreeCache:{
        moduleList: []
      },
      moduleListCache: {
        moduleList: [],
        total: 0
      },
      checked: false,
      upModuleId: '1',
      treeSetting: {
        view: {
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom,
          selectedMulti: false,      
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "moduleId",
            pIdKey: "upModuleId",
            rootPId: 1
          },
          key: {
            name: 'moduleName'
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
    this.defaultLoadModuleTree();
    this.defaultLoadModuleTable();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_menu_modal").on('show.bs.modal', function() {
      });
    },

    /* 重置 */
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      $("input[name='menu']:checked").each(function() { this.checked = false; });
    },

    // 默认装载部门树
    defaultLoadModuleTree () {
      let self = this;
      axios.get('/base/module/moduleTree').then((response) => {
        let {meta, data} = response.data;
        if (meta.success) {
          if (data) {
            self.moduleTreeCache.moduleList = data.moduleList;
            let zNodes = data.moduleList;
            zNodes[0].open = true;
            $.fn.zTree.init($("#moduleTree"), self.treeSetting, zNodes);
            //var treeObj = $.fn.zTree.getZTreeObj("moduleTree"); 
            //treeObj.expandAll(true); 
          }
        }
      });
    },
    /* 点击树节点的触发事件 */
    zTreeOnClick (event, treeId, treeNode) {
      let self = this;
      initPagination('modulePagingBox', 'modulePaging');
      self.upModuleId = treeNode.moduleId;
      self.loadModuleListPagingByUpModule(null);
    },

     /* 点击上级节点获得分页后的子菜单列表信息 */
    loadModuleListPagingByUpModule(page, isPaging) {
      let self = this;
      page = page || 1;
      axios.get('/base/module/up/' + self.upModuleId + '/p/' + page).then((response) => {
        let {meta,data} = response.data;
        if (meta.success && data) {
            self.moduleListCache.moduleList = data.moduleList;
            self.moduleListCache.total = data.totalCounts;
            if (!isPaging) {
              $("#modulePaging").page({
                total: self.moduleListCache.total,
                pageSize: 10,
                prevBtnText: '上一页',
                nextBtnText: '下一页',
                showInfo: true,
                infoFormat: '{start} ~ {end}条，共{total}条',
              }).on("pageClicked", function (event, pageNumber) {
                self.loadModuleListPagingByUpModule(pageNumber + 1, true);
              });
            }
        } else {
          bootbox.alert({ title:'查看菜单信息', message: meta.message});
        }
      });
    },

    /* 决定删除按钮/图标是否显示，这里的根节点决定不显示 */
    showRemoveBtn(treeId, treeNode) {
      if(treeNode.moduleId=="1"){
        return false;
      }else{
        return true;
      }
    },

    /* 决定重命名按钮/图标是否显示，这里的根节点决定不显示  */
    showRenameBtn(treeId, treeNode) {
      if(treeNode.moduleId=="1"){
        return false;
      }else{
        return true;
      }
    },
        /* 修改节点信息 */
    beforeEditName(treeId, treeNode) {
      let self = this;
      self.clickUpdateModule(treeNode.moduleId);
    },
  
    /* 删除节点信息 */
    beforeRemove(treeId, treeNode) {
      let self = this;
      self.deleteModule(treeNode.moduleId);
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
          let zTree = $.fn.zTree.getZTreeObj("moduleTree");
          zTree.selectNode(treeNode);
          axios.get('/base/module/up/' + treeNode.moduleId).then((response) => {
            let {meta, data} = response.data;
            if (meta.success) {
              if (data) {
                self.menuNew={};
                self.menuNew.upModuleId = treeNode.moduleId;
                self.menuNew.upModuleName = treeNode.moduleName;
                self.menuNew.moduleId = data.currentModuleId;
                self.menuNew.inUse = '1'; //默认是启用
                self.menuNew.moduleUrl = '/';
                self.menuNew.baseModule = '0'; //默认是非基础模块
              }
              $("#add_menu_modal").modal('show');
            } else {
              bootbox.alert({title:'新增菜单', message: '新增菜单编号生成失败!'})
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
      let params = {}, moduleName,moduleId, inUse;
      moduleName = $("#moduleNameParam").val();
      if (moduleName) { params.moduleName = moduleName; }
      moduleId = $("#moduleIdParam").val();
      if (moduleId) { params.moduleId = moduleId; }
      inUse = $("#moduleInUseParam").find("option:selected").val();
      if (inUse) { params.inUse = inUse; }
      return params;
    },

    /* 分页 */
    defaultLoadModuleTable () {
      initPagination('modulePagingBox', 'modulePaging');
      this.loadModuleListPagingByCondition(null);
    },

    /* 获得分页后的菜单列表信息 */
    loadModuleListPagingByCondition(page, isPaging) {
      let self = this;
      let params = self.getSearchParam();
      page = page || 1;
      axios.post('/base/module/p/' + page, params).then((response) => {
        let {meta,data} = response.data;
        if (meta.success && data) {
            self.moduleListCache.moduleList = data.moduleList;
            self.moduleListCache.total = data.totalCounts;
            //alert("page"+page);
            if (!isPaging) {
              $("#modulePaging").page({
                total: self.moduleListCache.total,
                pageSize: 10,
                prevBtnText: '上一页',
                nextBtnText: '下一页',
                showInfo: true,
                infoFormat: '{start} ~ {end}条，共{total}条',
              }).on("pageClicked", function (event, pageNumber) {
                self.loadModuleListPagingByCondition(pageNumber + 1, true);
              });
            }
        } else {
          bootbox.alert({ title:'查看菜单信息', message: meta.message });
        }
      });
    },
    /* 添加一个新的菜单 */
    addModule() {
      let self = this;
      axios.post('/base/module', self.menuNew).then((response) => {
        let meta = response.data.meta;
        if (meta.success) {
          let data = response.data.data;
          if (data && data.result == 1) { 
            bootbox.alert({ title:'添加菜单信息', message: '菜单信息添加成功!' }); 
          }else { 
            bootbox.alert({ title:'添加菜单信息', message: '菜单信息添加失败!' }); 
          }
          $("#add_menu_modal").modal('hide');
          self.defaultLoadModuleTree();
          self.defaultLoadModuleTable();
        } else {
          bootbox.alert({ title:'添加菜单信息', message: '服务器内部错误, 菜单信息添加失败!'});
        }
      });
    },
    
    /* 选择要批量删除的菜单信息 */
    checkSelect (type) {
      let self = this;
      let size = $("input[name='menu']").filter(':checked').length;
      if (size < 1) {
        bootbox.alert({ title:'选择菜单',  message: '请选择一条记录,再进行操作!'});
        return;
      }else if (size == 1) {
        let moduleId = '';
        $("input[name='menu']:checked").each(function() {
          moduleId += $(this).val();
        });
        if (type == 'UPDATE_MODULE') {
          self.clickUpdateModule(moduleId);
        }else{
          self.deleteModule(moduleId);
        }
      }else{
        if (type == 'UPDATE_MODULE') {
          bootbox.alert({ title:'选择菜单', message: '只能选择一项进行修改,请重试!'});
          return;
        }else{
          self.getDeleteIds();
        }
      }
    },
    /* 获得要批量删除的菜单编号 */
    getDeleteIds(){
      let self = this;
      let moduleIds = '';
      self.baseModuleIsSelected = false;
      $("input[name='menu']:checked").each(function() {
        moduleIds += $(this).val() + ',';
        if($(this).closest("tr").find("td:last").text()=="基本模块"){
          self.baseModuleIsSelected = true;
        }
      });
      moduleIds = moduleIds.substring(0, moduleIds.length-1);
      this.deleteModule(moduleIds);
    },

    /* 删除菜单信息 */
    deleteModule(moduleIds){
      let self = this;
      //alert(moduleIds.indexOf(","));
      if(moduleIds.indexOf(",")==-1){
        self.moduleTreeCache.moduleList.forEach((module, index) => {
          if (module.moduleId ==  moduleIds) {
            if(module.baseModule == "1"){
              self.baseModuleIsSelected = true;
            }else{
              self.baseModuleIsSelected = false;
            }
          }
        });
      }
      if(self.baseModuleIsSelected){
        bootbox.alert({ title:'删除菜单信息', message: '基本模块禁止删除，请重新选择非基本模块进行删除!' }); 
      }else{
        bootbox.confirm({
          title: '删除菜单',
          message: '菜单信息一旦删除，不可恢复，是否确定删除？',
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
              axios.delete('/base/module/', { params: { 'moduleIds': moduleIds }}).then((response) => {
                let { meta, data } = response.data;
                if (meta.success) {
                  if (data && data.result ) { 
                    bootbox.alert({ title:'删除菜单信息', message: '菜单信息删除成功!' }); 
                  }else { 
                    bootbox.alert({ title:'删除菜单信息', message: '菜单信息删除失败!' }); 
                  }
                  $("input[name='menu']:checked").each(function() { this.checked = false; });
                  self.defaultLoadModuleTree();
                  self.defaultLoadModuleTable();
                } else { 
                  bootbox.alert({ title:'删除菜单信息', message: meta.message }); 
                }
              });
            }
          }
        });
      }
    },
    /* 点击修改按钮 */
    clickUpdateModule(moduleId){
      let self = this;
      self.menuOld={};
      self.moduleTreeCache.moduleList.forEach((module, index) => {
        if (module.moduleId == moduleId) {
          self.menuOld = deepCopy(module);
          delete self.menuOld.uber;
        }
      });
      self.moduleTreeCache.moduleList.forEach((module, index) => {
        if (module.moduleId ==  self.menuOld.upModuleId) {
          if(module.moduleId=='1' || module.inUse=='1'){
            self.upMenuInUse = true;
          }else{
            self.upMenuInUse = false;
          }
        }
      });
      $("#update_menu_modal").modal('show');
    },

    /* 修改并更新菜单信息 */
    updateModule () {
      let self = this;
      axios.put('/base/module/', self.menuOld).then((response) => {
        let { meta, data } = response.data;
        if (meta.success) {
            if (data && data.result >= 1) { 
              bootbox.alert({ title:'修改菜单信息', message: '菜单信息修改成功!' }); 
            }else { 
              bootbox.alert({ title:'修改菜单信息', message: '菜单信息修改失败!' }); 
            }
            $("#update_menu_modal").modal('hide');
            $("input[name='menu']:checked").each(function() { this.checked = false; });
            self.defaultLoadModuleTree();
            self.defaultLoadModuleTable();
        } else { 
          bootbox.alert({  title:'修改菜单信息',message: meta.message }); 
        }
      });
    },

    /* 复选框全选 */
    selectAllModuleCheckbox(){
        //如果当前点击的多选框被选中
        if(this.checked){        
          $('input[type=checkbox][name=menu]').prop("checked", true );
        }else{                
          $('input[type=checkbox][name=menu]').prop("checked", false );
        }
    },
    
  }
}
</script>

<style lang="css" scoped>
@import '../../assets/script/ztree/zTreeStyle.css';
#menu {
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
