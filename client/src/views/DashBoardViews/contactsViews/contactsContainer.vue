<template>
  <div class="hp90 mop0a wp100 b-clr-4">
    <div class="hp10 wp100 tac clr-1">
      <h1>Contacts</h1>
    </div>
    <div class=" hp10 wp100 tac clr-wht">
      <h3 class="mop0a">Here you can add, remove and manage your contacts !</h3>
    </div>
    <div style="width: 1088px; height: 60%" class="mip0a">
      <div class="hp10 wp100 b-clr-1">
        <div class="hp100 wp100">
          <div class="hp100 mip0a fx-r" style="width: calc(100% - 6px); height: calc(100% - 3px); border: 3px solid var(--main-color); flex-grow: 0; flex-shrink: 0">
            <div class="hp100 b-clr-1" style="width: calc(1088px*0.7)">
              <input class="hp100 pop00 pip20 mip0a stand" style="width: 96%; border: none" placeholder="Username / Email ...">
            </div>
            <div class="hp100 b-clr-1" style="width: 2px">

            </div>
            <div class="hp100 b-clr-3 fx-r" style="width: calc(calc(1088px*0.3) - 2px)">
              <div class="wp90 hp90 mip05 mop15 b-clr-1 clr-4 table gridIcon" @click="selected = 'contacts'">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="user-group"></fa>
                </div>
              </div>
              <div class="wp90 hp90 mip05 mop15 b-clr-1 clr-4 table gridIcon" @click="selected = 'contactsAdd'">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="user-plus"></fa>
                </div>
              </div>
              <div class="wp90 hp90 mip05 mop15 b-clr-1 clr-4 table gridIcon" @click="selected = 'contactsBan'">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="user-xmark"></fa>
                </div>
              </div>
              <div class="wp90 hp90 mip05 mop15 b-clr-1 clr-4 table gridIcon" @click="selected = 'contactsArchived'">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="user-clock"></fa>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <ContactsGridContainer :contacts="contacts" v-if="selected == 'contacts'"/>
      <ContactsAddGridContainer :contacts="contactReceive.filter(x => x.friendsrequests.status == 0)" v-if="selected == 'contactsAdd'"/>
      <ContactsBanGridContainer :contacts="contactReceive.filter(x => x.friendsrequests.status == 2)" v-if="selected == 'contactsBan'"/>
      <ContactsArchivedGridContainer :contacts="contactSend.filter(x => x.friendsrequests.status == 0)" v-if="selected == 'contactsArchived'"/>

    </div>


  </div>

</template>

<script>
import ContactsBanGridContainer from "@/views/DashBoardViews/contactsViews/contactsGrid/contactsBanGridContainer";
import ContactsAddGridContainer from "@/views/DashBoardViews/contactsViews/contactsGrid/contactsAddGridContainer";
import ContactsArchivedGridContainer from "@/views/DashBoardViews/contactsViews/contactsGrid/contactsArchiveGridContainer";
import ContactsGridContainer from "@/views/DashBoardViews/contactsViews/contactsGrid/contactsGridContainer";

export default {
  name: "contactsContainer",
  components: {
    ContactsAddGridContainer,
    ContactsArchivedGridContainer,
    ContactsBanGridContainer,
    ContactsGridContainer,
  },
  props:{
    contacts:  Object,
    contactSend: Object,
    contactReceive:  Object
  },
  data(){
    return{
      selected:'contacts',
    }
  },
  created() {
    console.log('Created Contacts')
    console.log(this.$props.contacts)
  }

}
</script>

<style>
.gridIcon>div>svg{
  transition: all 0.2s ease-in-out;
}
.gridIcon:hover>div>svg{
  transform: scale(1.2);
}

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