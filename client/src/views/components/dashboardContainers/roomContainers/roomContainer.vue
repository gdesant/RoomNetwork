<template>
  <div class="roomContainerMainDiv">
    <div class="roomTop">
      <div class="roomLabelDiv" >
        <button class="roomLabel" @click="roomView = 'creation'">Room Creation</button>
      </div>
      <div class="roomLabelDiv">
        <button class="roomLabel" v-bind:disabled="eRoom == null" @click="roomView = 'settings'">Room Settings</button>
      </div>
      <div class="roomLabelDiv">
        <button class="roomLabel" v-bind:disabled="room == null" @click="roomView = 'content'">Room Content</button>
      </div>
    </div>

    <div class="roomMid" >
      <RoomSettingsContainer v-if="eRoom != null && roomView == 'settings'" :user="user" :socket="socket" :room="eRoom"></RoomSettingsContainer>
      <RoomContentContainer v-else-if="room != null && roomView == 'content'" :user="user" :socket="socket" :room="room"></RoomContentContainer>
      <RoomLoadingContainer v-else-if="roomcreation == true"></RoomLoadingContainer>
      <RoomCreationContainer v-else ></RoomCreationContainer>
    </div>
    <div class="roomBot">
    </div>
  </div>
</template>

<script>
import RoomsService from "@/services/RoomsService";
import RoomSettingsContainer from "./containers/roomSettingsContainer";
import RoomLoadingContainer from "./containers/roomLoadingContainer";
import RoomCreationContainer from "./containers/roomCreationContainer";
import RoomContentContainer from "@/views/components/dashboardContainers/roomContainers/containers/roomContentContainer";
import RoomsEditingService from "@/services/RoomsEditingService";

export default {
  name: "RoomContainer",
  components: {RoomCreationContainer, RoomLoadingContainer, RoomSettingsContainer, RoomContentContainer},
  props:{
    user: Object,
    socket: Object,
  },
  data() {
    return {
      roomType: 0,
      roomName: "",
      room: null,
      eRoom: null,
      roomcreation: false,
      roomView: 'creation',
    }
  },
  methods: {
    async createRoom(data){
      this.$data.roomcreation = true;
      const room = await RoomsService.createNewRoom(this.$props.user.id, data.roomName, data.roomType)
      if (room != null && typeof room != 'number')
      {
        this.$data.room = room;
        this.emitter.emit('createRoomValid', {valid: true})
        this.$data.roomcreation = false;
        this.$data.roomView = 'content'
        return
      }
      console.log(room)
      this.emitter.emit('createRoomValid', {valid: false})
      this.$data.roomcreation = false;

    },
    async changeRoom(roomId){
      const room = await RoomsService.getStudyRoom(roomId, true, true, true, this.$props.user.id)
      if (room != null && typeof room != 'number')
      {
        this.$data.room = room
        this.$data.roomView = 'content'
      }
      else
        console.log(room)

      console.log('Change to Room')
      console.log(room)
    },
    async editRoom(roomId){
      const room = await RoomsService.getStudyRoom(roomId, true, true, true, this.$props.user.id)
      if (room != null && typeof room != 'number')
      {
        this.$data.eRoom = room
        this.$data.roomView = 'settings'
      }
      else
        console.log(room)

      console.log('Edit Room')
      console.log(room)
    },
    async changeMemberValue(body) {
      const resp = await RoomsEditingService.changeMemberStatus(this.$props.user.id, this.$data.eRoom.id, body.pid, body.stat)

      if (typeof resp != 'number')
      {
        this.$data.eRoom.Members.map((member) => {
          if (member.id == body.pid)
          {
            member.roomrequests.status = body.stat;
            return member
          }
          else
            return member
        })
      }
      else
        console.log(resp)

      return

    }
},
  async created() {
    this.emitter.on("createRoom", this.createRoom)
    this.emitter.on("editRoom", this.editRoom)
    this.emitter.on("selectRoom", this.changeRoom)
    this.emitter.on("changeMemberStatus", this.changeMemberValue)
  },
}
</script>

<style scoped>
.roomContainerMainDiv{
  width: 100%;
  height: 100%;
}

.roomTop{
  height: 5%;
  border-radius: 1vh 1vh 0vh 0vh;
  background-color: #2a2a2c;
  display: flex;
  flex-direction: row;
}

.roomLabelDiv{
  width: 50%;
  height: 100%;
}

.roomLabel{
  color: white;
  background-color: transparent;
  width: 100%;
  height: 100%;
  font-size: x-large;
  text-align: center;
  margin: auto;
}

.roomLabel:disabled{
  color: #3b3b3d;
}

.roomLabel:enabled:hover{
  color: orange;
}

.roomLabel:enabled:active{
  color: #916000;
}


.roomMid{
  background-color: #39393b;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
}

.roomBot{
  background-color: #2a2a2c;
  display: flex;
  flex-direction: row;
  border-radius: 0vh 0vh 1vh 1vh;
  width: 100%;
  height: 5%;
  display: flex;
}


.emptyChatText{
  align-self: center;
  text-align: center;
  color: #a6a2a2;
}

</style>