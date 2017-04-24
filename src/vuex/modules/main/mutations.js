/**
 * Created by Zychaowill on 2017/04/21 11:22
 */
import * as types from './mutation_type';
import bootbox from 'bootbox';
import axios from 'axios';

export default {
  [types.CLEAR_PAGINATION_INFO] (state) {
    state.pagination.initialPage = 0;
  },

  [types.FIND_COALMINE_BASE_INFO] (state) {
    axios.get("/base/coalmine")
          .then((response) => {
            let meta = response.data.meta;
            if (meta.success) {
              state.coalmineInfo = response.data.data.coalmineInfo;
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.COUNT_REALTIME_INFO] (state) {
    axios.get('/realtime/count')
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;

              state.realRegion = data.realRegion;
              state.realUnit = data.realUnit;
              state.realAlarm = data.realAlarm;
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.FIND_UNIT_STAFF_BY_UNITID] (state, params) {
    params.page = (params.page ? params.page : 1);

    axios.get('/realtime/staff/unit/' + params.unitId + '/p/' + params.page)
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;

              state.staffReal.tlStaffList = data.tlStaffList;
              state.staffReal.countTotalPages = data.countTotalPages;
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.MAP_UNIT_STAFF_BY_UNITID] (state, unitId) {
    axios.get('/map/staff/unit/' + unitId)
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;


            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.FIND_REGION_STAFF_BY_REGIONID] (state, params) {
    params.page = (params.page ? params.page : 1);
    axios.get('/realtime/staff/region/' + params.regionId + '/p/' + params.page)
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;

              state.staffReal.tlStaffList = data.tlStaffList;
              state.staffReal.countTotalPages = data.countTotalPages;
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.FIND_EVACUATE_STAFF_BY_REGIONID] (state, params) {
    params.page = (params.page ? params.page : 1);
    axios.get('/realtime/evacuate/region/' + params.regionId + '/p/' + params.page)
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;

              state.staffReal.evacuationDetails = data.evacuationDetails;
              state.staffReal.countTotalPages = data.countTotalPages;
              state.staffReal.calledNum = data.calledNum;
              state.staffReal.callCount = data.callCount;
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.FIND_ALARM_BASE_INFO] (state, params) {
    params.page = (params.page ? params.page : 1);
    axios.get('/realtime/alarm/' + params.alarm_type_id + '/p/' + params.page)
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;

              state.staffAlarm.staffAlarmList = data.staffAlarmList;
              state.staffReal.countTotalPages = data.countTotalPages;
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.COUNT_REGION_INFO] (state, page) {
    axios.get('/base/region/count/' + '/p/' + page)
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;

              state.regionCall.realStaffByRegion = data.realStaffByRegion;
              state.staffReal.countTotalPages = data.countTotalPages;
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.INSERT_EVACUATE_CALL_INFO] (state, regionIdArr) {
    let param = {};
    param.regionIdArr = regionIdArr;
    axios.post('/base/evacuate/region/u/d', $.param(param))
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;

              bootbox.alert({
                message: meta.message
              });
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.COUNT_STAFF_INFO] (state, params) {
    axios.get('base/staff/count/p/1', { unit: '1213' })
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;

              state.callbackCache.staffList = data.staffList;
              state.callbackCache.countTotalPages = data.countTotalPages;
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },

  [types.INSERT_CALLBACK_STAFF_INFO] (state, staffIdArr) {
    axios.post('/base/callback/staff/u/d', $.param({ 'staffIdArr': staffIdArr }))
          .then((response) => {
            let meta = response.data.meta;

            if (meta.success) {
              let data = response.data.data;

              bootbox.alert({
                message: meta.message
              });
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  }
};
