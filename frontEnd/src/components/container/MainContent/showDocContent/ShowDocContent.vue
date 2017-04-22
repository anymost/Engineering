<template>
  <div class="container">
    <h2>{{documentName}}</h2>
    <div id="editor"></div>
  </div>
</template>

<style scoped>
  #editor{
    height:500px;
  }

</style>

<script>
  import store from '../../../../store'
  const wangEditor = require('wangEditor');
  export default {
    data () {
      return {
        documentId: store.state.showDocContent.data.documentId,
        documentName: store.state.showDocContent.data.documentName,
        content: store.state.showDocContent.data.content,
        editor: null
      };
    },
    mounted () {
      this.editor = new wangEditor('editor');
      this.editor.create();
      this.editor.$txt.html(this.content);
    },
    destroyed () {
        this.editor.destroy();
    }

  }

</script>
