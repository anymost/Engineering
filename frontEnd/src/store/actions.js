/**
 * Created by bradyzhang on 2016/12/29.
 */

/**
 * @description 用于构建vuex store的所有action
 */

export  default {
  changeDisplay ({commit}) {
    commit('changeDisplay');
  },
  changeTitle ({commit}) {
    commit('changeTitle');
  },
  getFriends (context, friends){
    context.commit('getFriends',friends);
  }
}
