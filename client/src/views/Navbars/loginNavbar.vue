<template>
  <div class="NavbarMainSide" >
    <div class="hp100 fx-r">
      <div class="NavbarSideContent hp100 fx-c " :class="currentSideBarState == true ? 'closedBar' : ''" style="background-color: var(--navbar-color);">
        <div class="hp100 fx-c">
          <div class="nav-item" id="itemNavTopContact">
            <div class="navDropItem tal" :class="(dashView == 'contacts') ? 'active' : ''" @click="switchDashView('contacts')">
              <div class="fx-r">
                <div class="navSideIcon navSideIconAnim">
                  <fa icon="user-group" size="xl"></fa>
                </div>
                <div class="navSideName">
                  <h3>Contacts</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item" id="itemNavTopRooms">
            <div class="navDropItem tal" :class="(dashView == 'rooms') ? 'active' : ''" @click="switchDashView('rooms')">
              <div class="fx-r">
                <div class="navSideIcon navSideIconAnim">
                  <fa icon="person-booth" size="xl"></fa>
                </div>
                <div class="navSideName">
                  <h3>Rooms</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item" id="itemNavTopAddons">
            <div class="navDropItem tal" :class="(dashView == 'addons') ? 'active' : ''" @click="switchDashView('addons')">
              <div class="fx-r">
                <div class="navSideIcon navSideIconAnim">
                  <fa icon="puzzle-piece" size="xl"></fa>
                </div>
                <div class="navSideName">
                  <h3>Addons</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item" id="itemNavTopDashboard">
            <div class="navDropItem tal" :class="(dashView == 'dashboard') ? 'active' : ''" @click="switchDashView('dashboard')">
              <div class="fx-r">
                <div class="navSideIcon navSideIconAnim">
                  <fa icon="table" size="xl"></fa>
                </div>
                <div class="navSideName">
                  <h3>Dashboard</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hp120 fx-r">
          <div class="nav-item pe-n" style="height: initial;" id="itemNavProfile">
            <div class="navDropItem tal pe-n"  style="height: 200px;  cursor: default">
              <div class="fx-r hp100"  style="  height: 200px;">
                <div class="navSideIcon  wp20" style="  height: 200px;">
                  <fa icon="user" size="xl"></fa>
                </div>
                <div class="navSideName b-clr-1 clr-4 wp80 tac" style="height: 200px; width: 160px">
                  <div style="height: 150px; width: 100%" class="b-clr-4">
                    <img :src="user.pp_url" class="pp">
                  </div>
                  <div style="height: 50px; width: 100%">
                    <h2 class="mip00 mop00">{{ user.username }}</h2>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hp100 fx-cr">

          <div class="nav-item" id="itemNavBotLogout">
            <div class="navDropItem tal" @click="logoutDash()">
              <div class="fx-r">
                <div class="navSideIcon slideItem">
                  <fa icon="arrow-right-from-bracket" size="xl"></fa>
                </div>
                <div class="navSideName">
                  <h3>Logout</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item" id="itemNavBotSecurity">
            <div class="navDropItem tal" :class="(dashView == 'security') ? 'active' : ''" @click="switchDashView('security')">
              <div class="fx-r">
                <div class="navSideIcon navSideIconAnim">
                  <fa icon="fingerprint" size="xl"></fa>
                </div>
                <div class="navSideName">
                  <h3>Security</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item" id="itemNavBotSettings">
            <div class="navDropItem tal" :class="(dashView == 'profile') ? 'active' : ''" @click="switchDashView('profile')">
              <div class="fx-r">
                <div class="navSideIcon navSideIconAnim">
                  <fa icon="gears" size="xl"></fa>
                </div>
                <div class="navSideName">
                  <h3>Profile</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item" id="itemNavBotLight">
            <div class="navDropItem tal" @click="changeMode()">
              <div class="fx-r">
                <div class="navSideIcon navSideIconAnim">
                  <fa icon="lightbulb" size="xl"></fa>
                </div>
                <div class="navSideName">
                  <h3>Light Mode</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="openerSideBar table" @click="opencloseSide()">
        <span class=" table-c vame wp100 hp100" ><fa icon="arrow-right" class="wp100" :class="currentSideBarState == true ? '' : 'fa-rotate-180'"/></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginNavbar",
  props: {
    user: Object,
  },
  data(){
    return {
      currentSideBarState: false,
      dashView: 'none',
    }
  },
  methods: {
    opencloseSide(){
      this.$data.currentSideBarState = !this.$data.currentSideBarState
    },
    switchDashView(newV){
      if (newV == this.$data.dashView)
        return
      console.log('New DashView : ' + newV)
      this.$data.dashView = newV;
      this.emitter.emit("navbarDashView", {newView: newV});

    },
    logoutDash(){
      this.emitter.emit("openModal", {type: 'logoutModal'});
    },
    changeMode(){
      this.emitter.emit("changeStyle");
    },
  }

}
</script>

