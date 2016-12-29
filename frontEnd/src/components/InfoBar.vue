<template>
    <div class='infoBar' :style='{display:infoBarDisplay}'>
      <div class="exit" >
        退出
      </div>
    </div>
</template>
<style scoped>
  .infoBar{
    margin-right:1%;
    width:10%;
    height:200px;
    z-index: 999;
    position: absolute;
    right:0.5%;
    box-shadow: 4px 1px 1px grey;
    background-color: white;
  }

</style>
<script>
    import store from '../store'
    export default{
        data(){
            return{
                msg:'hello vue',
                info : store.state.infoBarDisplay
            }
        },
        components : {
        },
        computed : {
          infoBarDisplay () {
              return store.state.infoBarDisplay;
          }
        }
    }
</script>
