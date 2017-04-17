<template>
  <div class="container">
    <div class="item"  v-for="group in groups" :data-groupid="group.groupId" :data-ownerid="group.ownerId"
        @click="showGroup"  :data-groupname="group.name" :data-grouppic="group.headPicture">
      <img width="60%" height="64px" :src="group.headPicture" alt="group">
      <span>{{group.groupName}}</span>
    </div>
    <div class="item add" @click="createGroup">+</div>
    <div class="item add" @click="searchGroup">-</div>
  </div>
</template>
<style scoped>
  .container{
    width:100%;
    height:80px
  }
  .item{
    width:10%;
    height:80px;
    float:left;
    border-right: 1px solid darkgray;
  }
  .add{
    font-size:36px;
    line-height: 80px;
  }
  img{
    float:left;
    margin:8px 0 8px 5px;
    border-radius : 50%;

  }
  span{
    float:left;
    margin-top:35px;
    overflow:hidden;
  }
</style>
<script>
  import store from '../../store'
  import {networkPost} from '../../tools'
  export default{
    data(){
      return{


      }
    },
    props : ['groups'],
    components:{

    },
    methods : {
        createGroup (){
            store.dispatch('createGroup');
        },
        searchGroup () {
            store.dispatch('searchGroup');
        },
        showGroup (event) {
            var groupId = event.currentTarget.dataset['groupid'];
            var ownerId = event.currentTarget.dataset['ownerid'];
            networkPost('/showGroup', {groupId:groupId})
              .then(function (response){
                if(response.ok && response.data.result == 0){
                    store.dispatch('showGroup', {
                        ownerId : ownerId,
                        groupId : groupId,
                        data : response.data.data
                    });
                }

              });
        }

    }
  }
</script>
