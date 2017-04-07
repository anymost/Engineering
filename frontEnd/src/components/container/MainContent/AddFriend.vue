<template>
  <div class="container">
    <input type="text" onkeyup="searchFriend" v-model="inputValue"> <button>add</button>
  </div>
</template>
<style scoped>
  .container{
    width:94%;
    padding:3%;
  }
  input{
    width:400px;
    height:30px;
    line-height:30px;
    font-size:22px;
  }
  button{
    width:60px;
    height:30px;
    line-height:30px;
    font-size:24px;
    margin-top:10px;
  }
</style>
<script>
  import store from '../../../store'
  import {networkPost} from '../../../tools'
  export default{
    data(){
      return{
        inputValue:''
      }
    },
    components:{

    },
    methods : {
        searchFriend(){
          networkPost('/searchFriend',{value:this.inputValue}).then(function (data) {
            
          })
        }
    },
    computed : {

    }
  }

</script>
