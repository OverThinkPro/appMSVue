/**
 * Created by HaoShasha on 2017/04/24 11:19
 */
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: {
     /* userOld: {
        userId: '',
        userName: '',
        password: '',
        inUse: '1',
        createTime: self.current(),
        lastLoginTime: '',
        remark: '',
      },
      userNew: {
        userId: '',
        userName: '',
        password: '',
        inUse: '1',
        createTime: self.current(),
        lastLoginTime: '',
        remark: '',
      },*/
      users: {
        userList: [],
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
