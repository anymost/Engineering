<template>
  <div class="container">
      <div class="item"   v-for="(friend, index) in friends" :rank="index" :data-userid="friend.userId">
        <img width="60%" height="64px" :src="friend.headPicture" alt="friend">
       <div class="info">
          <div class="delete" :data-index="index" @click="deleteFriend" :data-userid="friend.userId">x</div>
          <div class="userName">{{friend.userName}}</div>
         <div class="sendMessage" :data-userid="friend.userId" @click="sendMessage"></div>
       </div>
      </div>
     <div class="item add" @click="addFriend">
       +
     </div>
  </div>
</template>
<style scoped>
  .container{
    width:100%;
    height:80px
  }
  .item{
    width:10%;
    height:80px;
    float:left;
    border-right: 1px solid darkgray;
  }

  img{
    float:left;
    margin:8px 0 8px 5px;
    border-radius : 50%;

  }
  .info{
    float:left;
    height:64px;
  }
  .delete{
    width:100%;
    height:40%;
    text-align: right;
  }

  .userName{
    width:100%;
    height:40%;
    overflow:hidden;
  }
  .sendMessage{
    width:100%;
    height:40%;
    background-image: url('http://localhost:3000/headPictures/tools/icon.jpg');
    background-position: 105px 214px;
    background-size: 56px 38px;
    background-repeat:no-repeat;
  }

  .add{
    font-size:36px;
    line-height:80px;
  }
</style>
<script>
  import store from '../../store'
  import {networkPost, getUserInfo} from '../../tools'
  export default{
    data(){
      return{
        userId : getUserInfo().userId

      }
    },
    props : ['friends'],
    components:{

    },
    methods : {
        addFriend (){
            store.dispatch('addFriend');
        },
        deleteFriend (event) {
            var isDelete = window && window.confirm('delete this friend?') ;

            if(isDelete){
                let index = event.target.dataset[index];
                let friendId = event.target ? event.target.dataset['userid']:false;
                if(friendId) {

                  networkPost('/deleteFriend', {
                      friendId: friendId,
                      userId : this.userId
                  }).then(function (response) {
                     if(response.ok && response.data.result == 0){
                        document.querySelector('div[rank="'+index+'"]').style.display='none';
                     }
                  });
                }
            }
        },
        sendMessage (event) {
            let friendId = event.target ? event.target.dataset['userid']:false;
            store.commit('sendMessage',{
               sender : this.userId,
               receiver : friendId
            });
        }

    }
  }
</script>
