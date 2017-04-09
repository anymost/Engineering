/**
 * Created by bradyzhang on 2016/12/29.
 */

/**
 * @description 用于构建vuex store的所有mutations
 */

import {handlePicPath} from '../tools'
export  default{
  changeDisplay (state){
    state.infoBarDisplay = state.infoBarDisplay === 'none'? 'block' : 'none';
  },
  changeTitle (state){
    state.titleDisplay = state.titleDisplay === 'none' ? 'block' : 'none'
  },
  getFriends (state, friends){
    state.groupState = false;
    state.documentState = false;
    state.friendState = true;
    if(friends){
      state.myFriends = friends.map(function (friend) {
          return {
            userId : friend.userId,
            userName : friend.userName,
            headPicture : handlePicPath(friend.headPicture)
          }
      });
    }else{
      return {};
    }
  },
  getGroups (state, groups){
    state.friendState = false;
    state.documentState = false;
    state.groupState = true;
    if(groups) {
      state.myGroups = groups.map(function (group) {
        return {
          groupId: group.groupId,
          groupName: group.groupName,
          headPicture: group.headPicture,
          ownerId: group.ownerId,
          ownerName: group.ownerName,
          ownerHeadPicture: group.ownerHeadPicture
        }
      })
    }else{
      return {};
    }
  },
  addFriend(state){
      state.addFriend = true;
  },
  sendMessage(state, info){
      state.sendMessage = true;
      state.sender = info.sender;
      state.receiver = info.receiver;
  }
}
