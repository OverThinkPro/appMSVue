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
              <input id="cardIdInput" class="form-control refresh" type="text" name="">
            </div>
            <div class="search-bar-select fl">
              <select id="cardStateSelect" class="form-control refresh" name="">
                <option value="1">未使用</option>
                <option value="2">正常</option>
                <option value="3">丢失</option>
                <option value="4">故障</option>
              </select>
            </div>
            <div class="search-bar-select fl">
              <select id="unitIdSelect" class="form-control refresh" name="">
                <option value="">- 请选择部门 -</option>
                <option v-if="unitList != null" v-for="unit in unitList" :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
              </select>
            </div>
            <div class="input-group search-bar-input fl">
              <span class="input-group-addon">员工姓名</span>
              <input id="staffNameInput" class="form-control refresh" type="text" name="">
            </div>
            <div class="btn-group fr">
              <button class="btn btn-default" type="button" @click="clearAndInitSearch()"><i class="glyphicon glyphicon-refresh"></i>&nbsp;重置</button>
              <button class="btn btn-primary" type="button" @click="doCardSearch()"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 未发放的卡列表 -->
      <div v-if="cardStatus == 1" class="table-box outside-box">
        <div class="btn-box">
          <button class="btn btn-primary fl" type="button" @click="checkType('SEND_CARD')" data-toggle="modal" data-target="">发卡</button>
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
              <tr v-if="cardListCache.cardList != null" v-for="(card, index) in cardListCache.cardList" :key="card.key">
                <td><input type="radio" name="card" :value="card.cardId"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ card.cardId }}</td>
                <td>{{ card.cardStatus }}</td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="leCardPagingBox">
            <div id="leCardPaging" class="pagination"></div>
          </nav>
        </div>
      </div>
      <!-- 正常的卡列表 -->
      <div v-if="cardStatus == 2" class="table-box outside-box">
        <div class="btn-box">
          <button class="btn btn-primary fl" type="button" @click="checkType('CHANGE_CARD')" data-toggle="modal" data-target="">换卡</button>
          <button class="btn btn-primary fl" type="button" @click="checkType('REVOKE_CARD')">收卡</button>
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
              <tr v-if="cardListCache.cardList != null" v-for="(card, index) in cardListCache.cardList" :key="card.key">
                <td><input type="radio" name="card" :value="card.cardId"></td>
                <td>{{ index + 1 }}</td>
                <td>{{ card.cardId }}</td>
                <td>{{ card.cardStatus }}</td>
                <td>{{ card.staffName }}</td>
                <td>{{ card.staffId }}</td>
                <td>{{ card.unitName }}</td>
                <td>{{ card.opTime }}</td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="leCardPagingBox">
            <div id="leCardPaging" class="pagination"></div>
          </nav>
        </div>
      </div>
      <!-- 丢失的卡列表 -->
      <div v-if="cardStatus == 3" class="table-box outside-box">
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
              <tr v-if="cardListCache.cardList != null" v-for="(card, index) in cardListCache.cardList" :key="card.key">
                <td>{{ index + 1 }}</td>
                <td>{{ card.cardId }}</td>
                <td>{{ card.cardStatus }}</td>
                <td>{{ card.staffName }}</td>
                <td>{{ card.staffId }}</td>
                <td>{{ card.unitName }}</td>
                <td>{{ card.opName }}</td>
                <td>{{ card.opTime }}</td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="leCardPagingBox">
            <div id="leCardPaging" class="pagination"></div>
          </nav>
        </div>
      </div>
      <!-- 故障的卡列表 -->
      <div v-if="cardStatus == 4" class="table-box outside-box">
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
              <tr v-if="cardListCache.cardList != null" v-for="(card, index) in cardListCache.cardList" :key="card.key">
                <td>{{ index + 1 }}</td>
                <td>{{ card.cardId }}</td>
                <td>{{ card.cardStatus }}</td>
                <td>{{ card.staffName }}</td>
                <td>{{ card.staffId }}</td>
                <td>{{ card.unitName }}</td>
                <td>{{ card.opName }}</td>
                <td>{{ card.opTime }}</td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-box" id="leCardPagingBox">
            <div id="leCardPaging" class="pagination"></div>
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
                  <div class="group-right">{{ sendCard.cardId }}</div>
                  <div class="group-left">状态</div>
                  <div class="group-right">{{ sendCard.cardStatus }}</div>
                </div>
                <div class="show-info-group clear-bottom clear-border-radius">
                  <div class="group-left">员工</div>
                  <div class="group-right refresh" id="sendStaffNameDiv"></div>
                  <div class="group-left">部门</div>
                  <div class="group-right refresh" id="sendUnitNameDiv"></div>
                </div>
                <div class="show-info-group clear-radius-top">
                  <div class="group-left">发放时间</div>
                  <div class="group-right">{{ sendCard.opTime }}</div>
                  <div class="group-left">操作人员</div>
                  <div class="group-right">{{ sendCard.opName }}</div>
                </div>
              </div>
              <div class="search-bar-box">
                <div class="modal-search-bar">
                  <div class="ms-bar-select fl" style="margin-left: 0px;">
                    <select class="form-control refresh" name="sendUnitSelect">
                      <option value="">- 请选择部门 -</option>
                      <option v-if="unitList != null" v-for="unit in unitList" :key="unit.key" :value="unit.unitId">{{ unit.unitName }}</option>
                    </select>
                  </div>
                  <div class="input-group ms-bar-input fl">
                    <span class="input-group-addon">员工姓名</span>
                    <input class="form-control refresh" type="text" name="sendStaffNameInput">
                  </div>
                  <div class="input-group ms-bar-input fl">
                    <span class="input-group-addon">姓名简拼</span>
                    <input class="form-control refresh" type="text" name="sendStaffAbbrInput">
                  </div>
                  <div class="btn-group fr">
                    <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>重置</button>
                    <button class="btn btn-primary" type="button" @click="loadSModalStaffList()"><i class="glyphicon glyphicon-search"></i>查询</button>
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
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="staffListCache.staffList != null" v-for="(staff, index) in staffListCache.staffList" :key="staff.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ staff.staffName }}</td>
                      <td>{{ staff.unitName }}</td>
                      <td><a href="javascript: void(0);" @click="addSendInfo(staff.staffId)">选择</a></td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="staffListPagingBox">
                  <div id="staffListPaging" class="pagination"></div>
                </nav>
              </div>
              <div class="content-box">
                <div class="input-group btn-box" style="margin-left: 0;">
                  <button class="btn btn-primary fl" type="button" @click="checkCard()"><i class="glyphicon glyphicon-check"></i>&nbsp;核卡</button>
                </div>
                <div class="show-info-group">
                  <div class="group-left">卡号</div>
                  <div class="group-right refresh" id="sendCardIdResult"></div>
                  <div class="group-left">状态</div>
                  <div class="group-right refresh" id="sendCardStatusResult"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="sendCardOper()">发卡</button>
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
                  <div class="group-right refresh" id="changeCardIdDiv"></div>
                  <div class="group-left">状态</div>
                  <div class="group-right refresh" id="changeCardStatusDiv"></div>
                </div>
                <div class="show-info-group clear-bottom clear-border-radius">
                  <div class="group-left">员工</div>
                  <div class="group-right">{{ changeCard.staffName }}</div>
                  <div class="group-left">部门</div>
                  <div class="group-right">{{ changeCard.unitName }}</div>
                </div>
                <div class="show-info-group clear-bottom clear-border-radius">
                  <div class="group-left">旧卡号</div>
                  <div class="group-right">{{ changeCard.cardId }}</div>
                  <div class="group-left">状态</div>
                  <div class="group-right">
                    <select class="form-control clear-border clear-border-radius" v-model="changeCard.cardStatus">
                      <option value="正常">正常</option>
                      <option value="故障">故障</option>
                      <option value="丢失">丢失</option>
                    </select>
                  </div>
                </div>
                <div class="show-info-group clear-radius-top">
                  <div class="group-left">换卡时间</div>
                  <div class="group-right">{{ changeCard.opTime }}</div>
                  <div class="group-left">操作人员</div>
                  <div class="group-right">{{ changeCard.opName }}</div>
                </div>
              </div>
              <div class="search-bar-box">
                <div class="modal-search-bar">
                  <div class="input-group ms-bar-input fl" style="width: 45%; margin-left: 0;">
                    <span class="input-group-addon">卡号</span>
                    <input class="form-control refresh" type="text" name="changeCardIdInput">
                  </div>
                  <div class="ms-bar-button fl" style="width: 100px;">
                    <button class="btn btn-primary" type="button">设备读卡</button>
                  </div>
                  <div class="btn-group fr">
                    <button class="btn btn-default" type="button" @click="clearSearch()"><i class="glyphicon glyphicon-refresh"></i>重置</button>
                    <button class="btn btn-primary" type="button" @click="loadCModalStaffList()"><i class="glyphicon glyphicon-search"></i>查询</button>
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
                    <tr v-if="cardMListCache.cardList != null" v-for="(card, index) in cardMListCache.cardList" :key="card.key">
                      <td>{{ index + 1 }}</td>
                      <td>{{ card.cardId }}</td>
                      <td>{{ card.cardStatus }}</td>
                      <td><a href="javascript: void(0);" @click="addChangeInfo(card.cardId)">选择</a></td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination-box" id="cardListPagingBox">
                  <div id="cardListPaging" class="pagination"></div>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary modal-btn" @click="changeCardOper()">换卡</button>
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
import { currentTime } from '../../assets/script/date';
import { initPagination } from '../../assets/script/initplugin';
import { deepCopy } from '../../assets/script/extends';

