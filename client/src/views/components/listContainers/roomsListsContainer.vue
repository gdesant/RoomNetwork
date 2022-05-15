<template >
  <div className="friendsModal">
    <div className="categoryDiv">
      <div className="titleDiv" v-on:mousedown="roomsExpander($refs.collRoomsAdd)">
        <h3>Rooms Add</h3>
      </div>
      <div ref="collRoomsAdd" className="collapsable collapsed">
        <RoomAddComponent v-if="user != null" :user="user"></RoomAddComponent>
      </div>
    </div>
    <div className="categoryDiv">
      <div className="titleDiv" v-on:mousedown="roomsExpander($refs.collRoomsList)">
        <h3>Rooms List</h3>
      </div>
      <div ref="collRoomsList" className="collapsable">
        <RoomListComponent v-if="user != null" :user="user"></RoomListComponent>
      </div>
    </div>
  </div>
</template>


<script type="javascript">
import UsersService from "@/services/UsersService";
import RoomAddComponent from "@/views/components/listContainers/roomListComponents/roomAddComponent";
import RoomListComponent from "@/views/components/listContainers/roomListComponents/roomListComponent";


export default {
  name: "RoomsListsContainer",
  components: {RoomAddComponent, RoomListComponent},
  props: {
    user: Object,
  },
  data() {
    return {
      rooms: null,
    }
  },
  async created() {
    const resp = await UsersService.getDashUserById(this.user.id)
    this.rooms = resp.user
    return
  },
  methods: {
    roomsExpander(div) {
      if (!div.classList.contains('collapsed'))
        return
      const divs = [this.$refs.collRoomsList, this.$refs.collRoomsAdd]

      divs.forEach(ref => {
        if (ref !== div) {
          if (!ref.classList.contains('collapsed')) {
            ref.classList.toggle('collapsed')
          }
        }
      })
      div.classList.toggle('collapsed')
      return
    },
  }
}
</script>

<style scoped>
.friendsModal {
  margin: 0;
  height: 100%;
  width: 100%;
  align-self: center;
  overflow: hidden;
}

.categoryDiv {
  min-height: 1%;
}

.titleDiv {
  width: 100%;
  max-height: 100%;
  background-color: rgba(178, 177, 185, 0.47);
  text-align: center;
}

.titleContainerDiv{
  width: min-content;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: auto;
}

.titleIcon{
  color: white;
  margin: auto 5%;
}

.titleContainerDiv h3 {

}

.collapsable {
  overflow: hidden;
  transition: max-height 0.3s ease-out, min-height 0.3s ease-out;
  min-height: 78vh;
  max-height: 81vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.collapsable.collapsed {
  min-height: 0;
  max-height: 0;
}

.listContainer{
  background-color: transparent;
  border-top: solid 0.3vh white;
  height: 73vh;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
}

</style>