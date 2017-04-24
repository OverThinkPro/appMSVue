/**
 * Created by Zychaowill on 2017/04/21 11:22
 */
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: {
      coalmineInfo: {
        coalmineOutput: 0,
        coalmineNum: 0,
        currentTotalStaff: 0,
        currentLeader: '',
      },
      realUnit: [],
      staffReal: {
        tlStaffList: [],
        evacuationDetails: [],
        countTotalPages: 1,
        calledNum: 0,
        callCount: 0
      },
      realRegion: [],
      realAlarm: [],
      staffAlarm: {
        staffAlarmList: [],
        countTotalPages: 1
      },
      regionCall: {
        realStaffByRegion: [],
        countTotalPages: 1
      },
      callbackCache: {
        staffList: [],
        countTotalPages: 1
      },
      pagination: {
        currentPage: 0,
        pageCount: 1,
        pageRange: 5,
        initialPage: 0,
        prevText: '上一页',
        nextText: '下一页',
        containerClass: 'pagination'
      }
  },
  actions: actions,
  mutations: mutations,
  getters: getters
};
