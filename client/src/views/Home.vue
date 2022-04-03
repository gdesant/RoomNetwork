<template>
  <div class="home">
    <div class="router-link"><router-link  to="/login" >Login</router-link></div>
    <div class="router-link"><router-link  to="/register" >Register</router-link></div>
    <div class="router-link"><router-link  to="/dashboard" >Dashboard</router-link></div>
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
  margin: 30vh 15vw;
  width: 60vw;
  height: 40vh;
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

