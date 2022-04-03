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
</style>
