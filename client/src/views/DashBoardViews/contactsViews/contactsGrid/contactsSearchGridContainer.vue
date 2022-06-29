<template>
  <div v-if="toggleSearch == true && contacts.length <= 0" class="emptyDashPanelSec hp90 mip0a b-clr-3 table">
    <div class="table-c">
      <fa icon="circle-notch" size="3x" class="clr-1" spin />
    </div>
  </div>
  <div v-else-if="searchInput.length > 0 && contacts.length <= 0" class="emptyDashPanelSec hp90 mip0a b-clr-3 table">
    <div class="table-c">
      <h2 class="clr-wht">Can't find no user with the username <span class="clr-1">{{searchInput}}</span> !</h2>
    </div>
  </div>
  <div v-else-if="searchInput.length > 0  && contacts.length > 0" class="emptyDashPanelMain hp90 mip0a b-clr-3">
    <transition-group name="contactGridTran">
      <div v-for="contact in  contacts" v-bind:key="contact.id" class="emptyDashPanel contactCard b-clr-4">
        <div class="mainCard">
          <div class="contactCardImg"><img v-bind:src="contact.pp_url" width="100" height="100"></div>
          <div class="contactCardName"><h2>{{contact.username}}</h2></div>
        </div>
        <div  class="statusFriendDiv addFriendDiv table pe-auto" @click="createRequest(contact, false)">
          <div class="table-c">
            <fa icon="plus"></fa>
          </div>
        </div>
        <div  class="hoverDiv addHoverDiv"><h5>ADD CONTACT</h5></div>
        <div  class="statusFriendDiv banFriendDiv table pe-auto" @click="createRequest(contact, true)">
          <div class="table-c">
            <fa icon="ban"></fa>
          </div>
        </div>
        <div  class="hoverDiv banHoverDiv"><h5>GHOST-BAN CONTACT</h5></div>
      </div>
    </transition-group>
  </div>
  <div v-else class="emptyDashPanelSec hp90 mip0a b-clr-3 table">
    <div class="table-c ">
      <h2 class="clr-wht">Type your friend <span class="clr-1">username</span> to find him !</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsSearchGridContainer",
  props: {
    contacts: Object,
    changeStatus: Function,
    searchInput: String,
    toggleSearch: Boolean,
  },
  methods:{
    createRequest(receiver, gban){
      this.emitter.emit('createFRequest', {receiver:  receiver, gban: gban})
    }
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

/*#endregion*/

/*#endregion*/
</style>