<template>
  <div class="container">
    <div class="doc-head">
    <span class="doc-title">{{documentName}} </span>
    <span class="user-count">当前用户数:{{userCount}}</span>
      <input class="sync-content" type="button" @click="syncContent" value="同步文档内容">
    </div>
    <DocContent :socket="socket"/>
  </div>
</template>

<style scoped>
    .doc-head{
      width:100%;
    }
    .doc-title{
      color:rgb(75,156,178);
      font-size:26px;
    }
    .user-count{
      font-size:16px;
      float:right;
      padding:5px 20px 0 0;
    }
    .sync-content{
      float:right;
      height:35px;
    }

</style>

<script>
  import store from '../../../../store'
  import {createSocket, getUserInfo} from '../../../../tools'
  import DocContent from './DocContent'

  export default {
    data () {
      return {
        documentId: store.state.showDocContent.data.documentId,
        documentName: store.state.showDocContent.data.documentName,
        socket : createSocket(),
        userId : getUserInfo().userId,
        userCount : 1
      };
    },
    mounted () {
      this.socket.emit('loadContent', {userId : this.userId, documentId : this.documentId });
      this.socket.on('loadContent', (data)=>{this.userCount = data.userCount})
    },
    destroyed () {
        this.socket = null;
    },
    methods : {
      /**
       * 通过点击按钮的方式 通知服务器端发送内容到本地
       * 手动同步
       */
        syncContent (){
          this.socket.emit('editContent', {
              documentId: this.documentId
          });
        }
    },
    components : {
        DocContent
    }

  }

</script>
