<template>
<div class="container">
  <div id="editor" @keyup="editContent" v-model="content"></div>
</div>

</template>

<style scoped>

  #editor{
    height : 500px;
  }

</style>

<script>
  import {createSocket, getUserInfo} from '../../../../tools'
  import store from '../../../../store'
  const wangEditor = require('wangEditor');
  export  default {
      data () {
          return {
              socket : createSocket(),
              documentId : store.state.showDocContent.data.documentId,
              content : store.state.showDocContent.data.content,
              lastContent : store.state.showContent.data.content,
              timer : null,
              userId : getUserInfo().userId,
              editor : null
          };
      },
      methods : {
        editContent (event){
            console.log(event.target.innerHtml);
        }  ,
      },
      mounted () {
        this.editor = new wangEditor('editor');
        this.editor.create();
        this.editor.$txt.html(this.content);

        this.timer = setInterval( ()=>{
            if(this.content !== this.lastContent){
                console.log('not equal');
                this.lastContent = this.content;
            }
        },1000);
      },
      destroyed () {
        this.editor.destroy();
      }
  }


</script>
