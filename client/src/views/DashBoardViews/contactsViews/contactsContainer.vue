<template>
  <div class="hp100 mop0a wp100 b-clr-4">
    <div class="hp10 wp100 tac clr-1">
      <h1>Contacts</h1>
    </div>
    <div class=" hp10 wp100 tac clr-wht">
      <h3 class="mop0a">Here you can add, remove and manage your contacts !</h3>
    </div>
    <div style="width: 1088px; height: 60%" class="mip0a">
      <div class="hp15 wp100 b-clr-1">
        <div class="hp100 wp100">
          <div class="hp85 mip0a fx-r" style="width: calc(100% - 6px); height: calc(65% - 3px); border: 3px solid rgba(var(--mcolor-1), 1); flex-grow: 0; flex-shrink: 0">
            <div class="hp100 b-clr-1" style="width: calc(1088px*0.7)">
              <input class="hp100 pop00 pip20 mip0a stand" v-model="searchInput" v-on:keydown="toggleLoadSearchContact" v-on:keyup="searchContactsFunc" style="width: 96%; border: none" placeholder="Username / Email ...">
            </div>
            <div class="hp100 b-clr-1" style="width: 2px">

            </div>
            <div class="hp100 b-clr-1 fx-r" style="width: calc(calc(1088px*0.3) - 2px)">
              <div class="wp90 hp100 mip05 table gridIcon" :class="selected == 'contactsNew' ? 'activeGridIcon' : 'nonActiveGridIcon'" @click="selected = 'contactsNew'">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="search"></fa>
                </div>
              </div>
              <div class="wp90 hp100 mip05 table gridIcon" :class="selected == 'contacts' ? 'activeGridIcon' : 'nonActiveGridIcon'" @click="selected = 'contacts'">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="address-book"></fa>
                </div>
              </div>
              <div class="wp90 hp100 mip05 table gridIcon" :class="selected == 'contactsAdd' ? 'activeGridIcon' : 'nonActiveGridIcon'" @click="selected = 'contactsAdd'">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="user-clock"></fa>
                </div>
              </div>
              <div class="wp90 hp100 mip05 table gridIcon" :class="selected == 'contactsBan' ? 'activeGridIcon' : 'nonActiveGridIcon'" @click="selected = 'contactsBan'">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="user-xmark"></fa>
                </div>
              </div>
              <div class="wp90 hp100 mip05 table gridIcon" :class="selected == 'contactsArchived' ? 'activeGridIcon' : 'nonActiveGridIcon'" @click="selected = 'contactsArchived'">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="box-archive"></fa>
                </div>
              </div>

            </div>
          </div>
          <div class="hp15 b-clr-1"><h4   class="mop00 pop00">{{titleDivText}}</h4></div>
        </div>
      </div>

      <ContactsSearchGridContainer :toggleSearch="loadSearch" :searchInput="searchInput" :changeStatus="changeStatus"  :contacts="searchContacts" v-if="selected == 'contactsNew'"/>
      <ContactsGridContainer :searchInput="searchInput" :changeStatus="changeStatus"  :contacts="contacts" v-else-if="selected == 'contacts'"/>
      <ContactsAddGridContainer :searchInput="searchInput" :changeStatus="changeStatus" :contacts="contactReceive.filter(x => x.friendsrequests.status == 0)" v-else-if="selected == 'contactsAdd'"/>
      <ContactsBanGridContainer :searchInput="searchInput" :changeStatus="changeStatus" :contactsB="contactReceive.filter(x => x.friendsrequests.status == 3)" :contactsGB="contactSend.filter(x => x.friendsrequests.status == 4)" v-else-if="selected == 'contactsBan'"/>
      <ContactsArchivedGridContainer :searchInput="searchInput" :changeStatus="changeStatus" :contacts="contactReceive.filter(x => x.friendsrequests.status == 2)" v-else-if="selected == 'contactsArchived'"/>

    </div>
  </div>
</template>

