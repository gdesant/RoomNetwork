<template>
    <div class="membersSelectorDiv">
      <button class="membersSelectorItem" @click="membertype = 1"><h3>Approved</h3></button>
      <div class="membersSelectorSeparator"></div>
      <button class="membersSelectorItem" @click="membertype = 0"><h3>Asks</h3></button>
      <div class="membersSelectorSeparator"></div>
      <button class="membersSelectorItem" @click="membertype = -1"><h3>Banned</h3></button>
    </div>
    <ul class="membersItemContainer">
      <li class="membersItem" v-for="mm in dataRoom.Members.filter(mm => mm.roomrequests.status == membertype)" v-bind:key="mm.id">
        <memberCard :member="mm"></memberCard>
      </li>
    </ul>
    <div class="membersResearchDiv">

    </div>
</template>

<script>
import memberCard from "@/views/components/dashboardContainers/roomContainers/components/memberCard";

export default {
  name: "memberList",
  components: {memberCard},
  props: {
    room: Object,
    user: Object,
  },
  data(){
    return{
      dataRoom: null,
      membertype: 1,
    }
  },
  created() {
    this.$data.dataRoom = this.$props.room
  },
}
</script>

<style scoped>
/*#region MembersSelector Part*/
.membersSelectorDiv{
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.membersResearchDiv{
  height: 10%;
  width: 100%;
  background-color: #7c7c7c;
  display: flex;
  flex-direction: row;
}

.membersSelectorItem{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: initial;

}

.membersSelectorSeparator{
  height: 100%;
  width: 0.5%;
  background-color: white;
}

/*#endregion*/

/*#region MembersItemsContainer*/

.membersItemContainer{
  height: 80%;
  background-color: red;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
}

.membersItem{
  height: 96%;
  margin: auto;
  margin-right: 0;
  margin-left: 0.5%;
  width: 15%;
  border-radius: calc((1vh + 1vw)/4);
  overflow: hidden;
}
/*#endregion */
</style>