<style scoped>
.iconFA{
  transition : transform 0.4s ease-in-out;
}

.closedBar .iconFA{

}

.pp{
  height: 120px;
  margin-bottom: 15px;
  margin-top: 15px;
  width: auto;
  border-radius: 50%;
  border: solid 3px var(--main-color);
}


.openerSideBar{
  width: 100px;
  height: 60px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background: linear-gradient(to top,var(--fourth-color) 50%, var(--main-color) 50%);
  background-size: 200% 200%;
  background-position: center bottom;
  color: var(--main-color);
  transition: all 0.1s ease-in-out;
  transition-delay: 0.3s;
}

.openerSideBar:before{
  position:absolute;
  top:59px;
  width:10px;
  height:96vh;
  content:'';
  background: linear-gradient(to top, var(--fourth-color) 50%, var(--main-color) 50%);
  background-size: 100% 250%;
  background-position: center bottom;
  transition: all 0.3s ease-in-out;
  transition-delay: 0.05s;
  z-index: 1;
}

.openerSideBar:hover{
  transition-delay: 0s;
  color: var(--fourth-color);
  background-position: center top;
}

.openerSideBar:hover:before{
  background-position: center top;
}

.sideBarOpen{

}

.NavbarSideContent{
  width: 210px;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}


.NavbarSideContent::-webkit-scrollbar {
  display: none;
}

.closedBar{
  width: 50px;
}

.navSideIcon{
  min-width: 50px;
  height: 75px;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  transition: all 0.2s ease-in-out;
}

.navDropItem:hover .navSideIconAnim{
  transform: scale(125%) rotate(0deg);
}

.closedBar .navDropItem:hover .navSideIconAnim{
  transform: scale(100%) rotate(-20deg) translate3d(0, -1vh, 0);
}

.active:hover  .navSideIconAnim{
  transform: scale(1) rotate(0);
}

.closedBar .active:hover  .navSideIconAnim{
  transform: scale(1) rotate(0);
}

.navDropItem:hover  .slideItem{
  -webkit-animation: slideInOut 0.3s forwards; /* for less modern browsers */
  animation: slideInOut 0.3s forwards;
}

.closedBar .navDropItem:hover  .slideItem{
  -webkit-animation: slideInOut 0.3s forwards; /* for less modern browsers */
  animation: slideInOut 0.3s forwards;
}




.navSideName{
  height: 75px;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:start;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  transition: all 0.2s ease-in-out;
}

.navSideGo{
  min-width: 50px;
  height: 75px;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center
}

@-webkit-keyframes slideInOut {

  0% {
    transform: scale(1) rotate(0) translate3d(0, 0, 0);
    -webkit-transform: scale(1) rotate(0) translate3d(0, 0, 0);
  }
  25% {
    transform: scale(1) rotate(0) translate3d(0.5vw, 0, 0);
    -webkit-transform: scale(1) rotate(0) translate3d(0.5vw, 0, 0);
  }
  75% {
    transform: scale(1) rotate(0) translate3d(-0.5vw, 0, 0);
    -webkit-transform: scale(1) rotate(0) translate3d(-0.5vw, 0, 0);
  }
  100% {
    transform: scale(1) rotate(0) translate3d(0.5vw, 0, 0);
    -webkit-transform: scale(1) rotate(0) translate3d(0.5vw, 0, 0);
  }
}

</style>