<template>
  <div class="hinp100 winp100" :class="isOpen == true ? 'block' : 'invisible'">
    <div class="modalBack" @click="isOpen = false">

    </div>
    <logoutModal v-if="isOpen && modalType == 'logoutModal'"/>
    <statusFriendModal v-if="isOpen && modalType == 'statusFriendsModal'  && modalData != null"  :modalData="modalData"/>
  </div>

</template>

<script>
import logoutModal from "@/views/Modals/logoutModal";
import statusFriendModal from "@/views/Modals/Contacts/statusFriendModal"

export default{
  name: "Modal.vue",
  components: {logoutModal, statusFriendModal},
  data(){
    return {
      isOpen: false,
      modalType: '',
      modalData: null,
    }
  },
  mounted() {
    this.emitter.on('openModal', this.openModal)
    this.emitter.on('closeModal', this.closeModal)
  },
  methods: {
    closeModal(){
      this.$data.isOpen = false;
      this.$data.modalType = '';
      this.$data.modalData = null;

    },
    openModal(data){
      this.$data.isOpen = true;
      this.$data.modalType = data.type;
      this.$data.modalData = data.modalData;


    }
  }
}
</script>

<style>

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
  background-color: var(--fifth-color);
  -webkit-box-shadow: rgba(240, 240, 243, 0.1) 0px 7px 29px 0px;
  box-shadow: rgba(246, 246, 248, 0.1) 0px 7px 29px 0px;
}

.modalButton{
  border-radius: 0;
  width: 100%;
  height: 100%;
 }
</style>