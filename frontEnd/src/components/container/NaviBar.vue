<template>
  <div class='naviBar'>
    <div class="item" data-index="friend" @click="changeTitle($event),getFriends()">
      <img src='../../assets/back.png' data-index="friend" @click='hideBack' class='back'
           :class="{showFriend:friendDisplay}">
      {{friendDisplay ? 'all Friends' : 'Friends'}}

    </div>

    <div class="item" data-index="group" @click="changeTitle($event),getGroups()">
      <img src='../../assets/back.png' data-index="group" @click='hideBack' class='back'
           :class="{showGroup:groupDisplay}">
      {{groupDisplay ? 'all Groups' : 'Groups'}}
    </div>

    <div class="item" data-index="document" @click="changeTitle">
      <img src='../../assets/back.png' data-index="document" @click='hideBack' class='back'
           :class="{showDocument:documentDisplay}">
      {{documentDisplay ? 'all Documents' : 'Documents'}}
    </div>
  </div>
</template>


<script>
  import store from '../../store'
  import {networkPost, getUserInfo} from '../../tools'



  const changeDisplay = (event, isShow, target) => {

    let index = event.target.dataset['index'];
    if (isShow) {
      if (index === 'friend') {
        target.friendDisplay = true;
      } else if (index === 'group') {
        target.groupDisplay = true;
      } else if (index === 'document') {
        target.documentDisplay = true;
      }
    } else {
      if (index === 'friend') {
        target.friendDisplay = false;
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
        friendDisplay: false,
        groupDisplay: false,
        documentDisplay: false,
        stopChangeTab: false
      }
    },
    components: {},
    methods: {

      changeTitle (event) {
        event.stopPropagation();
        if (this.stopChangeTab) {
          return;
        }

        if (store.state.infoBarDisplay === 'block') {
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

      },
      getFriends (event) {
        const userId = getUserInfo().userId;
        networkPost('/getFriends', {userId:userId}).then(function(response){
            if(response.ok){
               let data = response.data;
               if(data.result == 0){
                   store.dispatch('getFriends',data.data);
               }else if(data.result == -2){
                   store.dispatch('getFriends', null);
               }
            }
          }
        )
      },
      getGroups (event) {
          const userId = getUserInfo().userId;

          networkPost('/getGroups', {userId:userId}).then(function(response){

              if(response.ok){
                let data = response.data;
                if(data.result == 0){
                    store.dispatch('getGroups', data.data);
                }else if(data.result == -3){
                    store.dispatch('getGroups', null);
                }
            }
          }, function(error){
              console.log('error');
          })
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
    position: relative;
    width: 100%;
    height: 80px;
    background-color: white;
    margin-top: 10px;
    box-shadow: 4px 1px 1px grey;
  }

  .back {
    display: none;
    width: 10%;
    height: 40%;
    position: absolute;
    left: 10px;
    top: 20px;
  }

  .showFriend {
    display: block;
  }

  .showGroup {
    display: block;
  }

  .showDocument {
    display: block;
  }

</style>
