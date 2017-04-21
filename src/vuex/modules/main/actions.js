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
   * 根据部门编号实时查询部分人员明细
   */
  findUnitStaffByUnitId ({ commit }, unitId) {
    commit(types.FIND_UNIT_STAFF_BY_UNITID, unitId);
  },

  /**
   * 根据部门编号在地图实时映射员工位置信息
   */
  mapUnitStaffByUnitId ({ commit }, unitId) {
    commit(types.MAP_UNIT_STAFF_BY_UNITID, unitId);
  },

  /**
   * 根据区域编号实时查询当前区域人员信息
   */
  findRegionStaffByRegionId ({ commit }, regionId) {
    commit(types.FIND_REGION_STAFF_BY_REGIONID, regionId);
  },

  findEvacuateStaffByRegionId ({ commit }, regionId) {
    commit(types.FIND_EVACUATE_STAFF_BY_REGIONID, regionId);
  },

  /**
   * 根据报警类型编号查询报警信息明细
   */
  findAlarmBaseInfo ({ commit }, alarm_type_id) {
    commit(types.FIND_ALARM_BASE_INFO, alarm_type_id);
  }
};
