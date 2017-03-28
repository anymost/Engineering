<template>
    <div v-if="myFriends !== []">
    <div :class="contentState">
            <div  v-for="friend in myFriends" :data-userId="friend.userId">
              <img :src="friend.headPicture" alt="friend">
              <span>{{friend.userName}}</span>
            </div>
    </div>
    </div>
</template>
<style scoped>
   .showBar {
    position: absolute;
    left: 0;
    background-color: white;
    width: 100%;
    height: 80px;
    box-shadow: 4px 1px 1px grey;
    z-index:3;
    transform: translate(0,0);
    transition: 1s;
  }

  .hideBar {
    position: absolute;
    left: 0;
    background-color: white;
    width: 100%;
    height: 80px;
    box-shadow: 4px 1px 1px grey;
    z-index:3;
    transform: translate(0,-80px);
    transition-duration: 1s;
  }
</style>
<script>
    import store from '../store'
    export default{
        data(){
            return{


            }
        },
        components:{

        },
        computed : {
            contentState (){

                return store.state.titleDisplay === 'block' ? 'hideBar' : 'showBar';
            },
            myFriends (){
                return store.state.myFriends;
            }
        }
    }
</script>
