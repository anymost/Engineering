<template>
  <div class="container">
    <input @keydown="search" type="text" autocomplete="off" placeholder="请输入分组名">
    <div v-if="groups.length>0" class="content">
      <div class="group-item" v-for="group in groups">
        <img width="100px" height="100px" :src="group.headPicture" alt="headPicture">
        <p>{{group.groupName}}</p>
        <button @click="addMember" :data-groupid="group.groupId">加入分组</button>
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
  .group-item{
    width:600px;
    height:100px;
    margin:10px 200px;
    box-shadow: 4px 1px 1px grey;
    padding:0;
  }


  .group-item>p{
    float:left;
    margin-top:40px;
    height:60px;
    width:180px;
  }
  .group-item>img{
    float:left;
    padding:10px;
    width:180px;
    height:90%;
  }
  .group-item>button{
    margin-top:40px;
    height:30px;
    font-size:20px;
    text-align:center;
  }

</style>

<script>
  import {networkPost, getUserInfo, handlePicPath} from '../../../../tools'
  import store from '../../../../store'
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
          let userId = this.userId;
          let data = {
              groupId : event.target.dataset['groupid'],
              userId : userId
          };
          console.log(data);
          networkPost('/addMember', data)
            .then(function (response){
                if(response.ok && response.data.result == 0){
                    event.target.value = '加入成功';
                    store.dispatch('showMessage','加入分组成功');
                }else{
                    event.target.value = '已在分组';
                    store.dispatch('showMessage','加入分组失败');
                }
          }, function (){
              store.dispatch('showMessage','加入分组失败');
          });
        }
      },


  }

</script>
