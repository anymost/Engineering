<template>
  <div class='naviBar'>
    <div v-for="item in items" class="item" @click="changeTitle">{{item}}</div>
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
    width: 100%;
    height: 80px;
    background-color: white;
    margin-top: 10px;
    box-shadow: 4px 1px 1px grey;
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
              ]
          }
      },
    components: {

    },
    methods : {
      changeTitle () {
          store.dispatch('changeTitle')
      }
    }

  }
</script>
