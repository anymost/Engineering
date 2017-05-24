<template>
  <div class="container">
    <div class="mainContent">
      <div class="leftContent">
        <h2>消息列表</h2>
        <div class="messageWindow">
            <Message :messageList="messageList"></Message>
        </div>

      </div>

      <div class="rightContent">
        <img :src="receiver.receiverPic" width="80%" height="200px" alt="receiverPic">
        <p>{{receiver.receiverName}}</p>
        <textarea  name="" id=""  v-model="message"></textarea>
        <br>
        <input type="button" :receiverId="receiver.receiverId"
               :senderId="sender.senderId"  value="发送" @click="sendMessage">
      </div>
    </div>
  </div>
</template>
<style scoped>
  .container {
    width: 94%;
    padding: 3%;
  }
  .leftContent{
    float:left;
    width:60%;
    height:400px;
  }
  .rightContent{
    float:left;
    width:40%;
    height:200px;
  }
  .messageWindow{
    width:60%;
    height:400px;
    border: 1px solid rgb(169, 169, 169);
    margin-left:100px;
    overflow: auto;
  }
  textarea{
    width:80%;
    height:100px;
    font-size:16px;
  }
  input{
    width:200px;
    height:40px;
    font-size:20px;
  }
  h2{
    text-align: center;
  }
</style>
<script>
  import store from '../../../../store'
  import Message from './Message'

  import {networkPost, handlePicPath, createSocket, getUserInfo} from '../../../../tools'

  export default {
    data () {
      return {
        message: '',
        messageList:[]
      }
    },
    props: ['sender', 'receiver'],
    components: {
        Message
    },
    methods: {
      sendMessage (event){
          let message = this.message;
          if(!message){
              return;
          }
          let target = event.target;
          let senderId = target.getAttribute('senderId');
          let receiverId = target.getAttribute('receiverId');
          let date = Date.now();
          var socket = createSocket();
          socket.emit('sendMessage',{
              senderId : senderId,
              receiverId : receiverId,
              senderName : getUserInfo().userName,
              message : message,
              date : date
          });
          let self = this;
          socket.on('receiveMessage', function (data) {
            if(data.result==0){
              if(data.senderId == senderId && data.receiverId == receiverId && data.date == date){
                  self.messageList.push(message);
                  self.message = '';
              }
            }else{

            }
          });
      }
    },
    computed: {}
  }

</script>
