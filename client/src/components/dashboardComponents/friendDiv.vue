<template >
  <div className="friendsModal">
    <div className="categoryDiv">
      <div className="titleDiv" v-on:mousedown="friendsExpander($refs.collFriendsAdd)">
        <h3>friends Add</h3>
      </div>
      <div ref="collFriendsAdd" className="collapsable collapsed">
        <FriendAddComponent v-if="user != null" :user="user"></FriendAddComponent>
      </div>
    </div>
    <div className="categoryDiv">
      <div className="titleDiv" v-on:mousedown="friendsExpander($refs.collFriendsAsks)">
        <h3>friends Asks</h3>
      </div>
      <div ref="collFriendsAsks" className="collapsable collapsed">
        <FriendRequestComponent v-if="friendrequestreceived != null && user != null" :user="user" :initfriendrequestreceived="friendrequestreceived"></FriendRequestComponent>
      </div>
    </div>
    <div className="categoryDiv">
      <div className="titleDiv" v-on:mousedown="friendsExpander($refs.collFriendsList)">
        <h3>friends List</h3>
      </div>
      <div ref="collFriendsList" className="collapsable">
        <FriendListComponent v-if="friends != null && user != null" :user="user" :initfriends="friends"></FriendListComponent>
      </div>
    </div>
  </div>
</template>

<script type="javascript">
import UsersService from "@/services/UsersService";
import FriendRequestComponent from "@/components/friendComponents/friendRequestsComponent"
import FriendListComponent from "@/components/friendComponents/friendListComponent"
import FriendAddComponent from "@/components/friendComponents/friendAddComponent"


export default {
  name: "FriendDiv",
  components: {FriendAddComponent, FriendRequestComponent, FriendListComponent},
  props: {
    user: Object,
  },
  data() {
    return {
      friendrequestreceived: null,
      friendrequestsent: null,
      friends: null,
    }
  },
  async created() {
    const resp = await UsersService.getDashUserById(this.user.id)
    this.friendrequestreceived = resp.friendrequestreceived
    this.friends = resp.friends
    return
  },
  methods: {
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

</style>