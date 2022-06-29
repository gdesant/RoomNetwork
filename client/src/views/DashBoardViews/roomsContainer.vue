<template>
  <div>
    <div class="wp100 hp100 b-clr-3">
      <div class="headerRoomContainer ">
        <h1>Rooms</h1>
      </div>
      <div class="dataRoomContainer ">
        <div class="categoryRoomContainer ">
          <div class="categoryRoomHeader fx-r  b-clr-1">
            <h3 class="mop10  mip30">Created Rooms</h3>
            <div  class="categoryCollapser table pe-auto">
              <div class="table-c">
                <fa icon="angle-left"></fa>
              </div>
            </div>

          </div>
          <div class="categoryRoomDisplay">
            <div class="categoryRoomElementContainer">
              <h4 class="mop05">Room 1</h4>
            </div>
          </div>
        </div>
        <div class="categoryRoomContainer b-clr-2">
          <h3>Joined Rooms</h3>
        </div>
        <div class="categoryRoomContainer b-clr-1">
          <h3>Private Chats</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "roomsContainer",
  props:{
    rooms: Object,
  }
}
</script>

<style scoped>
.headerRoomContainer{
  height: 10%;
  width: 100%;
  color: rgba(var(--mcolor-1),   1);
}

.dataRoomContainer{
  height: 90%;
  width: 90%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
}

.categoryRoomContainer{
  width: 100%;
  height: 100%;
}

.categoryRoomHeader{
  position: relative;
  width: inherit;
  margin-inline: auto;
}

.categoryCollapser{
  width: 30px;
  height: initial;
  background-color: rgba(var(--mcolor-1), 1);
  transition: 0.2s all  ease-in-out;
  z-index: 1;
}

.categoryRoomDisplay{

}

.categoryRoomElementContainer{
  color: rgba(var(--mcolor-1), 1);
  min-height: 50px;
}

</style>