<template>
  <div class="fx-cr chatsIconsDiv">
    <div class="table chatAddIco b-clr-1">
      <div class="table-c">
        <fa  size="xl"  icon="plus"/>
      </div>
    </div>
    <transition-group name="listIco">
      <div v-for="chat in sidedChats" :key="chat.name" class="table chatAddIco chatSideIco b-clr-1">
        <div class="table-c pe-auto " @click="sideChat(chat)">
          <img class="chatImg" height="55" width="55" :src="chat.url">
        </div>
      </div>
    </transition-group>

    <div class="table chatAddIco chatSettIco b-clr-1">
      <div class="table-c">
        <fa  icon="ellipsis"/>
      </div>
    </div>
  </div>
  <div  class="mainChatPop">
    <div class="fx-rr chatPotDiv">
      <transition-group name="list">
        <div  class="chatPop list-item"  :class="[chat.isMinus == true ? 'downChatPop'  : '', chat.isSided == true ? 'sideChat' : '']" v-for="chat in chats" :key="chat.name" v-on:load="updateChatInputRatio(chat.name)" ref="chats">
          <div class="fx-r wp100 hp10" style="background-color: var(--main-color);text-align: center">
            <div class="wp70 hp100 tal">
              <h3  class="pop00 mop00 mlp25">{{chat.name}}</h3>
            </div>
            <div class="wp30 hp100">
              <div  class="table wp90 hp50 pe-n">
                <div class="table-c pe-auto tar transition01 scaleHov12" @click="minusChat(chat)">
                  <fa icon="minus"/>
                </div>
                <div class="table-c pe-auto tar  transition01 scaleHov12">
                  <fa icon="sliders"/>
                </div>
                <div class="table-c pe-auto tar  transition01 scaleHov12" @click="closeChat(chat)">
                  <fa icon="xmark"/>
                </div>

              </div>
              <div  class="table wp90 hp50  pe-n">
                <div class="table-c pe-auto tar  transition01 scaleHov12" @click="sideChat(chat)">
                  <fa icon="arrow-right-to-bracket"/>
                </div>

              </div>
            </div>
          </div>
          <div :ref="'chatPopBot_' + chat.name" class="fx-c wp100 hp90">
            <div :ref="'MessagesContainer_' + chat.name">
              <div class="fx-c messagesContainer" v-if="chat.ptype">
                <div  v-for="message in chat.data.Messages" :key="message.id" class="messageDiv" :class="message.senderId  ? (message.senderId == userid ? 'selfMsg' : 'otherMsg') : 'otherMsg'">
                  <h5 class="wp100">{{message.content}}</h5>
                </div>
              </div>
              <div class="fx-c messagesContainer clr-wht" v-else>
                <h4 style="padding: 10%">Send a message to initiate the conversation !</h4>
              </div>
            </div>
            <div :ref="'MessagesInputContainer_' + chat.name" class="fx-r wp100 b-clr-1" style="border-top: 3px solid var(--main-color); height: initial">
              <div class="wp90 mrp10" style="height: initial;">
                <textarea :ref="'MessagesInput_' + chat.name" class="wp100 clr-wht transition02 taMsg" v-model="chat.textInput" v-on:load="updateChatInputRatio(chat.name)" v-on:keydown.enter.ctrl="sendMessage(chat)" v-on:input="updateChatInputRatio(chat.name)" v-on:focusin="updateChatInputRatio(chat.name)" type="text" maxlength="250"></textarea>
              </div>
              <div  class="table wp10 mlp50 mrp50 hp100">
                <div  class="table-c  pe-auto transition02 sendEffect clr-3" @click="sendMessage(chat)">
                  <fa icon="paper-plane" size="xl"/>
                </div>
              </div>

            </div>
          </div>

        </div>
      </transition-group>
    </div>


  </div>
</template>

