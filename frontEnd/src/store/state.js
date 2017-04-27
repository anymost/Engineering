/**
 * Created by bradyzhang on 2016/12/29.
 */


/**
 * @description 用于构建vuex store的所有state
 */
export default {
  infoBarDisplay : 'none',
  titleDisplay : 'block',
  friendState : false,
  groupState : false,
  documentState : false,
  myFriends : [],
  myGroups : [],
  myDocuments : [],
  addFriend : false,
  createGroup : false,
  sendMessage : {
    isSend : false,
    senderId : null,
    receiverId : null,
    receiverName : null,
    receiverPic : null

  },
  message : {
    isRead : true,
    data　: [],
    message : [],
  },
  showGroup : {
    isShow : false,
    data : [],
    ownerId　: 0,
    groupId : 0
  },
  searchGroup : false,
  createDocument : {
    isCreated : false,
    ownerId : 0,
    groupId : 0
  },
  showDocContent : {
    isShow : false,
    data : {}
  },
  showMessage : {
    isShow : false,
    message : null
  }
}

