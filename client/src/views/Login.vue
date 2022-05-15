<template>
  <div class="loginModal a-s-bt b-clr-4">
    <div class="wp100 hp100">
      <div class="wp100 hp85 fx-c topBox">
        <h2 class="clr-1 tac mtp25 mbp20">Welcome back !</h2>
        <form class="fx-c wp100 hp85" @submit.prevent="loginUser">
          <div class="wp80 hp30 mip0a fx-c">
            <h4 class="mlp15 mbp15 hp25 wp50  mtp15 clr-2">EMAIL OU USERNAME</h4>
            <input class="mlp15 hp30 wp90" type="text" v-model="login.username">
          </div>
          <div class="wp80 hp30 mip0a fx-c">
            <h4 class="mlp15 mbp15 hp25 wp50  mtp15 clr-2">MOT DE PASSE</h4>
            <input class="mlp15 hp30 wp90" v-model="login.password" type="password">
          </div>
          <div class="wp80 hp20 mip0a mtp20 fx-c">
            <button class="mlp60 wp80 hp100 " type="submit"><h2 class="mop00 mip0a">LOGIN</h2></button>
          </div>
        </form>
      </div>
      <div class="hp15 wp100 b-clr-3 botBox">
        <span class="hp100 wp90 mip20 b-clr-tsp fx-r">
          <a class="clr-wht mop50">Create an account </a>
          <router-link class="mop50" to="/register"><a class="mlp50 clr-1">here</a></router-link>
        </span>

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
        this.$router.push("/dashboard")
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

.loginModal{
  height: 50vh;
  width: 60vw;
  margin-inline: auto;
  margin-top: 18vh;
  border-radius: calc(0.25vh + 0.25vw);
  position:relative;
  display: flex;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

</style>