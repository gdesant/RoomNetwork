<template>
  <div class="main">
    <div class="dashboardMainContent b-clr-5" v-if="user != null">
      <Transition name="slide-up">

        <contactsContainer v-if="currentEditView == 'contacts' && renderContacts" :contacts="user.Friends" :contactReceive="user.FriendReceive" :contactSend="user.FriendSend" :userId="user.id" class="emptyDashboardDiv"/>
        <roomsContainer v-else-if="currentEditView == 'rooms'" class="emptyDashboardDiv"/>
        <addonsContainer v-else-if="currentEditView == 'addons'" class="emptyDashboardDiv"/>

        <profileContainer v-else-if="currentEditView == 'profile'" class="emptyDashboardDiv"/>
        <securityContainer v-else-if="currentEditView == 'security'" class="emptyDashboardDiv"/>

        <div v-else class="emptyDashboardDiv">
          <div class="table hp100 wp100">
            <div class="table-c">
              <h0 class="clr-1">EMPTY DASHBOARD</h0>
              <h2 class="clr-wht">Use the navbar to navigate throught the website !</h2>
            </div>
          </div>

        </div>
      </Transition>
    </div>
    <chatPop v-if="user != null &&  socket !=null" :socket="socket" :userid="user.id"/>
    <Navbar v-if="user != null" :user="user"/>

  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
import axios from "axios";
import {io} from "socket.io-client";
import Navbar from "@/views/Navbar";

import contactsContainer from "@/views/DashBoardViews/contactsViews/contactsContainer"
import roomsContainer from "@/views/DashBoardViews/roomsContainer";
import addonsContainer from "@/views/DashBoardViews/addonsContainer";
import profileContainer from "@/views/DashBoardViews/profileContainer";
import securityContainer from "@/views/DashBoardViews/securityContainer";
import chatPop from "@/views/DashBoardViews/chatsViews/chatPop";
import FriendsService from "@/services/FriendsService";


export default {
  components: {Navbar, contactsContainer, roomsContainer, addonsContainer, profileContainer, securityContainer, chatPop},
  data() {
    return {
      user: null,
      users: '',
      socket : null,
      currentEditView: 'none',
      renderContacts: true,
    }
  },
  async mounted(){
    this.$data.socket = io('http://localhost:3000', {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false
    })

    this.$data.socket.on('connect_error', function (err){
      console.log(err)
    })

    this.emitter.on("logout", this.logoutDash);
    this.emitter.on("navbarDashView", this.changeView)
    this.emitter.on("updateFriendRequest",  this.updateFriendRequest)
    this.emitter.on("addGBAN",  this.addFriendRequestGBAN)
  },
  methods: {
    logoutDash(){
      this.$router.push("/logout");
    },
    changeView(data){
      this.$data.currentEditView = data.newView
    },
    updateUserData(string){
      if (this.user == null)
        return
      if (string == 'settings'){
        let data = this.$refs.profileSettings.getData()
        this.user.username = data.username
        this.user.email = data.email
        this.user.firstName = data.firstName
        this.user.lastName = data.lastName
        return
      }
      else if (string == 'security'){
        let data = this.$refs.profileSecurity.getData()
        this.user.publicAccount = data.publicAccount
        this.user.publicEmail = data.publicEmail
        return
      }
      return
    },
    async updateUser() {
      try {
        const tk = localStorage.getItem('token')
        this.updateUserData(this.frontData.currentEditView)

        let response = await UsersService.update({username: this.user.username, email: this.user.email, firstName: this.user.firstName, lastName: this.user.lastName, publicAccount: this.user.publicAccount, publicEmail: this.user.publicEmail, token: tk}, this.user.id)
        let token = response.token
        if (response != null)
          this.user = response
        console.log('RESPONSE LOGIN : ', response)
        if (token){
          localStorage.setItem("token", token)
          axios.defaults.headers.post['Authorization'] = 'Bearer ' + token
        }else{
          console.log('error: ', response)
        }
      } catch (err) {
        console.log(err);
        this.message = err.response.data
      }
    },
    async updateFriendRequest(data){
      if(data.oldStatus == data.status)
        return

      let  buff = await FriendsService.update(data.id, data.status)

      console.log('Id: ' + data.id + ' | Status: '  +  data.status + ' | oldStatus :'  + data.oldStatus)
      console.log('Update: {')
      console.log(buff)
      console.log('};')

      if(buff == false)
        return

      let index = this.$data.user.FriendReceive.findIndex(element =>  element.friendsrequests.id == data.id)
      console.log('FriendReceive index: ' + index)
      if(index >= 0){
        this.$data.user.FriendReceive[index].friendsrequests = buff
      }

      index = this.$data.user.FriendSend.findIndex(element =>  element.friendsrequests.id == data.id)
      console.log('FriendSend index: ' + index)
      if(index >= 0){
        this.$data.user.FriendSend[index].friendsrequests = buff
      }

      index = this.$data.user.Friends.findIndex(element =>  element.friendsrequests.id == data.id)
      if(index  != -1 && data.status != 1)
        this.$data.user.Friends.splice(index, 1)

      if(data.oldStatus != 1 && data.status ==  1){
        const friend = await FriendsService.getUserFriendById(this.$data.user.id == buff.senderId ? buff.senderId : buff.receiverId, this.$data.user.id == buff.senderId ? buff.receiverId : buff.senderId)
        this.$data.user.Friends.splice(this.$data.user.Friends.lenght, 0, friend)
      }

    },
    async addFriendRequestGBAN(data){
      this.$data.user.FriendSend.splice(this.$data.user.FriendSend.length, 0, data)
    },
    forceRerender() {
      // Remove my-component from the DOM
      this.renderContacts = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderContacts = true;
      });
    }
  },
  async created() {

    const tk = localStorage.getItem('token')
    if (tk) {
      try{
        let user = await UsersService.getUserByToken(tk)
        user = await UsersService.getDashUserById(user.id)
        if (user == null){
          this.$router.push("/login")
        }
        this.$data.user = user
        console.log("Dash users :")
        console.log(user)
      } catch (e) {
        console.log('Error GetUser: ' + e)
        this.$router.push("/login")
      }
    }
  },
  beforeUnmount() {
    this.$data.socket.emit('disconnectDash');
  },
  computed: {
    leftSideValue: function() {
      return this.layout[this.frontData.layoutIndex.x].x;
    },
  },
}



