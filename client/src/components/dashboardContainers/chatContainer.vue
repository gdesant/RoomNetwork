<template>
  <div class="chatContainerMainDiv">
    <div class="chatContent">
      <ChatComponent/>
    </div>
    <div class="chatSelector">
      <ChatSelectorComponent/>
    </div>
  </div>
</template>

<script>
import ChatComponent from '@/components/chatComponents/chatComponent'
import ChatSelectorComponent from '@/components/chatComponents/chatSelectorComponent'


export default {
  name: "ChatContainer",
  components: { ChatComponent, ChatSelectorComponent},
  props:{
    user: Object,
  },
  methods: {
  }
}
</script>

<style scoped>
.chatContainerMainDiv{
  background-color: #39393b;
  display: flex;
  flex-direction: row;
  border-radius: 1vh 1vh;
  width: 100%;
  height: 100%;
}

.chatContent{
  width: 70%;
  height: 100%;
  display: flex;
}

.chatSelector{
  width: 30%;
  height: 100%;
  display: flex;
}

</style>