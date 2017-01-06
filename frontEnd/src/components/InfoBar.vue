<template>
    <div class='infoBar' :class='[infoBarDisplay]'>
      <div class="exit" >
        退出
      </div>
    </div>
</template>
<style scoped>
  .infoBar{
    margin-right:0;
    width:10%;
    height:200px;
    z-index: 2;
    position: absolute;
    right:0;
    box-shadow: 10px 2px 2px grey;
    background-color: white;
  }
  .show{
    transform: translate(0,80px);
    transition-duration: 1s;
  }

  .hide{
    transform: translate(0,-200px);
    transition-duration: 1s;
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
            return store.state.infoBarDisplay==='block' ?'show' :'hide';
          }
        }
    }
</script>
