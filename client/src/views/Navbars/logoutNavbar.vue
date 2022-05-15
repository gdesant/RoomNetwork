<template>
  <div class="NavbarMainTop">
    <div class="nav-items-container fx-r wp100">
      <div class="nav-item" :class="(currentPath == '/home' || currentPath == '/' || currentPath == '') ? 'active' : ''" @click="switchView('/home')">
        <div class="nav-icon">
          <fa icon="house" class="nav-icon-fa" />
        </div>
      </div>
    </div>
    <div class="nav-items-container fx-rr wp100">
      <div class="nav-item"  @click="changeMode()">
        <div class="nav-icon">
          <fa icon="lightbulb" class="nav-icon-fa" />
        </div>
      </div>
      <div  class="nav-item" >
        <div ref="dropUser" class="nav-icon" @click="dropDown('dropDownUser', 'invisible', 'dropUser')">
          <fa icon="user" class="nav-icon-fa" />
        </div>
        <div ref="dropDownUser" class="navDropdownRight invisible fx-c">
          <div class="navDropItem b-clr-5 tac" :class="(currentPath == '/login') ? 'active' : ''" @click="switchView('/login')">
            <div>
              <fa icon="key" class="nav-icon-fa wp05 mrp20 vame" />
              <a class="vame">LOGIN</a>
            </div>
          </div>
          <div class="navDropItem b-clr-5 tac" :class="(currentPath == '/register') ? 'active' : ''" @click="switchView('/register')">
            <div>
              <fa icon="pencil" class="nav-icon-fa wp05 mrp20 pe-n vame" />
              <a class="pe-n vame">REGISTER</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "logoutNavbar",
  props: {
    currentType: Number,
    currentPath: String,
  },
  methods: {
    switchView(view){
      this.emitter.emit("navbarSwitchView", {view: view});
    },
    changeMode(){
      this.emitter.emit("changeStyle");
    },
    dropDown(ref, display, element){
        this.$refs[ref].classList.toggle(display)
        this.$refs[element].classList.toggle('active')
    },
  },
}
</script>

<style scoped>

</style>