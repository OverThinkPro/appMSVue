<template lang="html">
  <div class="card">
    <div class="bread-box">
      <ol class="breadcrumb">
        <li class="active">定位卡管理</li>
      </ol>
    </div>
    <main>
      <div class="title-box content-box">
        <h3>定位卡管理</h3>
      </div>
      <div class="table-box outside-box">
        <div class="search-bar-box">
          <div class="search-bar">
            <div class="input-group search-bar-input fl">
              <span class="input-group-addon">卡号</span>
              <input class="form-control refresh" type="text" name="">
            </div>
            <div class="search-bar-select fl">
              <select id="cardStateSelect" class="form-control refresh" name="">
                <option value="0">未使用</option>
                <option value="1">正常</option>
                <option value="2">丢失</option>
                <option value="3">故障</option>
              </select>
            </div>
            <div class="search-bar-select fl">
              <select class="form-control refresh" name="">
                <option value="">- 请选择部门 -</option>
                <option value="">部门1</option>
                <option value="">部门2</option>
                <option value="">部门3</option>
                <option value="">部门4</option>
                <option value="">部门5</option>
              </select>
            </div>
            <div class="input-group search-bar-input fl">
              <span class="input-group-addon">员工姓名</span>
              <input class="form-control refresh" type="text" name="">
            </div>
            <div class="btn-group fr">
              <button class="btn btn-default" type="button" @click="clearAndInitSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
              <button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 未发放的卡列表 -->
      <div v-if="cardState == 0" class="table-box outside-box">
        <div class="btn-box">
          <button class="btn btn-primary fl" type="button" @click="sendCard()" data-toggle="modal" data-target="#send_card_modal">发卡</button>
        </div>
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>选择</th>
                <th>序号</th>
                <th>卡号</th>
                <th>卡状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(card, index) in cardList" :key="card.key">
                <td><input type="radio" name="card" :value="card.cardId"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ card.cardId }}</td>
                <td>{{ card.cardState }}</td>
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
      <!-- 正常的卡列表 -->
      <div v-if="cardState == 1" class="table-box outside-box">
        <div class="btn-box">
          <button class="btn btn-primary fl" type="button" data-toggle="modal" data-target="#change_card_modal">换卡</button>
          <button class="btn btn-primary fl" type="button" @click="revokeCard()">收卡</button>
        </div>
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>选择</th>
                <th>序号</th>
                <th>卡号</th>
                <th>卡状态</th>
                <th>姓名</th>
                <th>员工编号</th>
                <th>班组</th>
                <th>发放时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(card, index) in cardList" :key="card.key">
                <td><input type="radio" name="card" :value="card.cardId"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ card.cardId }}</td>
                <td>{{ card.cardState }}</td>
                <td>{{ card.name }}</td>
                <td>{{ card.no }}</td>
                <td>{{ card.unit }}</td>
                <td>{{ card.time }}</td>
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
      <!-- 丢失的卡列表 -->
      <div v-if="cardState == 2" class="table-box outside-box">
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>序号</th>
                <th>卡号</th>
                <th>卡状态</th>
                <th>姓名</th>
                <th>员工编号</th>
                <th>班组</th>
                <th>操作人员</th>
                <th>挂失时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(card, index) in cardList" :key="card.key">
                <td>{{ index + 1 }}</td>
                <td>{{ card.cardId }}</td>
                <td>{{ card.cardState }}</td>
                <td>{{ card.name }}</td>
                <td>{{ card.no }}</td>
                <td>{{ card.unit }}</td>
                <td>{{ card.user }}</td>
                <td>{{ card.time }}</td>
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
      <!-- 故障的卡列表 -->
      <div v-if="cardState == 3" class="table-box outside-box">
        <div class="data-box">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>序号</th>
                <th>卡号</th>
                <th>卡状态</th>
                <th>姓名</th>
                <th>员工编号</th>
                <th>班组</th>
                <th>操作人员</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(card, index) in cardList" :key="card.key">
                <td>{{ index + 1 }}</td>
                <td>{{ card.cardId }}</td>
                <td>{{ card.cardState }}</td>
                <td>{{ card.name }}</td>
                <td>{{ card.no }}</td>
                <td>{{ card.unit }}</td>
                <td>{{ card.user }}</td>
                <td>{{ card.time }}</td>
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

    <!-- 定位卡发放模态框 -->
    <div class="modal fade" id="send_card_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width: 750px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">定位卡发放</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="content-box">
                <div class="show-info-group clear-bottom clear-radius-bottom">
                  <div class="group-left">卡号</div>
                  <div class="group-right">100001</div>
                  <div class="group-left">状态</div>
                  <div class="group-right">未发放</div>
                </div>
                <div class="show-info-group clear-bottom clear-border-radius">
                  <div class="group-left">员工</div>
                  <div class="group-right"></div>
                  <div class="group-left">部门</div>
                  <div class="group-right"></div>
                </div>
                <div class="show-info-group clear-radius-top">
                  <div class="group-left">发放时间</div>
                  <div class="group-right">{{ user.current }}</div>
                  <div class="group-left">操作人员</div>
                  <div class="group-right"></div>
                </div>
              </div>
              <div class="search-bar-box">
                <div class="modal-search-bar">
                  <div class="ms-bar-select fl" style="margin-left: 0px;">
                    <select class="form-control refresh" name="">
                      <option value="">- 请选择部门 -</option>
                      <option value="">部门1</option>
                      <option value="">部门2</option>
                    </select>
                  </div>
                  <div class="input-group ms-bar-input fl">
                    <span class="input-group-addon">员工姓名</span>
                    <input class="form-control refresh" type="text" name="">
                  </div>
                  <div class="input-group ms-bar-input fl">
                    <span class="input-group-addon">姓名简拼</span>
                    <input class="form-control refresh" type="text" name="">
                  </div>
                  <div class="btn-group fr">
                    <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>重置</button>
                    <button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>查询</button>
                  </div>
                </div>
              </div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>姓名</th>
                      <th>班组</th>
                      <th>卡号</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(elem, index) in cardList" :key="elem.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ elem.name }}</td>
                      <td>{{ elem.unit }}</td>
                      <td>{{ elem.cardId }}</td>
                      <td><a href="javascript: void(0);">选择</a></td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box">
                  <ul class="pagination">
                    <li><a href="">&laquo;</a></li>
                    <li><a href="">1</a></li>
                    <li><a href="">2</a></li>
                    <li><a href="">3</a></li>
                    <li><a href="">&raquo;</a></li>
                  </ul>
                </nav>
              </div>
              <div class="content-box">
                <div class="input-group btn-box" style="margin-left: 0;">
                  <button class="btn btn-primary fl" type="button" @click="checkCard()"><i class="glyphicon glyphicon-check"></i>&nbsp;核卡</button>
                </div>
                <div class="show-info-group">
                  <div class="group-left">卡号</div>
                  <div class="group-right">100001</div>
                  <div class="group-left">状态</div>
                  <div class="group-right">未发放</div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="show_time_alert()">保存</button>
            <button type="button" class="btn btn-default modal-btn" data-dismiss="modal" @click="clearSearch()">退出</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 定位卡换卡模态框 -->
    <div class="modal fade" id="change_card_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width: 750px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="clearSearch()">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only"></span>
            </button>
            <h4 class="modal-title">定位卡换卡</h4>
          </div>
          <div class="modal-body">
            <div class="modal-table-box">
              <div class="content-box">
                <div class="show-info-group clear-bottom clear-radius-bottom">
                  <div class="group-left">新卡号</div>
                  <div class="group-right">100001</div>
                  <div class="group-left">状态</div>
                  <div class="group-right">未发放</div>
                </div>
                <div class="show-info-group clear-bottom clear-border-radius">
                  <div class="group-left">员工</div>
                  <div class="group-right">李权良</div>
                  <div class="group-left">部门</div>
                  <div class="group-right">机电科</div>
                </div>
                <div class="show-info-group clear-bottom clear-border-radius">
                  <div class="group-left">旧卡号</div>
                  <div class="group-right">100001</div>
                  <div class="group-left">状态</div>
                  <div class="group-right">
                    <select class="form-control clear-border clear-border-radius" name="">
                      <option value="">正常</option>
                      <option value="">故障</option>
                      <option value="">丢失</option>
                    </select>
                  </div>
                </div>
                <div class="show-info-group clear-radius-top">
                  <div class="group-left">换卡时间</div>
                  <div class="group-right">{{ current() }}</div>
                  <div class="group-left">操作人员</div>
                  <div class="group-right">admin</div>
                </div>
              </div>
              <div class="search-bar-box">
                <div class="modal-search-bar">
                  <div class="input-group ms-bar-input fl" style="width: 45%; margin-left: 0;">
                    <span class="input-group-addon">卡号</span>
                    <input class="form-control refresh" type="text" name="">
                  </div>
                  <div class="ms-bar-button fl" style="width: 100px;">
                    <button class="btn btn-primary" type="button">设备读卡</button>
                  </div>
                  <div class="btn-group fr">
                    <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>重置</button>
                    <button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-search"></i>查询</button>
                  </div>
                </div>
              </div>
              <div class="data-box">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>卡号</th>
                      <th>状态</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(elem, index) in cardList" :key="elem.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ elem.cardId }}</td>
                      <td>{{ elem.cardState }}</td>
                      <td><a href="javascript: void(0);">选择</a></td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box">
                  <ul class="pagination">
                    <li><a href="">&laquo;</a></li>
                    <li><a href="">1</a></li>
                    <li><a href="">2</a></li>
                    <li><a href="">3</a></li>
                    <li><a href="">&raquo;</a></li>
                  </ul>
                </nav>
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
import {currentTime} from '../../assets/script/date';
import bootbox from 'bootbox/bootbox.min';

