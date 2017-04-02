<template>
  <div id="main" class="main-container">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">首页</li>
      </ol>
    </div>
    <main>
      <div class="main-left fl content-box">
        <div class="btn-box">
          <div class="fl">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#evacuate_modal">撤离呼叫</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#callback_modal">回电呼叫</button>
          </div>
          <div class="fr">
            <button type="button" @click="fullScreen()" class="btn btn-primary fr" title="地图全屏查看">
              <i class="glyphicon glyphicon-fullscreen"></i>&nbsp;全屏查看
            </button>
            <div class="input-group fr">
              <select class="">
                <option value="">-请选择工具-</option>
                <option value="">标注</option>
                <option value="">移动</option>
              </select>
            </div>
            <div class="fr">
                <div class="input-group">
                  <span>图层:</span>
                  <input type="checkbox" /><span>人员位置&nbsp;&nbsp;</span>
                  <input type="checkbox" /><span style="margin-right: 25px;">分站</span>
                </div>
            </div>
          </div>
        </div>
        <div class="map-box">
          <div id="map"></div>
        </div>
      </div>
      <div class="main-right fl content-box">
        <div class="wrap-info coalmine-wrap">
          <div class="s-title-box">
            <h5>基本信息</h5>
          </div>
          <div class="document-line">
            <label class="label-line-left">核定产能</label>
            <label class="label-line-right">200万吨/年</label>
          </div>
          <div class="document-line">
            <label class="label-line-left">核定人数</label>
            <label class="label-line-right">350人</label>
          </div>
          <div class="document-line">
            <label class="label-line-left">井下人数</label>
            <label class="label-line-right">350人</label>
          </div>
          <div class="document-line">
            <label class="label-line-left">值班领导</label>
            <label class="label-line-right">张启刚</label>
          </div>
        </div>
        <div class="wrap-info onduty-wrap">
          <div class="s-title-box">
            <h5>当班人数</h5>
          </div>
          <div class="document-line">
            <label class="label-line-left">采矿1队</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#unit_staff_modal">10人</a>
              <a href="#" title="地图显示人员信息"><i class="glyphicon glyphicon-globe"></i></a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">采矿2队</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#unit_staff_modal">12人</a>
              <a href="#" title="地图显示人员信息"><i class="glyphicon glyphicon-globe"></i></a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">通风科</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#unit_staff_modal">7人</a>
              <a href="#" title="地图显示人员信息"><i class="glyphicon glyphicon-globe"></i></a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">机电科</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#unit_staff_modal">7人</a>
              <a href="#" title="地图显示人员信息"><i class="glyphicon glyphicon-globe"></i></a>
            </label>
          </div>
        </div>
        <div class="wrap-info region-wrap">
          <div class="s-title-box">
            <h5>区域人数</h5>
          </div>
          <div class="document-line">
            <label class="label-line-left">井口区</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#region_staff_modal">1人</a>
              <a href="#" title="查看撤离呼叫状态" data-toggle="modal" data-target="#evacuate_state_modal"><i class="glyphicon glyphicon-list-alt"></i></a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">D11084工作面</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#region_staff_modal">20人</a>
              <a href="#" title="查看撤离呼叫状态" data-toggle="modal" data-target="#evacuate_state_modal"><i class="glyphicon glyphicon-list-alt"></i></a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">420大巷</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#region_staff_modal">20人</a>
              <a href="#" title="查看撤离呼叫状态" data-toggle="modal" data-target="#evacuate_state_modal"><i class="glyphicon glyphicon-list-alt"></i></a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">D11084工作面</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#region_staff_modal">20人</a>
              <a href="#" title="查看撤离呼叫状态" data-toggle="modal" data-target="#evacuate_state_modal"><i class="glyphicon glyphicon-list-alt"></i></a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">D11084工作面</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#region_staff_modal">20人</a>
              <a href="#" title="查看撤离呼叫状态" data-toggle="modal" data-target="#evacuate_state_modal"><i class="glyphicon glyphicon-list-alt"></i></a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">D11084工作面</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#region_staff_modal">20人</a>
              <a href="#" title="查看撤离呼叫状态" data-toggle="modal" data-target="#evacuate_state_modal"><i class="glyphicon glyphicon-list-alt"></i></a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">D11084工作面</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#region_staff_modal">20人</a>
              <a href="#" title="查看撤离呼叫状态" data-toggle="modal" data-target="#evacuate_state_modal"><i class="glyphicon glyphicon-list-alt"></i></a>
            </label>
          </div>
        </div>
        <div class="wrap-info alarm-wrap">
          <div class="s-title-box">
            <h5>实时报警信息</h5>
          </div>
          <div class="document-line">
            <label class="label-line-left">超时报警</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#overtime_alarm_modal" title="查看报警详情"><i class="glyphicon glyphicon-bullhorn"></i>&nbsp;2条</a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">超员报警</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#overman_alarm_modal" title="查看报警详情"><i class="glyphicon glyphicon-bullhorn"></i>&nbsp;2条</a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">限制区域报警</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#region_limit_alarm_modal" title="查看报警详情"><i class="glyphicon glyphicon-bullhorn"></i>&nbsp;2条</a>
            </label>
          </div>
          <div class="document-line">
            <label class="label-line-left">呼叫报警</label>
            <label class="label-line-right">
              <a href="#" data-toggle="modal" data-target="#staff_call_alarm_modal" title="查看报警详情"><i class="glyphicon glyphicon-bullhorn"></i>&nbsp;2条</a>
            </label>
          </div>
        </div>
      </div>
    </main>

    <!-- 撤离呼叫模态框 -->
    <div class="modal fade" id="evacuate_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">撤离呼叫</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="modal-search-bar">
                  <div class="ms-bar-select">
                    <select class="form-control">
                      <option value="">- 请选择区域 -</option>
                      <option value="">井口区</option>
                      <option value="">D11084工作面</option>
                      <option value="">420大巷</option>
                      <option value="">D2301掘进面</option>
                    </select>
                  </div>
              </div>
              <div class="hr"></div>
              <div class="btn-box">
                <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-phone-alt"></i>&nbsp;呼叫</button>
              </div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th><input type="checkbox" name="checkAllRegion" /></th>
                      <th>区域名称</th>
                      <th>当前人数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" name="region"/></td>
                      <td>井口区</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="region"/></td>
                      <td>D11084工作面</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="region"/></td>
                      <td>420大巷</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="region"/></td>
                      <td>D2301掘进面</td>
                      <td>10</td>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 回电呼叫模态框 -->
    <div class="modal fade" id="callback_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">撤离呼叫</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="modal-search-bar">
                <div class="ms-bar-select fl">
                  <select class="form-control">
                    <option value="">- 请选择部门 -</option>
                    <option value="">掘井1队</option>
                    <option value="">掘井1队</option>
                    <option value="">掘井1队</option>
                    <option value="">掘井1队</option>
                    <option value="">掘井1队</option>
                  </select>
                </div>
                <div class="input-group ms-bar-input fl">
                    <span class="input-group-addon">员工姓名</span>
                    <input type="text" class="form-control" />
                </div>
                <div class="btn-group input-group ms-bar-button fr">
                  <button type="button" class="btn btn-default"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
                  <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
                </div>
              </div>
              <div class="hr"></div>
              <div class="btn-box">
                <button type="button" class="btn btn-primary fl"><i class="glyphicon glyphicon-phone-alt"></i>&nbsp;呼叫</button>
              </div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th><input type="checkbox" name="checkAllStaff" /></th>
                      <th>部门名称</th>
                      <th>人员名称</th>
                      <th>工种</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" name="staff" /></td>
                      <td>掘进1队</td>
                      <td>张三</td>
                      <td>掘进工</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="staff" /></td>
                      <td>掘进1队</td>
                      <td>张三</td>
                      <td>掘进工</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="staff" /></td>
                      <td>掘进1队</td>
                      <td>张三</td>
                      <td>掘进工</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" name="staff" /></td>
                      <td>掘进1队</td>
                      <td>张三</td>
                      <td>掘进工</td>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 班组人员信息模态框 -->
    <div class="modal fade" id="unit_staff_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">班组人员信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>姓名</th>
                      <th>入井时间</th>
                      <th>所在位置</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>张三</td>
                      <td>10:20</td>
                      <td>人员最近分站的安装位置</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>张三</td>
                      <td>10:20</td>
                      <td>人员最近分站的安装位置</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>张三</td>
                      <td>10:20</td>
                      <td>人员最近分站的安装位置</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>张三</td>
                      <td>10:20</td>
                      <td>人员最近分站的安装位置</td>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 区域人员基本信息模态框 -->
    <div class="modal fade" id="region_staff_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">区域人员基本信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="show-info-group" style="border-bottom: 0; border-bottom-right-radius: 0; border-bottom-left-radius: 0;">
                <div class="s-group-left">区域</div>
                <div class="s-group-right">D11084工作面</div>
              </div>
              <div class="show-info-group" style="border-top-left-radius: 0; border-top-right-radius: 0;">
                <div class="s-group-left">人数</div>
                <div class="s-group-right">20人</div>
              </div>
              <div class="hr"></div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>姓名</th>
                      <th>入井时间</th>
                      <th>工种</th>
                      <th>班组</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>张三</td>
                      <td>10:20</td>
                      <td>掘进工</td>
                      <td>采掘一队</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>张三</td>
                      <td>10:20</td>
                      <td>掘进工</td>
                      <td>采掘一队</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>张三</td>
                      <td>10:20</td>
                      <td>掘进工</td>
                      <td>采掘一队</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>张三</td>
                      <td>10:20</td>
                      <td>掘进工</td>
                      <td>采掘一队</td>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 撤离呼叫状态信息模态框 -->
    <div class="modal fade" id="evacuate_state_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">撤离呼叫状态信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="show-info-group" style="border-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0;">
                <div class="s-group-left">区域</div>
                <div class="s-group-right">D11084工作面</div>
              </div>
              <div class="show-info-group" style="border-bottom: 0; border-radius: 0;">
                <div class="s-group-left">人数</div>
                <div class="s-group-right">4人</div>
              </div>
              <div class="show-info-group" style="border-bottom: 0; border-radius: 0;">
                <div class="s-group-left">已呼叫</div>
                <div class="s-group-right">1人</div>
              </div>
              <div class="show-info-group" style="border-top-left-radius: 0; border-top-right-radius: 0;">
                <div class="s-group-left">正在呼叫</div>
                <div class="s-group-right">张启龙</div>
              </div>
              <div class="hr"></div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>姓名</th>
                      <th>入井时间</th>
                      <th>工种</th>
                      <th>班组</th>
                      <th>呼叫状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(elem, index) in evacuateStateList" :key="elem.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ elem.name }}</td>
                      <td>{{ elem.time }}</td>
                      <td>{{ elem.job }}</td>
                      <td>{{ elem.unit }}</td>
                      <td>{{ elem.state }}</td>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 超时报警信息模态框 -->
    <div class="modal fade" id="overtime_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">超时报警信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>卡号</th>
                      <th>姓名</th>
                      <th>到岗时间</th>
                      <th>到岗位置</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>001</td>
                      <td>张三</td>
                      <td>8:20</td>
                      <td>A工作面</td>
                    </tr>
                    <tr>
                      <td>002</td>
                      <td>李四</td>
                      <td>8:20</td>
                      <td>B工作面</td>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 超员报警信息模态框 -->
    <div class="modal fade" id="overman_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">超员报警信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>区域名称</th>
                      <th>应到人数</th>
                      <th>实到人数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A工作面</td>
                      <td>15</td>
                      <td>16</td>
                    </tr>
                    <tr>
                      <td>B工作面</td>
                      <td>16</td>
                      <td>17</td>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 限制区域报警信息模态框 -->
    <div class="modal fade" id="region_limit_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">限制区域报警信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>-</th>
                      <th>-</th>
                      <th>-</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 呼叫报警信息模态框 -->
    <div class="modal fade" id="staff_call_alarm_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">呼叫报警信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>呼叫员工</th>
                      <th>所在区域名称</th>
                      <th>呼叫时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>张三</td>
                      <td>A工作面</td>
                      <td>2014-10-25 10:20</td>
                    </tr>
                    <tr>
                      <td>李四</td>
                      <td>B工作面</td>
                      <td>2014-10-25 10:20</td>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal">退出</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import ol from 'openlayers/dist/ol';

