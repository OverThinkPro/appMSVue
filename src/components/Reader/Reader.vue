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
            <button type="button" class="btn btn-primary" @click="loadDateToModal()" data-toggle="modal" data-target="#add_reader_modal">添加</button>
            <button type="button" class="btn btn-primary" @click="loadDateToModal()" data-toggle="modal" data-target="#update_reader_modal">修改</button>
            <button type="button" class="btn btn-primary" @click="deleteReader()">删除</button>
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
                  <a href="javascript: void(0);" title="参数配置" data-toggle="modal" data-target="#set_reader_parameter_modal"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="地图标注" data-toggle="modal" data-target="#mark_reader_modal"><i class="glyphicon glyphicon-screenshot"></i></a>&nbsp;|
                  <a href="javascript: void(0);" title="地图查看"><i class="glyphicon glyphicon-globe"></i></a>
                </td>
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
              <div class="input-group-line">
                <div class="group-left">分站ID</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="reader.readerId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">分站名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="reader.readerName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">位置坐标</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="reader.readerLocation">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">位置类型</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="reader.locationType">
                    <option value="">- 请选择位置类型 -</option>
                    <option value="井口区">井口区</option>
                    <option value="重点区域">重点区域</option>
                    <option value="危险区域">危险区域</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">分站状态</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="reader.readerState">
                    <option value="">- 请选择分站状态 -</option>
                    <option value="正常">正常</option>
                    <option value="异常">异常</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">供电方式</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="reader.powerSupply">
                    <option value="">- 请选择供电方式 -</option>
                    <option value="直流电">直流电</option>
                    <option value="交流电">交流电</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">电池电量</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="reader.battery_v">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">分站IP</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="reader.readerIP">
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
              <div class="input-group-line">
                <div class="group-left">分站ID</div>
                <div class="group-right">
                  <input class="form-control refresh" disabled="disable" type="text" name="" v-model="reader.readerId">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">分站名称</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="reader.readerName">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">位置坐标</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="reader.readerLocation">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">位置类型</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="reader.locationType">
                    <option value="">- 请选择位置类型 -</option>
                    <option value="井口区">井口区</option>
                    <option value="重点区域">重点区域</option>
                    <option value="危险区域">危险区域</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">分站状态</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="reader.readerState">
                    <option value="">- 请选择分站状态 -</option>
                    <option value="正常">正常</option>
                    <option value="异常">异常</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">供电方式</div>
                <div class="group-right">
                  <select class="form-control refresh" name="" v-model="reader.powerSupply">
                    <option value="">- 请选择供电方式 -</option>
                    <option value="直流电">直流电</option>
                    <option value="交流电">交流电</option>
                  </select>
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">电池电量</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="reader.battery_v">
                </div>
              </div>
              <div class="input-group-line">
                <div class="group-left">分站IP</div>
                <div class="group-right">
                  <input class="form-control refresh" type="text" name="" v-model="reader.readerIP">
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
                <div class="group-left">分站ID</div>
                <div class="group-right">FZ001</div>
                <div class="group-left">分站名称</div>
                <div class="group-right">井口分站</div>
              </div>
              <div class="show-info-group clear-bottom clear-border-radius">
                <div class="group-left">位置坐标</div>
                <div class="group-right">(100, 200.2)</div>
                <div class="group-left">位置类型</div>
                <div class="group-right">井口</div>
              </div>
              <div class="show-info-group clear-bottom clear-border-radius">
                <div class="group-left">分站状态</div>
                <div class="group-right">正常</div>
                <div class="group-left">供电方式</div>
                <div class="group-right">电源</div>
              </div>
              <div class="show-info-group clear-radius-top ">
                <div class="group-left">电池电量</div>
                <div class="group-right">220V</div>
                <div class="group-left">分站IP</div>
                <div class="group-right">192.168.1.1</div>
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
                        <input class="form-control refresh" type="text" name="">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">密码</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="password" name="">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">信息打印级别</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">modbus端口</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="">
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
                        <input class="form-control refresh" type="text" name="">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">IP地址</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">子网掩码</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="">
                      </div>
                    </div>
                    <div class="input-group-line">
                      <div class="group-left">网关</div>
                      <div class="group-right">
                        <input class="form-control refresh" type="text" name="">
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
                <div class="map-box">
                  <div id="map"></div>
                </div>
              </div>
              <div class="table-box-left fr">
                <div class="document">
                  <div class="document-line">
                    <i class="glyphicon glyphicon-star-empty fr"></i>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">名称:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">位置:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <button class="btn btn-primary" type="button">标注</button>
                  </div>
                </div>
                <div class="document">
                  <div class="document-line">
                    <i class="glyphicon glyphicon-star fr"></i>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">名称:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">位置:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <button class="btn btn-primary" type="button" disabled="disabled">标注</button>
                  </div>
                </div>
                <div class="document">
                  <div class="document-line">
                    <i class="glyphicon glyphicon-star-empty fr"></i>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">名称:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">位置:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <button class="btn btn-primary" type="button">标注</button>
                  </div>
                </div>
                <div class="document">
                  <div class="document-line">
                    <i class="glyphicon glyphicon-star-empty fr"></i>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">名称:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">位置:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <button class="btn btn-primary" type="button">标注</button>
                  </div>
                </div>
                <div class="document">
                  <div class="document-line">
                    <i class="glyphicon glyphicon-star-empty fr"></i>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">名称:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">位置:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <button class="btn btn-primary" type="button">标注</button>
                  </div>
                </div>
                <div class="document">
                  <div class="document-line">
                    <i class="glyphicon glyphicon-star-empty fr"></i>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">名称:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">位置:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <button class="btn btn-primary" type="button">标注</button>
                  </div>
                </div>
                <div class="document">
                  <div class="document-line">
                    <i class="glyphicon glyphicon-star-empty fr"></i>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">名称:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">位置:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <button class="btn btn-primary" type="button">标注</button>
                  </div>
                </div>
                <div class="document">
                  <div class="document-line">
                    <i class="glyphicon glyphicon-star-empty fr"></i>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">名称:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <label class="label-line-left">位置:</label>
                    <label class="label-line-right"></label>
                  </div>
                  <div class="document-line">
                    <button class="btn btn-primary" type="button">标注</button>
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

  </div>
