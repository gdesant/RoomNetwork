<template>
  <div class="registerModal">
    <div class="registerChoice">
      <div class="registerTitle">
        <h1>Créer un compte</h1>
      </div>
      <form class="registerForm" @submit.prevent="registerUser">
        <div class="scrollableDiv" dir="rtl">
          <div class="inputDiv" dir="ltr">
            <h4>Username</h4>
            <input :class="register.username !== '' ? (usernameErr !== null ? 'invalidInput' : 'validInput') : 'emptyInput'" v-model="register.username" v-on:keyup="usernameErr = checkUsername(register.username)">
            <ul class="alertDiv" v-if="(usernameErr !== null && usernameErr.length > 0)">
              <li v-for="err in usernameErr" :key="err">
                - {{err}}
              </li>
            </ul>
          </div>
          <div class="inputDiv" dir="ltr">
            <h4>Email</h4>
            <input class="" :class="register.email !== '' ? (emailErr !== null ? 'invalidInput' : 'validInput') : 'emptyInput'" v-model="register.email" v-on:keyup="emailErr = checkEmail(register.email)">
            <ul class="alertDiv" v-if="(emailErr !== null && emailErr.length > 0)">
              <li v-for="err in emailErr" :key="err">
                - {{err}}
              </li>
            </ul>
          </div>
          <div class="inputDiv" dir="ltr">
            <h4>Mot de passe</h4>
            <input type="password" class="" :class="register.password !== '' ? ((passwordErr !== null) ? 'invalidInput' : 'validInput') : 'emptyInput'" v-model="register.password" v-on:keyup="passwordErr= checkPassword(register.password, 0)">
            <ul class="alertDiv" v-if="(passwordErr !== null && passwordErr.length > 0)">
              <li v-for="err in passwordErr" :key="err">
                - {{err}}
              </li>
            </ul>
          </div>
          <div class="inputDiv" dir="ltr">
            <h4>Confirmation : Mot de passe</h4>
            <input type="password" class="" :class="register.pass_conf !== '' ? ((passwordConfErr === null && register.password == register.pass_conf) ? 'validInput' : 'invalidInput') : 'emptyInput'" v-model="register.pass_conf" v-on:keyup="passwordConfErr = checkPassword(register.pass_conf, 1)">
            <ul class="alertDiv" v-if="(passwordConfErr !== null && passwordConfErr.length > 0)">
              <li v-for="err in passwordConfErr" :key="err">
                - {{err}}
              </li>
            </ul>
          </div>
        </div>
        <button class="registerButton" :disabled="!(usernameErr == null && emailErr == null && passwordErr == null && passwordConfErr == null && (register.password == register.pass_conf))" type="submit">REGISTER</button>

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
          this.$router.push("/dashboard")
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


<style>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700;900&display=swap');h2{
  margin: 1% 0%;
  color: #eaeaea;
  font-weight: 600;
  font-family: 'Titillium Web', sans-serif;
}

h1{
  color: #363535;
  font-weight: 600;
  width: 100%;
  font-size: calc(1.8vh + 1.8vw);
  font-family: 'Titillium Web', sans-serif;
}

h3{
  margin: 1% 0%;
  color: #cbcaca;
  font-weight: 200;
  font-family: 'Titillium Web', sans-serif;
}

h4{
  margin: 0.5% 0%;
  color: #afafaf;
  font-weight: 600;
  font-family: 'Titillium Web', sans-serif;
}

a{

  color: #cbcaca;
  font-weight: 200;
  font-family: 'Titillium Web', sans-serif;
}

.linkText{
  padding-left: 1%;
  color: #ee5522;
  font-weight: 400;
  font-size: 103%;
  font-family: 'Titillium Web', sans-serif;
  text-decoration: none;
}

.linkText:hover{
  color: #ef815c;
}

input{
  width: 90%;
  height: 5.5vh;
  margin: 0.5% 0.5% 0% 0.5%;
  padding-left: 3%;
  color: #B2B1B9;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
  background-color: #242324;
  border: solid 1px transparent;
}


.inputDiv{
  margin: 5% 0% 5% 2%;
}

.alertDiv{
  width: 90%;
  margin: 0% 0.5% 0.5% 0.5%;
  padding-left: 3%;
  padding-right: 4px;
  background-color: #626265;
  list-style-type: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 1px 6px rgba(0,0,0, .35);}

.alertDiv li{
  padding-left: 0%;
  color: orange;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
  font-size: calc(0.7vh + 0.7vw);
}

.emptyInput{
}
.emptyInput:focus{
  outline: solid 1px white;
}

.validInput{
  color: yellowgreen;
}
.validInput:focus{
  outline: solid 1px yellowgreen;
}

.invalidInput{
  color: orange;
}
.invalidInput:focus{
  outline: solid 1px orange ;
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
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;}

.registerModal{
  margin: 1vh 30vw 1vh 30vw;
  width: 40vw;
  height: 96vh;
  position:fixed;
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

.registerChoice{
  margin: 0vh 15%;
  width: 70%;
  height: 90vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  display: flex;
  flex-direction: column;
  -moz-animation: fadeIn 0.2s ease;
  -webkit-animation: fadeIn 0.2s ease;
  -o-animation: fadeIn 0.2s ease;
  -ms-animation: fadeIn 0.2s ease;
  animation: fadeIn 0.2s ease;
}

.registerForm{
  height: 65%;
  align-content: center;

}

.scrollableDiv{
  height: 100%;
  width: 78%;
  padding: 0% 11%;
  overflow-y: scroll;
  overflow-x: hidden;
  direction:rtl;
  background-color: #464547;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  align-content: baseline;
}

.scrollableDiv::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: rgba(255, 255, 255, 0.3);
}

.scrollableDiv::-webkit-scrollbar
{
  width: 12px;
  background-color: transparent;
}

.scrollableDiv::-webkit-scrollbar-thumb
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: orange;
}




p{
  padding-left: 10%;
  padding-right: 10%;
  font-size: calc(1.1vh + 1.1vw);
  width: 80%;
  height: 30vh;
  color: #B2B1B9;
}

.registerButton{
  margin: 5% 20%;
  width: 60%;
  height: 7vh;
  align-content: center;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 600;
  background-color: orange;
  color: #282727;
}

.registerButton:hover{
  background-color: #f1b13d;
  color: #282727;
}

.registerButton:disabled{
  background-color: #282727;
  color: rgba(255, 189, 71, 0.6);
}


/* --------------------- Animations --------------------- */

@keyframes fadeIn {
  0%{opacity: 0;}
  45% {opacity:0;}
  100% {opacity:1;}
}

@keyframes slide
{
  from {bottom: 100vh;}
  to {bottom: 0vh;}
}

</style>