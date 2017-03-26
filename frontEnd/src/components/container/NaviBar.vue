<template>
    <div class='naviBar'>
        <div  class="item" data-index="member" @click="changeTitle">
            <img src='../../assets/back.png' data-index="member"  @click='hideBack' class='back' :class="{showMember:memberDisplay}" >
            {{memberDisplay ? 'all Members' : 'Members'}}

        </div>

      <div  class="item" data-index="group" @click="changeTitle">
        <img src='../../assets/back.png'  data-index="group" @click='hideBack' class='back' :class="{showGroup:groupDisplay}" >
           {{groupDisplay ? 'all Groups' : 'Groups'}}
      </div>

      <div  class="item" data-index="document" @click="changeTitle">
        <img src='../../assets/back.png' data-index="document"   @click='hideBack' class='back' :class="{showDocument:documentDisplay}" >
          {{documentDisplay ? 'all Documents' : 'Documents'}}
      </div>
    </div>
</template>


<script>
  import store from '../../store'

  const getMemebers = ()=>{

  };

  const getGroups = ()=>{

  };
  const getDocuments = ()=>{

  };

  const  changeDisplay = (event, isShow ,target) =>{

    let index = event.target.dataset['index'];
    if(isShow) {
      if (index === 'member') {
          getMemebers();
          target.memberDisplay = true;

      } else if (index === 'group') {
          getGroups();
          target.groupDisplay = true;
      } else if (index === 'document') {
          getDocuments();
          target.documentDisplay = true;
      }
    }else{
      if (index === 'member') {
        target.memberDisplay = false;
      } else if (index === 'group') {
        target.groupDisplay = false;
      } else if (index === 'document') {
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
