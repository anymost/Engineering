<template>
    <div :class="contentState">
            <div>hello world</div>
    </div>
</template>
<style scoped>
   .showBar {
    position: absolute;
    left: 0;
    background-color: white;
    width: 100%;
    height: 80px;
    box-shadow: 4px 1px 1px grey;
    z-index:3;
    transform: translate(0,0);
    transition: 1s;
  }

  .hideBar {
    position: absolute;
    left: 0;
    background-color: white;
    width: 100%;
    height: 80px;
    box-shadow: 4px 1px 1px grey;
    z-index:3;
    transform: translate(0,-80px);
    transition-duration: 1s;
  }
</style>
<script>
    import store from '../store'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        },
        computed : {
            contentState (){

                return store.state.titleDisplay === 'block' ? 'hideBar' : 'showBar';
            }
        }
    }
</script>
