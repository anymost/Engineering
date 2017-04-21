<template>
  <div class="container">
      <input type="text"  placeholder="document name" class="documentName"v-model="documentName">
      <input type="button" class="createDocument" @click="createDocument" value="create">
      <div id="editor"></div>
  </div>
</template>

<style scoped>
  .container{

  }
  .documentName{
    width:400px;
    height:30px;
    font-size:20px;
    text-align:center;
  }
  .createDocument{
    width:80px;
    height:30px;
  }


  #editor{
    width:100%;
    height:100%;
  }
</style>

<script>
  import store from '../../../../store'
  import {networkPost} from '../../../../tools'
  const wangEditor = require('wangEditor')
  export default {
      data () {
          return {
              ownerId : store.state.createDocument.ownerId,
              groupId : store.state.createDocument.groupId,
              documentName : '',
              document : '',

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
      },
      mounted () {
        let editor = new wangEditor('editor');
        editor.create();
      }
  }

</script>
