<template>
  <div class='container'>
    <NaviBar></NaviBar>
    <MainContent></MainContent>
  </div>
</template>


<style scoped>
  .container{
    position: absolute;
    top:80px;
    width:100%;
    overflow:auto;
  }
</style>
<script>
    import NaviBar from './NaviBar'
    import MainContent from './MainContent'
    export default{
        data(){
            return{

            }
        },
        components:{
          NaviBar,
          MainContent
        }
    }

</script>
