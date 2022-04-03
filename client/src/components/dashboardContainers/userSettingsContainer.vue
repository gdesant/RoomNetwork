<template>
  <div class="profileGrid">
    <div class="profileAvatarDiv" style="grid-area: a"></div>
    <div class="inputLockDiv" >
      <h3>Username</h3>
      <input v-model=user.username>
    </div>
    <div class="inputLockDiv" >
      <h3>Email</h3>
      <input v-model=user.email>
    </div>
    <div class="buttonDiv">
      <button class="hoverButton1">Reset Password</button>
      <button class="hoverButton2" @click="logoutUser" type="submit ">Logout</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  name: "ProfileSettingsContainer",
  props:{
    email: String,
    username: String,
  },
  data() {
    return {
      user: {
        email: "",
        username: "",
      },
    }
  },
  created() {
    this.user.email = this.email;
    this.user.username = this.username;
  },
  methods: {
    getData(){
      return this.user;
    },
    async logoutUser() {
      const tk = localStorage.getItem('token')
      if (tk){
        try {
          let response = await UsersService.logout(tk)
          if (response == true){
            localStorage.removeItem("token")
            this.$router.push('/')
            console.log("You have been log out of the website !")
          }
          else
            console.log("Can't log you out !")
        } catch (err) {
          console.log(err.response.data)
        }
      }else{
        console.log("Can't logout if you are not logged in");
      }

    },
    changePasswordType(){
      if(this.$refs.passwordInput.type === 'password'){
        this.$refs.passwordInput.setAttribute("type", "string")
        this.$refs.eye.setAttribute("class", "divHide")
        this.$refs.eye.innerHTML = "<i class=\"fas fa-eye-slash eye\" style=\"color:  #ef815c; position:relative; top: calc(50% - 10px); text-align: center; font-size: calc(1vh + 1.5vw);\"></i>"
      }else{
        this.$refs.passwordInput.setAttribute("type", "password")
        this.$refs.eye.setAttribute("class", "divShow")
        this.$refs.eye.innerHTML = "<i class=\"fas fa-eye eye\" style=\"color:  #ecbfac; position:relative; top: calc(50% - 10px); text-align: center; font-size: calc(1vh + 1.5vw);\"></i>"
      }

    }
  }
}
</script>

<style scoped>
.hoverButton1{
  color: orange;
  background-size: 100% 200%;
  border-radius: 0px;
  background-image: linear-gradient(to bottom, transparent 50%, white 50%);
  -webkit-transition: background-position 1s;
  -moz-transition: background-position 1s;
  transition: background-position 1s;
}

.hoverButton1:hover {
  background-position: 0% 100%;
}

.hoverButton2{
  color: orange;
  background-size: 100% 200%;
  border-radius: 0px;
  background-image: linear-gradient(to top, white 50%, transparent 50%);
  -webkit-transition: background-position 1s;
  -moz-transition: background-position 1s;
  transition: background-position 1s;
}

.hoverButton2:hover {
  background-position: 0 -100%;
}

@keyframes color-transition
{
  0% {color: #ef815c;}
  100 {color: #363537;}
}

.profileGrid{
  background-color: #39393b;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
}

.profileAvatarDiv{
  background-color: #2b2b2b;
  border-color: white;
  border-width: 2px;
  height: 30%;
  width: 80%;
  margin-left: 10%;
}

.inputLockDiv{
  align-self: center;
  align-content: center;
  width: 60%;
  height: 10%;
}

input:active{
  boder-color: transparent;
}

.passwordInput{
  width: 100%;
  height: 5vh;
  display: flex;
  flex-direction: row;
}

.passwordInput input{
  height: 4.9vh;
  padding: 0%;
  padding-bottom: 0.1vh;
  padding-left: 1%;
  margin: 0%;
  border: 0px;
  width: 85%;
  font-size: 100%;
}

.passwordInput .divHide{
  height: 5vh;
  width: 15%;
  background-color: #ecbfac;
  text-align: center;
}

.passwordInput .divShow{
  height: 5vh;
  width: 15%;
  background-color: #ef815c;
  text-align: center;
}

.inputLockDiv h3{
  width: 100%;
  margin-bottom: 0%;
  font-size: 90%;
}

.passwordInputField{
  width: 85%;
}

</style>