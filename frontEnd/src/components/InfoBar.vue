<template>
    <div class='infoBar'>
      <div class="exit" :style='{dispaly:infoBarDisplay}'>
        退出
      </div>
    </div>
</template>
<style scoped>

</style>
<script>
    import {infoBar} from '../store'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components : {
        },
        computed : {
          infoBarDisplay () {
            return infoBar.state.infoBarDisplay;
          }
        }
    }
</script>
