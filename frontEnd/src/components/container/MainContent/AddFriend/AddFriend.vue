<template>
  <div class="container">
    <div class="search">
      <input type="text" @keyup="searchFriend" v-model="inputValue" placeholder="搜索好友">
    </div>
    <div class="searchList" v-if="haveFriend">
        <FriendList :searchList="searchList"></FriendList>
    </div>
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
    text-align:center;
  }
  button{
    width:60px;
    height:30px;
    line-height:30px;
    font-size:24px;
    margin-top:10px;
  }
  .friendList{

  }
</style>
<script>
  import store from '../../../../store'
  import FriendList from './FriendList'
  import {networkPost, handlePicPath} from '../../../../tools'
  export default{
    data () {
      return{
        inputValue:'',
        lastValue : '',
        searchList : {}
      }
    },
    components:{
      FriendList
    },
    methods :{
        searchFriend () {
            if(this.lastValue == this.inputValue){
                return;
            }
            this.lastValue = this.inputValue;
            networkPost('/searchFriend',{userName:this.inputValue}).then(response=> {

                if(response.ok && response.data.result == 0){
                    if(response.data.headPicture) {
                      response.data.headPicture = handlePicPath(response.data.headPicture);
                    }
                    this.searchList = response.data;
                }else{
                    this.searchList = {};
                }
            })
        }
    },
    computed : {
      haveFriend (){
          return this.searchList.result != undefined;
      }
    }
  }

</script>