<script>
import RoomsService from "@/services/RoomsService";
import UsersService from "@/services/UsersService";
import MessagesService from "@/services/MessagesService";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  name: "ChatPop",
  props:{
    userid: Number,
    socket: Object,
  },
  data(){
    return{
      chats: new Array(),
      sidedChats: new Array(),
    }
  },
  created(){
    let self = this

    this.emitter.on("openChatWith", this.openChat);

    this.$props.socket.on('newMessage', function (data){
      console.log('NewMessage')
      self.addChatMessage(data.messageId)
    })
  },
  methods:{
    async addChatMessage(messagesId){
      const msg = await MessagesService.getMessageById(messagesId)

      let chatss  =  this.$data.chats.findIndex(element => element.data.id == msg.roomId)
      let sschat  =  this.$data.sidedChats.findIndex(element => element.data.id == msg.roomId)

      if(chatss != -1)
        this.$data.chats[chatss].data.Messages.push(msg);
      else if (sschat != -1)
        this.$data.sidedChats[sschat].data.Messages.push(msg);


      console.log("Receiving new Message !")
      console.log(msg)
      return
    },
    initChat(data, type){
      let Room = {};

      if (type != false)
      {
        Room.name = data.Members.find(element => element.id !== this.$props.userid).username;
        Room.url = data.Members.find(element => element.id !== this.$props.userid).pp_url;

      } else {
        Room.name = data.username;
        Room.url = data.pp_url;
      }

      Room.isMinus = false;
      Room.isSided = false;
      Room.textInput = "";
      Room.ptype = type;
      Room.data = data;

      return Room
    },
    async openChat(data){
      const Rdata = await RoomsService.getPrivateRoom(this.$props.userid, data.id)
      let Room = {};

      if (Rdata != false){
        Room = this.initChat(Rdata,true)
        this.$props.socket.emit('join_room', {id: Room.data.id})
      }
      else
      {
        const User = await UsersService.getUserById(data.id)
        Room = this.initChat(User, false)
      }

      if (Room  != {})
      {
        if(this.$data.chats.find(element => element.name == Room.name) === undefined && this.$data.sidedChats.find(element => element.name == Room.name) === undefined)
        {
          console.log(Room)
          this.$data.chats.push(Room)
          await delay(100)
          this.updateChatInputRatio(Room.name)
        }
        else
          console.log('Chat already open !')
        return
      }
      console.log("Can't  find  chat !")
    },
    async sendMessage(data){
      let msg = null;
      let  index = this.$data.chats.indexOf(data);

      if (data.ptype == true){
        await MessagesService.sendRoomMessage(this.$props.userid, data.data.id, data.textInput)
        if(msg != false)
        {
          this.$data.chats[index].textInput = '';
        }

      }
      else
      {
        msg = await MessagesService.sendNewRoomMessage(this.$props.userid, data.data.id, data.textInput)

        if(!msg)
          return

        this.$data.chats[index] = this.initChat(msg,true)

        this.$props.socket.emit('join_room', {id: this.$data.chats[index].data.id})

        if(msg != false)
        {
          this.$data.chats[index].textInput = '';
        }

      }



    },
    async sideChat(data){

      let sendchat = null;
      let receivechat = null;


      if (data.isSided == true) //Unside
      {
        sendchat = this.$data.sidedChats;
        receivechat = this.$data.chats;
      }
      else //Side
      {
        sendchat = this.$data.chats;
        receivechat = this.$data.sidedChats;
      }

      let index = sendchat.indexOf(data)
      sendchat[index].isSided = !sendchat[index].isSided;

      receivechat.splice(receivechat.length, 0, sendchat[index]);
      sendchat.splice(index,1);

      if (data.isSided != true) //Unside
      {
        this.$data.sidedChats = sendchat;
        this.$data.chats = receivechat;
        await delay(100)
        this.updateChatInputRatio(data.name)
      }
      else //Side
      {
        this.$data.sidedChats = receivechat;
        this.$data.chats = sendchat;
      }

    },
    minusChat(data){
      let index =  this.$data.chats.indexOf(data)
      this.$data.chats[index].isMinus = !this.$data.chats[index].isMinus;
      console.log('isMinus == ' + this.$data.chats[index].isMinus)
    },
    closeChat(data){
      if (data.ptype == true)
        this.$props.socket.emit('exit_room', {id: data.data.id})
      let index =  this.$data.chats.indexOf(data)
      this.$data.chats.splice(index,1)
    },
    updateChatInputRatio(name){
      this.$refs['MessagesInput_' + name].style.height = ""; this.$refs['MessagesInput_' + name].style.height = this.$refs['MessagesInput_' + name].scrollHeight + "px";
      this.$refs['MessagesContainer_' + name].style.height = ""; this.$refs['MessagesContainer_' + name].style.height = (this.$refs['chatPopBot_' + name].clientHeight - this.$refs['MessagesInputContainer_' + name].clientHeight) + "px"


    }

  },

}
</script>

