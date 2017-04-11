<template>
  <div>
    <ul>
      <li v-for="message in messageList">
        {{message}}
      </li>
    </ul>
  </div>
</template>
<style>
  li{
    list-style: none;
    background-color: cadetblue;
    color:white;
    margin-top:10px;
    text-align: center;
    padding:1px 5px
  }

</style>

<script>
  export default{
      data(){
        return {

        };
      },
      props : ['messageList']
  }

</script>
