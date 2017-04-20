<template>
  <div class='mainContent'>
    <div v-if="addFriend">
      <AddFriend/>
    </div>
    <div v-if="isSend">
      <SendMessage :sender="sender" :receiver="receiver" />
    </div>
    <div v-if="createGroup">
        <CreateGroup/>
    </div>
    <div v-if="showGroup">
        <ShowGroup/>
    </div>
    <div v-if="searchGroup">
      <SearchGroup/>
    </div>
    <div v-if="createDocument">
        <CreateDocument />
    </div>
  </div>
</template>

<script>
    import store from '../../../store'
    import AddFriend from './AddFriend/AddFriend'
    import SendMessage from './SendMessage/SendMessage'
    import CreateGroup from './createGroup/CreateGroup'
    import ShowGroup from './showGroup/ShowGroup'
    import SearchGroup from './searchGroup/SearchGroup'
    import CreateDocument from './createDocument/CreateDocument'
    import {getUserInfo} from '../../../tools'
    export default{
        data(){
            return{
              userId : getUserInfo().userId
            }
        },
        components:{
          AddFriend,
          SendMessage,
          CreateGroup,
          ShowGroup,
          SearchGroup,
          CreateDocument
        },
        computed : {
            addFriend (){
                return store.state.addFriend;
            },
            isSend () {
                return store.state.sendMessage.isSend;
            },
            createGroup () {
                return store.state.createGroup;
            },
            sender () {
                return {
                    senderId:store.state.sendMessage.senderId

                };
            },
            receiver () {
                return {
                    receiverId : store.state.sendMessage.receiverId,
                    receiverName : store.state.sendMessage.receiverName,
                    receiverPic : store.state.sendMessage.receiverPic
                };
            },
            showGroup () {
                return store.state.showGroup.isShow;
            },
            searchGroup () {
                return store.state.searchGroup;
            },
            createDocument () {
                return store.state.createDocument.isCreated;
            }

        }
    }

</script>

<style scoped>
  .mainContent{
    margin-left:8%;
    margin-top : 1%;
    width:70%;
    height:800px;
    background-color:white;
    float:left;
  }

</style>
