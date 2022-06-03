<template>
  <div class="emptyDashPanelMain hp90 mip0a b-clr-3">
    <div v-for="contact in  contacts" v-bind:key="contact.id" class="emptyDashPanel contactCard b-clr-4">
      <div class="mainCard">
        <div class="contactCardImg"><img v-bind:src="contact.pp_url" width="100" height="100"></div>
        <div class="contactCardName"><h2>{{contact.username}}</h2></div>
      </div>
      <div  class="statusFriendDiv removeFriendDiv table pe-auto" @click="changeStatus({status: 0, contact: contact, modalACK: true})">
        <div class="table-c">
          <fa icon="eject"></fa>
        </div>
      </div>
      <div  class="hoverDiv removeHoverDiv"><h5>REMOVE FRIEND</h5></div>
      <div  class="statusFriendDiv banFriendDiv table pe-auto" @click="changeStatus({status: 3, contact: contact, modalACK: true})">
        <div class="table-c">
          <fa icon="ban"></fa>
        </div>
      </div>
      <div  class="hoverDiv banHoverDiv"><h5>BAN FRIEND</h5></div>
      <div  class="statusFriendDiv addFriendDiv table pe-auto" @click="openChatWith(contact.id)">
        <div class="table-c">
          <fa icon="comments"></fa>
        </div>
      </div>
      <div  class="hoverDiv addHoverDiv"><h5>CHAT WITH FRIEND</h5></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsGridContainer",
  props: {
    contacts: Object,
    changeStatus: {type:Function},
  },
  created() {
    console.log(this.$props.contacts)
  },
  methods:{
    openChatWith(id) {
      this.emitter.emit('openChatWith', {id: id})
    },
  },
};
</script>

<style scoped>
  .contactCard{
  width: 250px;
  height: 160px;
  overflow: hidden;
  position: relative;
}

  .mainCard{
  margin: 30px 25px 30px 15px;
  width: 210px;
  height: 100px;
  display: flex;
  flex-direction: row;
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

  /*#region statusFriendsDiv*/

  .statusFriendDiv{
  position: absolute;
  top:0;
  width: 30px;
  height: 30px;
  transition: 0.2s all  ease-in-out;
  z-index: 1;
}


  .hoverDiv{
  opacity: 0;
  right: 5px;
  position: absolute;
  max-width: 135px;
  height: 25px;
  top:30px;
  background-color: var(--third-color);
  border-radius: 2px;
  transition: 0.2s all ease-in-out;
  z-index: 0;
}

  /*#region Add*/
  .addFriendDiv{
  right: 60px;
  color: rgba(219, 222, 210, 0.7);
}

  .addHoverDiv{
    color: rgba(219, 222, 210, 1);
}

  .addFriendDiv:hover + .hoverDiv{
  opacity: 0.85;
  z-index: 2;
}

  .addFriendDiv:hover{
    color: rgba(219, 222, 210, 1);
  transform: scale(1.3);
}

  /*#endregion Remove*/


  /*#region Remove*/
  .removeFriendDiv{
  color: rgba(215, 76, 33, 0.7);
  right: 30px;
}

  .removeHoverDiv{
  color: rgba(215, 76, 33, 1);
}

  .removeFriendDiv:hover + .hoverDiv{
  opacity: 0.85;
}

  .removeFriendDiv:hover{
  color: #d74c21;
  transform: scale(1.3);
}

  /*#endregion Remove*/

  /*#region Ban*/
  .banFriendDiv{
  color: rgba(215, 48, 33, 0.7);
  right: 0px;
}

  .banHoverDiv{
  color: rgba(215, 48, 33, 1);
}

  .banFriendDiv:hover + .hoverDiv{
  opacity: 0.85;
}

  .banFriendDiv:hover{
  color: rgba(215, 48, 33, 1);
  transform: scale(1.3);
}

  /*#endregion Remove*/


  /*#endregion*/
</style>