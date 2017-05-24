<template>
  <div class="container">
    <form id="group" @submit.prevent="createGroup" enctype="multipart/form-data">
      <br>
      <input type="text"  name="groupName" autocomplete="off" placeholder="请输入分组名">
      <br>
      <input type="file"  name="headPicture">
      <br>
      <input type="hidden" name="ownerId" :value="userId" >
      <input type="hidden" name="members" :value="userId">
      <input type="submit" value="创建分组">
    </form>


  </div>


</template>

<style scoped>

  input {
    width: 300px;
    height: 30px;
    margin-bottom: 30px;
    font-size: 20px;
    text-align: center;
  }

</style>

<script>
  import {getUserInfo, networkPost, handlePicPath} from '../../../../tools'
  import store from '../../../../store'
  export default {
    data () {
      return {
        userId: getUserInfo().userId
      }
    },
    methods: {
      createGroup () {
            var group = document.querySelector('#group');

            let formData = new FormData(group);

        networkPost('/createGroup', formData).then((response) => {
          if(response.ok){
              let data = response.data;
              if(data.result == 0){
                  store.dispatch('showMessage', '分组创建成功');
              }else{
                  store.dispatch('showMessage', '分组创建失败');
              }
          }
        })
      }

    }
  }
</script>
