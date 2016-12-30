<template>
  <div :class="[getTitleState]">
    <Person></Person>
  </div>
</template>
<style scoped>

  @keyframes hideTitle {
    from {
      top: 0;
    }
    to {
      top:-80px;
    }
  }

  @keyframes showTitle {
    from {
      top: -80px;
    }
    to {
      top: 0;
    }
  }

  .showTitle {
    position: absolute;
    left: 0;
    background-color: white;
    width: 100%;
    height: 80px;
    box-shadow: 4px 1px 1px grey;
    z-index:999;
    animation: showTitle 1s;
  }

  .hideTitle {
    position: absolute;
    left: 0;
    background-color: white;
    width: 100%;
    height: 80px;
    box-shadow: 4px 1px 1px grey;
    z-index:999;
    animation: hideTitle 1s;
  }

</style>
<script>
  import Person from './Person'
  import store from '../store'
  export default{
    data(){
        return {
            normalDisplay: 'titleBar'
        }
    },
    components: {
        Person
    },
    computed: {
        getTitleState () {
            return store.state.titleDisplay === 'block' ? 'showTitle' : 'hideTitle';
        }
    }
  }

</script>
