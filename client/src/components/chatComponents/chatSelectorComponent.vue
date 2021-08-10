<template>
  <div class="chatSelectorMainDiv">

  </div>
</template>

<script>

export default {
  name: "ChatContainer",
  props:{
    user: Object,
  },
  methods: {
  }
}
</script>

<style scoped>
.chatSelectorMainDiv{
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
}
</style>