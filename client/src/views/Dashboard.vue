<template>
  <div id="dashboardMain" class="dashboardMain">
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
        <div class ="profileEditDiv">
          <ProfileContainer v-if="user !== null" :user="user" />
        </div>
        <div class="roomsEditDiv">
        </div>
    </div>
    <div class="friendsListDiv">
      <FriendsListsContainer v-if="user !== null" :user="user"/>
    </div>
    <div class="chatDiv">
      <div class ="profileEditDiv">
        <ChatContainer v-if="user !== null" :user="user" />
      </div>
      <div class="roomsEditDiv">
      </div>
    </div>
  </div>
</template>

<script>
import FriendsListsContainer from "@/components/dashboardContainers/friendsListsContainer";
import ProfileContainer from "@/components/dashboardContainers/profileContainer";
import RoomsListsContainer from "@/components/dashboardContainers/roomsListsContainer";
import ChatContainer from "@/components/dashboardContainers/chatContainer"
import UsersService from "@/services/UsersService";

export default {
  components: {RoomsListsContainer, ProfileContainer, FriendsListsContainer, ChatContainer},
  data() {
    return {
      user: null,
      users: '',
      rooms: '',
    }
  },
  async created(){
    window.addEventListener("load", function () {
      console.log("Width :" + window.outerWidth)
      let scrollTo = document.getElementById("dashboardMain").scrollWidth/3
      document.getElementById("dashboardMain").scrollTo(scrollTo, 0)
    })
    const tk = localStorage.getItem('token')
    if (tk) {
      try{
          const user = await UsersService.getUserByToken(tk)
          if (user){
            const resp = await UsersService.getPrivateUserById(user.id)
            if (resp)
              this.user = resp
            else
              this.user = user
          }
      } catch (e) {
        console.log('Error GetUser: ' + e)
        this.$router.push("/login")
      }
    }
  },
}



</script>

<style scoped>

e

.buttonDiv{
  text-align: center;
  font-family: 'Titillium Web', sans-serif;
  font-size: 100%;
  color: #B2B1B9;
}

.dashboardMain{
  width: 100vw;
  height: 100vh;
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
  position: absolute;
}

.dashboardMain::-webkit-scrollbar {
  display: none;
}

.roomsListDiv{
  width: 19vw;
  height: 94vh;
  margin: 2vh 0.5vw 4vh 0.5vw;
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
  height: 94vh;
  margin: 2vh 0vw 4vh 0vw;
  scroll-snap-align: center;
  flex: 0 0 auto;
}

.roomsDiv{
  width: 79.5vw;
  height: 94vh;
  margin: 2vh 0vw 4vh 0.5vw;
  scroll-snap-align: end;
  flex: 0 0 auto;
}

.chatDiv{
  width: 79.5vw;
  height: 94vh;
  margin: 2vh 0.5vw 4vh 0vw;
  scroll-snap-align: start;
  flex: 0 0 auto;
}

.profileEditDiv{
  width: 100%;
  height: 100%;
  overflow: inherit;
}

.roomsEditDiv{
  width: 100%;
  height: 0%;
}

.friendsListDiv{
  width: 19vw;
  height: 94vh;
  margin: 2vh 0.5vw 4vh 0.5vw;
  flex: 0 0 auto;
  background-color: #2b2b2b;
  box-shadow: rgba(0, 0, 0, 0.15) -5px -5px 10px -10px;
  display: flex;
  flex-direction: column;
  border-radius: 1vh 1vw;
}

</style>