<template>
  <div class='mainContent'>
    <div v-if="addFriend">
      <AddFriend/>
    </div>
    <div v-if="isSend">
      <SendMessage :sender="sender" :receiver="receiver" />
    </div>
  </div>
</template>

<script>
    import store from '../../../store'
    import AddFriend from './AddFriend/AddFriend'
    import SendMessage from './SendMessage/SendMessage'
    export default{
        data(){
            return{

            }
        },
        components:{
          AddFriend,
          SendMessage
        },
        computed : {
            addFriend (){
                return store.state.addFriend;
            },
            isSend () {
                return store.state.sendMessage.isSend;
            },
            sender () {
                return {senderId:store.state.sendMessage.senderId};
            },
            receiver () {
                return {
                    receiverId : store.state.sendMessage.receiverId,
                    receiverName : store.state.sendMessage.receiverName,
                    receiverPic : store.state.sendMessage.receiverPic
                };
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