<script>
import ContactsBanGridContainer from "@/views/DashBoardViews/contactsViews/contactsGrid/contactsBanGridContainer";
import ContactsAddGridContainer from "@/views/DashBoardViews/contactsViews/contactsGrid/contactsAddGridContainer";
import ContactsArchivedGridContainer from "@/views/DashBoardViews/contactsViews/contactsGrid/contactsArchiveGridContainer";
import ContactsGridContainer from "@/views/DashBoardViews/contactsViews/contactsGrid/contactsGridContainer";
import ContactsSearchGridContainer from "@/views/DashBoardViews/contactsViews/contactsGrid/contactsSearchGridContainer";
import UsersService from "@/services/UsersService";
import FriendsService from "@/services/FriendsService";

export default {
  name: "contactsContainer",
  components: {
    ContactsAddGridContainer,
    ContactsArchivedGridContainer,
    ContactsBanGridContainer,
    ContactsGridContainer,
    ContactsSearchGridContainer,
  },
  props:{
    userId: Number,
    contacts:  Object,
    contactSend: Object,
    contactReceive:  Object
  },
  data(){
    return{
      selected:'contactsNew',
      searchInput: '',
      loadSearch: false,
      searchContacts: {},
    }
  },
  methods:{
    async changeStatus(data) {

      console.log('Change Status of : ')
      console.log(data.contact)
      console.log(' to '  + data.status)

      if(data.status == -1 && data.contact.friendsrequests.status == 4){
        let rsp = await FriendsService.delete(data.contact.friendsrequests.id)
        console.log('Delete FriendREquest!!!')
        console.log(rsp)
        return
      }

      if (data.modalACK == true)
        this.emitter.emit("openModal", {type: 'statusFriendsModal', modalData: {contact: data.contact, status:  data.status, oldStatus: data.contact.friendsrequests.status}});
      else
        this.emitter.emit('updateFriendRequest', {id: data.contact.friendsrequests.id  , status: data.status, oldStatus: data.contact.friendsrequests.status})
      return
    },
    toggleLoadSearchContact(){
      this.$data.loadSearch = true;
    },
    async searchContactsFunc(){
      if(this.$data.searchInput.length <= 0 || this.$data.selected != 'contactsNew'){
        this.$data.searchContacts = []
        this.$data.loadSearch = false;
        return
      }

      this.$data.searchContacts = await UsersService.getUsersStartWith(this.$data.searchInput, this.$props.userId)
      this.$data.loadSearch = false;
    },
    async createRequest(data){
      const res = await FriendsService.create(data.receiver.id,  data.gban)
      let index =  this.$data.searchContacts.indexOf(data.receiver);
      if (res.status == 4)
      {
        this.$data.searchContacts.splice(index, 1)
        const friend = await FriendsService.getUserFriendById(this.$props.userId, data.receiver.id, 4)
        if(typeof friend != 'number' && friend != null)
          this.emitter.emit("addGBAN",  friend)
      }
      else if (res.status == 0)
        this.$data.searchContacts.splice(index, 1)
    },
  },
  computed:{
    titleDivText(){
      if (this.$data.selected == 'contactsNew')
        return 'Add new Contacts '
      else if  (this.$data.selected == 'contactsAdd')
        return ('This is where you find all your request to become Friends !')
      else if  (this.$data.selected == 'contactsBan')
        return ('All the contacts that you banned are here :')
      else if  (this.$data.selected == 'contactsArchived')
        return ("This dusty place is  where you can find all the requests that you don't care about !")
      return ('List of friends')
    },
  },
  created() {
    console.log('Created Contacts')
    console.log(this.$props.contacts)
    this.emitter.on('changeFRStatus', this.changeStatus)
    this.emitter.on('createFRequest', this.createRequest)
  }

}
</script>

<style>
.activeGridIcon{
  pointer-events: none;
  background-color: rgb(var(--mcolor-1));
  color: rgb(var(--bcolor-1));

}

.nonActiveGridIcon{
  background-color: rgb(var(--bcolor-1));
  color: rgb(var(--mcolor-1));
}

.gridIcon{
  border-radius: 3px;
  transition: all 0.2s ease-in-out;
}

.gridIcon>div>svg{
  transition: transform 0.2s ease-in-out;
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
  color: rgba(var(--mcolor-1), 1);
}

.contactGridTran{
  transition: all 0.5s;
}

.contactGridTran-enter-from, .contactGridTran-leave-to {
  opacity: 0;
  transform: scale(0.25);
}


</style>