</script>

<style>
.dashboardMainContent{
  width: calc(100% - 50px);
  position: absolute;
  top: 0;
  left: 50px;
  display: table;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.dashboardMainContent::-webkit-scrollbar {
  display: none;
}

.emptyDashboardDiv{
  height: 100%;
  width: 100%;
  display: table-cell;
  position: absolute;
  vertical-align: middle;
  text-align: center;
}

.globalDashPanel{
  width: initial;
}

.emptyDashPanelMain{
  display: grid;
  grid-column-gap: 15px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(4, 255px);
  grid-template-rows: repeat(auto-fill, auto);
  overflow-x: hidden;
  overflow-y: auto;
  width: 1062px;
  padding: 10px;
  border: 3px solid rgba(var(--mcolor-1), 1);
}

.emptyDashPanelMain::-webkit-scrollbar{
  background-color: rgba(var(--bcolor-1), 1);
  padding-left: 3px;
}

.emptyDashPanelMain::-webkit-scrollbar-thumb{
  background-color: rgba(var(--mcolor-1), 1);
  border-top: 2px solid rgba(var(--bcolor-1), 1);
  border-right: 2px solid rgba(var(--bcolor-1), 1);
  border-bottom: 2px solid rgba(var(--bcolor-1), 1);

}

.emptyDashPanelSec{
  overflow-x: hidden;
  overflow-y: auto;
  width: 1062px;
  padding: 10px;
  border: 3px solid rgba(var(--mcolor-1), 1);
  color: var(--mcolor-1);
}

.emptyDashPanelSec::-webkit-scrollbar{
  background-color: rgba(var(--bcolor-1), 1);
  padding-left: 3px;
}

.emptyDashPanelSec::-webkit-scrollbar-thumb{
  background-color: rgba(var(--mcolor-1), 1);
  border-top: 2px solid rgba(var(--bcolor-1), 1);
  border-right: 2px solid rgba(var(--bcolor-1), 1);
  border-bottom: 2px solid rgba(var(--bcolor-1), 1);

}



.emptyDashPanel{
  display: block;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}

.emptyDashPanel:hover{
  transform: scale(1.1);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100vh);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-100vh);
}


</style>