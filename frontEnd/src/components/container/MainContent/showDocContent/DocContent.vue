<template>
  <div class="container">
    <div  id="editor"></div>
  </div>

</template>

<style scoped>

  #editor {
    height: 500px;
  }

</style>

<script>
  import {createSocket, getUserInfo} from '../../../../tools'
  import html from 'bel'
  import diffDOM from 'diff-dom'
  import store from '../../../../store'
  const wangEditor = require('wangEditor');
  export  default {
    data () {
      return {
        documentId: store.state.showDocContent.data.documentId,
        content: store.state.showDocContent.data.content,
        userId: getUserInfo().userId,
        editor: null,
        timer: null
      };
    },
    props : ['socket'],
    mounted () {
      this.editor = new wangEditor('editor');
      this.editor.create();
      this.editor.$txt.html(this.content);
      /**
       * 接收服务器端发送的内容 与本地内容同步后展现
       */
      this.socket.on('editContent', (data) => {
        let {documentId, content} = data;
        let oldContent = document.getElementById('editor').innerHTML;
        let diff = new diffDOM();
        if (documentId == this.documentId) {
            let difference = diff.diff(html`${content}`, html`${oldContent}`);
            diff.apply(oldContent, difference);
            console.log(`${content}-----${oldContent}`);
            this.editor.$txt.html(oldContent);
            this.socket.emit('saveContent', {
              documentId: documentId,
              handleId: this.userId,
              content: oldContent
            });

        }
      });


      /**
       * 每隔五分钟通知服务器端将文档内容发回到客户端
       */
      this.timer = setInterval(()=>{

        this.socket.emit('editContent', {
          documentId: this.documentId,
        });
      },1000*60*5);

    },
    destroyed () {
      this.editor.destroy();
      this.socket = null;
      clearInterval(this.timer);
    }
  }


</script>