export default {
  name: 'card',
  data () {
    return {
      cardStatus: 1,
      cardList: [],
      cardListCache: {
        cardList: [],
        total: 0
      },
      unitList: [],
      // 发卡
      sendCard: {},
      // 换卡
      changeCard: {},
      staffListCache: {
        staffList: [],
        total: 0
      },
      cardMListCache: {
        cardList: [],
        total: 0
      }
    };
  },
  mounted () {
    this.initEvent();
    this.defaultLoadUnit();
    this.doCardSearch();
  },
  methods: {
    initEvent () {
      var self = this;

      $("#unitIdSelect, #staffNameInput").prop('disabled', true);
      $("#cardStateSelect").change(function(event) {
        self.cardListCache = {};
        let selectedValue = $("#cardStateSelect").val();
        self.cardStatus = selectedValue;

        if (selectedValue == 1) {
          $("#unitIdSelect, #staffNameInput").prop('disabled', true);
        } else {
          $("#unitIdSelect, #staffNameInput").prop('disabled', false);
        }

        self.doCardSearch();
      });

      $("#send_card_modal").on("show.bs.modal", () => {
        self.loadSModalStaffList();
      });
      $("#change_card_modal").on("show.bs.modal", () => {
        self.loadCModalStaffList();
      });
    },
    clearSearch () {
      $("input.refresh").val("");
      $("select.refresh:not(#cardStateSelect)").find("option:eq(0)").prop('selected', true);
      $("div.refresh").text("");
      this.loadLeCard();
      $("input[name='card']:radio:checked").prop('checked', false);
    },
    clearAndInitSearch() {
      $("input.refresh").val("");
      $("select.refresh").find("option:eq(0)").prop('selected', true);
      $("div.refresh").text("");

      this.cardStatus = 1;
      $("#cardStateSelect").trigger('change');
      this.doCardSearch();
      $("input[name='card']:radio:checked").prop('checked', false);
    },
    getSearchParam () {
      let params = {},
          cardId, cardStatus, unitId, staffName;

      cardId = $("#cardIdInput").val();
      if (cardId) { params.cardId = cardId; }

      cardStatus = $("#cardStateSelect").find("option:selected").text();
      if (cardStatus) { params.cardStatus = cardStatus; }

      unitId = $("#unitIdSelect").find("option:selected").val();
      if (unitId) { params.unitId = unitId; }

      staffName = $("#staffNameInput").val();
      if (staffName) { params.staffName = staffName; }

      return params;
    },
    /**
     * Start default load data set.
     */
    defaultLoadUnit () {
      let self = this;

      axios.get('/base/unit/')
            .then((response) => {
                let { meta, data } = response.data;

                if (meta.success) {
                  if (data && data.unitList) {
                    self.unitList = data.unitList;
                  }
                } else {
                  bootbox.alert({
                    message: meta.message
                  });
                }
            });
    },
    /**
     * End default load data set.
     */
    /**
     * Start combine condition search function.
     */
    doCardSearch () {
      let self = this;

      self.loadLeCard();
    },
    loadLeCard () {
      initPagination('leCardPagingBox', 'leCardPaging');
      this.loadLeCardPaging(null);
    },
    loadLeCardPaging (page, isPaging) {
      let self = this,
          params = self.getSearchParam();

      page = page || 1;
      axios.post('/base/card/p/' + page, params)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.cardList) {
                  self.cardListCache = {};
                  self.cardListCache.cardList = data.cardList;
                  self.cardListCache.total = data.total;

                  if (!isPaging) {
                    $("#leCardPaging").page({
                      total: self.cardListCache.total,
                      pageSize: 10,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条'
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadLeCardPaging(pageNumber + 1, true);
                    });
                  }
                } else { bootbox.alert({ message: '无符合查询条件的记录!'}); }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
          });
    },
    /**
     * End combine condition search function.
     */
    /**
     * Start business operation for staff card.
     */
    // 检测
    checkType (type) {
      let self = this,
          selectedCard = $("input[name='card']:radio:checked");

      if (selectedCard.length < 1 ) {
        bootbox.alert({
          message: '请选择一条记录，然后再进行操作!'
        });
        return false;
      } else {
        self.cardListCache.cardList.forEach(function(card, index) {
          if (card.cardId == selectedCard.val()) {
            if (type == 'SEND_CARD') {
              self.sendCard = {};
              self.sendCard.cardId = card.cardId;
              self.sendCard.cardStatus = card.cardStatus;
              self.sendCard.opTime = currentTime();
              self.sendCard.opName = 'Zychaowill';

              $("#send_card_modal").modal('show');
            } else if (type == 'CHANGE_CARD') {
              self.changeCard = {};
              self.changeCard.cardId = card.cardId;
              self.changeCard.cardStatus = card.cardStatus;
              self.changeCard.staffId = card.staffId;
              self.changeCard.staffName = card.staffName;
              self.changeCard.unitName = card.unitName;
              self.changeCard.opTime = currentTime();
              self.changeCard.opName = 'Zychaowill';

              $("#change_card_modal").modal('show');
            } else if (type == 'REVOKE_CARD') {
              let cardId = selectedCard.val();
              self.revokeCardOper(cardId);
            }
          }
        });
      }
    },
    // 默认装载员工列表
    getSendParams () {
      let params = {},
          unitId, staffName, staffAbbr;

      unitId = $("select[name='sendUnitSelect']").find("option:selected").val();
      if (unitId) { params.unitId = unitId; }

      staffName = $("input[name='sendStaffNameInput']").val();
      if (staffName) { params.staffName = staffName; }

      staffAbbr = $("input[name='sendStaffAbbrInput']").val();
      if (staffAbbr) { params.staffAbbr = staffAbbr; }

      return params;
    },
    loadSModalStaffList () {
      initPagination('staffListPagingBox', 'staffListPaging');
      this.loadModalStaffListPaging(null);
    },
    loadModalStaffListPaging (page, isPaging) {
      let self = this,
          params = self.getSendParams();

      page = page || 1;
      axios.post('/base/staffcard/p/' + page, params)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.cardList) {
                  self.staffListCache = {};
                  self.staffListCache.staffList = data.cardList;
                  self.staffListCache.total = data.total;

                  if (!isPaging) {
                    $("#staffListPaging").page({
                      total: self.staffListCache.total,
                      pageSize: 6,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条'
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadModalStaffListPaging(pageNumber + 1, true);
                    });
                  }
                }
              } else { bootbox.alert({ message: meta.message }); }
            });
    },
    addSendInfo (staffId) {
      let self = this;


      self.staffListCache.staffList.forEach(function(staff, index) {
        if (staff.staffId == staffId) {
          self.sendCard.staffId = staff.staffId;
          self.sendCard.staffName = staff.staffName;
          self.sendCard.unitName = staff.unitName;
          $("#sendStaffNameDiv").text(staff.staffName);
          $("#sendUnitNameDiv").text(staff.unitName);
        }
      });
    },
    // 发卡
    sendCardOper () {
      let self = this;

      axios.put('/base/card', self.sendCard)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) {
                  bootbox.alert("发卡成功!");
                  self.sendCard = {};
                  self.clearSearch();
                  $("#send_card_modal").modal('hide');
                } else { bootbox.alert("发卡失败!"); }
              } else { bootbox.alert("服务器内部错误,发卡失败!"); }
            });
    },
    checkCard () {
      let self = this;

      axios.get('/base/card/' + self.sendCard.cardId)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data) {
                  $("#sendCardIdResult").text(data.card.cardId);
                  $("#sendCardStatusResult").text(data.card.cardStatus);
                  bootbox.alert("核卡成功,信息无误!");
                } else { bootbox.alert("核卡失败!"); }
              } else { bootbox.alert("服务器内部错误,核卡失败!"); }
            });
    },
    // 换卡
    loadCModalStaffList () {
      initPagination('cardListPagingBox', 'cardListPaging');
      this.loadModalCardListPaging(null);
    },
    loadModalCardListPaging (page, isPaging) {
      let self = this,
          cardId;
      cardId = $("input[name='changeCardIdInput']").val();

      page = page || 1;
      axios.get('/base/card/p/' + page, { params: { cardId: cardId}})
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.cardList) {
                  self.cardMListCache.cardList = data.cardList;
                  self.cardMListCache.total = data.total;

                  if (!isPaging) {
                    $("#cardListPaging").page({
                      total: self.cardMListCache.total,
                      pageSize: 6,
                      prevBtnText: '上一页',
                      nextBtnText: '下一页',
                      showInfo: true,
                      infoFormat: '{start} ~ {end}条，共{total}条'
                    }).on("pageClicked", function (event, pageNumber) {
                      self.loadModalCardListPaging(pageNumber + 1, true);
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
    addChangeInfo (cardId) {
      let self = this;

      self.cardMListCache.cardList.forEach(function(card, index) {
        if (card.cardId == cardId) {
          self.changeCard.newCardId = card.cardId;
          self.changeCard.newCardStatus = card.cardStatus;
          $("#changeCardIdDiv").text(card.cardId);
          $("#changeCardStatusDiv").text(card.cardStatus);
        }
      });
    },
    changeCardOper () {
      let self = this;

      self.changeCard.oldCardStatus = $("select[name='changeOldCardStatus']").find('option:selected').val();

      axios.put('/base/newcard/', self.changeCard)
            .then((response) => {
              let { meta, data } = response.data;

              if (meta.success) {
                if (data && data.result == 1) {
                  bootbox.alert("换卡成功!");

                  self.changeCard = {};
                  self.clearSearch();
                  $("#change_card_modal").modal('hide');
                } else { bootbox.alert("换卡失败!"); }
              } else {
                bootbox.alert({
                  message: meta.message
                });
              }
            });
    },
    // 收卡
    revokeCardOper (cardId) {
      let self = this;

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
        callback: function(result) {
          if (result) {
            axios.put('/base/card/' + cardId)
                  .then((response) => {
                    let { meta, data } = response.data;

                    if (meta.success) {
                      if (data && data.result == 1) {
                        bootbox.alert({ message: '定位卡收回成功!' });
                        self.clearSearch();
                      } else { bootbox.alert("定位卡收回失败！"); }
                    } else { bootbox.alert("服务器内部错误,定位卡收回成功！"); }
                  });
          }
        }
      });
    },
    /**
     * End business operation for staff card.
     */
   }
};
</script>

<style lang="css" scoped>
#card {
  width: 100%;
}
</style>
