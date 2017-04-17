<template>
  <div class="container">
    <input @keydown="search" type="text" autocomplete="off" placeholder="search group">
    <div v-if="groups.length>0" class="content">
      <div class="item" v-for="group in groups">
        <img width="100px" height="100px" :src="group.headPicture" alt="headPicture">
        <p>{{group.groupName}}</p>
        <div></div>
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
  }
  img{
    float:left;
    width:100px;
    heigth:100px;
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
        }
      },


  }

</script>
