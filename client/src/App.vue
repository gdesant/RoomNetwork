<template>
    <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Store } from "vuex";
import { StoreState } from "@/interfaces/StoreState";
export default class App extends Vue {
  $store!: Store<StoreState>;
}
</script>

<style lang="scss">
.main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #2c3e50;

  header {
    ul {
      list-style-type: none;
      padding: 0;
    }
  }
}
</style>
