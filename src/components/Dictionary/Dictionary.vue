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
        </div>
        <div class="table-box-right outside-box fr">
          <div class="search-bar-box">
            <div class="search-bar">
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">字典名称</span>
                <input type="text" class="form-control refresh">
              </div>
              <div class="input-group search-bar-input fl">
                <span class="input-group-addon">字典编号</span>
                <input type="text" class="form-control refresh">
              </div>
              <div class="input-group search-bar-input fl">
                <select class="form-control refresh" name="">
                    <option value="">- 是否启用 -</option>
                    <option value="">启用</option>
                    <option value="">禁用</option>
                </select>
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
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_dictionary_modal">添加</button>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#update_dictionary_modal">修改</button>
              <button type="button" class="btn btn-primary" @click="deleteDictionary()">删除</button>
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
                  <th><input type="checkbox" name="allDictionary"></th>
                  <th>序号</th>
                  <th>字典编号</th>
                  <th>字典名称</th>
                  <th>是否启用</th>
                  <th>数据类型</th>
                  <th>字典描述</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(elem, index) in dictionaryList" :key="elem.key">
                  <td><input type="checkbox" name="dictionary" :value="elem.dictionaryId" /></td>
                  <td>{{ index + 1 }}</td>
                  <td>{{ elem.dictionaryId }}</td>
                  <td>{{ elem.dictionaryName }}</td>
                  <td v-if="elem.inUse ==='1'">启用</td>
                  <td v-else>禁用</td>
                  <td>{{ elem.dataType }}</td>
                  <td>{{ elem.description }}</td>
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
                  <input type="radio" value="1" v-model="dictionaryNew.inUse" checked>启用
                  <input type="radio" value="0" v-model="dictionaryNew.inUse">禁用
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">数据类型</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="dictionaryNew.dataType">
                    <option value="String">String</option>
                    <option value="Date">Date</option>
                    <option value="Timestamp">Timestamp</option>
                  </select>
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
            <button type="button" class="btn btn-primary modal-btn">保存</button>
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
              <div class="group-right">
                <input type="radio" value="1" v-model="dictionaryOld.inUse" checked>启用
                <input type="radio" value="0" v-model="dictionaryOld.inUse">禁用
              </div>
            </div>
            <div class="input-group-line">
              <div class="group-left">数据类型</div>
              <div class="group-right">
                <select class="form-control refresh" name="" v-model="dictionaryOld.dataType">
                  <option value="String">String</option>
                  <option value="Date">Date</option>
                  <option value="Timestamp">Timestamp</option>
                </select>
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
  name: 'dictionary',
  data () {
    return {
      dictionaryNew:{},
      dictionaryOld:{},
      dictionaryList:[
        {'dictionaryId': '10', 'dictionaryName': '首页',  'upDictionaryId': '1','inUse': '1','description':'首页', 'dataType':'String', 'remark':'', 'englishName': 'Main',
         'children': [],
        },
        {'dictionaryId': '11', 'dictionaryName': '查询统计', 'upDictionaryId': '1', 'inUse': '1','description':'查询统计', 'dataType':'String', 'remark':'', 'englishName': '',
         'children': [
            {'dictionaryId': '1101', 'dictionaryName': '实时查询',  'upDictionaryId': '11','inUse': '1','description':'实时查询', 'dataType':'String', 'remark':'', 'englishName': 'Insearch',
             'children': [],
            },
            {'dictionaryId': '1102', 'dictionaryName': '历史报警查询',  'upDictionaryId': '11','inUse': '1','description':'历史报警查询', 'dataType':'String', 'remark':'', 'englishName': 'Alarm',
             'children': [],
            },
            {'dictionaryId': '1103', 'dictionaryName': '历史轨迹回放',  'upDictionaryId': '11','inUse': '1','description':'历史轨迹回放', 'dataType':'String', 'remark':'', 'englishName': 'Replay',
             'children': [],
            },
          ]
        },
        {'dictionaryId': '12', 'dictionaryName': '考勤管理', 'upDictionaryId': '1', 'inUse': '1','description':'考勤管理', 'dataType':'String', 'remark':'', 'englishName': '',
         'children': [
            {'dictionaryId': '1201', 'dictionaryName': '日考勤报表',  'upDictionaryId': '12','inUse': '1','description':'日考勤报表', 'dataType':'String', 'remark':'', 'englishName': 'Daily',
             'children': [],
            },
            {'dictionaryId': '1202', 'dictionaryName': '月考勤详情报表',  'upDictionaryId': '12','inUse': '1','description':'月考勤详情报表', 'dataType':'String', 'remark':'', 'englishName': 'Monthly',
             'children': [],
            },
            {'dictionaryId': '1203', 'dictionaryName': '月考勤统计报表',  'upDictionaryId': '12','inUse': '1','description':'月考勤统计报表', 'dataType':'String', 'remark':'', 'englishName': '',
             'children': [],
            },
          ],
        },
        {'dictionaryId': '13', 'dictionaryName': '人员管理', 'upDictionaryId': '1', 'inUse': '1','description':'人员管理', 'dataType':'String', 'remark':'', 'englishName': '',
         'children': [
            {'dictionaryId': '1301', 'dictionaryName': '菜单管理',  'upDictionaryId': '13','inUse': '1','description':'菜单管理', 'dataType':'String', 'remark':'', 'englishName': 'Unit',
             'children': [],
            },
            {'dictionaryId': '1302', 'dictionaryName': '员工管理',  'upDictionaryId': '13','inUse': '1','description':'员工管理', 'dataType':'String', 'remark':'', 'englishName': 'Staff',
             'children': [],
            },
            {'dictionaryId': '1303', 'dictionaryName': '工种管理',  'upDictionaryId': '13','inUse': '1','description':'员工管理', 'dataType':'String', 'remark':'', 'englishName': 'Job',
             'children': [],
            },
            {'dictionaryId': '1304', 'dictionaryName': '班次管理',  'upDictionaryId': '13','inUse': '1','description':'班次管理', 'dataType':'String', 'remark':'', 'englishName': 'Schedule',
             'children': [],
            },
          ],
        },
        {'dictionaryId': '14', 'dictionaryName': '定位卡管理',  'upDictionaryId': '1','inUse': '1','description':'定位卡管理', 'dataType':'String', 'remark':'', 'englishName': 'Card',
         'children': [],
        },
        {'dictionaryId': '15', 'dictionaryName': '分站管理',  'upDictionaryId': '1','inUse': '1','description':'分站管理', 'dataType':'String', 'remark':'', 'englishName': 'Reader',
         'children': [],
        },
        {'dictionaryId': '16', 'dictionaryName': '区域设置',  'upDictionaryId': '16','inUse': '1','description':'区域设置', 'dataType':'String', 'remark':'', 'englishName': 'Region',
         'children': [],
        },
        {'dictionaryId': '17', 'dictionaryName': '系统管理', 'upDictionaryId': '1', 'inUse': '1','description':'系统管理', 'dataType':'String', 'remark':'', 'englishName': '',
         'children': [
            {'dictionaryId': '1701', 'dictionaryName': '用户管理',  'upDictionaryId': '17','inUse': '1','description':'用户管理', 'dataType':'String', 'remark':'', 'englishName': 'User',
             'children': [],
            },
            {'dictionaryId': '1702', 'dictionaryName': '角色管理',  'upDictionaryId': '17','inUse': '1','description':'角色管理', 'dataType':'String', 'remark':'', 'englishName': 'Role',
             'children': [],
            },
            {'dictionaryId': '1703', 'dictionaryName': '菜单管理',  'upDictionaryId': '17','inUse': '1','description':'菜单管理', 'dataType':'String', 'remark':'', 'englishName': 'Menu',
             'children': [],
            },
            {'dictionaryId': '1703', 'dictionaryName': '字典管理',  'upDictionaryId': '17','inUse': '1','description':'字典管理', 'dataType':'String', 'remark':'', 'englishName': 'Dictionary',
             'children': [],
            },
            {'dictionaryId': '1704', 'dictionaryName': '参数设置',  'upDictionaryId': '17','inUse': '1','description':'参数设置', 'dataType':'String', 'remark':'', 'englishName': 'Setting',
             'children': [],
            }
          ],
        },
      ]
    };
  },
  mounted () {
    this.initEvent();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#add_dictionary_modal").on('show.bs.modal', function() {
        self.dictionaryNew = {
          'dictionaryId': '19', 
          'dictionaryName': '',  
          'upDictionaryId': '1',
          'upDictionaryName': '1',
          'inUse': '1',
          'description':'', 
          'dataType':'String',
          "englishName": "",
          'children': [], 
        }
      });
      $("#update_dictionary_modal").on('show.bs.modal', function() {
        self.dictionaryOld = {
          'dictionaryId': '10', 
          'dictionaryName': '首页',  
          'upDictionaryId': '1',
          'upDictionaryName': '1',
          'inUse': '1',
          'description':'首页', 
          'dataType':'String',
          "englishName": "Main",
          'children': [],
        };
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
    },
    deleteMenu () {
      bootbox.confirm({
        message: '菜单菜单一旦删除，不可恢复，是否确定删除？',
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
      });
    }
  }
};
</script>
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
