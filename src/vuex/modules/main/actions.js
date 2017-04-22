/**
 * Created by Zychaowill on 2017/04/21 11:22
 */
import * as types from './mutation_type';

export default {
  /**
   * 查询煤矿基本信息
   */
  findCoalmineBaseInfo ({ commit }) {
    commit(types.FIND_COALMINE_BASE_INFO);
  },
  /**
   * 实时统计部门员工、区域员工、报警信息
   */
  countRealtimeInfo ({ commit }) {
    commit(types.COUNT_REALTIME_INFO);
  },

  /**
   * 根据部门编号实时查询部分人员明细（unitId & page）
   */
  findUnitStaffByUnitId ({ commit }, params) {
    commit(types.FIND_UNIT_STAFF_BY_UNITID, params);
  },

  /**
   * 根据部门编号在地图实时映射员工位置信息
   */
  mapUnitStaffByUnitId ({ commit }, unitId) {
    commit(types.MAP_UNIT_STAFF_BY_UNITID, unitId);
  },

  /**
   * 根据区域编号实时查询当前区域人员信息(regionId & page)
   */
  findRegionStaffByRegionId ({ commit }, params) {
    commit(types.FIND_REGION_STAFF_BY_REGIONID, params);
  },

  findEvacuateStaffByRegionId ({ commit }, params) {
    commit(types.FIND_EVACUATE_STAFF_BY_REGIONID, params);
  },

  /**
   * 根据报警类型编号查询报警信息明细
   */
  findAlarmBaseInfo ({ commit }, params) {
    commit(types.FIND_ALARM_BASE_INFO, params);
  },

  /**
   * 查询区域统计信息
   */
  countRegionInfo ({ commit }) {
    commit(types.COUNT_REGION_INFO);
  },

  /**
   * 录入区域撤离呼叫信息
   */
  insertEvacuateCallInfo ({ commit }, regionId) {
    commit(types.INSERT_EVACUATE_CALL_INFO, regionId);
  },

  /**
   * 查询部门人员信息
   */
  countStaffInfo ({ commit }, params) {
    commit(types.COUNT_STAFF_INFO, params);
  },

  /**
   * 录入对员工的回电呼叫信息
   */
  insertCallbackStaffInfo ({ commit }, staffId) {
    commit(types.INSERT_CALLBACK_STAFF_INFO, staffId);
  }
};
