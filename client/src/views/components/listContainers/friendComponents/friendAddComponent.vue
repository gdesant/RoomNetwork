<template >
  <div className="friendAddDiv">
    <div class="inputDiv">
      <input type="text" placeholder="Search ..."  v-model="searchFriend.name" v-on:keydown="toggleLoadfutfriend()" v-on:keyup="refreshFriends(searchFriend.name, $props.user.id)">
    </div>
    <div class="futureFriendsList">
      <div class="listContainer">
        <ul v-if="futfriend !== null" ref="atf" class="friendList">
          <li v-for="user in futfriend" v-bind:key="user.id" ref="gtf" :id="user.id" class="friendBar">
            <div class="friendPic"></div>
            <div class="friendName">{{user.username}}</div>
            <div class="addFriend"><i v-on:mousedown="sendFriendRequest(user)" class="fas fa-user-plus"></i></div>
          </li>
        </ul>
        <div v-else style="width: 100%; height: inherit; display: table">
          <div class="noList">
            <div v-if="searchFriend.name == ''" class="emptySearch"><h3 class="divalert">Type a username to find a friend !</h3></div>
            <div v-else-if="futfriendload == true" class="loadingList"><div class="stage"><div class="nb-spinner"></div></div></div>
            <div v-else-if="futfriend == null" class="emptyList"><h3 class="divalert">No user have been found with the name {{searchFriend.name}} !</h3></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="javascript">
import UsersService from "@/services/UsersService";
import FriendsService from "@/services/FriendsService";


export default {
  name: "FriendAddComponent",
  props: {
    user: Object,
  },
  data() {
    return {
      searchFriend:{
        name: '',
      },
      futfriend: null,
      futfriendload: false,
    }
  },
  methods: {
    sendFriendRequest: async function(user){
      const fr = await FriendsService.create(user.id)
      if (fr.status == 0)
        await this.refreshFriends(this.searchFriend.name, user.id)
      return
    },
    toggleLoadfutfriend: function(){
      this.futfriendload = !this.futfriendload
      return
    },
    refreshFriends: async function (name, id){
      if (name === '')
        this.futfriend = null
      else{
        try {
          let fFriends = await UsersService.getUsersStartWith(name, this.user.id)
          let Users = new Array()
          if(fFriends !== undefined && fFriends !== null){
            fFriends.forEach(function (v) {
              if (v.id !== id)
                Users.push(v)
            })
            console.log("FuturesFriends : " + typeof(Users))
            console.log(Users)
            if (Users.length > 0)
              this.futfriend = Users
            else
              this.futfriend = null
          }
        } catch (err) {
          console.log(err)
          this.futfriend = null
        }
      }
      return this.toggleLoadfutfriend()
    },
  }
}
</script>

<style scoped>

.friendAddDiv{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: hidden;
}

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
  height: 6%;
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
  text-align: left;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 600;
  font-size: 100%;
  color: #B2B1B9;
  padding: 0 4%;
}

.addFriend{
  width: 20%;
  height: 100%;
}

.listContainer{
  background-color: transparent;
  border-top: solid 0.3vh white;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
}
.listContainer::-webkit-scrollbar{
  display: none;
}

.inputDiv{
  width: 100%;
  height: 15%;
  margin: 0%;
}

.futureFriendsList{
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 70%;
  max-height: 75%;
}


.friendList{
  width: 100%;
  min-height: 70%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-left: 0;
  margin: 0;
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