/**
 * Created by HaoShasha on 2017/04/24 11:19
 */
import * as types from './mutation_type';

export default {
  /**
   * 查询用户基本信息
   */
  findUserBaseInfo ({ commit }, params) {
    commit(types.FIND_USER_BASE_INFO, params);
  },
  
};
