<template>
  <div class="roomCreationDiv">
    <div class="roomCreationItem" >
      <h3>Name :</h3>
      <input class="roomCreationInput" v-model=roomName>
    </div>
    <div class="roomCreationItem">
      <h3>Type :</h3>
      <div class="roomCreationDropdown">
        <button class="roomCreationDropdownButton">{{ roomType == 0 ? "Public" : "Private" }}</button>
        <div class="roomCreationDropdownContentDiv">
          <h3 class="roomCreationDropdownContent" v-if="roomType != 0" @click="roomType = 0">Public</h3>
          <h3 class="roomCreationDropdownContent" v-if="roomType != 1" @click="roomType = 1">Private</h3>
        </div>
      </div>
    </div>
    <div class="roomCreationItem">
      <button class="roomCreationButton" :disabled="roomName == null || roomName.length < 5" @click="sendCreateRoom()">Create Room</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomCreationContainer",
  props:{
  },
  data() {
    return {
      roomType: 0,
      roomName: "",
    }
  },
  methods: {
    validRoomTreatement(data){
      if (data.valid == true)
      {
        this.$data.roomType = 0
        this.$data.roomName = ""
      }
    },
    sendCreateRoom(){
      this.emitter.emit('createRoom', this.$data)
    },
  },
  async created() {
    this.emitter.on("createRoomValid", this.validRoomTreatement);
  },
}
</script>

<style scoped>
.roomCreationDiv{
  display: flex;
  flex-direction: column;
  padding: 10%;
  width: 80%;
  height: 100%;
}

.roomCreationItem{
  align-self: center;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  margin-block: 2%;
}


.roomCreationItem h3{
  width: 100%;
  color: orange;
  padding: 0;
  margin: 0;
  padding-left: 1%;
  margin-bottom: 0.1%;
}

.roomCreationInput{
  width: 93%;
  height: 45%;
  padding: 1%;
  margin: 0;
}



.roomCreationDropdown{
  width: 95%;
  height: 60%;
  padding: 0;
  margin: 0;
}

.roomCreationDropdownButton{
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #242324;
}

.roomCreationDropdown:hover .roomCreationDropdownContentDiv {
  display: flex;
  flex-direction: column;
}

.roomCreationDropdownContentDiv{
  display: none;
  position: relative;
  height: initial;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.roomCreationDropdownContentDiv h3 {
  color: #000000;
  padding: 0;
  padding-block: 1%;
  text-decoration: none;
  text-align: center;
  display: block;
  background-color: #f9f9f9;
}


.roomCreationDropdownContentDiv h3:hover{
  background-color: #5d5858;
}

.roomCreationButton{
  background-color: #242324;
  width: 90%;
  height: 50%;
  margin: 2.5%;
  padding: 0;
  border-radius: calc((1vw + 1vh)/3);
}

.roomCreationButton:hover{
  background-color: #4b4a4b;
}

.roomCreationButton:active{
  background-color: #6b676b;
}

.roomCreationButton:disabled{
  background-color: #282020;
}

</style>