<template>
  <div class='container'>
    <NaviBar></NaviBar>
    <MainContent></MainContent>
  </div>
</template>
<style>
  .container{
    width:100%;
  }

  .container > div{
    float:left;
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
