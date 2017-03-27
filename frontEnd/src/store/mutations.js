/**
 * Created by bradyzhang on 2016/12/29.
 */

/**
 * @description 用于构建vuex store的所有mutations
 */

export  default{
  changeDisplay (state){
    state.infoBarDisplay = state.infoBarDisplay === 'none'? 'block' : 'none';
  },
  changeTitle (state){
    state.titleDisplay = state.titleDisplay === 'none' ? 'block' : 'none'
  },
  getFriends (state, friends){
    state.friendState = true;
    state.allFriends = friends;
  }
}
