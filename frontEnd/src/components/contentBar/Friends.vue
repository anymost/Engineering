<template>
  <div class="container">
      <div class="item"   v-for="(friend, index) in friends" :rank="index" :data-userid="friend.userId">
        <img width="50%" height="64px" :src="friend.headPicture" alt="friend">
       <div class="info">
          <div class="userName">{{friend.userName}}</div>
         <div class="handle-message" :userName="friend.userName" :friendPic="friend.headPicture" :data-userid="friend.userId" @click="sendMessage">发送消息</div>
          <div class="handle-message" :data-index="index" @click="deleteFriend($event)" :data-userid="friend.userId">删除好友</div>
       </div>
      </div>
     <div class="item add" @click="addFriend">
       添加好友
     </div>
  </div>
</template>

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
            store.dispatch('confirmMessage', '确定删除该好友?');
            let isDelete = store.state.confirmMessage.isConfirm;
            if(isDelete){
                let index = event.target.dataset['index'];
                let friendId = event.target ? event.target.dataset['userid']:false;
                if(friendId) {

                  networkPost('/deleteFriend', {
                      friendId: friendId,
                      userId : this.userId
                  }).then(function (response) {

                     if(response.ok && response.data.result == 0){
                        document.querySelector('[rank="'+index+'"]').style.display='none';
                     }
                  });
                }
            }
        },
        sendMessage (event) {
            let friendId = event.target ? event.target.dataset['userid']:false;
            let friendPic = event.target?event.target.getAttribute('friendPic'):false;
            let receiverName = event.target?event.target.getAttribute('userName'):false;
            store.commit('sendMessage',{
               senderId : this.userId,
               receiverId : friendId,
               receiverPic : friendPic,
               receiverName : receiverName
            });
        }

    }
  }
</script>


<style scoped>
  .container{
    width:100%;
    height:80px
  }
  .item{
    width:15%;
    height:80px;
    float:left;
    border-right: 1px solid darkgray;
  }

  img{
    float:left;
    margin:8px 0 8px 5px;

  }
  .info{
    float:left;
    height:64px;
    width:45%;
  }
  .handle-message{
    font-size:14px;
    color:rgb(75,156,178);
  }

  .userName{
    width:100%;
    height:40%;
    overflow:hidden;
    float:right;
    padding-right:2px;
  }


  .add{
    font-size:22px;
    line-height:80px;
    color:rgb(75,156,178);
  }
</style>
