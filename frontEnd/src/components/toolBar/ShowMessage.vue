<template>
  <div id="showMessage" v-show="isShow">
    <div>
    {{message}}<br>
      window close in {{time}}s
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
    background-color: black;
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
              timer : null,
              isShow : store.state.showMessage.isShow,
              message : store.state.showMessage.message
          };
      },
      mounted(){
          this.timer = setInterval(()=>{
              this.time--;
              if(this.time == 0){
                  clearInterval(this.timer);
                  store.dispatch('closeMessage');
              }
          },1000);
      }

  }

</script>
