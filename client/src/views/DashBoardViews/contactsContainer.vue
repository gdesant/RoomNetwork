<template>
  <div class="hp90 mop0a wp100 b-clr-4">
    <div class="hp10 wp100 tac clr-1">
      <h1>Contacts</h1>
    </div>
    <div class=" hp10 wp100 tac clr-wht">
      <h3 class="mop0a">Here you can add, remove and manage your contacts !</h3>
    </div>
    <div style="width: 1088px; height: 60%" class="mip0a">
      <div class="hp10 wp100 b-clr-1">
        <div class="hp100 wp100">
          <div class="hp100 mip0a fx-r" style="width: calc(100% - 6px); height: calc(100% - 3px); border: 3px solid var(--main-color); flex-grow: 0; flex-shrink: 0">
            <div class="hp100 b-clr-1" style="width: calc(1088px*0.7)">
              <input class="hp100 pop00 pip20 mip0a stand" style="width: 96%; border: none" placeholder="enter your research">
            </div>
            <div class="hp100 b-clr-1" style="width: 2px">

            </div>
            <div class="hp100 b-clr-3 fx-r" style="width: calc(calc(1088px*0.3) - 2px)">
              <div class="wp90 hp90 mip05 mop15 b-clr-1 clr-4 table gridIcon">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="user-group"></fa>
                </div>
              </div>
              <div class="wp90 hp90 mip05 mop15 b-clr-1 clr-4 table gridIcon">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="user-plus"></fa>
                </div>
              </div>
              <div class="wp90 hp90 mip05 mop15 b-clr-1 clr-4 table gridIcon">
                <div class="wp100 hp100 table-c">
                  <fa size="2x" icon="user-xmark"></fa>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="emptyDashPanelMain hp90 mip0a b-clr-3">
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>
        <div class="emptyDashPanel contactCard b-clr-4"></div>


      </div>
    </div>


  </div>

</template>

<script>
export default {
  name: "contactsContainer"
}
</script>

<style scoped>
.contactCard{
  width: 250px;
  height: 150px;
}
.gridIcon>div>svg{
  transition: all 0.2s ease-in-out;
}
.gridIcon:hover>div>svg{
  transform: scale(1.2);
}


</style>