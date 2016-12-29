/**
 * Created by bradyzhang on 2016/12/29.
 */

/**
 * @description 用于构建vuex store的所有mutations
 */

export  default{
  changeDisplay (state){
    state.infoBarDisplay = state.infoBarDisplay === 'none'? 'block' : 'none';
  }
}
