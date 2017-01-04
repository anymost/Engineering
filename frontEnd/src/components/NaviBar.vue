<template>
    <div class='naviBar'>
        <div v-for="item in items" class="item" @click="changeTitle">
            <img src='../assets/back.png' @click='hideBack' class='back' :class='{showBack:display,hideBack:!display}'>
            {{item}}
        </div>
    </div>
</template>
<style scoped>
  .naviBar {
    margin-left: 2%;
    margin-top: 1%;
    width: 16%;
    float: left;
  }

  .item {
    position:relative;
    width: 100%;
    height: 80px;
    background-color: white;
    margin-top: 10px;
    box-shadow: 4px 1px 1px grey;
  }

  .back{
    display:none;
    width:10%;
    height:40%;
    position:absolute;
    left:10px;
    top:20px;
  }
  .showBack{
    display : block;
  }
  .hideBack{
    display : none;
  }

</style>

<script>
  import store from '../store'
  export default{
      data(){
          return {
              items : [
                  'project',
                  'member',
                  'document'
              ],
              display:false
          }
      },
    components: {

    },
    methods : {
      changeTitle () {
          store.dispatch('changeTitle');
          this.display = true;
      },
      hideBack () {
        store.dispatch('changeTitle');
        this.display = false;
      }
    }

  }

</script>
