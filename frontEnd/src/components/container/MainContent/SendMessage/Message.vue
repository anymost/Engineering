<template>
  <div >
      <p class="message-item" v-for="message in messageList">
        {{message}}
      </p>
    </ul>
  </div>
</template>
<style>
  .message-item{
    float:right;
    color: cadetblue;
    margin-top:10px;
    text-align:justify;
    padding:1px 5px;
    line-height: 30px;
    width:60%;
    box-shadow: 4px 1px 1px grey;
    border-radius: 1px 1px 1px 1px;
    border:1px solid grey;
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
