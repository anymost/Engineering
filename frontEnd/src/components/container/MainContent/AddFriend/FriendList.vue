<template>
  <div class="container">
    <ul>
      <li :data-id="searchList.userId">
        <img :src="searchList.headPicture">
        <p>{{searchList.userName}}</p>
        <div class="add" @click.once="addFriend">{{friendState}}</div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .container {
    width: 94%;
    padding: 3%;
  }
  ul{
    width:400px;
    margin-top:-30px;
    margin-left:200px;
    box-shadow: 4px 1px 1px grey;
  }
  li:after{
    content:'';
    clear:both;
    display:block;
    visibility: hidden;
  }
  li{
    width:400px;
    height:50px;
    list-style: none;
    padding:5px;
  }
  img {
    float: left;
    width: 100px;
    height: 50px;
  }

  p {
    float: left;
    width:50px;
    height: 50px;

  }
  .add{
    float:right;
    font-size:26px;
    width:100px;
    height:50px;
    line-height:50px;
    text-align: center;
  }
</style>
<script>
  import {networkPost,getUserInfo} from '../../../../tools'
  export default{
    data(){
      return {
          userId : getUserInfo().userId,
          friendState : '添加好友'
      }
    },
    props: ['searchList'],
    components: {},
    methods: {
        addFriend () {

            let friendId = this.searchList.userId;
            let data = {
                userId : this.userId,
                friendId : friendId
            };
            networkPost('/addFriend', data).then((response)=>{
              if(response.ok){
                  if(response.data.result == 0){
                    this.friendState = '添加成功';
                    store.dipatch('showMessage', '好友添加成功');
                  }else if(response.data.result == -3){
                      this.friendState ='已存在';
                      store.dispatch('showMessage', '该好友已存在')
                  }
              }
            });
        }
    },
    computed: {}
  }

</script>
