<template>

    <div :class="contentState">
      <div v-if="friendState">
            <Friends :friends="myFriends"/>
      </div>
      <div v-if="groupState">
            <Groups :groups="myGroups"/>
      </div>

      <div v-if="documentState">
            <Documents>

            </Documents>
      </div>
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
    import store from '../../store'
    import Friends from './Friends'
    import Groups from './Groups'
    import Documents from './Documents'

    export default{
        data(){
            return{


            }
        },
        components:{
          Friends,
          Groups,
          Documents
        },
        computed : {
            contentState (){

                return store.state.titleDisplay === 'block' ? 'hideBar' : 'showBar';
            },
            friendState () {
                return store.state.friendState ;
            },
            groupState () {
                return store.state.groupState ;
            },
            myFriends (){
                return store.state.myFriends;
            },
            myGroups () {
                return store.state.myGroups;
            },
            myDocuments () {
                return store.state.myDocuments;
            }


        }
    }
</script>
