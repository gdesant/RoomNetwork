<template>
  <div class="roomsModal">
    <div class="categoryDiv">
      <div class="titleDiv" v-on:click="roomsExpander($refs.collAdd)">
        <h3>Rooms Add</h3>
      </div>
      <div ref="collAdd" class="collapsable collapsed"></div>
    </div>
    <div class="categoryDiv">
      <div class="titleDiv" v-on:click="roomsExpander($refs.collAsks)">
        <h3>Rooms Asks</h3>
      </div>
        <div ref="collAsks" class="collapsable collapsed">

        </div>
    </div>
    <div class="categoryDiv">
      <div class="titleDiv" v-on:click="roomsExpander($refs.collList)">
        <h3>Rooms List</h3>
      </div>
      <div ref="collList" class="collapsable">
        <ul class="roomList onlineRooms">

        </ul>
        <ul class="roomList offlineRooms">
          <li></li>
        </ul>
        <ul class="roomList deletedRooms">
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomsList",
  methods: {
    roomsExpander (div) {
        if (!div.classList.contains('collapsed'))
          return
        var divs = [this.$refs.collList, this.$refs.collAdd, this.$refs.collAsks]

        divs.forEach(ref => {
          if (ref !== div){
            if (!ref.classList.contains('collapsed')){
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
.roomsModal{
  margin-top: 4%;
  margin-bottom: 3%;
  height: 94%;
}

.categoryDiv{
  min-height: 5%;
}

.titleDiv{
  width: 100%;
  max-height: 100%;
  background-color: rgba(178, 177, 185, 0.47);
  text-align: center;

}

.titleDiv h3{
  margin: 0.4% 0;
}

.collapsable {
  overflow:hidden;
  transition:max-height 0.3s ease-out, min-height 0.3s ease-out;
  min-height:78vh;
  max-height: 80vh;
  width: 100%;
}
.collapsable.collapsed {
  min-height: 0;
  max-height: 0;
}


</style>