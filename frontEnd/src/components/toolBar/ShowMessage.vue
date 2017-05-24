<template>
  <div id="showMessage" v-show="isShow">
    <div>
    {{message}}<br>
      窗口将在{{time}}s后关闭
    </div>
  </div>

</template>

<style scoped>
  #showMessage {
    position: fixed;
    z-index:999;
    top:0;
    left:0;
    height:1340px;
    width:650px;
    background-color: transparent;
    color:black;
  }
  #showMessage > div {
    position:absolute;
    z-index:999;
    top:250px;
    left:500px;
    height:200px;
    width:400px;
    background-color: white;
    color:black;
    text-align: center;
    font-size:20px;
    line-height:100px;
    box-shadow: 6px 1px 1px grey;
  }

</style>

<script>
  import store from '../../store'

  export default {
      data (){
          return {
              time : 5,
              timer : null
          };
      },
      computed : {
        isShow (){
            return store.state.showMessage.isShow;

        }  ,
        message (){
            return store.state.showMessage.message;
        }
      },
      mounted(){
          let self = this;
          console.log()
          this.timer = setInterval(function (){
              if(self.time == 0){
                  clearInterval(self.timer);
                  store.dispatch('closeMessage');
                  location.reload();
              }
              if(self.isShow == true) {
                self.time--;
              }
          }, 1000);
      }

  }

</script>
