<template>
  <div class="container">
    <input @keydown="search" type="text" autocomplete="off" placeholder="search group">
    <div v-if="groups.length>0" class="content">
      <div class="item" v-for="group in groups">
        <img width="100px" height="100px" :src="group.headPicture" alt="headPicture">
        <p>groupName:{{group.groupName}}</p>
        <button @click="addMember" :data-groupid="group.groupId">add</button>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .container{
    padding:50px;
  }
  input{
    width:400px;
    height:30px;
    font-size:20px;
    text-align: center;
  }
  .item{
    width:400px;
    height:100px;
    margin:10px 200px;
    box-shadow: 4px 1px 1px grey;
    padding:0;
  }


  .item>p{
    float:left;
    margin-top:40px;
    height:60px;
    width:100px;
  }
  .item>img{
    float:left;
    margin-left:50px;
    padding:0;
  }
  .item>button{
    margin-top:40px;
    height:30px;
    width:80px;
    font-size:20px;
    text-align:center;
  }

</style>

<script>
  import {networkPost, getUserInfo, handlePicPath} from '../../../../tools'
  export default {
      data () {
          return {
            userId : getUserInfo().userId,
            value : '',
            lastValue : '',
            groups : []
        }
      },
      methods : {
        search (event){
          this.value = event.target.value;
          if(this.value == this.lastValue){
              return ;
          }
          this.lastValue = this.value;
          networkPost('/searchGroup', {groupName:this.value})
            .then((response) =>{
                if(response.ok && response.data.result == 0){
                  var data = response.data.data;
                  data.forEach(function (item, index, array){
                      array[index].headPicture = handlePicPath(item.headPicture);
                  });
                  this.groups = data;
                }
            })
        },
        addMember (event){
          let groupId = event.target.dataset['groupid'];
          let userId = this.userId;
          networkPost('/addMember', {groupId : groupId, userId : userId})
            .then(function (response){
                if(response.ok && response.data.result == 0){
                    console.log('add member Ok');
                    event.target.value = 'done';
                }
          }, function (error){

          });
        }
      },


  }

</script>
