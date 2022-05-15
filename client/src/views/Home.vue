<template>
  <div class="home a-s-bt b-clr-4 fx">
    <div class="hp100 wp100 fx-c">
      <div class="hp95 mop25 wp100">
        <button class="tac curs-point mip25 wp95 hp100 mop00"><h2 class="clr-4 mop00" @click="switchView('/login')">LOGIN</h2></button>
      </div>
      <div class="hp95 mop25 wp100">
        <button class="tac curs-point mip25 wp95 hp100 mop00">  <h2 class="clr-4 mop00" @click="switchView('/logout')">LOGOUT</h2></button>
      </div>
      <div class="hp95 mop25 wp100">
        <button class="tac curs-point mip25 wp95 hp100 mop00">  <h2 class="clr-4 mop00" @click="switchView('/register')">REGISTER</h2></button>
      </div>
      <div class="hp95 mop25 wp100">
        <button class="tac curs-point mip25 wp95 hp100 mop00">  <h2 class="clr-4 mop00" @click="switchView('/dashboard')">DASHBOARD</h2></button>
      </div>
    </div>
  </div>
</template>

<script>
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
    printHeaders(header) {
      console.log(header)
    },
    switchView(view) {
      this.$router.push(view).then(() => {
        console.log(this.$route.meta)
      })
    },
  }
}
</script>

<style>
.home{
  height: 60vh;
  width: 60vw;
  margin-inline: auto;
  margin-top: 18vh;
  position:relative;
  border-radius: calc(0.25vh + 0.25vw);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

</style>

