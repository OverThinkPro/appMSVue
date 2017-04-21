/**
 * Created by Zychaowill on 2017/04/21 11:22
 */
import * as types from './mutation_type';
import bootbox from 'bootbox';
import axios from 'axios';

export default {
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

  [types.FIND_UNIT_STAFF_BY_UNITID] (state, unitId) {
    axios.get('/realtime/staff/unit/' + unitId)
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

  [types.MAP_UNIT_STAFF_BY_UNITID] (state, unitId) {
    axios.get('map/staff/unit' + unitId)
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

  [types.FIND_REGION_STAFF_BY_REGIONID] (state, regionId) {
    axios.get('/realtime/staff/region/' + regionId)
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

  [types.FIND_EVACUATE_STAFF_BY_REGIONID] (state, regionId) {
    axios.get('/realtime/evacuate/region/' + regionId)
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

  [types.FIND_ALARM_BASE_INFO] (state, alarm_type_id) {
    axios.get('/realtime/alarm/' + alarm_type_id)
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
  }
};
