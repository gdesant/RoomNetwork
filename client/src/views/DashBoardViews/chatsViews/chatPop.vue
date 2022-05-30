<template>
  <div  class="mainChatPop">
    <div class="fx-cr chatsIconsDiv">
      <div class="table chatAddIco b-clr-1">
        <div class="table-c">
          <fa  size="xl"  icon="plus"/>
        </div>
      </div>
      <div v-for="chat in chats.filter(element => element.isMinus == true)" :key="chat.name" class="table chatAddIco chatSettIco b-clr-1">
        <div class="table-c">
          <img class="chatImg"  height="50" width="50" :src="chat.url">
        </div>
      </div>
      <div class="table chatAddIco chatSettIco b-clr-1">
        <div class="table-c">
          <fa  icon="ellipsis"/>
        </div>
      </div>
    </div>
    <div  class="chatPop"  :class="chat.isMinus == true ? 'downChatPop'  : 'upChatPop' " v-for="chat in chats" :key="chat.name">
      <div class="fx-r wp100 hp10" style="background-color: var(--main-color);text-align: center">
        <div class="wp70 hp100 tal">
          <h3  class="pop00 mop00 mlp25">{{chat.name}}</h3>
        </div>
        <div class="wp30 hp100">
          <div  class="table wp90 hp50 tar pe-n">
            <div class="table-c pe-auto" @click="minusChat(chat)">
              <fa icon="minus"/>
            </div>
            <div class="table-c pe-auto">
              <fa icon="sliders"/>
            </div>
            <div class="table-c pe-auto" @click="closeChat(chat)">
              <fa icon="xmark"/>
            </div>

          </div>
        </div>
      </div>
      <div class="fx-c wp100 hp75" style="background-color: var(--fourth-color)">
        {{chat.data}}
      </div>
      <div class="fx-r wp100 hp15" style="background-color: var(--third-color)">
        <div class="wp90 hp100">
          <input class="wp100 hp100">
        </div>
        <div  class="table wp10 hp100">
          <div  class="table-c">
            <fa icon="message" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import RoomsService from "@/services/RoomsService";
import UsersService from "@/services/UsersService";


export default {
  name: "ChatPop",
  props:{
    userid: Number,
    socket: Object,
  },
  data(){
    return{
      chats: new Array(),
    }
  },
  created(){
    this.emitter.on("openChatWith", this.openChat);
  },
  methods:{
    async openChat(data){
      const Rdata = await RoomsService.getPrivateRoom(this.$props.userid, data.id)
      let Room = {};

      if (Rdata != false)
      {
        Room.name = Rdata.Members.find(element => element.id !== this.$props.userid).username;
        Room.url = Rdata.Members.find(element => element.id !== this.$props.userid).pp_url;
        Room.ptype = 0;
        Room.data = Rdata;
      }
      else
      {
        const User = await  UsersService.getUserById(data.id)
        Room.name = User.username;
        Room.url = User.pp_url;
        Room.ptype = 1;
        Room.data = User;
      }

      if (Room  != {})
      {
        Room.isMinus = false;

        if(this.$data.chats.find(element => element.name == Room.name) === undefined)
        {
          console.log(Room)
          this.$data.chats.push(Room)
        }
        else
          console.log('Chat already open !')
        return
      }
      console.log("Can't  find  chat !")
    },
    minusChat(data){
      let index =  this.$data.chats.indexOf(data)
      this.$data.chats[index].isMinus = !this.$data.chats[index].isMinus;
      console.log('isMinus == ' + this.$data.chats[index].isMinus)
    },
    closeChat(data){
      let index =  this.$data.chats.indexOf(data)
      this.$data.chats.splice(index,1)
    },
  }

}
</script>

<style scoped>
.mainChatPop{
  height: 410px;
  width: auto;
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  bottom: 0px;
  right: 0;
  overflow: hidden;
  pointer-events: none;
}

.chatPop{
  height: 100%;
  width: 275px;
  overflow: hidden;
  pointer-events: auto;
  display: block;
  flex-direction: column;
  margin-right: 15px;
  padding: 0;
  background-color: var(--main-color);
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 3px solid transparent;
  transition: transform 0.5s ease-in-out;
}

.upChatPop{
  transform: translateY(0);
}

.downChatPop{
  transform: translateY(89%);
}

.chatsIconsDiv{
  width: 100px;
  height: 100%;
  transform: translateY(-25px);
  bottom: 15px;
}

.chatAddIco{
  width: 70px;
  height: 70px;
  margin: 15px;
  border-radius: 50%;
  pointer-events: auto;
  transition: all  0.3s ease-in-out;
}

.chatSettIco{
  width: 50px;
  height: 50px;
  margin: 15px 25px ;
  overflow: hidden;
}

.chatAddIco:hover{
  transform:  scale(1.2);
}
</style>