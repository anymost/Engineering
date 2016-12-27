/**
 * Created by bradyzhang on 2016/12/27.
 */

import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


const infoBar = new Vuex.Store({
  state : {
    infoBarDisplay : 'none'
  },
  mutations : {
    changeDisplay(state, isDisplay){
      state.infoBarDisplay = isDisplay;
    }
  }
});

export  {infoBar};
