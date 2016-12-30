<template>
  <div class='mainContent'>
    <div>
        <div>
          <router-link to="/one">one</router-link>
          <router-link to="/two">two</router-link>
        </div>
        <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
  .mainContent{
    margin-left:6%;
    margin-top : 1%;
    width:72%;
    height:800px;
    background-color:white;
    float:left;
  }

</style>
<script>

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }

</script>
