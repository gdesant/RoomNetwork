<template>
  <div class="modalTemplate fx-c b-clr-3" >
    <div class="hp100 wp100 table">
      <h0 class="clr-1 table-c">Logging Out ?</h0>
    </div>
    <div class="hp100 wp100">
      <h2 class="clr-wht">Are you sure ?</h2>
    </div>
    <div class="hp120 wp100 fx-r">
      <button class="modalButton" @click="logout()"><h2 class="mop20">YES</h2></button>
      <button class="modalButton" @click="closeModal()"><h2 class="mop20">NO</h2></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "logoutModal",
  methods: {
    closeModal(){
      this.emitter.emit('closeModal')
    },
    logout(){
      this.emitter.emit('closeModal')
      this.emitter.emit('logout')
    }
  }
}
</script>

<style scoped>
.modalTemplate{
  width: 35vw;
  height: 30vh;
  text-align: center;
}
</style>