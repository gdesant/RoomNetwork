<template>
  <div class="chatMainDiv">
    <div class="chatContent"></div>
    <div class="chatInput"></div>
  </div>
</template>

<script>

export default {
  name: "ChatComponent",
  props:{
    user: Object,
    chat: Object,
  },
  methods: {
  }
}
</script>

<style scoped>
.chatMainDiv{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.chatContent{
  display: flex;
  width: 100%;
  height: 65%;
}

.chatInput{
  display: flex;
  width: 100%;
  height: 35%;
}

</style>