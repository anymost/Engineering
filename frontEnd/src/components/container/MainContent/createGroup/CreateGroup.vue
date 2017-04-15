<template>
  <div class="container">
    <form id="group" @submit.prevent="createGroup" enctype="multipart/form-data">
      <br>
      <input type="text"  name="groupName" autocomplete="off" placeholder="group name">
      <br>
      <input type="file"  name="headPicture">
      <br>
      <input type="hidden" name="ownerId" :value="userId" >
      <input type="hidden" name="members" :value="userId">
      <input type="submit" value="create">
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
          if(response.result == 0){
              console.log('add ok');
          }
        })
      },
      uploadPicture (event){
        this.headPicture = event.target.value;
      }

    }
  }
</script>
