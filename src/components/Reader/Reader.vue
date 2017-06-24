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
              <select class="form-control refresh" name="regionTypeSel">
                <option value="">- 请选择位置类型 -</option>
                <option value="井口区域">井口区域</option>
                <option value="普通区域">普通区域</option>
                <option value="危险区域">危险区域</option>
                <option value="重点区域">重点区域</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">分站名称</span>
              <input type="text" class="form-control refresh" name="readerNameInp">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="input-group ss-bar-input">
              <span class="input-group-addon">分站IP</span>
              <input type="text" class="form-control refresh" name="readerIpInp">
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" name="readerStatusSel">
                <option value="">- 请选择分站状态 -</option>
                <option value="正常">正常</option>
                <option value="异常">异常</option>
              </select>
            </div>
          </div>
          <div class="ss-bar-line">
            <div class="ss-bar-select">
              <select class="form-control refresh" name="readerRegionSel">
                <option value="">- 请选择所属区域 -</option>
                <option v-if="regionList != null" v-for="region in regionList" :key="region.key" :value="region.regionId">{{ region.regionName }}</option>
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
              <button type="button" class="btn btn-primary" @click="loadReaderList()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-box outside-box">
        <div class="btn-box">
          <div class="fl">
            <button type="button" class="btn btn-primary" @click="errors.clear();" data-toggle="modal" data-target="#mark_reader_modal">
              <i class="glyphicon glyphicon-screenshot"></i>新增
            </button>
            <button type="button" class="btn btn-primary" @click="checkType('UPDATE_READER')">修改</button>
            <button type="button" class="btn btn-primary" @click="checkType('DELETE_READER')">删除</button>
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
                <th>选择</th>
                <th>序号</th>
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
              <tr v-if="readerListCache.readerList != null" v-for="(reader, index) in readerListCache.readerList" :key="reader.key">
                <td><input type="radio" name="reader" :value="reader.readerId"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ reader.readerName }}</td>
                <td>{{ reader.regionName }}</td>
                <td>{{ reader.geoPoint }}</td>
                <td>{{ reader.regionType }}</td>
                <td>{{ reader.readerStatus }}</td>
                <td>{{ filterPowerSupply(reader.powerSupplyMode) }}</td>
                <td>{{ reader.readerIp }}</td>
                <td>
                  <a href="javascript: void(0);" title="参数配置" @click="setReaderParams(reader)" data-toggle="modal" data-target="#set_reader_parameter_modal"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="移动分站" @click="openModal('MOVE_READER', reader.readerId)"><i class="glyphicon glyphicon-transfer"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="地图查看" @click="openModal('SHOW_READER', reader.readerId)"><i class="glyphicon glyphicon-globe"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="readerListPagingBox">
            <div id="readerListPaging" class="pagination"></div>
          </nav>
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
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">添加分站信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <form data-vv-scope="add_reader_form">
                <div class="input-group-line">
                  <div class="group-left">分站名称</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_reader_form.add_readerName')}">
                    <input class="form-control" type="text" v-validate="'required'" name="add_readerName" v-model="reader.readerName">
                  </div>
                  <span v-show="errors.has('add_reader_form.add_readerName')" class="word-danger">{{ errors.first('add_reader_form.add_readerName') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">位置坐标</div>
                  <div class="group-right">
                    <input class="form-control" type="text" name="addReaderGeoPointInp" readonly="readonly" v-model="reader.geoPoint">
                  </div>
                </div>
                <div class="input-group-line">
                  <div class="group-left">分站状态</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_reader_form.add_readerStatus')}">
                    <select class="form-control" name="add_readerStatus" v-model="reader.readerStatus" v-validate="'required'">
                      <option value="">- 请选择分站状态 -</option>
                      <option value="正常">正常</option>
                      <option value="异常">异常</option>
                    </select>
                  </div>
                  <span v-show="errors.has('add_reader_form.add_readerStatus')" class="word-danger">{{ errors.first('add_reader_form.add_readerStatus') ? "必选项" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">供电方式</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_reader_form.add_powerSupplyMode')}">
                    <select class="form-control" name="add_powerSupplyMode" v-model="reader.powerSupplyMode" v-validate="'required'">
                      <option value="">- 请选择供电方式 -</option>
                      <option value="0">电源</option>
                      <option value="1">电池</option>
                    </select>
                  </div>
                  <span v-show="errors.has('add_reader_form.add_powerSupplyMode')" class="word-danger">{{ errors.first('add_reader_form.add_powerSupplyMode') ? "必选项" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">电池电量</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_reader_form.add_batteryCapacity')}">
                    <input class="form-control" type="text" name="add_batteryCapacity" v-model="reader.batteryCapacity" v-validate="'required|numeric'">
                  </div>
                  <span v-show="errors.has('add_reader_form.add_batteryCapacity')" class="word-danger">{{ errors.first('add_reader_form.add_batteryCapacity') ? "仅支持数字" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">分站IP</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_reader_form.add_readerIp')}">
                    <input class="form-control" type="text" name="add_readerIp" v-model="reader.readerIp" v-validate="'required'">
                  </div>
                  <span v-show="errors.has('add_reader_form.add_readerIp')" class="word-danger">{{ errors.first('add_reader_form.add_readerIp') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">安装时间</div>
                  <div class="group-right" :class="{'is-danger':errors.has('add_reader_form.add_installDate')}">
                    <input id="installDate" name="add_installDate" v-validate="'required'" class="form-control" type="text" readonly="readonly" placeholder="请选择安装时间">
                  </div>
                  <span v-show="errors.has('add_reader_form.add_installDate')" class="word-danger">{{ errors.first('add_reader_form.add_installDate') ? "不能为空" : "" }}</span>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="addReaderOper()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改分站模态框 -->
    <div class="modal fade" id="update_reader_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">修改分站信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <form data-vv-scope="update_reader_form">
                <div class="input-group-line">
                  <div class="group-left">分站名称</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_reader_form.update_readerName')}">
                    <input class="form-control refresh" type="text" v-validate="'required'" name="update_readerName" v-model="reader.readerName">
                  </div>
                  <span v-show="errors.has('update_reader_form.update_readerName')" class="word-danger">{{ errors.first('update_reader_form.update_readerName') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">位置坐标</div>
                  <div class="group-right">
                    <input class="form-control refresh" type="text" name="" readonly="readonly" v-model="reader.geoPoint">
                  </div>
                </div>
                <div class="input-group-line">
                  <div class="group-left">分站状态</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_reader_form.update_readerStatus')}">
                    <select class="form-control refresh" name="update_readerStatus" v-model="reader.readerStatus" v-validate="'required'">
                      <option value="">- 请选择分站状态 -</option>
                      <option value="正常">正常</option>
                      <option value="异常">异常</option>
                    </select>
                  </div>
                  <span v-show="errors.has('update_reader_form.update_readerStatus')" class="word-danger">{{ errors.first('update_reader_form.update_readerStatus') ? "必选项" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">供电方式</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_reader_form.update_powerSupplyMode')}">
                    <select class="form-control refresh" name="update_powerSupplyMode" v-model="reader.powerSupplyMode" v-validate="'required'">
                      <option value="">- 请选择供电方式 -</option>
                      <option value="0">电源</option>
                      <option value="1">电池</option>
                    </select>
                  </div>
                  <span v-show="errors.has('update_reader_form.update_powerSupplyMode')" class="word-danger">{{ errors.first('update_reader_form.update_powerSupplyMode') ? "必选项" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">电池电量</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_reader_form.update_batteryCapacity')}">
                    <input class="form-control refresh" type="text" name="update_batteryCapacity" v-model="reader.batteryCapacity" v-validate="'required|numeric'">
                  </div>
                  <span v-show="errors.has('update_reader_form.update_batteryCapacity')" class="word-danger">{{ errors.first('update_reader_form.update_batteryCapacity') ? "仅支持数字" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">分站IP</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_reader_form.update_readerIp')}">
                    <input class="form-control refresh" type="text" name="update_readerIp" v-model="reader.readerIp" v-validate="'required'">
                  </div>
                  <span v-show="errors.has('update_reader_form.update_readerIp')" class="word-danger">{{ errors.first('update_reader_form.update_readerIp') ? "不能为空" : "" }}</span>
                </div>
                <div class="input-group-line">
                  <div class="group-left">安装时间</div>
                  <div class="group-right" :class="{'is-danger':errors.has('update_reader_form.update_installDate')}">
                    <input id="installDate2" class="form-control" name="update_installDate" v-validate="'required'" type="text" readonly="readonly" placeholder="请选择安装时间" v-model="reader.installDate">
                  </div>
                  <span v-show="errors.has('update_reader_form.update_installDate')" class="word-danger">{{ errors.first('update_reader_form.update_installDate') ? "不能为空" : "" }}</span>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="updateReaderOper()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 参数配置模态框 -->
    <div class="modal fade" id="set_reader_parameter_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width: 750px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">分站参数配置</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="show-info-group clear-bottom clear-radius-bottom">
                <div class="group-left">分站名称</div>
                <div class="group-right">{{ readerParams.readerName }}</div>
                <div class="group-left">安装位置</div>
                <div class="group-right">{{ readerParams.regionName }}</div>
              </div>
              <div class="show-info-group clear-bottom clear-border-radius">
                <div class="group-left">位置坐标</div>
                <div class="group-right">{{ readerParams.geoPoint }}</div>
                <div class="group-left">位置类型</div>
                <div class="group-right">{{ readerParams.regionType }}</div>
              </div>
              <div class="show-info-group clear-bottom clear-border-radius">
                <div class="group-left">分站状态</div>
                <div class="group-right">{{ readerParams.readerStatus }}</div>
                <div class="group-left">供电方式</div>
                <div class="group-right">{{ filterPowerSupply(readerParams.powerSupplyMode) }}</div>
              </div>
              <div class="show-info-group clear-radius-top ">
                <div class="group-left">电池电量</div>
                <div class="group-right">{{ readerParams.batteryCapacity }}</div>
                <div class="group-left">分站IP</div>
                <div class="group-right">{{ readerParams.readerIp }}</div>
              </div>
            </div>
            <div class="table-box content-box">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="javascript: void(0);" aria-control="#one" data-toggle="tab" data-target="#one" role="tab">系统参数</a></li>
                <li role="presentation"><a href="javascript: void(0);" aria-control="#two" data-toggle="tab" data-target="#two" role="tab">射频参数</a></li>
                <li role="presentation"><a href="javascript: void(0);" aria-control="#three" data-toggle="tab" data-target="#three" role="tab">网络参数</a></li>
              </ul>
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="one">
                  <div class="table-box">
                    <div class="input-group-line">
                      <div class="group-left">设备名称</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="" v-model="readerParams.deviceName">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">密码</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="password" name="" v-model="readerParams.password">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">信息打印级别</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="" v-model="readerParams.printLevel">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">modbus端口</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="" v-model="readerParams.modbusPort">
                      </div>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="two">
                  <div class="table-box">
                    <div class="data-box">
                      <div class="show-info-group clear-bottom clear-radius-bottom">
                        <div class="group-left">空闲设备移除时间</div>
                        <div class="group-right"></div>
                        <div class="group-left">时隙刷新时间</div>
                        <div class="group-right"></div>
                      </div>
                      <div class="show-info-group clear-bottom clear-border-radius">
                        <div class="group-left">定位卡测距时间间隔</div>
                        <div class="group-right"></div>
                        <div class="group-left">分站天线间距</div>
                        <div class="group-right"></div>
                      </div>
                      <div class="show-info-group clear-radius-top">
                        <div class="group-left">天线信号重叠距离</div>
                        <div class="group-right"></div>
                        <div class="group-left">天线个数</div>
                        <div class="group-right"></div>
                      </div>
                    </div>
                    <div class="data-box">
                      <div class="show-info-group clear-bottom clear-radius-bottom">
                        <div class="group-left">模块MAC地址</div>
                        <div class="group-right"></div>
                        <div class="group-left">射频发射频率</div>
                        <div class="group-right"></div>
                      </div>
                      <div class="show-info-group clear-radius-top">
                        <div class="group-left">射频通道</div>
                        <div class="group-right"></div>
                        <div class="group-left">通信模式</div>
                        <div class="group-right"></div>
                      </div>
                    </div>
                    <div class="data-box">
                      <div class="show-info-group clear-bottom clear-radius-bottom">
                        <div class="group-left">模块MAC地址</div>
                        <div class="group-right"></div>
                        <div class="group-left">射频发射频率</div>
                        <div class="group-right"></div>
                      </div>
                      <div class="show-info-group clear-radius-top">
                        <div class="group-left">射频通道</div>
                        <div class="group-right"></div>
                        <div class="group-left">通信模式</div>
                        <div class="group-right"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="three">
                  <div class="table-box">
                    <div class="input-group-line">
                      <div class="group-left">MAC地址</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="" v-model="readerParams.macAddr">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">IP地址</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="" v-model="readerParams.ip">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">子网掩码</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="" v-model="readerParams.mask">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">网关</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="" v-model="readerParams.gateway">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">是否使用DHCP</div>
                      <div class="group-right">
                          <input class="refresh" style="margin-left: 20%;" checked="checked" type="radio" name="dhcp" value="是">
                          <span>是</span>
                          <input class="refresh" style="margin-left: 20%;" type="radio" name="dhcp" value="否">
                          <span>否</span>
                      </div>
                    </div>
                  </div>
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

    <!-- 分站地图标注模态框 -->
    <div class="modal fade" id="mark_reader_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">分站地图标注</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="table-box-right fl">
                <div id="markMapBox" class="map-box">
                  <div id="markMap"></div>
                </div>
              </div>
              <div class="table-box-left fr">
                  <div class="document-line">
                    <h5 for="">操作</h5>
                  </div>
                  <div class="document-line">
                    <input id="markInp" checked="checked" type="radio" name="mark" value="mark">
                    <label for="markInp">标注</label>
                  <!-- </div>
                  <div class="document-line"> -->
                    <input id="selectInp" style="margin-left: 16px;" type="radio" name="mark" value="select">
                    <label for="selectInp">选取</label>
                  <!-- </div>
                  <div class="document-line"> -->
                    <input id="removeInp" style="margin-left: 16px;" type="radio" name="mark" value="remove">
                    <label for="removeInp">移除</label>
                  </div>
                  <div class="document-line">
                    <button type="button" class="btn btn-primary" @click="fullScreen('markMap')">全屏查看</button>
                  </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分站地图移动模态框 -->
    <div class="modal fade" id="move_reader_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">分站位置移动</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="table-box-right fl">
                <div id="moveMapBox" class="map-box">
                  <div id="moveMap"></div>
                </div>
              </div>
              <div class="table-box-left fr">
                  <div class="document-line">
                    <label for="">操作:</label>
                    <input style="margin-left: 10%;" checked="checked" type="radio" name="move" value="move">
                    <span>移动</span>
                    <input id="moveReaderSelect" style="margin-left: 10%;" type="radio" name="move" value="select">
                    <span>选取</span>
                  </div>
                  <div class="document">
                    <div class="document-line">
                      <label class="label-line-left">分站编号:</label>
                      <label class="label-line-right" v-text="reader.readerId"></label>
                    </div>
                    <div class="document-line">
                      <label class="label-line-left">分站名称:</label>
                      <label class="label-line-right" v-text="reader.readerName"></label>
                    </div>
                    <div class="document-line">
                      <label class="label-line-left">分站坐标:</label>
                      <label id="geoPointLabel" class="label-line-right" v-text="reader.geoPoint"></label>
                    </div>
                    <div class="document-line">
                      <label class="label-line-left">参照坐标:</label>
                      <label id="geoPointRefLabel" class="label-line-right" v-text="reader.geoPointRef"></label>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" id="updateMoveReaderToggle" @click="updateMoveReaderOper()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分站地图显示模态框 -->
    <div class="modal fade" id="show_reader_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">地图查看分站位置</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div id="moveMapBox" class="map-box">
                <div id="showMap"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ol from 'openlayers/dist/ol';
import bootbox from 'bootbox';
import axios from 'axios';
import initLoad from '../../assets/script/sidemenu';
import jeDate from '../../assets/script/jedate/jquery.jedate.min';
import fullscreen from '../../assets/script/fullscreen';
import { initPagination } from '../../assets/script/initplugin';
import { deepCopy } from '../../assets/script/extends';
import { Validator } from 'vee-validate';

export default {
  name: 'reader',
  data () {
    return {
      mapCache: {
        markMap: {},
        markView: {},
        regionLayer: {},
        readerLayer: {},
        readerSource: {},
        readerPoint: {
          flag: false,
          readerFeature: {},
          coordinate: {},
        },
        moveMap: {},
        moveView: {},
        showMap: {},
        showView: {},
        pointStyle: {},
        markerStyle: {},
      },
      reader: {},
      readerList: [],
      readerListCache: {
        readerList: [],
        total: 0
      },
      regionList: [],
      readerParams: {}
    };
  },
  mounted () {
    initLoad();
    this.initEvent();
    this.loadMap();
    this.defaultLoadRegion();
    this.loadReaderList();
  },
  methods: {
    initEvent () {
      let self = this;

      $("#installDate, #installDate2").jeDate({
        format: 'YYYY-MM-DD hh:mm:ss',
        isTime: true,
        isinitVal: false
      });

      $("#add_reader_modal").on('show.bs.modal', function() {
        $("input[name='mark']:radio").eq(0).prop('checked', true);
        let geoPoint = self.reader.geoPoint,
            geoPointRef = self.reader.geoPointRef,
            regionId = self.reader.regionId;
        self.reader = {};
        self.reader.regionId = regionId;
        self.reader.geoPoint = geoPoint;
        self.reader.geoPointRef = geoPointRef;
        self.reader.readerStatus = '';
        self.reader.powerSupplyMode = '';
      });

      $("#moveReaderSelect").on('click', function() {
        axios.get('/base/reader/range/', { params: { 'geoPoint': self.reader.geoPoint }})
              .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.regionId) {
                    self.reader.regionId = data.regionId;

                    self.mapCache.moveMap.on('click', function(event) {
                      let type = ($("input[name='move']:radio:checked").val() == 'select');
                      let coordinate = event.coordinate,
                          feature = event.map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
                            if (layer == self.mapCache.readerLayer) {
                              return feature;
                            }
                          });

                      if (feature && type) {
                        // self.reader.geoPointRef = self.createPointJson(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
                        self.reader.geoPointRef = self.createPointJson(coordinate);
                        $("#geoPointRefLabel").text(self.reader.geoPointRef);
                        $("#updateMoveReaderToggle").prop('disabled', false);
                      }
                    });

                  } else { bootbox.alert("分站位置信息检测失败,请重新安置!"); return false;}
                } else {
                  bootbox.alert("分站移动后位置不在已划分区域中或在区域边界,请重新安置分站!");
                  $("input[name='move']:radio").eq(0).prop('checked', true);
                  $("#updateMoveReaderToggle").prop('disabled', true);
                  return false;
                }
              });
      });
    },
    clearSearch () {
      $("input.refresh:not(:radio)").val("");
      $("input.refresh:radio").eq(0).prop('checked', true);
      $("input[name='mark']:radio").eq(0).prop('checked', true);
      $("input[name='move']:radio").eq(0).prop('checked', true);
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      $("div.refresh").text("");
      $(".nav-tabs li.active").removeClass('active');
      $(".nav-tabs li:eq(0)").addClass('active');
    },
    fullScreen(selector) {
      fullscreen(selector);
    },
    /**
     * Start load map module.
     */
    loadMap () {
      let self = this;

      let taiyuan = ol.proj.fromLonLat([0, 0]);
      $("#mark_reader_modal").on('shown.bs.modal', function() {
        self.mapCache.readerPoint.flag = false;
        self.mapCache.markView = new ol.View({
          center: [-7352981.95804323, 4148924.9077592203],
          zoom: 13,
          minZoom: 3,
          maxZoom: 20,
          rotation: Math.PI/35
        });
        $("#markMap .ol-viewport").remove();
        self.mapCache.markMap = new ol.Map({
          target: 'markMap',
          layers: [
            new ol.layer.Image({
              source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                  'LAYERS': 'myditu',
                  'VERSION': '1.1.0'
                },
                serverType: 'geoserver'
              })
            })
          ],
          view: self.mapCache.markView
        });
        self.addRadioEventToMap();
        self.loadRegionMapLayer(self.mapCache.markMap);
        self.loadReaderMapLayer(self.mapCache.markMap);
      });

      $("#move_reader_modal").on('shown.bs.modal', function() {
        $("input[name='move']").eq(0).prop('checked', true);
        $("#updateMoveReaderToggle").prop('disabled', true);
        self.mapCache.readerPoint.flag = false;
        self.mapCache.moveView = new ol.View({
          center: [-7352981.95804323, 4148924.9077592203],
          zoom: 13,
          minZoom: 3,
          maxZoom: 20,
          rotation: Math.PI/35
        });
        $("#moveMap .ol-viewport").remove();
        self.mapCache.moveMap = new ol.Map({
          target: 'moveMap',
          layers: [
            new ol.layer.Image({
              source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                  'LAYERS': 'myditu',
                  'VERSION': '1.1.0'
                },
                serverType: 'geoserver'
              })
            })
          ],
          view: self.mapCache.moveView
        });
        self.loadRegionMapLayer(self.mapCache.moveMap);
        self.loadMoveReaderMapLayer(self.mapCache.moveMap, self.reader.readerId, true);
      });

      $("#show_reader_modal").on('shown.bs.modal', function() {
        self.mapCache.readerPoint.flag = false;
        self.mapCache.showView = new ol.View({
          center: [-7352981.95804323, 4148924.9077592203],
          zoom: 13,
          minZoom: 3,
          maxZoom: 20,
          rotation: Math.PI/35
        });
        $("#showMap .ol-viewport").remove();
        self.mapCache.showMap = new ol.Map({
          target: 'showMap',
          layers: [
            new ol.layer.Image({
              source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                  'LAYERS': 'myditu',
                  'VERSION': '1.1.0'
                },
                serverType: 'geoserver'
              })
            })
          ],
          view: self.mapCache.showView
        });
        self.loadRegionMapLayer(self.mapCache.showMap);
        self.loadMoveReaderMapLayer(self.mapCache.showMap, self.reader.readerId);
      });
    },
    loadRegionMapLayer (currentMap) {
      let self = this;

      axios.get('/base/map/region/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.regionList) {
                  let regionList = data.regionList,
                      featureList = new Array(), featureCollection;

                  regionList.forEach(function(region, index) {
                    let geometry = JSON.parse(region.geoPolygon);

                    featureList.push(self.createFeature(geometry, { "type": "Polygon", "id": region.regionId, "name": region.regionName }));
                  });

                  featureCollection = self.createFeatureCollection(featureList);
                  self.mapCache.regionLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                      // features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
                      //   dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                      //   featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                      // })
                      features: new ol.format.GeoJSON().readFeatures(featureCollection)
                    }),
                    style: new ol.style.Style({
                      fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0)'
                      }),
                      stroke: new ol.style.Stroke({
                        color: '#319FD3',
                        width: 4
                      })
                    })
                  });
                  currentMap.addLayer(self.mapCache.regionLayer);
                } else { bootbox.alert("区域图层装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域图层装载失败!"); }
            });
    },
    loadReaderMapLayer (currentMap) {
      let self = this;

      axios.get('/base/map/reader/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.readerList) {
                  let readerList = data.readerList,
                      featureList = new Array(), featureCollection;

                  readerList.forEach(function(reader, index) {
                    let geometry = JSON.parse(reader.geoPoint),
                        pointFeature = self.createFeature(geometry, { "type": "Point", "id": reader.readerId});

                    featureList.push(pointFeature);
                  });

                  featureCollection = self.createFeatureCollection(featureList);
                  self.mapCache.readerSource = new ol.source.Vector({
                    // features: new ol.format.GeoJSON().readFeatures(featureCollection, {     // 用readFeatures方法可以自定义坐标系
                    //   dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                    //   featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                    // })
                    features: new ol.format.GeoJSON().readFeatures(featureCollection)
                  });
                  self.mapCache.readerLayer = new ol.layer.Vector({
                    source: self.mapCache.readerSource,
                    style: new ol.style.Style({
                      // image: new ol.style.Circle({
                      //     radius: 7,
                      //     fill: new ol.style.Fill({
                      //         color: '#6699CC'
                      //     })
                      // })
                      image: new ol.style.Icon(({
                        src: 'static/icon/reader.png',
                        scale: 0.4,  //图标缩放比例
                      })),
                    })
                  });
                  currentMap.addLayer(self.mapCache.readerLayer);
                } else { bootbox.alert("区域图层装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域图层装载失败!"); }
            });
    },
    loadMoveReaderMapLayer (currentMap, readerId, enableModifyEvent) {
      let self = this;

      axios.get('/base/map/reader/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.readerList) {
                  let readerList = data.readerList,
                      featureList = new Array();

                  readerList.forEach(function(reader, index) {
                    let geoPoint = JSON.parse(reader.geoPoint),
                        // newFeature = new ol.Feature(new ol.geom.Point(ol.proj.transform(geoPoint.coordinates, 'EPSG:4326', 'EPSG:3857')));
                        newFeature = new ol.Feature(new ol.geom.Point(geoPoint.coordinates));

                    if (reader.readerId == self.reader.readerId) {
                      newFeature.setStyle(self.createElementStyle());
                      newFeature.setProperties({ "type": "Point" , "readerId" : reader.readerId });
                      if (enableModifyEvent) {
                        self.addModifyInteractionEvent(currentMap);
                      }
                    } else {
                      newFeature.setStyle(new ol.style.Style({
                        // image: new ol.style.Circle({
                        //   radius: 7,
                        //   fill: new ol.style.Fill({
                        //       color: '#6699CC'
                        //   })
                        // })
                        image: new ol.style.Icon(({
                          src: 'static/icon/reader.png',
                          scale: 0.4,  //图标缩放比例
                        })),
                      }));
                    }
                    featureList.push(newFeature);
                  });

                  self.mapCache.readerSource = new ol.source.Vector({
                    features: featureList
                  });
                  self.mapCache.readerLayer = new ol.layer.Vector({
                    source: self.mapCache.readerSource
                  });
                  currentMap.addLayer(self.mapCache.readerLayer);
                } else { bootbox.alert("区域图层装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域图层装载失败!"); }
            });
    },
    // 添加分站的移动事件
    addModifyInteractionEvent (currentMap) {
      let self = this;
      let type = ($("input[name='move']:radio:checked").val() == 'move');
      let readerId = self.reader.readerId;
      let Modify = function() {
        ol.interaction.Pointer.call(this, {
          handleDownEvent: Modify.prototype.handleDownEvent,
          handleDragEvent: Modify.prototype.handleDragEvent,
          handleMoveEvent: Modify.prototype.handleMoveEvent,
          handleUpEvent: Modify.prototype.handleUpEvent
        });

        this._coordinate = null;
        this._cursor = 'pointer';
        this._feature = null;
        this._previousCursor = undefined;
      };
      ol.inherits(Modify, ol.interaction.Pointer);

      Modify.prototype.handleDownEvent = function(event) {
        let map = event.map;
        let type = ($("input[name='move']:radio:checked").val() == 'move');
        let feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
          if (layer == self.mapCache.readerLayer) {
            return feature;
          }
        });

        if (feature && feature.get('readerId') == readerId && type) {
          // feature.setStyle(new ol.style.Style({
          //   image: new ol.style.Circle({
          //       radius: 15,
          //       fill: new ol.style.Fill({
          //           color: '#ffcc33'
          //       })
          //   })
          // }));
          this._coordinate = event.coordinate;
          this._feature = feature;
        }
        return !!feature;
      };

      Modify.prototype.handleMoveEvent = function(event) {
        if (this._cursor) {
          let type = ($("input[name='move']:radio:checked").val() == 'move');
            let map = event.map;
            let feature = map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
              if (layer == self.mapCache.readerLayer) {
                return feature;
              }
            });
            let element = event.map.getTargetElement();
            if (feature && feature.get('readerId') == readerId && type) {
                if (element.style.cursor != this._cursor) {
                    this._previousCursor = element.style.cursor;
                    element.style.cursor = this._cursor;
                }
            } else if (this._previousCursor !== undefined) {
                element.style.cursor = this._previousCursor;
                this._previousCursor = undefined;
            }
        }
      };

      Modify.prototype.handleDragEvent = function(event) {
        let type = ($("input[name='move']:radio:checked").val() == 'move');
        let map = event.map;
        let feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
          if (layer == self.mapCache.readerLayer) {
            return feature;
          }
        });

        if (feature && feature.get('readerId') == readerId && type) {
          let deltax = event.coordinate[0] - this._coordinate[0];
          let deltay = event.coordinate[1] - this._coordinate[1];
          let geometry = this._feature.getGeometry();
          geometry.translate(deltax, deltay);

          this._coordinate[0] = event.coordinate[0];
          this._coordinate[1] = event.coordinate[1];
        }
      };

      Modify.prototype.handleUpEvent = function() {
        let type = ($("input[name='move']:radio:checked").val() == 'move');
        if (this._coordinate && type) {
          // self.reader.geoPoint = self.createPointJson(ol.proj.transform(this._coordinate, 'EPSG:3857', 'EPSG:4326'));
          self.reader.geoPoint = self.createPointJson(this._coordinate);
          $("#geoPointLabel").text(self.reader.geoPoint);
        }
        this._coordinate = null;
        this._feature = null;
        return false;
      };


      // let selectInteraction = new ol.interaction.Select();
      let modify = new Modify();
      // currentMap.addInteraction(selectInteraction);
      currentMap.addInteraction(modify);
    },
    // 添加事件
    addRadioEventToMap () {
      let self = this;

      self.mapCache.markMap.on('click', function(event) {
        let type = $("input[name='mark']:radio:checked").val(),
            currentPoint = event.coordinate;

        let selectedFeature = self.mapCache.markMap.forEachFeatureAtPixel(event.pixel, (feature) => {
          return feature;
        });
        if (type == 'mark') {
          let point = currentPoint,
          // let point = ol.proj.transform(currentPoint, 'EPSG:3857', 'EPSG:4326'),
              geoPoint = self.createPointJson(point);

          axios.get('/base/reader/range/', { params: { 'geoPoint': geoPoint }})
                .then((response) => {
                  let { meta, data } = response.data;

                  if (meta.success) {
                    if (data && data.regionId) {
                      self.reader.regionId = data.regionId;
                      self.addNewReader(currentPoint, selectedFeature);
                    } else { bootbox.alert("分站位置信息检测失败,请重新安置!"); return false;}
                  } else { bootbox.alert("新增分站不再已划分区域中或在区域边界,请重新安置分站!"); return false; }
                });
        } else if (type == 'select') {
          self.selectRefPoint(currentPoint, selectedFeature);
        } else if (type == 'remove') {
          self.removeNewReader(currentPoint, selectedFeature);
        }
      });
    },
    // 添加新的分站元素到图层
    addNewReader (coordinate, selectedFeature) {
      let self = this,
          newFeature = new ol.Feature({
            "geometry": new ol.geom.Point(coordinate)
          });

      if (self.mapCache.readerPoint.flag) {
        self.mapCache.readerSource.removeFeature(self.mapCache.readerPoint.readerFeature);
      }
      newFeature.setStyle(self.createElementStyle());
      self.mapCache.readerPoint = {
        'readerFeature': newFeature,
        'flag': true,
        'coordinate': coordinate
      };

      self.mapCache.readerSource.addFeature(self.mapCache.readerPoint.readerFeature);
      // self.reader.geoPoint = self.createPointJson(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
      self.reader.geoPoint = self.createPointJson(coordinate);
      $("input[name='mark']:radio").eq(1).prop('checked', true);
    },
    // 选择参照点元素
    selectRefPoint (coordinate, selectedFeature) {
      let self = this;

      if (!self.mapCache.readerPoint.flag) {
        bootbox.alert("尚未添加新分站,设置参照点操作无效!");
        $("input[name='mark']:radio").eq(0).prop('checked', true);
        return false;
      }

      if (self.checkPointRange(coordinate, selectedFeature)) {
        bootbox.alert("不可选择自身作为参照点!请重新选择!");
        return false;
      } else {
        // self.reader.geoPointRef = self.createPointJson(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
        self.reader.geoPointRef = self.createPointJson(coordinate);

        self.errors.clear('add_reader_form');
        $("#add_reader_modal").modal('show');
      }
    },
    // 移除元素
    removeNewReader (coordinate, selectedFeature) {
      let self = this;

      if (!self.checkPointRange(coordinate, selectedFeature)) {
        bootbox.alert("选择元素并非新添加分站,该移除操作无效!");
        return false;
      } else {
        if (self.mapCache.readerPoint.flag) {
          self.mapCache.readerSource.removeFeature(self.mapCache.readerPoint.readerFeature);
          self.mapCache.readerPoint = {};
          bootbox.alert("新分站移除成功,请重新添加新分站!");
          $("input[name='mark']:radio").eq(0).prop('checked', true);
        } else {
          bootbox.alert("尚未添加新分站,该移除操作无效!");
          return false;
        }
      }
    },
    // 检测点是否在范围内
    checkPointRange (coordinate, selectedFeature) {
      let self = this;
      return (self.mapCache.readerPoint.readerFeature == selectedFeature);
    },
    // 构造点坐标
    createPointJson (coordinate) {
      return "Point(" + coordinate[0] + " " + coordinate[1] + ")";
    },
    // 构造元素样式
    createElementStyle () {
      return new ol.style.Style({
        image: new ol.style.Icon(({
          src: 'static/icon/selectReader.png',
          scale: 0.4,  //图标缩放比例
        }))
      });
    },
    // 构造元素
    createFeature(geometry, properties) {
      return {
        "type": "Feature",
        "geometry": geometry,
        "properties": properties
      };
    },
    createFeatureCollection (features) {
      return {
        "type": "FeatureCollection",
        "features": features
      };
    },
    // 检测打开不同的地图模态框
    openModal (type, readerId) {
      let self = this;

      if (type == 'MOVE_READER') {
        self.reader = {};

        let readerList = self.readerListCache.readerList;

        self.reader.readerId = readerId;
        for (let i = 0; i < readerList.length; i++) {
          if (readerList[i].readerId == readerId) {
            self.reader.readerName = readerList[i].readerName;
            break;
          }
        }

        $("#move_reader_modal").modal('show');
      } else if (type == 'SHOW_READER') {
        self.reader.readerId = readerId;
        $("#show_reader_modal").modal('show');
      }
    },
    /**
     * End load map module.
     */
    /**
     * Start filters function module.
     */
    filterPowerSupply (powerSupplyMode) {
      let mode = ['电源', '电池'];
      return mode[powerSupplyMode];
    },
    /**
     * End filters function module.
     */
    /**
     * Start default load data.
     */
    defaultLoadRegion () {
      let self = this;

      axios.get('/base/region/')
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.regionList) {
                  self.regionList = data.regionList;
                } else { bootbox.alert("区域信息装载失败!"); }
              } else { bootbox.alert("服务器内部错误,区域信息装载失败!"); }
            });
    },
    getSearchParams () {
      let params = {},
          regionType, readerName, readerIp, readerStatus, regionId;

      regionType = $("select[name='regionTypeSel']").find("option:selected").val();
      if (regionType) { params.regionType = regionType; }

      readerName = $("input[name='readerNameInp']").val();
      if (readerName) { params.readerName = readerName; }

      readerIp = $("input[name='readerIpInp']").val();
      if (readerIp) { params.readerIp = readerIp; }

      readerStatus = $("select[name='readerStatusSel']").find("option:selected").val();
      if (readerStatus) { params.readerStatus = readerStatus; }

      regionId = $("select[name='readerRegionSel']").val();
      if (regionId) { params.regionId = regionId; }

      return params;
    },
    loadReaderList () {
      initPagination('readerListPagingBox', 'readerListPaging');
      this.loadReaderListPaging(null);
    },
    loadReaderListPaging (page, isPaging) {
      let self = this,
          params = self.getSearchParams();

      page = page || 1;
      axios.post('/base/reader/p/' + page, params)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.readerList) {
                  self.readerListCache.readerList = data.readerList;
                  self.readerListCache.total = data.total;

                  if (!isPaging) {
                    $("#readerListPaging").page({
                      total: self.readerListCache.total,
                      pageSize: 10,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条',
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadReaderListPaging(pageNumber + 1, true);
                    });
                  }
                } else { bootbox.alert("分站信息查询失败!"); }
              } else { bootbox.alert("服务器内部错误, 分站信息查询失败!"); }
            });
    },
     /**
      * End default load data.
      */
    /**
     * Start reader function module.
     */
    checkType (type) {
      let self = this,
          selectedReader = $("input[name='reader']:radio:checked"),
          readerId = selectedReader.val();

      if (selectedReader.length < 1) {
        bootbox.alert({
          message: '请先选择一条记录,再进行操作!'
        });
        return false;
      } else {
        if (type == 'UPDATE_READER') {
          self.readerListCache.readerList.forEach(function(reader, index) {
            if (readerId == reader.readerId) {
              self.reader = deepCopy(reader);
              delete self.reader.uber;
              delete self.reader.regionType;
            }
          });

          self.errors.clear('update_reader_form');
          $("#update_reader_modal").modal('show');
        } else if (type == 'DELETE_READER') {
          self.deleteReaderOper(readerId);
        }
      }
    },
    // add reader
    addReaderOper () {
      let self = this;

      this.$validator.validateAll('add_reader_form').then(() => {

        self.reader.installDate = $("#installDate").val();

        var shortid = require('js-shortid');
        self.reader.readerId = shortid.gen();
        axios.post('/base/reader/', self.reader)
              .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.result == 1) {
                    self.reader = {};
                    $("#add_reader_modal").modal('hide');
                    $("#mark_reader_modal").modal('hide');
                    bootbox.alert("分站信息添加成功!");
                    self.loadReaderList();
                  } else { bootbox.alert("分站信息添加失败!"); }
                } else { bootbox.alert("服务器内部错误,分站信息添加失败!"); }
              });
      }).catch(() => {

      });
    },
    // update reader
    updateReaderOper () {
      let self = this;

      this.$validator.validateAll('update_reader_form').then(() => {

        self.reader.installDate = $("#installDate2").val();
        // 转换区域名称为编号
        for (let i = 0; i < self.regionList.length; i++) {
          if (self.regionName = self.regionList[i].regionName) {
            delete self.reader.regionName;
            self.reader.regionId = self.regionList[i].regionId;
            break;
          }
        }

        axios.put('/base/reader/', self.reader)
              .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.result == 1) {
                    self.reader = {};
                    bootbox.alert("分站信息修改成功!");
                    $("#update_reader_modal").modal('hide');
                    self.loadReaderList();
                    $("input[name='reader']:radio:checked").prop('checked', false);
                  } else { bootbox.alert("分站信息修改失败!"); }
                } else { bootbox.alert("服务器内部错误,分站信息修改失败!"); }
              });

      }).catch(() => {

      });
    },
    updateMoveReaderOper () {
      let self = this;

      delete self.reader.readerName;
      axios.put('/base/reader/', self.reader)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) {
                  self.reader = {};
                  bootbox.alert("分站位置安置成功!");
                  $("#move_reader_modal").modal('hide');
                  self.loadReaderList();
                  $("input[name='reader']:radio:checked").prop('checked', false);
                } else { bootbox.alert("分站位置安置失败!"); }
              } else { bootbox.alert("服务器内部错误,分站位置安置失败!"); }
            });
    },
    // delete reader
    deleteReaderOper (readerId) {
      let self = this;
      bootbox.confirm({
        message: "分站一旦删除，不可恢复！是否确定删除当前所选分站？",
        buttons: {
          confirm: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        },
        callback: function (result) {
          if (result) {
            axios.delete('/base/reader/' + readerId)
                  .then((response) => {
                    let { meta, data } = response.data;

                    if (meta.success) {
                      if (data && data.result == 1) {
                        bootbox.alert("分站信息删除成功!");
                        self.loadReaderList();
                        $("input[name='reader']:radio:checked").prop('checked', false);
                      } else { bootbox.alert("分站信息删除失败!"); }
                    } else { bootbox.alert("服务器内部错误,分站信息删除失败!"); }
                  });
          }
        }
      });
    },
    setReaderParams (reader) {
      let self = this;

      self.readerParams = reader;
    },
    /**
     * End reader function module.
     */
  },
};
</script>

<style lang="css" scoped>
#reader {
  width: 100%;
}

.table-box-left, .table-box-right {zoom: 1;}
.table-box-left {width: 23%; height: 550px; margin-left: 2%;}
.table-box-right {width: 75%;}
.map-box, #markMap, #moveMap, #showMap {
  margin: 0;
  min-height: 555px;
  max-height: 555px;
}

.document {
  overflow: hidden;
  zoom: 1;
  border: 1px solid #E5E5E5;
  margin-bottom: 5px;
}
.document-line {
  overflow: hidden;
  zoom: 1;
  margin-bottom: 45px;
}
.document-line i {color: #337ab7; font-size: 16px;}
.document-line button {width: 80%; }
.label-line-left { float: left; text-align: right; width: 30%; margin-right: 0;}
.label-line-right { float: right; text-align: left; width: 70%; margin-left: 0;}

#add_reader_modal {
  z-index: 2000;
}
</style>
