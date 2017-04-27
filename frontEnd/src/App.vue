<template>
  <div id="app">
    <TitleBar/>
    <ContentBar/>
    <InfoBar/>
    <Container/>
    <ShowMessage/>
    <ConfirmMessage/>
  </div>
</template>

<script>

import TitleBar from './components/titleBar/TitleBar'
import Container from './components/container/Container'
import InfoBar from './components/InfoBar'
import ContentBar from './components/contentBar/ContentBars'
import ShowMessage from './components/toolBar/ShowMessage'
import ConfirmMessage from './components/toolBar/ConfirmMessage'




export default {
  name: 'app',
  data (){
    return {
    }
  },
  components: {
    TitleBar,
    ContentBar,
    Container,
    InfoBar,
    ShowMessage,
    ConfirmMessage
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  background-color : rgb(241,241,241);
  overflow: auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
