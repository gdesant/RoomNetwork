<template>
  <div class="main">
    <div id="zoomDashboard" class="zoomDashboard" v-bind:style="{ 'zoom': zoomValue, 'background-color': zoomValue != 1 ? 'rgba(44, 120, 176, ' + (1 - zoomValue).toString() +')' : 'transparent'} ">
      <div id="navDashBar" class="navDashBar">
        <fa icon="message" class="dashIcon" />
        <fa icon="message" class="dashIcon" />
        <fa icon="message" class="dashIcon" />
      </div>
      <div id="dashboardMain" class="dashboardMain" v-bind:style="{ 'left': '-' + positions[layoutIndex.x].x.toString() + 'px', 'top': '50px',} ">
        <div class="roomsDiv">
          <div class ="profileEditDiv">
            <ProfileEdit v-if="user !== null" :user="user" />
          </div>
          <div class="roomsEditDiv">
          </div>
        </div>
        <div class="roomsListDiv">
          <RoomsListsContainer v-if="user !== null" :user="user"/>
        </div>
        <div class="interactDiv">
          <div class="settingsSelectDiv">
            <button class="settingsSelectButton" v-on:click="changeView('settings', $event)">Settings</button>
            <button class="settingsSelectButton" v-on:click="changeView('security', $event)">Security</button>
          </div>
          <div class ="profileEditDiv">
            <ProfileSettingsContainer v-if="user !== null && currentEditView == 'settings'" :username=user.username :email=user.email ref="profileSettings"/>
            <ProfileSecurityContainer v-if="user !== null && currentEditView == 'security'" :publicAccount=user.publicAccount :publicEmail=user.publicEmail ref="profileSecurity"/>
          </div>
          <div class='saveUserDiv'>
            <button class='saveUserButton' v-on:click="updateUser()">Save User !</button>
          </div>
        </div>
        <div class="friendsListDiv">
          <FriendsListsContainer v-if="user !== null" :user="user"/>
        </div>
        <div class="chatDiv">
          <ChatContainer v-if="user !== null" :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendsListsContainer from "@/components/dashboardContainers/friendsListsContainer";
import ProfileSettingsContainer from "@/components/dashboardContainers/userSettingsContainer";
import ProfileSecurityContainer from "@/components/dashboardContainers/userSecurityContainer";
import RoomsListsContainer from "@/components/dashboardContainers/roomsListsContainer";
import ChatContainer from "@/components/dashboardContainers/chatContainer"
import UsersService from "@/services/UsersService";
import axios from "axios";

const sides = {Right:0, Left:1}
const swapViewInterval = 1000

export default {
  components: {RoomsListsContainer, ProfileSettingsContainer, ProfileSecurityContainer,  FriendsListsContainer, ChatContainer},
  data() {
    return {
      user: null,
      users: '',
      rooms: '',
      currentEditView: 'settings',
      zoomValue: 1,
      layoutIndex: {x: 0, y:0},
      swapViewLast: 0,
      positions: [{x:0, y:0}, {x: 1209, y: 0}, {x: 2418, y: 0}]
    }
  },
  methods: {
    scrollHandle(event){
      if (event.deltaY != 0)
        this.zoomScrollHandle(event.deltaY)
      else if (event.deltaX != 0)
        this.swapScrollHandle(event.deltaX)
    },
    zoomScrollHandle(deltaY)
    {
      console.log("ZoomScoll - " + deltaY.toString())
      const zoomVal = this.$data.zoomValue - ((deltaY / 100)/ 20)
      if (zoomVal > 1)
        this.$data.zoomValue = 1
      else if (zoomVal < 0.25)
        this.$data.zoomValue = 0.25
      else
        this.$data.zoomValue = zoomVal
    },
    swapView(side){
      if (this.swapViewLast >= (Date.now() - swapViewInterval))
        return
      let layoutValue = this.layoutIndex.x;
      if (side == sides.Right && this.layoutIndex.x + 1 <= this.positions.length)
        this.layoutIndex.x++;
      if (side == sides.Left && this.layoutIndex.x - 1 >= 0)
        this.layoutIndex.x--;
      if (layoutValue != this.layoutIndex.x)
        this.swapViewLast = Date.now()
    },
    swapScrollHandle(deltaX){
      if (deltaX > 0)
        this.swapView(sides.Right)
      else if (deltaX < 0)
        this.swapView(sides.Left)
    },
    updateViewData(string){
      if (this.user == null)
        return
      if (string == 'settings'){
        let data = this.$refs.profileSettings.getData()
        this.user.username = data.username
        this.user.email = data.email
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
    changeView(string, event) {
      this.updateViewData(this.currentEditView)
      this.currentEditView = string

      const buttons = document.getElementsByClassName('settingsSelectButton');

      for (let i = 0; i < buttons.length; i++){
        if (buttons[i] == event.target){
          buttons[i].disabled = true;
        }
        else
          buttons[i].disabled = false;
      }
    },
    async updateUser() {
      try {
        const tk = localStorage.getItem('token')
        this.updateViewData(this.currentEditView)

        let response = await UsersService.update({username: this.user.username, email: this.user.email, publicAccount: this.user.publicAccount, publicEmail: this.user.publicEmail, token: tk}, this.user.id)
        let token = response.token
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
    }
  },
  async mounted(){
    let scrollTo = document.getElementById("dashboardMain").scrollWidth/3
    document.getElementById("zoomDashboard").scrollTo(scrollTo, 0)

    document.onwheel = this.scrollHandle

    const tk = localStorage.getItem('token')
    if (tk) {
      try{
          const user = await UsersService.getUserByToken(tk)
          if (user){
            this.user = user
          }
          else{
            this.$router.push("/login")
          }
      } catch (e) {
        console.log('Error GetUser: ' + e)
        this.$router.push("/login")
      }
    }
  },
  created() {
    this.$data.swapViewLast = Date.now();
  }
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
  height: 7%;
  width: 10%;
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 0 auto;
}

.dashIcon{
  width: 33%;
  height: 50%;
  margin: 0.2% 0.1%;
  color: white;
}

.dashboardMain{
  height: 90%;
  display: flex;
  align-self: end;
  flex-direction: row;
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

.roomsListDiv{
  width: 19vw;
  height: 100%;
  margin: 0 0.5vw 0 0.5vw;
  align-self: center;
  flex: 0 0 auto;
  background-color: #464547;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) -5px -5px 10px 10px;
  display: flex;
  flex-direction: column;
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

.friendsListDiv{
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
  background-color: #5e5e60;

}

.settingsSelectButton{
  width: 33.3%;
  margin: 0 0;
  height: 100%;
  background-color: #3e3e41;
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
  background-color: #505052;
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