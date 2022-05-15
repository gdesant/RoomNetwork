<template>
  <div class="memberCardMain">
    <fa icon="repeat" class="memberCardEdit" @click="infoview = !infoview"></fa>
    <div class="memberCard" v-if="infoview == true">
      <div class="memberCardPhoto"></div>
      <div class="memberCardInfo">
        <h3>{{member.username}}</h3>
      </div>
      <div class="memberCardSave"></div>
    </div>
    <div class="memberCard" v-if="infoview == false">
      <div class="memberCardButtons">
        <button v-if="member.roomrequests.status != 1" @click="changeStatus(1)" class="buttonMember accColor">Accept</button>
        <button v-if="member.roomrequests.status != 0" @click="changeStatus(0)"  class="buttonMember kickColor">Kick</button>
        <button v-if="member.roomrequests.status != -1" @click="changeStatus(-1)"  class="buttonMember banColor">Ban</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "memberCard",
  props:{
    member: Object,
  },
  data() {
    return {
      infoview: true,
    }
  },
  methods: {
    changeStatus(newStatus){
      this.emitter.emit('changeMemberStatus', {pid: this.$props.member.id, stat: newStatus})
    }
  }
}
</script>

<style scoped>
.memberCardMain{
  height: 100%;
  width: 100%;
  position: relative;
}

.memberCardEdit{
  background-color: transparent;
  color: white;
  position: absolute;
  right: 2.5%;
  top: 1.5%;
  width: 10%;
  height: 10%;
}

.memberCard{
  background-color: #97a843;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/*#region SwitchStatusButtons*/

.memberCardButtons{
  width: 100%;
  height: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.buttonMember{
  width: 100%;
  height: 94%;
  margin: 1.5% 0%;
  padding: 0% 0%;
  background-color: #39393b;
}

.banColor{
  color: red;
}

.accColor{
  color: green;
}
.kickColor{
  color: orange;
}

/*#endregion*/


/*#region MembersInfoCard*/
.memberCardPhoto{
  background-color: rebeccapurple;
  height: 35%;
  width: 100%;
}

.memberCardInfo{
  background-color: blue;
  height: 55%;
  width: 100%;
  text-align: center;
}

.memberCardSave{
  background-color: pink;
  height: 10%;
  width: 100%;
}

/*#endregion*/

</style>