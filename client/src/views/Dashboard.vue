<template>
  <div class="main">
    <div class="dashboardMainContent b-clr-5">
      <Transition name="slide-up">

        <contactsContainer v-if="currentEditView == 'contacts'" class="emptyDashboardDiv"/>
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
    <Navbar v-if="user != null" :user="user"/>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
import axios from "axios";
import {io} from "socket.io-client";
import Navbar from "@/views/Navbar";

import contactsContainer from "@/views/DashBoardViews/contactsContainer"
import roomsContainer from "@/views/DashBoardViews/roomsContainer";
import addonsContainer from "@/views/DashBoardViews/addonsContainer";
import profileContainer from "@/views/DashBoardViews/profileContainer";
import securityContainer from "@/views/DashBoardViews/securityContainer";


export default {
  components: {Navbar, contactsContainer, roomsContainer, addonsContainer, profileContainer, securityContainer},
  data() {
    return {
      user: null,
      users: '',
      socket : null,
      currentEditView: 'none',
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
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(auto-fill, auto);
  overflow-x: hidden;
  overflow-y: auto;
  width: min-content;
  padding: 10px;
  border: 3px solid var(--main-color);
}

.emptyDashPanelMain::-webkit-scrollbar{
  background-color: var(--fourth-color);
  padding-left: 3px;
}

.emptyDashPanelMain::-webkit-scrollbar-thumb{
  background-color: var(--main-color);
  border-top: 2px solid var(--fourth-color);
  border-right: 2px solid var(--fourth-color);
  border-bottom: 2px solid var(--fourth-color);

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