<template>

  <div id="confirmMessage" v-show="isShow">
    <div>
    {{message}}
      <br>
    <input type="button" value="是" @click="confirmYes">
    <input type="button" value="否" @click="confirmNo">
    </div>
  </div>

</template>

<style scoped>
  #confirmMessage {
    position: fixed;
    z-index:999;
    top:0;
    left:0;
    height:750px;
    width:1340px;
    background-color: transparent;
  }
  #confirmMessage > div{
    position: absolute;
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
  #confirmMessage input{
    width:60px;
    height:20px;
    border: none;
  }


</style>

<script>
  import store from '../../store'
  export  default {
      data (){
          return {
          };
      },
      methods : {
          confirmYes () {
              store.dispatch('closeConfirm', true);
          },
          confirmNo () {
              store.dispatch('closeConfirm', false);
          }
      },
      computed : {
          isShow (){
            return store.state.confirmMessage.isShow;
          },
          message (){
              return store.state.confirmMessage.message;
          }
      }
  }


</script>
