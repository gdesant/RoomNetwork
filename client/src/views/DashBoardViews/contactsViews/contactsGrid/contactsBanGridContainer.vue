<template>
  <div class="emptyDashPanelMain hp90 mip0a b-clr-3">
    <transition-group name="contactGridTran">
      <div v-for="contact in  contactsB" v-bind:key="contact.id" class="emptyDashPanel contactCard b-clr-4">
        <div class="mainCard">
          <div class="contactCardImg"><img v-bind:src="contact.pp_url" width="100" height="100"></div>
          <div class="contactCardName"><h2>{{contact.username}}</h2></div>
        </div>
        <div class="statusFriendDiv removeFriendDiv table pe-auto" @click="changeStatus({status: 0, contact: contact, modalACK: false})">
          <div class="table-c">
            <fa icon="eject"></fa>
          </div>
        </div>
        <div class="hoverDiv removeHoverDiv"><h5>UNBAN  CONTACT</h5></div>
        <div class="statusFriendDiv addFriendDiv table pe-auto" @click="changeStatus({status: 1, contact: contact, modalACK: false})">
          <div class="table-c">
            <fa icon="check"></fa>
          </div>
        </div>
        <div class="hoverDiv addHoverDiv"><h5>ADD AS FRIEND</h5></div>
      </div>
      <div v-for="contact in  contactsGB" v-bind:key="contact.id" class="emptyDashPanel contactCard b-clr-4">
        <div class="mainCard">
          <div class="contactCardImg"><img v-bind:src="contact.pp_url" width="100" height="100"></div>
          <div class="contactCardName"><h2>{{contact.username}}</h2></div>
        </div>
        <div class="statusFriendDiv removeFriendDiv table pe-auto" @click="changeStatus({status: -1, contact: contact, modalACK: false})">
          <div class="table-c">
            <fa icon="eject"></fa>
          </div>
        </div>
        <div class="hoverDiv removeHoverDiv"><h5>UNGBAN  CONTACT</h5></div>
        <div class="statusFriendDiv addFriendDiv table pe-auto" @click="changeStatus({status: 0, contact: contact, modalACK: false})">
          <div class="table-c">
            <fa icon="check"></fa>
          </div>
        </div>
        <div class="hoverDiv addHoverDiv"><h5>SEND REQUEST</h5></div>
        <div class="table statusFriendDiv ghostBan ">
          <div class="table-c clr-2">
            <fa icon="ghost"></fa>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "ContactsAddGridContainer",
  props: {
    contactsGB: Object,
    contactsB: Object,
    changeStatus: Function,
    searchInput: String,
  },
  created() {
    console.log(this.$props.contactsB)
    console.log(this.$props.contactsGB)
  },
}
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
  color: rgba(var(--mcolor-1), 1);
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
  right: 10px;
  position: absolute;
  max-width: 135px;
  height: 25px;
  top:30px;
  background-color: rgba(var(--bcolor-2), 1);
  border-radius: 2px;
  transition: 0.2s all ease-in-out;
  z-index: 0;
}

/*#region Add*/
.addFriendDiv{
  right: 30px;
  color: rgba(176, 215, 33, 0.7);
}

.addHoverDiv{

  color: #7f9b1a;
}

.addFriendDiv:hover + .hoverDiv{
  opacity: 0.85;
  z-index: 2;
}

.addFriendDiv:hover{
  color: #b8e515;
  transform: scale(1.3);
}

/*#endregion*/


/*#region Remove*/
.removeFriendDiv{
  color: rgba(215, 76, 33, 0.7);
  right: 0;
}

.removeHoverDiv{
  color: rgba(215, 76, 33, 1);
  right: 0px;
}

.removeFriendDiv:hover + .hoverDiv{
  opacity: 0.85;
}

.removeFriendDiv:hover{
  color: #d74c21;
  transform: scale(1.3);
}

/*#endregion*/

/*#region Ban*/
.ghostBan{
  top: 0px;
  left: 0px;
}


/*#endregion*/


/*#endregion*/
</style>