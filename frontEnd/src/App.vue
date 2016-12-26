<template>
  <div id="app">
    <TitleBar></TitleBar>
    <Container></Container>
    <CopyRight></CopyRight>
  </div>
</template>

<script>
import TitleBar from './components/TitleBar'
import Container from './components/Container'
import CopyRight from './components/CopyRight'


export default {
  name: 'app',
  components: {
    TitleBar,
    Container,
    CopyRight
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  background-color : rgb(241,241,241);
  margin-top:5px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
