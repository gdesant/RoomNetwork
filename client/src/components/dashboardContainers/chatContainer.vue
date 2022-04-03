<template>
  <div class="chatContainerMainDiv">
    <div class="chatTitle">
      <label class="chatLabel">{{ roomname }}</label>
    </div>
    <div class="chatContent" >
      <ChatDataComponent v-if="room != null" :room="room"/>
    </div>
    <div class="chatInput">
      <ChatInputComponent v-if="otherUserId > 0" />
    </div>
  </div>
</template>

<script>
import ChatDataComponent from '@/components/chatComponents/chatDataComponent'
import ChatInputComponent from '@/components/chatComponents/chatInputComponent'
import RoomsService from "@/services/RoomsService";
import MessagesService from "@/services/MessagesService";

export default {
  name: "ChatContainer",
  components: { ChatDataComponent, ChatInputComponent},
  props:{
    user: Object,
  },
  data() {
    return {
      room: null,
      validRoom: false,
      otherUserName: "",
      otherUserId: -1,
    }
  },
  computed: {
    roomname: function(){
      if (this.$data.otherUserId > 0)
      {
        return ' Chat with ' + this.$data.otherUserName
      }
      return ""
    },
  },
  async created() {
    this.emitter.on("openChat", this.updateChat);
    this.emitter.on("sendMessage", this.sendMessage);
  },
  methods: {
    sendMessage: async function(data)
    {
      console.log("   SendMessage - ChatContainer")
      if (!this.$data.validRoom){
        await MessagesService.sendNewRoomMessage(this.$props.user.id, this.$data.otherUserId, data.content)
      } else {
        await MessagesService.sendRoomMessage(this.$props.user.id, this.$data.room.id, data.content)
      }
      await this.updateChat({id: this.$data.otherUserId, name: this.$data.otherUserName})
      return
    },
    updateChat: async function (data)
    {
      let room
      this.$data.otherUserId = data.id;
      this.$data.otherUserName = data.name;
      room = await RoomsService.getPrivateRoom(this.$props.user.id, data.id)

      console.log(room)
      if (room == false)
      {
        this.$data.validRoom = false
        this.$data.room = null
      }
      else if (room.error != null)
      {
        this.$data.validRoom = false
        this.$data.room = null
      }
      else
      {
        this.$data.validRoom = true;
        this.$data.room = room
      }
      return;
    }
  }
}
</script>

<style scoped>
.chatContainerMainDiv{
  width: 100%;
  height: 100%;
}

.chatTitle{
  height: 5%;
  border-radius: 1vh 1vh 0vh 0vh;
  background-color: #2a2a2c;
  padding-left: 2.5%;
  text-align: left;
}

.chatLabel{
  color: orange;
  font-family: 'Titillium Web', sans-serif;
  font-size: 160%;
}

.chatContent{
  background-color: #39393b;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80%;
  display: flex;
}

.chatInput{
  background-color: #2a2a2c;
  display: flex;
  flex-direction: row;
  border-radius: 0vh 0vh 1vh 1vh;
  width: 100%;
  height: 15%;
  display: flex;
}

</style>