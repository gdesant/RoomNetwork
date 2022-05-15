<template>
  <div class="chatContainerMainDiv">
    <div class="chatTitle">
      <label class="chatLabel">{{ roomname }}</label>
    </div>
    <div class="chatContent" >
      <ChatDataComponent v-if="room != null" :room="room"/>
      <div v-if="room == null" class="chatEmptyDiv">
        <H1 class="emptyChatText">Select a chat with your friend list to show your messages !</H1>
      </div>
    </div>
    <div class="chatInput">
      <ChatInputComponent v-if="otherUserId > 0" />
    </div>
  </div>
</template>

<script>
import ChatDataComponent from '@/views/components/chatComponents/chatDataComponent'
import ChatInputComponent from '@/views/components/chatComponents/chatInputComponent'
import RoomsService from "@/services/RoomsService";
import MessagesService from "@/services/MessagesService";

export default {
  name: "ChatContainer",
  components: { ChatDataComponent, ChatInputComponent},
  props:{
    user: Object,
    socket: Object,
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
  methods: {
    sendMessage: async function(data)
    {
      console.log("   SendMessage - ChatContainer")
      if (!this.$data.validRoom){
        await MessagesService.sendNewRoomMessage(this.$props.user.id, this.$data.otherUserId, data.content)
      } else {
        await MessagesService.sendRoomMessage(this.$props.user.id, this.$data.room.id, data.content)
      }
      return
    },
    updateChat: async function (data)
    {
      let changeRoom = false;
      let room
      if (this.$data.otherUserId != data.id)
      {
        changeRoom = true
        if (this.$data.room != null)
          this.$props.socket.emit('exit_room', {id: this.$data.room.id})
      }
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
        if (changeRoom)
          this.$props.socket.emit('join_room', {id: room.id})
      }
      return;
    },
    getNewMessage: async function (messageId)
    {
      var message = await MessagesService.getMessageById(messageId)
      console.log(message)
      if (this.$data.room != null)
      {
        console.log('Pushing new msg')
        this.$data.room.Messages.unshift(message)
      }

    }
  },
  async created() {
    let self = this

    this.emitter.on("openChat", this.updateChat);
    this.emitter.on("sendMessage", this.sendMessage);

    this.$props.socket.on('newMessage', function (data){
      console.log('NewMessage')
      self.getNewMessage(data.messageId)
    })
  },
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

.chatEmptyDiv{
  display: flex;
  width: 100%;
  height: 100%;

}

.emptyChatText{
  align-self: center;
  text-align: center;
  color: #a6a2a2;
}

</style>