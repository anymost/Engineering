<template>
  <div id="container" v-show="isShow">
    {{message}}
  </div>

</template>

<style scoped>
  #container {
    position: fixed;
    z-index:999;
    top:350px;
    left:600px;
    height:100px;
    width:100px;
    background-color: whitesmoke;
    color:black;
    text-align: center;
    font-size:24px;
    line-height:100px;
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
