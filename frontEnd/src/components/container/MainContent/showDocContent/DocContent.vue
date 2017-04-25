<template>
<div class="container">
  <div id="editor" @keyup="editContent"></div>
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
              lastContent : store.state.showDocContent.data.content,
              userId : getUserInfo().userId,
              editor : null,
              timer : 0
          };
      },
      methods : {
        editContent (event){
            this.content = event.target.innerHTML;
            if(this.lastContent !== this.content){
                return;
            }
            this.timer++;
            if(timer === 10){
                this.socket.emit('editContent', {
                    documentId : this.documentId,
                    handlerId : this.userId,
                    content : this.content
                });
                this.timer = 0;
            }
        }  ,
      },
      mounted () {
        this.editor = new wangEditor('editor');
        this.editor.create();
        this.editor.$txt.html(this.content);
        this.socket.on('editContent', (data)=>{
           let {documentId, handlerId, content} = data;
           if(documentId == this.documentId && handlerId != this.userId){
               if(content !== this.content){
                   content = content && this.content;
                   this.editor.$txt.html(content);
               }
           }
        });

      },
      destroyed () {
        this.editor.destroy();
        this.socket = null;
      }
  }


</script>
