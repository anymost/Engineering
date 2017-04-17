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
          headPicture: handlePicPath(group.headPicture),
          ownerId: group.ownerId,
        }
      })
    }else{
      return {};
    }
  },
  addFriend(state){
      state.sendMessage = {};
      state.createGroup = false;
      state.showGroup.isShow = false;
      state.searchGroup = false;
      state.addFriend = true;
  },
  sendMessage(state, info){
      state.addFriend = false;
      state.createGroup = false;
      state.showGroup.isShow = false;
      state.searchGroup = false;
      state.sendMessage = {
        isSend : true,
        senderId : info.senderId,
        receiverId : info.receiverId,
        receiverName : info.receiverName,
        receiverPic : info.receiverPic
      };
  },
  receiveMessage (state, info){

    if(!state.message.isRead ) {
      state.message.data = state.message.data.concat(info.data);
    }else{
      state.message.data = info.data;
      state.message.isRead = false;
    }
    state.message.message = [];
  },
  readMessage (state){
    state.message.message = state.message.data;
    state.message.isRead = true;
    state.message.data = [];
  },
  createGroup (state) {
    state.sendMessage = {};
    state.addFriend = false;
    state.searchGroup = false;
    state.showGroup.isShow = false;
    state.createGroup = true;
  },
  searchGroup (state){
    state.sendMessage = {};
    state.addFriend = false;
    state.showGroup.isShow = false;
    state.createGroup = false;
    state.searchGroup = true;
  },
  showGroup (state, data){
      var members = data.data;
      members.forEach(function (item, index, array){
          array[index]['headPicture'] = handlePicPath(array[index]['headPicture']);
      });
      state.sendMessage = {};
      state.addFriend = false;
      state.createGroup = false;
      state.searchGroup = false;
      state.showGroup = {
          isShow : true,
          data : members,
          ownerId : data.ownerId,
          groupId : data.groupId
      };

  }

}
