<template>
  <div class="container">
    <div id="editor" @keyup="editContent"></div>
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
        socket: createSocket(),
        documentId: store.state.showDocContent.data.documentId,
        content: store.state.showDocContent.data.content,
        lastContent: store.state.showDocContent.data.content,
        userId: getUserInfo().userId,
        editor: null,
        timer: 0
      };
    },
    methods: {
      editContent (event){
        this.content = event.target.innerHTML;

        if (this.lastContent === this.content) {
          return;
        }
        this.lastContent = this.content;
        this.timer++;
        if (this.timer === 10) {

          this.socket.emit('editContent', {
            documentId: this.documentId,
          });
          this.timer = 0;
        }
      },
    },
    mounted () {
      this.editor = new wangEditor('editor');
      this.editor.create();
      this.editor.$txt.html(this.content);
      this.socket.on('editContent', (data) => {
        let {documentId, content} = data;
        console.log('receive');
        let diff = new diffDOM();
        if (documentId == this.documentId) {
          if (content !== this.content) {
            let difference = diff.diff(html`${content}`, html`${this.content}`)
            diff.apply(this.content, difference);
            this.editor.$txt.html(this.content);
            this.socket.emit('saveContent', {
              documentId: documentId,
              handleId: this.userId,
              content: this.content
            });
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
