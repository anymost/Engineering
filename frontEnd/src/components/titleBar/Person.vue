<template>
    <div class='person'>
      <img  :src='src' class='head' width="50%" height="100%">
      <div class="message">
       <div class='info' >{{name}} </div>

        <div class="messageLength" @click="infoDisplay(),readMessage()"></div>
      </div>
    </div>
</template>
<style scoped>
    .person{
      float : right;
      height: 100%;
      width:10%;
    }
    .head{
      float:left;
      border-radius : 50%;
    }
    .message{
      float:left;
      width:50%;
      height:100%;
    }
    .info{
      width:100%;
      height:40%;
      margin-top:10%;

    }
    .messageLength{
      margin-left:10%;
      width:100%;
      height:50%;
      background-image:url(//139.199.164.28:3000/images/email.png) ;
      background-repeat:no-repeat;
      background-size:50% 60%;
      background-position: center center;
      color:red;
      font-size:20px;
    }


</style>
<script>
    import store from '../../store'
    import {getUserInfo, handlePicPath, createSocket} from '../../tools'
    export default{
        data(){
              let userInfo = getUserInfo();
              return{
                src : handlePicPath(userInfo.headPicture),
                name : userInfo.userName,
                arrow : 'data:image/png;base64,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',
              }

        },
        methods :{
           infoDisplay(){
                store.dispatch('changeDisplay');
           },
          readMessage(){
               this.messageList = [];
               store.dispatch('readMessage');
          }
        },
        computed: {
          messageLength　(){
              return store.state.message.data.length;
          }
        },
        components:{

        }
    }
</script>
