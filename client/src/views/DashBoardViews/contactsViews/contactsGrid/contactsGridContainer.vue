<template>
  <div class="emptyDashPanelMain hp90 mip0a b-clr-3">
    <div v-for="contact in  contacts" v-bind:key="contact.id" class="emptyDashPanel contactCard b-clr-4">
      <div class="topCard">
        <div class="contactCardImg"><img v-bind:src="contact.pp_url" width="100" height="100"></div>
        <div class="contactCardName"><h3 style="vertical-align: middle;">{{contact.username}}</h3></div>
      </div>
      <div class="botCard tac">
        <button class="chatButton" @click="openChatWith(contact.id)"><a class="mop00 mip0a wp100"> CHAT </a></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsGridContainer",
  props: {
    contacts: Object,
  },
  created() {
    console.log(this.$props.contacts)
  },
  methods:{
    openChatWith(id) {
      this.emitter.emit('openChatWith', {id: id})
    },
  },
}
</script>

<style scoped>
.chatButton{
  width: 100%;
  display: flex;
  flex-direction: row;
}

</style>