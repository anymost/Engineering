<template>
<div class="container">
  <div class="item" v-for="member in groupMembers">
    <div class="left" :data-id="member.userId">
      <img width="60%" height="70%" :src="member.headPicture" alt="headPicture">
      <br> <span>{{member.userName}}</span>
    </div>
    <div class="right">
      <p>tel:{{member.phone}}</p>
      <p>email:{{member.email}}</p>
    </div>
    <div class="delete" @click="deleteMember" :groupId="groupId" :memberId="member.userId"  v-if="hasRightToDelete">
      X
    </div>
  </div>


</div>

</template>

<style scoped>
  .container{
    width:100%;
    padding:10px;
  }
  .item{
    width:60%;
    height:100px;
    margin:20px 20%;
    border-bottom: 1px solid darkgrey;
    box-shadow: 4px 1px 1px grey;
  }
  .item>div{
    float:left;
  }
  .left{
    width:45%;
  }
  .right{
    width:35%;
  }
  span{
    width:100%;
    height:80%;
    font-size:20px;
  }
  .delete{
    width:20%;
    padding-top:50px;
    line-height: 100%;
    font-size:20px;
  }


</style>
<script>
  import store from '../../../../store'
  import {getUserInfo, networkPost} from '../../../../tools'
  export default {
      data () {
          return {
              userId : getUserInfo().userId
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
          },
          hasRightToDelete () {
              return store.state.showGroup.ownerId == this.userId;
          }

      },
      methods : {
          deleteMember (event) {
              if(this.userId == this.ownerId) {
                var target = event.target;
                var data = {
                  groupId: target.getAttribute('groupId'),
                  memberId: target.getAttribute('memberId'),
                };
                networkPost('/deleteMember', data)
                  .then((response)=>{
                    if(response.ok && response.data.result == 0){
                        target.style.display ='none';
                        console.log('delete is Ok');
                    }
                  }, (error) => {
                    console.log(error);
                  });

              }

          }
      }
  }

</script>
