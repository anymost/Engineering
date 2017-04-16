<template>
<div class="container">
  <div class="item" v-for="member in groupMembers">
    <div class="left" :data-id="member.userId">
      <img width="80%" height="80%" :src="member.headPicture" alt="headPicture">
      <br> <span>{{member.userName}}</span>
    </div>
    <div class="right">
      <p>tel:{{member.phone}}</p>
      <p>email:{{member.email}}</p>
    </div>
    <div .delete @click="deleteMember" :groupId="groupId" :userId="member.userId"  v-if="ownerId == userId">
      X
    </div>
  </div>


</div>

</template>

<style scoped>
  .contaner{
    width:100%;
    padding:10px;
  }
  .item{
    width:60%;
    height:100px;
    margin:20px 20%;
    border-bottom: 1px solid darkgrey;
  }
  .item>div{
    float:left;
    height:100%;
  }
  .left{
    width:45%;
  }
  .right{
    width:45%;
  }
  .delete{
    width:10%;
    line-height: 100%;
    font-size:20px;
  }


</style>
<script>
  import store from '../../../../store'
  import {getUserInfo} from '../../../../tools'
  export default {
      data () {
          return {
              userId : getUserInfo()
          };
      },
      computed : {
          groupMembers () {
              return store.state.showGroup.data;
          },
          ownerId () {
              return store.state.showGroup.ownerId;
          },
          groupId () {
              return store.state.showGroup.groupId;
          }

      },
      methods : {
          deleteMember (event) {

          }
      }
  }

</script>
