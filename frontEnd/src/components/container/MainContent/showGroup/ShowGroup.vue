<template>
<div class="container">
  <div class="group-member" v-for="member in groupMembers">
    <div class="left" :data-id="member.userId">
      <img width="55%" height="90%" :src="member.headPicture" alt="headPicture">
       <div>{{member.userName}}</div>
    </div>
    <div class="right">
      <p>{{member.phone}}</p>
      <p>{{member.email}}</p>
    </div>
    <div class="delete" @click="deleteMember" :groupId="groupId" :memberId="member.userId"  v-if="hasRightToDelete(member.userId)">
      删除成员
    </div>
  </div>


</div>

</template>

<style scoped>
  .container{
    width:100%;
    padding:10px;
  }
  .group-member{
    width:70%;
    height:100px;
    margin:20px 20%;
    border-bottom: 1px solid darkgrey;
    box-shadow: 4px 1px 1px grey;
  }
  .group-member>div{
    float:left;
  }
  .left{
    width:45%;
  }

  .left > img{
    float:left;
  }
  .lef>div{
    float:left;
    height:100%;
    line-height: 100px;
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
                       store.dispatch('showMessage', '成员删除成功');
                       event.target.value='删除成功';
                    }else{
                        store.dispatch('showMessage', '成员删除失败');
                        event.target.value = '删除失败';
                }
                  }, (error) => {
                    store.dipatch('showMessage', '成员删除失败');
                    event.target.value = '删除失败';
                  });

              }

          },
          hasRightToDelete (memberId){
            return store.state.showGroup.ownerId == this.userId && this.userId != memberId;
          }
      }
  }

</script>
