<template>
    <div class='naviBar'>
        <div v-for="item in items" class="item" @click="changeTitle">
            <img src='../../assets/back.png' @click='hideBack' class='back' :class="{showBack:back}" >
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
    display:block;
  }

</style>

<script>
  import store from '../../store'
  export default{
      data(){
          return {
              items : [
                  'project',
                  'member',
                  'document'
              ],
              back : false,
              stopChangeTab : false
          }
      },
    components: {

    },
    methods : {
      changeTitle (event) {
          event.stopPropagation();
          if(this.stopChangeTab){
              return;
          }
          this.back = true;
          store.dispatch('changeTitle');
          this.stopChangeTab = true;
      },
      hideBack (event) {
          event.stopPropagation();
          this.stopChangeTab = false;
          this.back = false;
          store.dispatch('changeTitle');

      }
    }

  }

</script>
