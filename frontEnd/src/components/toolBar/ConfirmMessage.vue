<template>

  <div id="container" v-show="isShow">
    {{message}}
    <input type="button" value="yes" @click="confirmYes">
    <input type="button" value="no" @click="confirmNo">
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
  export  default {
      data : {
          isShow : store.state.confirmMessage.isShow,
          message : store.state.confirmMessage.message
      },
      methods : {
          confirmYes () {
              store.dispatch('closeConfirm', true);
          },
          confirmNo () {
              store.dispatch('closeConfirm', false);
          }
      }
  }


</script>
