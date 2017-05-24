<template>
    <div class='infoBar' :class='[infoBarDisplay]'>
      <div class="message">
        <div v-for="item in message" class="message-content" :sender-id="item.senderId">
          <div class="top">
            <span>sender:<span class="message-item">{{item.senderName}}</span></span>
            <span>date:<span class="message-item">{{item.date}}</span></span>
          </div>
          <div class="bottom message-item" >
              {{item.message}}
          </div>
        </div>
      </div>
      <div class="exit" @click="exit" >
        退出
      </div>
    </div>
</template>
<style scoped>
  .infoBar{
    margin-right:0;
    width:20%;
    z-index: 2;
    position: absolute;
    right:0;
    box-shadow: 10px 2px 2px grey;
    background-color: white;
  }
  .show{
    transform: translate(0,80px);
    transition-duration: 1s;
  }

  .hide{
    transform: translate(0,-200px);
    transition-duration: 1s;
  }
  .message{
    width:100%;
  }
  .message-item{
    font-size:14px;
    color:rgb(75,156,178);
  }
  .message-content{
    border:1px solid grey;
  }
  .exit{
    padding:40px auto;
    font-size:18px;
    color:rgb(75,156,178);
  }

</style>
<script>
    import store from '../store'
    export default{
        data(){
            return{
                info : store.state.infoBarDisplay,

            }
        },
        components : {
        },
        computed : {
          infoBarDisplay () {
            return store.state.infoBarDisplay==='block' ?'show' :'hide';
          },
          message () {
              return store.state.message.message.map(function(item){
                  item.date = new Date(parseInt(item.date)).toLocaleDateString();
                  return item;

              })
          }
        },
        methods : {
            exit (){
                let date = new Date();
                date.setTime(date.getTime()-1);
                let expireDate = date.toGMTString();
                let cookie = `userId=null;expires=${expireDate};
                userName=null;expires=${expireDate};headPicture=null;
                expires=${expireDate}`;
                document.cookie = cookie;
                location.replace('//localhost:3000');
            }
        }
    }
</script>
