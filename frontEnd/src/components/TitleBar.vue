<template>
  <div class='titleBar'>
    <Person></Person>
  </div>
</template>
<style scoped>
    .titleBar{
      background-color:white;
      width:98%;
      height: 80px;
      margin:0 auto;
      box-shadow: 4px 1px 1px grey;
    }

</style>
<script>
    import Person from './Person'
    export default{
        data(){
            return{

            }
        },
        components:{
          Person
        }
    }

</script>
