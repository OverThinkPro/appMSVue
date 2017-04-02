<template lang="html">
  <div id="unit">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">人员管理</li>
        <li><router-link to="/Unit">部门管理</router-link></li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>部门管理</h3>
      </div>
      <div class="table-box outside-box">
        <div class="table-box-left fl">
          <div class="title-box content-box">
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
                <span class="input-group-addon">部门编号</span>
                <input type="text" class="form-control">
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
              <button type="button" class="btn btn-primary">添加</button>
              <button type="button" class="btn btn-primary">修改</button>
              <button type="button" class="btn btn-primary">删除</button>
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
  </div>
</template>

<script>
export default {
  name: 'unit',
  data () {
    return {
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

  },
  methods: {
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
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
