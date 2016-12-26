<template>
    <div class='copyRight'>
      <hr>
      <div >{{msg}}</div>
    </div>
</template>
<style scoped>
  .copyRight{
    position : relative;
    bottom : 0;
  }
  .copyRight hr{
    width:100%;
  }
  .copyRight div{
    text-align:center;
  }
</style>
<script>

    export default{
        data(){
            return{
                msg:'Copyright © 2016-2017 WeWork'
            }
        },
        components:{

        }
    }
</script>
