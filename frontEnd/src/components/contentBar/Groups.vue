<template>
  <div class="container">
    <div class="item"  v-for="group in groups" :data-groupid="group.groupId" :data-ownerid="group.ownerId">
      <div class="group" v-show="!isDocShowed" >
        <img width="60%" height="64px" @click="showGroup"  :data-groupid="group.groupId" :data-ownerid="group.ownerId" :src="group.headPicture" alt="group">
        <div class="groupDocument">
          <p @click="showDoc" :data-groupid="group.groupId">doc</p>
          <span  >{{group.groupName}}</span>
        </div>
      </div>
    </div>
      <div class="doc" v-show="isDocShowed">
        <div class="docWord" @click="backToGroup">back</div>
        <ul v-if="documents.length>0">
          <li v-for="document in documents" :data-documentid="document.documentId">
            {{document.documentName}}
          </li>

        </ul>
        <div class="docWord">+</div>
      </div>


    <div class="item add" v-if="!isDocShowed" @click="createGroup">+</div>
    <div class="item add" v-if="!isDocShowed" @click="searchGroup">-</div>
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
  .groupDocument{
    float:left;
  }
  .docWord{
    font-size:20px;
    text-align:center;
  }
</style>
<script>
  import store from '../../store'
  import {networkPost} from '../../tools'
  export default{
    data(){
      return{
        isDocShowed : false,
        documents : []
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
        },
        backToGroup (){
          this.isDocShowed = false;
        },
        showDoc (event){
            this.isDocShowed = true;
            let self = this;
            let groupId = event.target.dataset['groupid'];
            networkPost('/getDoc',{groupId:groupId} )
              .then(function (response){
                  console.log(response.data);
                  if(response.ok && response.data.result == 0){
                    self.documents = response.data.data;
                  }
              })

        }


    }
  }
</script>
