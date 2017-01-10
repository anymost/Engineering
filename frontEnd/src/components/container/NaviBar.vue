<template>
    <div class='naviBar'>
        <div  class="item" data-index="1" @click="changeTitle">
            <img src='../../assets/back.png' data-index="1"  @click='hideBack' class='back' :class="{showMember:memberDisplay}" >
            Member
        </div>

      <div  class="item" data-index="2" @click="changeTitle">
        <img src='../../assets/back.png'  data-index="2" @click='hideBack' class='back' :class="{showGroup:groupDisplay}" >
           Group
      </div>

      <div  class="item" data-index="3" @click="changeTitle">
        <img src='../../assets/back.png' data-index="3"   @click='hideBack' class='back' :class="{showDocument:documentDisplay}" >
          Document
      </div>
    </div>
</template>
<style scoped>
  .naviBar {
    margin-left: 2%;
    margin-top: 1%;
    width: 16%;
    float: left;
  }

  .item {
    position:relative;
    width: 100%;
    height: 80px;
    background-color: white;
    margin-top: 10px;
    box-shadow: 4px 1px 1px grey;
  }

  .back{
    display:none;
    width:10%;
    height:40%;
    position:absolute;
    left:10px;
    top:20px;
  }
  .showMember{
    display:block;
  }

  .showGroup{
    display:block;
  }

  .showDocument{
    display:block;
  }

</style>

<script>
  import store from '../../store'

  const  changeDisplay = (event, isShow ,target) =>{

    let index = parseInt(event.target.getAttribute('data-index'));
    if(isShow) {
      if (index === 1) {
        target.memberDisplay = true;
      } else if (index === 2) {
        target.groupDisplay = true;
      } else if (index === 3) {
        target.documentDisplay = true;
      }
    }else{
      if (index === 1) {
        target.memberDisplay = false;
      } else if (index === 2) {
        target.groupDisplay = false;
      } else if (index === 3) {
        target.documentDisplay = false;
      }
    }
  };

  export default{
      data(){
          return {
              items : [
                  'project',
                  'member',
                  'document'
              ],
              memberDisplay : false,
              groupDisplay : false,
              documentDisplay : false,
              stopChangeTab : false
          }
      },
    components: {

    },
    methods : {
      changeTitle (event) {
          event.stopPropagation();
          if(this.stopChangeTab){
              return;
          }

          if(store.state.infoBarDisplay === 'block'){
              store.dispatch('changeDisplay');
          }

          changeDisplay(event, true, this);

          store.dispatch('changeTitle');
          this.stopChangeTab = true;
      },

      hideBack (event) {
          event.stopPropagation();
          this.stopChangeTab = false;

          changeDisplay(event, false, this);


          store.dispatch('changeTitle');

      }
    }

  }

</script>
