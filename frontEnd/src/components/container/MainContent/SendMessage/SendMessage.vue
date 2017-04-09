<template>
  <div class="container">
    <div class="mainContent">
      <div class="leftContent">
        <textarea name="" id="" cols="30" rows="10" v-model="message"></textarea>
        <input type="button" :receiverId="receiver.receiverId"
           :senderId="sender.senderId"  value="send" @click="sendMessage">
      </div>

      <div class="rightContent">
        <img :src="receiver.receiverPic" alt="receiverPic">
        <p>{{receiver.receiverName}}</p>
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
  }
  .rightContent{
    float:left;
    width:40%;
  }

</style>
<script>
  import store from '../../../../store'

  import {networkPost, handlePicPath} from '../../../../tools'
  export default{
    data () {
      return {
        message: ''
      }
    },
    props: ['sender', 'receiver'],
    components: {},
    methods: {
      sendMessage (event){

      }
    },
    computed: {}
  }

</script>