</template>

<script>
import bootbox from 'bootbox';
import initLoad from '../../assets/script/sidemenu';
import ol from 'openlayers/dist/ol';

export default {
  name: 'reader',
  data () {
    return {
      reader: {
        readerId: '10001',
        readerName: '分站1',
        readerLocation: '区域1',
        readerPosition: '(120.38, 130.49)',
        locationType: '重点区域',
        readerState: '正常',
        powerSupply: '交流电',
        battery_v: '3.8v',
        readerIP: '192.168.2.113'
      },
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
    initLoad();
    this.loadMap();
  },
  methods: {
    clearSearch () {
      $("input.refresh:not(:radio)").val("");
      $("input.refresh:radio").eq(0).prop('checked', true);
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      $(".nav-tabs li.active").removeClass('active');
      $(".nav-tabs li:eq(0)").addClass('active');
    },
    loadDateToModal () {
      this.reader = {
        readerId: '10001',
        readerName: '分站1',
        readerLocation: '区域1',
        readerPosition: '(120.38, 130.49)',
        locationType: '重点区域',
        readerState: '正常',
        powerSupply: '交流电',
        battery_v: '3.8v',
        readerIP: '192.168.2.113'
      };
    },
    loadMap () {
      $("#mark_reader_modal").on('shown.bs.modal', function() {
        var wuhan = ol.proj.fromLonLat([114.21, 30.37]),
        taiyuan = ol.proj.fromLonLat([112.53, 37.87]),
        beijing = ol.proj.fromLonLat([12950000, 4860000]);
        var view = new ol.View({
          center: taiyuan,
          minZoom: 8,
          zoom: 3
        });
        var map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: taiyuan,
            zoom: 8,
            minZoom: 6,
            maxZoom: 12,
            rotation: Math.PI / 6
          })
        });
      });
    },
    deleteReader () {
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
        callback: function () {
          bootbox.alert({
            message: "删除成功",
          });
        }
      });
    }
  },
};
</script>

<style lang="css" scoped>
#reader {
  width: 100%;
}

.table-box-left, .table-box-right {zoom: 1;}
.table-box-left {width: 24%; height: 550px;overflow: scroll;}
.table-box-right {width: 75%;}
.map-box, #map {
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
.document-line i {color: #337ab7; font-size: 16px;}
.document-line button {width: 80%; float: right;}
.label-line-left, .label-line-right {text-align: center;}
.label-line-left {width: 20%;}
.label-line-right {width: 80%;}
</style>
