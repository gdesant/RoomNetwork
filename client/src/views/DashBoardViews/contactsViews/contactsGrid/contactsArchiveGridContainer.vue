<template>
  <div class="emptyDashPanelMain hp90 mip0a b-clr-3">
    <div v-for="contact in  contacts" v-bind:key="contact.id" class="emptyDashPanel contactCard b-clr-4">
      <div class="topCard">
        <div class="contactCardImg"><img v-bind:src="contact.pp_url" width="100" height="100"></div>
        <div class="contactCardName"><h2>{{contact.username}}</h2></div>
      </div>
      <div class="botCard">
        <button class="declineButton"><h3 class="mop00">DECLINE</h3></button>
        <button class="validateButton"><h3 class="mop00">ACCEPT</h3></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsArchivedGridContainer",
  props: {
    contacts: Object,
    changeStatus: Function,
  },
  created() {
    console.log(this.$props.contacts)
  }
}
</script>

<style scoped>
.contactCard{
  width: 250px;
  height: 160px;
  overflow: hidden;
}

.topCard{
  margin: 10px  15px 10px 15px;
  width: 220px;
  height: 100px;
  display: flex;
  flex-direction: row;
}

.botCard{
  margin: 0px  0px 0px 0px;
  width: 250px;
  height: 40px;
}

.botCard>button{
  width: 125px;
  height: 40px;
  border-radius: 0;
}

.validateButton{
  background-color: rgba(167, 229, 9, 1);
}

.validateButton:hover{
  background-color: rgba(167, 229, 9, 0.72);
}

.declineButton{
  background-color: rgba(229, 60, 9, 1);
}

.declineButton:hover{
  background-color: rgba(229, 60, 9, 0.72);
}

.contactCardImg{
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
}

.contactCardName{
  width: 110px;
  height: 100px;
  margin-inline: auto;
  padding-left: 10px;
  color: var(--main-color);
}


</style>