<style scoped>

.messagesContainer{
  height: 100%;
  width: 90%;
  padding-left: 2.5%;
  padding-right: 7.5%;
  background-color: var(--fourth-color);
  overflow-x: hidden;
  overflow-y: auto;
}

.messagesContainer::-webkit-scrollbar{
  background-color: var(--third-color);
}

.messagesContainer::-webkit-scrollbar-thumb{
  background-color: var(--main-color);
  border-top: 2px solid var(--fourth-color);
  border-right: 2px solid var(--fourth-color);
  border-bottom: 2px solid var(--fourth-color);
}

.messageDiv{
  width: 210px;
  height: initial;
  padding: 5px 4px;
  margin: 10px 0;
  color: var(--white-color);
  word-wrap: break-word;
  display:flex;
}

.selfMsg{
  background-color: var(--secondary-color);
  padding-right: 25px;
  margin-left: 25px;
}

.otherMsg{
  background-color: var(--third-color);
  padding-left: 25px;
  margin-left: -25px;
}


.mainChatPop{
  height: 406px;
  width: auto;
  display: flex;
  flex-direction: row-reverse;
  overflow-x: visible;
  position: absolute;
  bottom: 0px;
  right: 125px;
  overflow: hidden;
  pointer-events: none;
}

.chatPotDiv{
  width: inherit;
  height: 100%;
  z-index: 0;
}

.chatPop{
  height: 400px;
  width: 275px;
  overflow: hidden;
  pointer-events: auto;
  display: block;
  flex-direction: column;
  margin-right: 15px;
  padding: 0;
  background-color: var(--main-color);
  border: 3px solid transparent;
  transition: all 0.3s ease-in-out;
  transform: translateX(0) translateY(0);
  z-index: 0;
}



.sideChat{
  z-index: 1;
}

.downChatPop{
  transform: translateY(89%);
}

.chatsIconsDiv{
  width: 100px;
  height: 100vh;
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 0;
  background-color: transparent;
}

.chatAddIco{
  width: 70px;
  height: 70px;
  margin: 15px 15px;
  border-radius: 50%;
  overflow: hidden;
  transform: translateX(0) translateY(0);
  opacity: 1;
  pointer-events: auto;
  transition: all  0.3s ease-in-out;
}

.chatSideIco{
  width: 50px;
  height: 50px;
  margin: 15px 25px;
}

.chatSettIco{
  width: 40px;
  height: 40px;
  margin: 15px 30px;
  overflow: hidden;
  transform: translateX(0) translateY(0);
  opacity: 1;
}

.chatAddIco:hover{
  transform:  scale(1.2);
}

.list{
  transition: all 0.4s;
}

.list-enter-from, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100vh);
}

.listIco{
  transition: all 0.1s ease-in-out;
}

.listIco-enter-from, .listIco-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-10vh);
}

.taMsg{

  resize: none;
  outline: none;
  border-radius: 4px;
  background-color: var(--third-color);
  border: 1px solid;
  border-color: transparent;
  font-family: 'Akshar', sans-serif;
  font-size:16px;
  font-weight: 100;
}

.taMsg:focus{
  border-color: var(--secondary-color);
  background-color: var(--fourth-color);
}

.taMsg::-webkit-scrollbar{
  display: none;
}

.transition01{
  transition: all 0.1s ease-in-out;
}

.transition02{
  transition: all 0.2s ease-in-out;
}

.scaleHov12:hover{
  transform: scale(1.2);
}

.sendEffect:hover{
  transform: scale(1.2) rotate(35deg);
}

.sendEffect:active{
  transform: scale(1.1) rotate(50deg) translateY(-50px) translateX(50px);
}
</style>