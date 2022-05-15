<template>
  <div class="main">
    <login-navbar></login-navbar>
    <!--
<div id="dashboardMain" class="dashboardMain" v-bind:style="{ 'left': '-' + leftSideValue.toString() + 'px', 'top': '50px',} " ref="dashoardMain">
  <div class="roomsDiv">
    <RoomContainer v-if="user != null" :user="user" :socket="socket"/>
  </div>
  <div class="listDiv">
    <RoomsListsContainer v-if="user != null" :user="user"/>
  </div>
  <div class="interactDiv">
    <div class="settingsSelectDiv">
      <button class="settingsSelectButton" disabled v-on:click="changeView('settings', $event)">Settings</button>
      <button class="settingsSelectButton" v-on:click="changeView('security', $event)">Security</button>
    </div>
    <div class ="profileEditDiv">
      <ProfileSettingsContainer v-if="user !== null && frontData.currentEditView == 'settings'" :username=user.username :email=user.email :firstName=user.firstName :lastName=user.lastName ref="profileSettings"/>
      <ProfileSecurityContainer v-if="user !== null && frontData.currentEditView == 'security'" :publicAccount=user.publicAccount :publicEmail=user.publicEmail ref="profileSecurity"/>
    </div>
    <div class='saveUserDiv'>
      <button class='saveUserButton' v-on:click="updateUser()">Save User !</button>
    </div>
  </div>
  <div class="listDiv">
    <FriendsListsContainer v-if="user !== null" :user="user"/>
  </div>
  <div class="chatDiv">
    <ChatContainer v-if="user !== null && socket !== null" :user="user" :socket="socket" />
  </div>
</div>-

<div id="zoomDashboard" class="zoomDashboard" v-bind:style="{ 'zoom': frontData.zoomValue, 'background-color': frontData.zoomValue != 1 ? 'rgba(44, 120, 176, ' + (1 - frontData.zoomValue).toString() +')' : 'transparent'} ">

</div>

import FriendsListsContainer from "@/views/components/listContainers/friendsListsContainer";
import ProfileSettingsContainer from "@/views/components/dashboardContainers/userSettingsContainer";
import ProfileSecurityContainer from "@/views/components/dashboardContainers/userSecurityContainer";
import RoomsListsContainer from "@/views/components/listContainers/roomsListsContainer";
import RoomContainer from "@/views/components/dashboardContainers/roomContainers/roomContainer";
import ChatContainer from "@/views/components/dashboardContainers/chatContainer"



, RoomContainer, RoomsListsContainer, ProfileSettingsContainer, ProfileSecurityContainer,  FriendsListsContainer, ChatContainer
-->
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
import axios from "axios";
import {io} from "socket.io-client";
import LoginNavbar from "@/views/Navbars/loginNavbar";


export default {
  components: {LoginNavbar},
  data() {
    return {
      user: null,
      users: '',
      socket : null,
      layout: [{x:0, y:0}, {x: 1209, y: 0}, {x: 2418, y: 0}],
      frontData: {
        currentEditView: 'settings',
        zoomValue: 1,
        layoutIndex: {x: 0, y:0},
        isMoving: false,
      }
    }
  },
  async mounted(){
    window.onresize = this.reloadWindowSize

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

    this.emitter.on("logoutDash", this.logoutDash);
  },
  methods: {
    logoutDash(){
      this.$router.push("/logout");
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
    reloadWindowSize(){
    },
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

<style scoped>
.main{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-content: center;
}

.zoomDashboard {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: visible;
  overflow-y: visible;
  position: relative;
  margin: auto;
  zoom: 0.5;
  z-index: 2;
}

.navDashBar{
  height: 5%;
  width: 10%;
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 0 auto;
}

.dashIcon{
  width: 33%;
  height: 50%;
  margin: auto;
  align-self: baseline;
  color: white;
}

.dashIconInactive{
  width: 33%;
  height: 25%;
  margin: auto;
  align-self: baseline;
  color: white;
}

.dashboardMain{
  height: 90%;
  display: flex;
  align-self: end;
  flex-direction: column;
  overflow-x: scroll;
  overflow-y: hidden;
  position: absolute;
}

.dashboardMain::-webkit-scrollbar {
  display: none;
}

.roomsDiv{
  width: 79.5vw;
  height: 100%;
  margin: 0 0vw 0 0.5vw;
  scroll-snap-align: end;
  flex: 0 0 auto;
}

.interactDiv{
  width: 60vw;
  height: 100%;
  align-self: center;
  scroll-snap-align: center;
  flex: 0 0 auto;
  margin: 0;
  flex-direction: column;
  border-radius: 1vh 1vh;
  overflow: hidden
}

.listDiv{
  width: 19vw;
  height: 100%;
  margin: 0 0.5vw 0 0.5vw;
  align-self: center;
  flex: 0 0 auto;
  background-color: #2b2b2b;
  box-shadow: rgba(0, 0, 0, 0.15) -5px -5px 10px -10px;
  display: flex;
  flex-direction: column;
  border-radius: 1vh 1vw;
  overflow: hidden;
}

.chatDiv{
  width: 79.5vw;
  height: 100%;
  margin: 0 0.5vw 0 0;
  align-self: center;
  scroll-snap-align: start;
  flex: 0 0 auto;
}


.settingsSelectDiv{
  width: 100%;
  height: 5%;
  overflow: inherit;
  display: flex;
  flex-direction: row;
  background-color: #2a2a2c;

}

.settingsSelectButton{
  width: 33.3%;
  margin: 0 0;
  height: 100%;
  background-color: #505052;
  color: lightgray;
  border-top-left-radius: 1vh;
  border-top-right-radius: 1vh;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.settingsSelectButton:disabled{
  background-color: #39393b;
  color: white;
}

.settingsSelectButton:hover:enabled{
  background-color: #7e7e83;
  color: #414141;
}

.settingsSelectButton:active:enabled{
  background-color: #77777c;
}

.saveUserDiv{
  height: 5%;
  width: 100%;
}

.saveUserButton{
  height: 100%;
  width: 100%;
  margin: 0 0;
  background-color: #2a2a2c;
}

.saveUserButton:hover{
  background-color: #353536;
}

.saveUserButton:active{
  background-color: #7c7c7c;
  color: #3b3b3d;
}


.profileEditDiv{
  width: 100%;
  height: 90%;
  overflow: inherit;
}

.roomsEditDiv{
  width: 100%;
  height: 0%;
}


</style>