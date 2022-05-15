<template>
  <div class="hinp100 winp100" :class="isOpen == true ? 'block' : 'invisible'">
    <div class="modalBack" @click="isOpen = false"></div>
    <div class="modalBase"></div>
  </div>

</template>

<script>
export default{
  name: "Modal.vue",
  data(){
    return {
      isOpen: true,
    }
  }
}
</script>

<style scoped>

.modalTemp{
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
}

.modalBack{
  background-color: var(--fourth-color);
  opacity: 85%;
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
}

.modalBase{
  background-color: var(--third-color);
  height: 50vh;
  width: 50vw;
  margin: 25vh 25vw;
}
</style>