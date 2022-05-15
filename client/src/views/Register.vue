<template>
  <div class="registerModal a-s-bt b-clr-4">
    <div class="registerSubModal mop50 mip0a fx-c">
      <div class="wp100 hp10 tac">
        <h2 class="clr-1 hp100 wp100">Créer un compte</h2>
      </div>
      <form class="wp100 fx-c" @submit.prevent="registerUser">
        <div class="wp80 mop50 mip0a fx-c" dir="rtl">
          <div class="registerInput fx-c" dir="ltr">
            <h4 class="clr-2 mbp05">USERNAME</h4>
              <input :class="register.username !== '' ? (usernameErr !== null ? 'invalidInput' : 'validInput') : 'emptyInput'" v-model="register.username" v-on:keyup="usernameErr = checkUsername(register.username)">
              <ul class="alertDiv" v-if="(usernameErr !== null && usernameErr.length > 0)">
                <li v-for="err in usernameErr" :key="err">
                  - {{err}}
                </li>
              </ul>
          </div>
          <div class="registerInput fx-c" dir="ltr">
            <h4  class="clr-2 mbp05">EMAIL</h4>
            <input class="" :class="register.email !== '' ? (emailErr !== null ? 'invalidInput' : 'validInput') : 'emptyInput'" v-model="register.email" v-on:keyup="emailErr = checkEmail(register.email)">
            <ul class="alertDiv" v-if="(emailErr !== null && emailErr.length > 0)">
              <li v-for="err in emailErr" :key="err">
                - {{err}}
              </li>
            </ul>
          </div>
          <div class="registerInput fx-c" dir="ltr">
            <h4 class="clr-2 mbp05">PASSWORD</h4>
            <input type="password" :class="register.password !== '' ? ((passwordErr !== null) ? 'invalidInput' : 'validInput') : 'emptyInput'" v-model="register.password" v-on:keyup="passwordErr= checkPassword(register.password, 0)">
            <ul class="alertDiv" v-if="(passwordErr !== null && passwordErr.length > 0)">
              <li v-for="err in passwordErr" :key="err">
                - {{err}}
              </li>
            </ul>
          </div>
          <div class="registerInput fx-c" dir="ltr">
            <h4 class="clr-2 mbp05">CONFIRM PASSWORD</h4>
            <input type="password" class="" :class="register.pass_conf !== '' ? ((passwordConfErr === null && register.password == register.pass_conf) ? 'validInput' : 'invalidInput') : 'emptyInput'" v-model="register.pass_conf" v-on:keyup="passwordConfErr = checkPassword(register.pass_conf, 1)">
            <ul class="alertDiv" v-if="(passwordConfErr !== null && passwordConfErr.length > 0)">
              <li v-for="err in passwordConfErr" :key="err">
                - {{err}}
              </li>
            </ul>
          </div>
        </div>
        <button class="registerButton wp75 mtp35 mip0a" :disabled="!(usernameErr == null && emailErr == null && passwordErr == null && passwordConfErr == null && (register.password == register.pass_conf))" type="submit"><h2 class="mop00 pop00">REGISTER</h2></button>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from "../services/UsersService";
import axios from "axios";

export default {
  data() {
    return {
      register: {
        username: "",
        email:"",
        password: "",
        pass_conf: ""
      },
      usernameErr: [],
      emailErr: [],
      passwordErr: [],
      passwordConfErr: [],
      message: ""
    };
  },
  methods: {
    checkUsername(username){
      const err = new Array()

      if(username == '')
        return err

      if (username.length < 6)
        err.push("Username too short ! Min 6 char")
      if (username.length > 25)
        err.push("Username too long ! Max 25 char")
      if (err.length > 0)
        return err
      return null
    },
    checkEmail(email) {
      const err = new Array()
      if(email == '')
        return err
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(email))
        return (null)
      err.push("Invalid email adress !")
      return err
    },
    checkPassword(password, type){
      let strength = 0;
      let err = new Array();

      if (password == '')
        return err

      if (type === 1){
        if (this.register.password !== this.register.pass_conf)
          err.push("Doesn't match your password !")
      }


      if (password.length < 8) {
        err.push("You password is too short. At least 8 char are required !")
      }


      if (!password.match(/[a-z]+/)) {
        err.push("Your password missing a Min Letter !")
      }
      else
        strength += 1;

      if (!password.match(/[A-Z]+/)) {
        err.push("Your password missing a Maj Letter !")
      }
      else
        strength += 1;

      if (!password.match(/[0-9]+/)) {
        err.push("Your password missing a Number !")
      } else
        strength += 1;

      if (!password.match(/[$@#&!._-]+/)) {
        err.push("Your password missing a Special Character !")
      } else
        strength += 1;

      void(strength)

      if (err.length > 0)
        return err
      return null
    },
    async registerUser() {
      if (this.register.password !== this.register.pass_conf && this.register.password !== '') {
        this.message = "Passwords do not match"
        return
      }
      try {
        let response = await UsersService.register({username: this.register.username, email: this.register.email, password: this.register.password})
        let token = response.token
        console.log('RESPONSE LOGIN : ', response)
        if (token){
          localStorage.setItem("token", token)
          axios.defaults.headers.post['Authorization'] = 'Bearer ' + token
          this.$router.push("/dashboardContainers")
        }else{
          console.log('error: ', response)
        }
      } catch (err) {
        console.log(err);
        this.message = err.response.data
      }
    }
  }
}
</script>


<style scoped>


.registerModal{
  min-height: 55vh;
  width: 50vw;
  margin-inline: auto;
  margin-top: 7.5vh;
  margin-bottom: 3vh;
  border-radius: calc(0.25vh + 0.25vw);
  position:relative;
  display: flex;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.registerSubModal{
  width: 57vw;
  margin: 1.5vw;
}

.registerInput{
  min-height: 2vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.registerButton{
  min-height: 5vh;
}


.alertDiv{
  width: auto;
  margin: 0 0 0 0;

  padding: 1%;
  padding: 1% 0 1% 1%;
  padding-right: 0;
  background-color: var(--fifth-color);
  list-style-type: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 1px 6px rgba(0,0,0, .35);}

.alertDiv li{
  padding-left: 0;
  color: var(--white-color);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.registerTitle{
  margin-top: 2%;
  width: 100%;
  text-align: center;
  align-content: center;
  background-color: orange;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

</style>