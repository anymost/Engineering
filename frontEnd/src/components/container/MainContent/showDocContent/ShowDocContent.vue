<template>
  <div class="container">
    <h2>{{documentName}} userCount:{{userCount}}</h2>
    <DocContent/>
  </div>
</template>

<style scoped>


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
    components : {
        DocContent
    }

  }

</script>
