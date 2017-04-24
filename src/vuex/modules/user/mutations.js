/**
 * Created by HaoShasha on 2017/04/24 11:19
 */
import * as types from './mutation_type';
import bootbox from 'bootbox';
import axios from 'axios';

export default {
  [types.CLEAR_PAGINATION_INFO] (state) {
    state.pagination.initialPage = 0;
  },

  [types.FIND_USER_BASE_INFO] (state, params) {
    params.page = (params.page ? params.page : 1);
    axios.get('/base/user/' + '/p/' + params.page)
          .then((response) => {
            let meta = response.data.meta;
            if (meta.success) {
              let data = response.data.data;
              state.users.userList = data.userList;
              state.users.countTotalPages = state.pagination.pageCount = data.countTotalPages;
            } else {
              bootbox.alert({
                message: meta.message
              });
            }
          });
  },
};
