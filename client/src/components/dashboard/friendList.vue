<template >
  <div className="friendsModal">
    <div className="categoryDiv">
      <div className="titleDiv" v-on:click="friendsExpander($refs.collFriendsAdd)">
        <h3>friends Add</h3>
      </div>
      <div ref="collFriendsAdd" className="collapsable collapsed">
        <div class="inputDiv">
          <input type="text" placeholder="Search ..."  v-model="searchFriend.name" v-on:keydown="toggleLoadfutfriend()" v-on:keyup="refreshFriends(searchFriend.name, $props.user.id)">
        </div>
        <div class="futureFriendsList">
          <div class="listContainer">
            <ul v-if="futfriend !== null" ref="atf" class="friendList">
              <li v-for="user in futfriend" v-bind:key="user.id" ref="gtf" :id="user.id" class="friendBar">
                <div class="friendPic"></div>
                <div class="friendName">{{user.username}}</div>
                <div class="addFriend"></div>
              </li>
            </ul>
            <div v-else style="width: 100%; height: inherit; display: table">
              <div class="noList">
                <div v-if="searchFriend.name == ''" class="emptySearch">Type a username to find a friend !</div>
                <div v-else-if="futfriendload == true" class="loadingList"><div class="stage"><div class="dot-revolution"></div></div></div>
                <div v-else-if="futfriend == null" class="emptyList">No user have been found with the name {{searchFriend.name}} !</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="categoryDiv">
      <div className="titleDiv" v-on:click="friendsExpander($refs.collFriendsAsks)">
        <h3>friends Asks</h3>
      </div>
      <div ref="collFriendsAsks" className="collapsable collapsed">
        <div class="friendRequestListDiv">
          <div class="friendRequestListDivTitle"></div>
          <ul class="friendRequestSend"></ul>
        </div>
        <div class="friendRequestListDiv">
          <div class="friendRequestListDivTitle"></div>
          <ul class="friendRequestListReceive"></ul>
        </div>
      </div>
    </div>
    <div className="categoryDiv">
      <div className="titleDiv" v-on:click="friendsExpander($refs.collFriendsList)">
        <h3>friends List</h3>
      </div>
      <div ref="collFriendsList" className="collapsable">
        <ul className="friendList onlinefriends">

        </ul>
        <ul className="friendList offlinefriends">
          <li></li>
        </ul>
        <ul className="friendList deletedfriends">
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="javascript">
import UsersService from "@/services/UsersService";

export default {
  name: "FriendList",
  props: {
    user:Object
  },
  created() {

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
    increment: function (){
      return this.futfriendRefresh += 1
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
          let fFriends = await UsersService.getUsersStartWith(name)
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
    friendsExpander(div) {
      if (!div.classList.contains('collapsed'))
        return
      const divs = [this.$refs.collFriendsList, this.$refs.collFriendsAdd, this.$refs.collFriendsAsks]

      divs.forEach(ref => {
        if (ref !== div) {
          if (!ref.classList.contains('collapsed')) {
            ref.classList.toggle('collapsed')
          }
        }
      })
      div.classList.toggle('collapsed')
      return
    },
  }
}
</script>

<style scoped>

element.style{
  --random-angle: 0
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
  background-color: #7a9e30;
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
  overflow-y: auto;
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

.friendList{
  width: 100%;
  list-style: none;
  padding-left: 0;
  margin: 2% 0;
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

/**
 * ==============================================
 * Dot Revolution
 * ==============================================
 */
.dot-revolution {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: orange;
  color: orange;
}

.dot-revolution::before, .dot-revolution::after {
  content: '';
  display: inline-block;
  position: absolute;
}

.dot-revolution::before {
  left: 0;
  top: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: orange;
  color: orange;
  transform-origin: 5px 20px;
  animation: dotRevolution 1.4s linear infinite;
}

.dot-revolution::after {
  left: 0;
  top: -30px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: orange;
  color: orange;
  transform-origin: 5px 35px;
  animation: dotRevolution 1s linear infinite;
}



@keyframes dotRevolution {
  0% {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  100% {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
}



.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}


</style>