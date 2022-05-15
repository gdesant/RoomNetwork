<template>
  <div class="main">
    <div class="dashboardMainContent b-clr-5">
      <div v-if="currentEditView == 'none'" class="emptyDashboardDiv">
        <h0 class="clr-1">EMPTY DASHBOARD</h0>
        <h2 class="clr-wht">Use the navbar to navigate throught the website !</h2>
      </div>
    </div>
    <Navbar v-if="user != null" :user="user"/>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
import axios from "axios";
import {io} from "socket.io-client";
import Navbar from "@/views/Navbar";


export default {
  components: {Navbar},
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

<style scoped>
.dashboardMainContent{
  height: 100vh;
  width: calc(100% - 50px);
  position: absolute;
  top: 0;
  left: 50px;
  display: table;
  align-self: end;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}

.dashboardMainContent::-webkit-scrollbar {
  display: none;
}

.emptyDashboardDiv{
  width: initial;
  height: initial;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

</style>