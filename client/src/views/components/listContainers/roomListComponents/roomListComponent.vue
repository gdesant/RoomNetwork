<template >
  <div class="roomListDiv">
    <h3 class="listLabel">Created</h3>
    <ul class="roomListContainer">
      <li v-for="rs in $data.ownedRooms" v-bind:key="rs.id"  class="roomList">
        <div class="roomSwitchContainer"><fa icon="arrow-left" class="roomSwitch" @click="openRoom(rs.id)"/><fa icon="pencil" class="roomSwitch" style="color: lawngreen" @click="editRoom(rs.id)"/></div>
        <div class="roomName" >{{rs.name}}</div>
      </li>
    </ul>
    <h3 class="listLabel">Joined</h3>
    <ul class="roomListContainer">
      <li v-for="rs in $data.joinedRoom" v-bind:key="rs.id"  class="roomList">
        <div class="roomSwitchContainer"><fa icon="arrow-left" class="roomSwitch" @click="openRoom(rs.id)"/></div>
        <div class="roomName" >{{rs.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script type="javascript">
export default {
  name: "RoomListComponent",
  props: {
    user: Object,
  },
  data() {
    return {
        ownedRooms: null,
        joinedRooms: null,
    }
  },
  async created () {
    this.emitter.on("roomListRefresh", this.refreshFriends);
    this.$data.joinedRooms = this.$props.user.JoinedRooms
    this.$data.ownedRooms = this.$props.user.CreatedRooms
  },
  methods: {
    openRoom: function(id){
      this.emitter.emit("selectRoom", id)
    },
    editRoom: function(id){
      this.emitter.emit("editRoom", id)
    },
  }
}
</script>

<style scoped>
.roomListDiv{
  text-align: center;
}

.listLabel{
  background-color: #39393b;
}

.roomListContainer{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 0;
  margin: 0;
}

.roomListContainer::-webkit-scrollbar{
  display: none;
}

.roomList{
  width: 100%;
  height: 5vh;
  display: flex;
  flex-direction: row;
  background-color: rgba(178, 177, 185, 0.07);
  margin: 2% 0%;
}

.roomName{
  width: 65%;
  vertical-align: center;
  text-align: right;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 600;
  font-size: calc(1.3vh + 1.3vw);
  color: #B2B1B9;
  margin: auto;
  margin-right: 10%;
}

.roomSwitchContainer{
  width: 35%;
  height: 100%;
  display: flex;
  align-content: baseline;
}

.roomSwitch{
  width: 50%;
  color: white;
  height: 50%;
  margin: auto;
}
</style>