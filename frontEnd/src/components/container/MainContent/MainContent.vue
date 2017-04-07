<template>
  <div class='mainContent'>
    <div v-if="addFriend">
      <AddFriend/>
    </div>
  </div>
</template>
<style scoped>
  .mainContent{
    margin-left:8%;
    margin-top : 1%;
    width:70%;
    height:800px;
    background-color:white;
    float:left;
  }

</style>
<script>
    import store from '../../../store'
    import AddFriend from './AddFriend'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
          AddFriend
        },
        computed : {
            addFriend (){
                return store.state.addFriend;
            }
        }
    }

</script>
