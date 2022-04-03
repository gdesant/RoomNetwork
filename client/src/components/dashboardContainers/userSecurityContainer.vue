<template>
  <div class="securityDiv">
    <div class="securityGrid">
      <div class="securityItem">
          <div class="itemDesc">
            <p class="itemDescData">Public Account :</p>
          </div>
          <div class="itemData">
            <label class="switch">
              <input type="checkbox" v-model=user.publicAccount>
              <span class="slider round"></span>
            </label>
          </div>
      </div>
      <div class="securityItem">
        <div class="itemDesc">
          <p class="itemDescData">Public Email :</p>
        </div>
        <div class="itemData">
          <label class="switch">
            <input type="checkbox" v-model=user.publicEmail>
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  name: "ProfileSecurityContainer",
  props:{
    publicAccount: Boolean,
    publicEmail: Boolean,
  },
  data() {
    return {
      user: {
        publicAccount: false,
        publicEmail: false,
      },
    }
  },
  created() {
    this.user.publicAccount = this.publicAccount;
    this.user.publicEmail = this.publicEmail;
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
          if (response.data === true){
            localStorage.removeItem("token")
            this.$router.push('/')
            console.log("You have been log out of the website !")
          }
          else {
            localStorage.removeItem("token")
            this.$router.push('/')
            console.log("You have been log out of the website !")
          }
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
.hidden{
  visibility: hidden;
}

.securityDiv{
  background-color: #39393b;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
}

.securityGrid{
  width: 80%;
  height: 90%;
  margin: 5% 10%;
}

.securityItem{
  width: 100%;
  height: 15%;
  margin: 4% 0%;
  display: flex;
  flex-direction: row;
  border-radius: 0.5vh 0.5vw;
  background-color: #4a4a4b;
}

.itemDesc{
  width: 75%;
  height: 100%;
  display: table;
}

.itemDescData{
  position: relative;
  display: table-cell;
  vertical-align: middle;
  text-align: left;
  height: 50%;
  width: 100%;
  margin: auto;
}

.itemData{
  width: 25%;
  height: 100%;
  display: flex;
}


/*Slider*/

.switch {
  position: relative;
  vertical-align: middle;
  display: flex;
  margin: auto;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


</style>