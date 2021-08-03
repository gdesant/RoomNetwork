<template>
  <div class="friendRequestDiv">
    <ul class="friendRequestListReceive" v-if="friendrequestreceived != null">
      <li v-for="user in friendrequestreceived" v-bind:key="user.id"  class="friendrequestBar">
          <div class="friendName" >{{user.username}}</div>
          <div class="acceptFriend" :id="user.friendsrequests.id" ><i v-on:mousedown="updateFriendRequest(user.friendsrequests.id, 1)" class="fas fa-user-check"></i></div>
          <div class="declineFriend" :id="user.friendsrequests.id" ><i v-on:mousedown="updateFriendRequest(user.friendsrequests.id, 3)" class="fas fa-user-slash"></i></div>
      </li>
    </ul>
  </div>
</template>

<script type="javascript">
import UsersService from "@/services/UsersService";
import FriendsService from "@/services/FriendsService";


export default {
  name: "FriendRequestComponent",
  props: {
    user: Object,
    initfriendrequestreceived:Object,
  },
  data() {
    return {
      friendrequestreceived: this.initfriendrequestreceived,
    }
  },
  methods: {
    refreshFriendRequest: async function(){
      const fr = await UsersService.getPendingFriendsRequestByReceiverId(this.user.id)
      this.friendrequestreceived = fr.FriendsRequestsReceived

      return
    },
    updateFriendRequest: async function (id, status) {
      await FriendsService.update(id, status)
      return await this.refreshFriendRequest()
    },
  }
}
</script>

<style scoped>

.friendRequestDiv{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.friendRequestListReceive{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin: 0;
}

.friendrequestBar{
  width: 100%;
  height: 6vh;
  display: flex;
  flex-direction: row;
  background-color: rgba(178, 177, 185, 0.07);
  margin: 2% 0%;
}

.friendName{
  width: 50%;
  vertical-align: center;
  text-align: left;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 600;
  font-size: calc(1.3vh + 1.3vw);
  color: #B2B1B9;
  padding: 0 4%;
}

.acceptFriend{
  height: 100%;
  width: 20%;
  text-align: center;
  color: #97a843;

}

.acceptFriend i{
  width: 100%;
  height: 100%;
  vertical-align: baseline;
  margin: 10% 0;
  font-size: 150%;
}

.declineFriend{
  height: 100%;
  width: 20%;
  text-align: center;
  color: #952c0e;
}

.declineFriend i{
  width: 100%;
  height: 100%;
  vertical-align: baseline;
  margin: 10% 0;
  font-size: 150%;
}
</style>