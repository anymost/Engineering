/**
 * Created by bradyzhang on 2016/12/27.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'


Vue.use(Vuex);

/**
 * @description 组装导出全局store
 * @type {Store}
 */
const store = new Vuex.Store({
  state : state,
  mutations : mutations,
  actions : actions
});

export  default store;