export default {
  name: "main",
  data() {
    return {
      evacuateStateList: [
        {
          name: '张三',
          time: '8:00',
          job: '掘进',
          unit: '掘进1队',
          state: '未呼叫'
        },
        {
          name: '张三',
          time: '8:00',
          job: '掘进',
          unit: '掘进1队',
          state: '未呼叫'
        },
        {
          name: '张三',
          time: '8:00',
          job: '掘进',
          unit: '掘进1队',
          state: '未呼叫'
        },
        {
          name: '张启龙',
          time: '8:00',
          job: '掘进',
          unit: '掘进1队',
          state: '已呼叫'
        }
      ]
    }
  },
  mounted () {
    this.loadMap();
  },
  methods: {
    loadMap () {
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
    },
    fullScreen () {
        var invokeFieldOrMethod = function(element, method) {
          var usablePrefixMethod;
          ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
           if (usablePrefixMethod) return;
           if (prefix === "") {
               // 无前缀，方法首字母小写
               method = method.slice(0,1).toLowerCase() + method.slice(1);
           }
           var typePrefixMethod = typeof element[prefix + method];
           if (typePrefixMethod + "" !== "undefined") {
               if (typePrefixMethod === "function") {
                   usablePrefixMethod = element[prefix + method]();
               } else {
                   usablePrefixMethod = element[prefix + method];
               }
           }
       });
         return usablePrefixMethod;
       };

       //進入全屏
       function launchFullscreen(element) {
          //此方法不可以在異步任務中執行，否則火狐無法全屏
           if(element.requestFullscreen) {
             element.requestFullscreen();
           } else if(element.mozRequestFullScreen) {
             element.mozRequestFullScreen();
           } else if(element.msRequestFullscreen){
             element.msRequestFullscreen();
           } else if(element.oRequestFullscreen){
              element.oRequestFullscreen();
          }
          else if(element.webkitRequestFullscreen)
           {
             element.webkitRequestFullScreen();
           }else{

              var docHtml  = document.documentElement;
              var docBody  = document.body;
              var videobox  = document.getElementById('map');
              var  cssText = 'width:100%;height:100%;overflow:hidden;';
              docHtml.style.cssText = cssText;
              docBody.style.cssText = cssText;
              videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
              document.IsFullScreen = true;

            }
         }
          //退出全屏
         function exitFullscreen() {
             if (document.exitFullscreen) {
                document.exitFullscreen();
             } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
             } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
             } else if(document.oRequestFullscreen){
                document.oCancelFullScreen();
              }else if (document.webkitExitFullscreen){
                document.webkitExitFullscreen();
             }else{
                var docHtml  = document.documentElement;
                var docBody  = document.body;
                var videobox  = document.getElementById('map');
                docHtml.style.cssText = "";
                docBody.style.cssText = "";
                videobox.style.cssText = "";
                document.IsFullScreen = false;
             }
        }
        // document.getElementById('fullScreenBtn').addEventListener('click',function(){
            launchFullscreen(document.getElementById('map'));
            // window.setTimeout(function exit(){
                if(invokeFieldOrMethod(document,'FullScreen')
                    || invokeFieldOrMethod(document,'IsFullScreen')
                    || document.IsFullScreen) {
                      exitFullscreen();
                }
            // },5*1000);
        // },false);
    }
  }
}
</script>
<style scoped>
@import "../../../node_modules/openlayers/dist/ol.css";

#main {
  width: 100%;
  min-height: 700px;
  overflow: hidden;
  zoom: 1;
}

main {
  overflow: hidden;
  zoom: 1;
}

.main-left {
  width: 75%;
  min-height: 700px;
  margin-right: 1%;
}

.btn-box {
  overflow: hidden;
}

.btn-box span {
  display: inline-block;
  height: 34px;
  vertical-align: middle;
  padding: 6px 6px 6px 0;
}

#map {
  width: 100%;
  height: 100%;
  min-height: 600px;
}

.main-right {
  width: 24%;
  min-height: 700px;
}

.wrap-info .label-line-right {
  color: red;
  font-weight: 400;
}

.label-line-right a {
  margin-right: 25px;
  color: red;
  text-decoration: none;
}

.label-line-right a:hover {
  background-color: white;
  color: #70B9B0;
}
</style>
