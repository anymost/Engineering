<template>
    <div class='infoBar' :class='[infoBarDisplay]'>
      <div class="message">
        <div v-for="item in message" class="content" :sender-id="item.senderId">
          <div class="top">
            <span>{{item.senderName}}</span>
            <span>{{item.date}}</span>
          </div>
          <div class="bottom">
              {{item.message}}
          </div>
        </div>
      </div>
      <div class="exit" >
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
        }
    }
</script>
