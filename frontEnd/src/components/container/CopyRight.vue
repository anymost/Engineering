<template>
    <div class='copyRight'>
      <hr>
      <div >{{msg}}</div>
    </div>
</template>
<style scoped>
  .copyRight{
    margin-top:10px;
    width:98%;
    height:40px;
  }
  .copyRight hr{
    width:100%;
    color:rgb(128,179,255);
    height:4px;
  }
  .copyRight div{
    text-align:center;
  }
</style>
<script>

    export default{
        data(){
            return{
                msg:'Copyright © 2016 - 2017 WeWork. All Rights Reserved'
            }
        },
        components:{

        }
    }
</script>
