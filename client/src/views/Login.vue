<template>
  <div class="loginModal">
    <div class="loginChoice">
      <div class="loginDiv">
        <h2>Welcome back !</h2>
        <h3>We hope you'll have some fun !</h3>
        <form class="loginForm" @submit.prevent="loginUser">
          <div class="inputDiv">
            <h4>Email ou username</h4>
            <input v-model="login.username">
          </div>
          <div class="inputDiv">
            <h4>Mot de passe</h4>
            <input v-model="login.password" type="password">
          </div>
          <button class="buttonDiv" type="submit">Login</button>
          <div v-if="error" class="">
            <p class="">{{ error }}</p>
          </div>
        </form>

        <div style="  margin-top: 4%;display: flex; flex-direction: row">
          <a>Create an account </a>
          <a href="/register" class="linkText">
            here
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "../services/UsersService"

export default {
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      error: "",
    }
  },
  methods: {
    async loginUser() {
      console.log('fonction loginUser')
      try {
        let response = await UsersService.login(this.login)
        let token = response.token
        console.log("Token : " + response)
        localStorage.setItem("token", token)
        this.$router.push("/dashboardContainers")
      } catch (err) {
        this.login.error = err.response.data
        console.log(err.response.data)
        this.$router.push("/login")
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

h3{
  margin: 1% 0%;
  color: #cbcaca;
  font-weight: 200;
  font-family: 'Titillium Web', sans-serif;
}

h4{
  margin: 1% 0%;
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
  width: 80%;
  height: 5vh;
  margin: 0.5% 2%;

}

input:focus{
  outline-color: #ee5522;
}

.loginForm{
  margin: 5% 0%;
}

.inputDiv{
  margin: 3% 0%;
}


.loginModal{
  margin: 17.5vh 20vw 17.5vh 20vw;
  width: 60vw;
  height: 65vh;
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

.loginChoice{
  width: 100%;
  height: 60vh;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  display: flex;
  flex-direction: row;
  -moz-animation: fadeIn 0.2s ease;
  -webkit-animation: fadeIn 0.2s ease;
  -o-animation: fadeIn 0.2s ease;
  -ms-animation: fadeIn 0.2s ease;
  animation: fadeIn 0.2s ease;
}

.loginDiv{
  margin-left: 3%;
  width: 65%;
  height: 100%;
  align-content: center;
}

p{
  padding-left: 10%;
  padding-right: 10%;
  font-size: calc(1.1vh + 1.1vw);
  width: 80%;
  height: 30vh;
  color: #B2B1B9;
}

button{
  width: 60%;
  height: 7vh;
  border-radius: 2px;
  font-size: calc(1.3vh + 1.3vw);
  background-color: #595260;
  color: #B2B1B9;
  border-style: none;
  margin-right: 10%;
  margin-left: 30%;
}

button:hover{
  background-color: #595260;
  color: #B2B1B9;

}

button:active{
  background-color: #595260;
  color: #B2B1B9;

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