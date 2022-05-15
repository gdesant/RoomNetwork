<template>
  <div class="appContainer">

    <div class="RouterContainer">
      <router-view />
    </div>
    <Modal/>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Store } from "vuex";
import { StoreState } from "@/interfaces/StoreState";

export default class App extends Vue {
  $store!: Store<StoreState>;
  $mode!: number;
  created(){
    document.documentElement.setAttribute("class", "dark");
  }
}
</script>

<style>
@import './assets/styles/main.css';

.invisible{
  display: none;
}

.block{
  display: block;
}

.appContainer{
  height: 100vh;
  width: 100vw;
}

.ModalContainer{
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.RouterContainer{
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow-y: scroll;
  -ms-overflow-style: none;
  z-index: 0;
}

.RouterContainer::-webkit-scrollbar {
  display: none;
}
</style>
