<template>
  <div id="app">
    <TitleBar></TitleBar>
    <InfoBar></InfoBar>
    <router-link to="/one"> I am ONE</router-link>
    <router-link to="/two">I am TWO</router-link>
    <Container></Container>
    <CopyRight></CopyRight>
    <div class="hello world">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>

import TitleBar from './components/TitleBar'
import Container from './components/Container'
import CopyRight from './components/CopyRight'
import InfoBar from './components/InfoBar'


export default {
  name: 'app',
  components: {
    TitleBar,
    Container,
    InfoBar,
    CopyRight,
  },
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
