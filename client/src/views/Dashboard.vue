<template>
  <div class="dashboardMain">
    <div class="roomsDiv">
      <RoomsList/>
    </div>
    <div class="interactDiv">
        <div class ="profileEditDiv">
          <ProfileEdit v-if="user !== null" :user="user" />
        </div>
        <div class="roomsEditDiv">
        </div>
    </div>
    <div class="friendsDiv">
      <FriendList v-if="user !== null" :user="user"/>
    </div>
  </div>
</template>

<script>
import FriendList from "@/components/dashboard/friendList";
import ProfileEdit from "@/components/dashboard/profileEdit";
import RoomsList from "@/components/dashboard/roomsList";
import UsersService from "@/services/UsersService";

export default {
  components: {RoomsList, ProfileEdit, FriendList},
  data() {
    return {
      user: null,
      users: '',
      rooms: '',
    }
  },
  async created(){
    const tk = localStorage.getItem('token')
    if (tk) {
      try{
        const user = await UsersService.getUserByToken(tk)
        if (user)
          this.user = user
        else {
          console.log('Error GetUser: ' + user)
          this.$router.push("/login")
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
.dashboardMain{
  margin: 1vh 4vw 1vh 4vw;
  width: 92vw;
  height: 97vh;
  position:relative;
  background-color: #363537;
  border-radius: 5px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  -moz-animation: slide 0.2s ease;
  -webkit-animation: slide 0.2s ease;
  -o-animation: slide 0.2s ease;
  -ms-animation: slide 0.2s ease;
  animation: slide 0.2s ease;
}


.roomsDiv{
  width: 20%;
  height: 100%;
  background-color: #464547;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) -5px -5px 10px 10px;
  display: flex;
  flex-direction: column;
}




.interactDiv{
  width: 60%;
  height: 90vh;
  margin: 3vh 0vw 3vh 0vw;
  overflow-x: hidden;
  overflow-y: auto;
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




.friendsDiv{
  width: 20%;
  height: 100%;
  background-color: #2b2b2b;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) -5px -5px 10px -10px;
  display: flex;
  flex-direction: column;
}

</style>