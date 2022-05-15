<template>
    <loginNavbar v-if="this.$data.currentType == 1" :currentPath="currentPath" :currentType="currentType"></loginNavbar>
    <logoutNavbar v-else :currentPath="currentPath" :currentType="currentType"></logoutNavbar>
</template>

<script>
import loginNavbar from "./Navbars/loginNavbar";
import logoutNavbar from "./Navbars/loginNavbar";

export default {
  name: "Navbar",
  components: {loginNavbar, logoutNavbar},
  data(){
    return{
      currentType: 0,
      currentPath: '',
    }
  },
  methods: {
    switchView(data){
      if (this.$data.currentPath == data.view)
        return
      this.$router.push(data.view).then(() => {
        this.$data.currentType = this.$route.meta.type;
        this.$data.currentPath = this.$route.path;
      })
    },
    changeMode(){
        document.documentElement.classList.toggle('light')
        document.documentElement.classList.toggle('dark')
    },

  },
  created() {
    this.emitter.on("changeStyle", this.changeMode);
    this.emitter.on("navbarSwitchView", this.switchView);

  },
  watch:{
    $route (to, from){
      (void from)
      this.$data.currentType = to.meta.type;
      this.$data.currentPath = to.path;
    }
  }
}
</script>

<style>
.NavbarMainTop{
  height: 5vh;
  width: 100vw;
  display: flex;
  flex-direction: row;

  background-color: var(--navbar-color);
  transition: background-color 0.1s ease-in-out;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
}

.NavbarMainSide{
  height: 100vh;
  display: block;
  width: initial;
  transition: background-color 0.1s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}



.NavbarMainTop:before {
  position:absolute; top:5vh; width:100vw; height:1vh; content:''; background: linear-gradient(var(--navbar-color) -50%, transparent 100%);
  z-index: 1;
}

.nav-item{
  display: table;
  width: initial;
  text-align: center;
  cursor: pointer;
  color: var(--icon-color);
  background-color: var(--icon-b-color);
}

.NavbarMainTop .nav-item{
  height: 100%;
  width: 10%;
  max-width: 5vw;
}

.NavbarMainSide .nav-item{
  margin: 2px 0;
}

.nav-icon{
  width: initial;
  height: initial;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.nav-icon-fa{
  font-size: 150%;
  width: 65px;
  margin-inline: 2vw;
}

.nav-item:hover{
  color: var(--icon-color-hover);
  background-color: var(--icon-b-color-hover);
}

.active{
    color: var(--icon-color-active) !important;
    background-color: var(--icon-b-color-active) !important;
}

.active:hover{
  color: var(--icon-color-active);
  background-color: var(--icon-b-color-active);
}

.navDropdownRight{
  width: 25vw;
  height: 10vh;
  position: absolute;
  top: 5vh;
  right: 0vw;
  z-index: 1;
}

.navDropdownLeft{
  width: 25vw;
  height: 10vh;
  position: absolute;
  top: 5vh;
  right: -15vw;
  z-index: 1;
}

.navDropItem{
  min-width: 175px;
  height: 75px;
  display: block;
  width: initial;
  color: var(--icon-color);
  background-color: var(--icon-b-color);
  transition: all 0.1s ease-in-out;
  cursor: pointer;
}

.navDropItem:hover {
  color: var(--icon-color-hover);
  background-color: var(--icon-b-color-hover);
}
</style>