<template>
  <input type="text" v-model="documentName">
  <input type="button" @click="createDocument" value="create">

</template>

<style scoped>

</style>

<script>
  import store from '../../../../store'
  import {networkPost} from '../../../../tools'
  export default {
      data () {
          return {
              ownerId : store.state.createDocument.ownerId,
              groupId : store.state.createDocument.groupId,
              documentName : '',
              document : ''
          };
      },
      methods : {
          createDocument (){
              let data = {
                  ownerId : this.ownerId,
                  groupId : this.groupId
              };
            networkPost('/createDoc', data).
              then(function (result){
                  if(result.ok && result.data.result == 0){
                      console.log('createDocument ok');
                  }
            }, function (error){
                  console.log(error);
            })
        }
      }
  }

</script>
