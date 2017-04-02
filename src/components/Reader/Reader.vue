<template lang="html">
  <div class="reader">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">分站管理</li>
      </ol>
    </div>
    <main>
      <div class="title-box">
        <h3>分站管理</h3>
      </div>
      <div class="search-bar-box sidebar sidebar-left">
        <div class="search-bar">
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" name="">
                <option value="">- 请选择位置类型 -</option>
                <option value="">井口</option>
                <option value="">普通</option>
                <option value="">危险区域</option>
                <option value="">重点区域</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">分站名称</span>
              <input type="text" class="form-control refresh">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">分站IP</span>
              <input type="text" class="form-control refresh">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" name="">
                <option value="">- 请选择分站状态 -</option>
                <option value="">正常</option>
                <option value="">异常</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" name="">
                <option value="">- 请选择所属区域 -</option>
                <option value="">井口</option>
                <option value="">A平面</option>
                <option value="">B平面</option>
                <option value="">C平面</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-button">
              <button type="button" class="btn btn-default" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-button">
              <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <div class="btn-box">
          <div class="fl">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_reader_modal">添加</button>
            <button type="button" class="btn btn-primary">修改</button>
            <button type="button" class="btn btn-primary">删除</button>
          </div>
          <div class="fr">
            <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-export"></i>导出</button>
            <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-print"></i>打印</button>
          </div>
        </div>
        <div class="data-box content-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th><input type="checkbox" name="allReader" value=""></th>
                <th>序号</th>
                <th>分站ID</th>
                <th>分站名称</th>
                <th>安装位置</th>
                <th>安装坐标</th>
                <th>位置类型</th>
                <th>分站状态</th>
                <th>供电方式</th>
                <th>分站IP</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(elem, index) in readerList" :key="elem.key">
                <td><input type="checkbox" name="reader" :value="elem.readerId"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ elem.readerId }}</td>
                <td>{{ elem.readerName }}</td>
                <td>{{ elem.readerLocation }}</td>
                <td>{{ elem.readerPosition }}</td>
                <td>{{ elem.locationType }}</td>
                <td>{{ elem.readerState }}</td>
                <td>{{ elem.powerSupply }}</td>
                <td>{{ elem.readerIP }}</td>
                <td>
                  <a href="javascript: void(0);" title="参数配置"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="地图标注"><i class="glyphicon glyphicon-screenshot"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="地图查看"><i class="glyphicon glyphicon-globe"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <div class="sidebar_toggle_box">
        <a id="sidebarToggle" title="查询条件"><i class="glyphicon glyphicon-triangle-right"></i></a>
    </div>

    <!-- 添加分站模态框 -->
    <div class="modal fade" id="add_reader_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加分站</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reader',
  data () {
    return {
      readerList: [
        {
          readerId: '10001',
          readerName: '分站1',
          readerLocation: '区域1',
          readerPosition: '(120.38, 130.49)',
          locationType: '重点区域',
          readerState: '正常',
          powerSupply: '交流电',
          readerIP: '192.168.2.113'
        },
        {
          readerId: '10001',
          readerName: '分站1',
          readerLocation: '区域1',
          readerPosition: '(120.38, 130.49)',
          locationType: '重点区域',
          readerState: '正常',
          powerSupply: '交流电',
          readerIP: '192.168.2.113'
        },
        {
          readerId: '10001',
          readerName: '分站1',
          readerLocation: '区域1',
          readerPosition: '(120.38, 130.49)',
          locationType: '重点区域',
          readerState: '正常',
          powerSupply: '交流电',
          readerIP: '192.168.2.113'
        },
        {
          readerId: '10001',
          readerName: '分站1',
          readerLocation: '区域1',
          readerPosition: '(120.38, 130.49)',
          locationType: '重点区域',
          readerState: '正常',
          powerSupply: '交流电',
          readerIP: '192.168.2.113'
        },
        {
          readerId: '10001',
          readerName: '分站1',
          readerLocation: '区域1',
          readerPosition: '(120.38, 130.49)',
          locationType: '重点区域',
          readerState: '正常',
          powerSupply: '交流电',
          readerIP: '192.168.2.113'
        }
      ]
    };
  },
  mounted () {

  },
  methods: {
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    }
  }
};
</script>

<style lang="css" scoped>
#reader {
  width: 100%;
}
</style>