export default {
  name: 'card',
  data () {
    return {
      user: {
        current: ""
      },
      cardState: 0,
      cardStates: ['未使用', '正常', '丢失', '故障'],
      cardList: [
        {
          cardId: '001',
          cardState: '故障',
          name: '李权良',
          no: '001001',
          unit: '机电科',
          user: '李建刚',
          time: '2014-10-08'
        },
        {
          cardId: '001',
          cardState: '故障',
          name: '李权良',
          no: '001001',
          unit: '机电科',
          user: '李建刚',
          time: '2014-10-08'
        },
        {
          cardId: '001',
          cardState: '故障',
          name: '李权良',
          no: '001001',
          unit: '机电科',
          user: '李建刚',
          time: '2014-10-08'
        },
        {
          cardId: '001',
          cardState: '故障',
          name: '李权良',
          no: '001001',
          unit: '机电科',
          user: '李建刚',
          time: '2014-10-08'
        }
      ],
    };
  },
  mounted () {
    this.initEvent();
  },
  methods: {
    initEvent () {
      var self = this;
      $("#cardStateSelect").change(function(event) {
        var selectedValue = $("#cardStateSelect").val();
        self.cardState = selectedValue;
      });

      $("#send_card_modal").on("show.bs.modal", () => {
        this.user.current = this.current();
      });
    },
    current () {
      return currentTime();
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh:not(#cardStateSelect)").find("option:eq(0)").prop('selected', true);
    },
    clearAndInitSearch() {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      this.cardState = 0;
    },
    sendCard () {

    },
    checkCard () {
      bootbox.alert("核卡成功，信息无误!");
    },
    revokeCard () {
      bootbox.confirm({
        message: '定位卡收卡一旦操作，不可恢复，是否确定操作？',
        buttons: {
          confirm: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        },
        callback: function() {
          bootbox.alert("定位卡收卡成功！");
        }
      });
    },
    show_time_alert () {
      alert("time: " + this.user.current);
    }
  }
};
</script>

<style lang="css" scoped>
#card {
  width: 100%;
}
</style>
