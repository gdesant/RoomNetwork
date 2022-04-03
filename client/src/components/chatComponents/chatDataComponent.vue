<template>
  <div class="chatMainDiv">
    <div class="chatContent">
      <div id="messageContainer" class="messageContainer" v-for="msg in room.Messages" v-bind:key="msg.id">
        <div class="messageTop">
          <label class="messageLabel-orange">{{ msg.senderUsername }}</label>
          <label class="messageLabel-white"> - </label>
          <label class="messageLabel-white">{{ formatDate(String(msg.createdAt)) }}</label>
        </div>
        <a class="messageContent">{{msg.content}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

moment.locale('fr');

export default {
  name: "ChatComponent",
  props:{
    room: Object,
  },
  methods: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
      return value
    },
    formatHour: function(value) {
      if (value) {
        return moment(String(value)).format('LT')
      }
      return value
    },
    formatDateHour: function(value) {
      if (value) {
        return moment(String(value)).format('LLL')
      }
      return value
    },
  },
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
  flex-direction: column-reverse;
  margin: 0.5% auto 0.25% auto;
  width: 90%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: 1%;
}

.chatContent::-webkit-scrollbar{
  width: 1vw;
  height: 10%;
  background-color: rgba(255, 255, 255, 0.18);
  border-radius: 1vh;
}

.chatContent::-webkit-scrollbar-thumb{
  background-color: orange;
  border-radius: 1vh;
}

.chatContent::-webkit-scrollbar-thumb:hover{
  background-color: #c29948;
  border-radius: 1vh;
}

.chatContent::-webkit-scrollbar-thumb:active{
  background-color: #ffd168;
  border-radius: 1vh;
}

.messageContainer{
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #2a2a2c;
  margin: 0.25% 2% 0.25% 2%;
  padding: 0.5% 1.5% 1.5% 1.5%;
  border-radius: 1vh 1vh 1vw 1vw;
}

.messageLabel-white{
  font-family: 'Titillium Web', sans-serif;
  margin: 0.2% 0%;
  color: white;
}

.messageLabel-orange{
  font-family: 'Titillium Web', sans-serif;
  margin: 0.2% 0%;
  color: orange;
}

.messageLabel-orange:hover{
  color: #c29948;
}

.messageLabel-orange:active{
  color: #ffd168;
}

.messageContent{
  font-family: 'Titillium Web', sans-serif;
  font-size: 100%;
}

</style>