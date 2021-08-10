<template>
  <div class="home">
    <div class="router-link"><router-link  to="/login" >Login</router-link></div>
    <div class="router-link"><router-link  to="/register" >Register</router-link></div>
    <div class="router-link"><router-link  to="/dashboard" >Dashboard</router-link></div>
    <button @click="printHeaders(this.headers)"></button>
  </div>
</template>

<script lang="ts">
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
    printHeaders(header: any) {
      console.log(header)
    },
  }
}
</script>

<style>
.home{
  margin: 15vh 25vw;
  width: 100vw;
  height: 100vh;
  background-color: #363537;
  display: flex;
  flex-direction: column;
}

.router-link{
  width: 45vw;
  height: 30vh;
  margin: 2.5vh;
}
</style>

