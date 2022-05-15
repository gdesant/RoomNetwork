<template>
  <div class="roomSettings">
    <div class="roomSettingsSplit">
      <div class="roomNameType">
        <input class="roomNameInput roomSettingsInput" v-model=roomData.name>
        <div class="roomSettingsDropdown">
          <button class="roomSettingsDropdownButton">{{ roomData.type == 0 ? "Public" : "Private" }}</button>
          <div class="roomSettingsDropdownContentDiv">
            <h3 class="roomSettingsDropdownContent" v-if="roomData.type != 0" @click="roomData.type = 0">Public</h3>
            <h3 class="roomSettingsDropdownContent" v-if="roomData.type != 1" @click="roomData.type = 1">Private</h3>
          </div>
        </div>
      </div>
      <div class="roomSettingsMembers">
        <memberList :room="room" :user="user"></memberList>
      </div>
      <div class="roomSettingsAddons">
Addons
      </div>
    </div>
  </div>
</template>

<script>
import memberList from "@/views/components/dashboardContainers/roomContainers/components/memberList";

export default {
  name: "RoomSettingsContainer",
  components: {memberList},
  props:{
    user: Object,
    socket: Object,
    room: Object,
  },
  data() {
    return {
      roomData: null,
    }
  },
  created() {
    this.$data.roomData = this.$props.room;
  },
}
</script>

<style scoped>
.roomSettings{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.roomSettingsSplit{
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
}



.roomSettingsAddons{
  height: 44%;
  margin-top: 2.5%;
}

/*#region Name/Type Part */

.roomNameType{
  display: flex;
  flex-direction: row;
  margin: 1.5% 2.5%;
  min-height: 7%;
  max-height: 7%;
  width: 95%;
}

.roomNameInput{
  width: 46%;
  height: 100%;
  padding: 0% 1%;
  margin:  0% 1%;
  border: 0;
}

.roomSettingsInput{
  font-size: inherit;
}



.collapsableContainer button{
  height: 100%;
  width: 50%;
  font-size: 100%;
  color: white;
  margin: 0 2%;
  padding: 0;
  background-color: transparent;
}


.roomSettingsDropdown{
  width: 48%;
  height: 100%;
  padding: 0;
  margin:  0% 1%;
}

.roomSettingsDropdownButton{
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #242324;
}

.roomSettingsDropdown:hover .roomSettingsDropdownContentDiv {
  display: flex;
  flex-direction: column;
}

.roomSettingsDropdownContentDiv{
  display: none;
  position: relative;
  height: initial;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.roomSettingsDropdownContentDiv h3 {
  color: #000000;
  padding: 0;
  padding-block: 1%;
  text-decoration: none;
  text-align: center;
  display: block;
  background-color: #f9f9f9;
}


.roomSettingsDropdownContentDiv h3:hover{
  background-color: #5d5858;
}
/*#endregion */

/*#region Members Part*/

.roomSettingsMembers{
  height: 44%;
  width: 98%;
  margin: 0% 1%;
  background-color: #0000ff;
}
/*#region Addons Part*/

/*#endregion */

</style>