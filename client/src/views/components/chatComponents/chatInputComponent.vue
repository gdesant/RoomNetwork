<template>
  <div class="chatInputMainDiv">
    <div class="chatInput">
      <textarea type="text" maxlength="254" class="inputMessage" v-model=content placeholder="Message...">
      </textarea>
    </div>
    <button class="chatSender" @click="sendMessage(content)">
      Send
    </button>
  </div>
</template>

<script>

const cooldown = 1500

export default {
  name: "ChatInputComponent",
  props:{
    user: Object,
    chat: Object,
  },
  data(){
    return {
      content: "",
      lastSend: 0
    }
  },
  created() {
    this.$data.lastSend = Date.now()
  },
  methods: {
    sendMessage(content){
      console.log("SendMessage - ChatInput")
      if (!(content.length > 0))
        return
      if (this.$data.lastSend >= (Date.now() - cooldown))
        return
      this.emitter.emit("sendMessage", { content });
      this.$data.lastSend = Date.now()
      this.$data.content = ''
    }
  }
}
</script>

<style scoped>
.chatInputMainDiv{
  display: flex;
  flex-direction: row;
  width: 99%;
  height: 75%;
  margin-top: 1%;
  margin-bottom: auto;
  margin-left: 0.5%;
  margin-right: auto;

}

.chatSender{
  display: inline-block;
  width: 20.75%;
  width: 20.75%;
  height: 100%;
  background-color: rgb(63, 63, 65);
  margin-left: -1%;
  margin-right: 0;
  border-radius: 1vh 1vw;
  align-items: center;
  color: white;
  font-size: 400%;
}



.chatInput{
  display: flex;
  width: 80%;
  height: 100%;


}

.inputMessage{
  width: 100%;
  height: 80%;
  margin: auto;
  text-align: left;
  font-size: 150%;
  color: rgba(255, 255, 255, 0.66);
  resize: none;
  padding: 0.25%;
  background-color: rgba(255, 255, 255, 0.19);

  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

}

.inputMessage::placeholder{
  color: rgba(255, 165, 0, 0.72);
}

.inputMessage:focus::placeholder{
  color: rgba(255, 177, 0, 0.3);
}

.inputMessage:hover::placeholder{
  color: #c29948;
}

.inputMessage:focus{
  background-color: rgba(255, 255, 255, 0.27);
  color: rgba(255, 255, 255, 0.75);
}

</style>