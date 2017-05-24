<template>
  <div class="container">
    <div class="item" v-show="!isDocShowed"  v-for="group in groups" :data-groupid="group.groupId" :data-ownerid="group.ownerId">
      <div class="group"  >
        <img width="50%" height="64px" @click="showGroup"  :data-groupid="group.groupId" :data-ownerid="group.ownerId" :src="group.headPicture" alt="group">
        <div class="groupDocument">
          <p  class="group-name">{{group.groupName}}</p>
          <div  @click="showDoc" :data-groupid="group.groupId">查看文档</div>
        </div>
      </div>
    </div>
      <div class="doc" v-show="isDocShowed">
        <div class="group-list" @click="backToGroup">返回</div>
          <div class="group-list" @click="showContent" v-for="document in documents" :data-documentid="document.documentId" :data-documentname="document.documentName">
            {{document.documentName}}
          </div>

        <div class="group-list" @click="createDocument">创建文档</div>
      </div>


    <div class="group-list" v-if="!isDocShowed" @click="createGroup">创建分组</div>
    <div class="group-list" v-if="!isDocShowed" @click="searchGroup">搜索分组</div>
  </div>
</template>
<style scoped>
  .container{
    width:100%;
    height:80px;
    overflow:auto;
  }
  .item{
    width:15%;
    height:80px;
    float:left;
    border-right: 1px solid darkgray;
    overflow: hidden;
  }
  .group-list{
    font-size:22px;
    line-height:80px;
    color:rgb(75,156,178);
    width:10%;
    height:80px;
    float:left;
    border-right: 1px solid darkgray;
    overflow: hidden;
  }
  img{
    float:left;
    margin:8px 0 8px 5px;

  }
  .groupDocument{
    width:45%;
    height:100%;
    float:left;
  }
  .groupDocument>p{
    width:90%;
    height:45%;
    padding-left: 2px;padding-top: 5px
  }
  .groupDocument>div{
    width:100%;
    height:50px;
    font-size: 14px;
    color:rgb(75,156,178);
  }
.group-name{
  overflow:hidden;
}



</style>
<script>
  import store from '../../store'
  import {networkPost, getUserInfo, createSocket} from '../../tools'
  export default{
    data(){
      return{
        isDocShowed : false,
        documents : [],
        selectGroup : 0,
        userId : getUserInfo().userId,
        socket : createSocket()
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
            this.selectGroup = groupId;
            networkPost('/getDoc',{groupId:groupId} )
              .then(function (response){

                  if(response.ok && response.data.result == 0){
                    self.documents = response.data.data;
                  }
              })
        },
        showContent (event){
            let documentId = event.target.dataset['documentid'],
              documentName = event.target.dataset['documentname'];
            this.socket.emit('loadDoc', {documentId:documentId});
            this.socket.on('loadDoc', function (data){
                if(data.content != null){
                    store.dispatch('showDocContent',{
                        documentId : data.documentId,
                        documentName : documentName,
                        content : data.content
                    });
                }else{

                  networkPost('/getDocContent', {documentId: documentId})
                    .then(function (response) {
                      if (response.ok && (response.data.result == 0 || response.data.result == -2)) {
                        let data = response.data.data;
                        store.dispatch('showDocContent', data);
                      }
                    }, function (error) {

                    });
                }
            });
        },
        createDocument (){
            var ownerId = this.userId, groupId = this.selectGroup;
            store.dispatch('createDocument', {ownerId : ownerId, groupId : groupId});
        }
    }
  }
</script>
