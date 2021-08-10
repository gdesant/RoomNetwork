<template >
  <div class="friendListDiv">
    <ul class="friendList" v-if="friends != null">
      <li v-for="fr in friends" v-bind:key="fr.id"  class="friendrequestBar">
        <div class="friendName" >{{fr.username}}</div>
      </li>
    </ul>
  </div>
</template>

<script type="javascript">
import UsersService from "@/services/UsersService";

export default {
  name: "FriendListComponent",
  props: {
    user: Object,
    initfriends: Object
  },
  data() {
    return {
      friends: this.initfriends,
    }
  },
  async created () {
    this.emitter.on("friendListRefresh", this.refreshFriends);
  },
  methods: {
    refreshFriends: async function(){
      const frs = await UsersService.getUserFriends(this.user.id)
      this.friends = frs.Friends
      return
    },
  }
}
</script>

<style scoped>

input{
  width: 94%;
  margin: 0;
  padding: 2% 3%;
  border: 0;
  border: none transparent;
  outline-color: transparent;
}

input:focus{
  border: none transparent;
  outline: none;
}

.friendList{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 0;
  margin: 0;
}

.friendList::-webkit-scrollbar{
  display: none;
}

.friendrequestBar{
  width: 100%;
  height: 6vh;
  display: flex;
  flex-direction: row;
  background-color: rgba(178, 177, 185, 0.07);
  margin: 2% 0%;
}

.friendrequest{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.friendrequestName{
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

.addFriend i{
  width: 100%;
  height: 100%;
  vertical-align: baseline;
  margin: 10% 0;
  font-size: 150%;
  color: #97a843;
}



.friendBar{
  width: 100%;
  height: 5vh;
  display: flex;
  flex-direction: row;
  background-color: rgba(178, 177, 185, 0.07);
  margin: 2% 0%;
}

.friendPic{
  width: 20%;
  background-color: #B2B1B9;
}

.friendName{
 width: 52%;
  vertical-align: center;
  text-align: left;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 600;
  font-size: calc(1.3vh + 1.3vw);
  color: #B2B1B9;
  padding: 0 4%;
}

.addFriend{
  width: 20%;
  height: 100%;
}

.friendsModal {
  margin-top: 4%;
  margin-bottom: 3%;
  height: 94%;
}

.categoryDiv {
  min-height: 5%;
}

.titleDiv {
  width: 100%;
  max-height: 100%;
  background-color: rgba(178, 177, 185, 0.47);
  text-align: center;

}

.titleDiv h3 {
  margin: 0.4% 0;
}

.collapsable {
  overflow: hidden;
  transition: max-height 0.3s ease-out, min-height 0.3s ease-out;
  min-height: 78vh;
  max-height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.collapsable.collapsed {
  min-height: 0;
  max-height: 0;
}

.listContainer{
  background-color: transparent;
  border-top: solid 0.3vh white;
  height: 73vh;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
}

.inputDiv{
  width: 100%;
  height: 15%;
  margin: 0%;
}

.futureFriendsList{
  width: 100%;
  min-height: 85%;
}

.noList{
  width: inherit;
  height: inherit;
  display: table-cell;
  vertical-align: middle;
  align-items: center;
  text-align: center;
}


.friendRequestSend{
  height: 50%;
}

.friendRequestSend{
  height: 50%
}












.loadingList{
  width: inherit;
  align-self: center;
}

.stage{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem 0;
  margin: 0 -5%;
  overflow: hidden;
}

/* NO BORDER SPINNER */
.nb-spinner {
  width: 10px;
  height: 10px;
  margin: 0;
  background: transparent;
  border-top: 4px solid orange;
  border-right: 4px solid transparent;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}

-webkit-@keyframes spin {
          -webkit-from {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          -webkit-to {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>