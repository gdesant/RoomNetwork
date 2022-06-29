<template>
  <div class="fx-c modalTemplate  b-clr-3" >
    <div class="hp100 wp100 table">
      <h0 class="clr-1 table-c">{{ headStatusText }}</h0>
    </div>
    <div class="hp100 wp100">
      <h2 class="clr-wht">{{ bodyStatusText }}</h2>
    </div>
    <div class="hp120 wp100 fx-r">
      <button class="modalButton" @click="changeStatus()"><h2 class="mop20">YES</h2></button>
      <button class="modalButton"  @click="closeModal()"><h2 class="mop20">NO</h2></button>
    </div>
  </div>
</template>

<script>

export default {
  name: "statusFriendModal",
  props:{
    modalData: Object,
  },
  created() {
    console.log('MODAL DATA')
    console.log(this.$props.modalData)
  },
  methods: {
    closeModal(){
      this.emitter.emit('closeModal')
    },
    async changeStatus(){
      this.emitter.emit('updateFriendRequest', {id: this.$props.modalData.contact.friendsrequests.id  , status: this.$props.modalData.status, oldStatus: this.$props.modalData.contact.friendsrequests.status})
      this.closeModal()
    }
  },
  computed:{
    headStatusText(){
      switch (this.$props.modalData.status){
        case 0: return ('EJECT ' + this.contactTag)
        case 2:return  ('ARCHIVE CONTACT')
        case 3: return('BAN ' + this.contactTag)
        default: return ('')
      }
    },
    bodyStatusText(){
      let  buff = '';
      switch (this.$props.modalData.status){
        case 0: buff = 'eject'; break;
        case 2: buff = 'archive'; break;
        case 3: buff = 'ban'; break;
        default:
          buff = 'NAN'
      }
      return('Are you sure that you want to '+ buff + (this.$props.modalData.contact.friendsrequests.status == 1 ?  (' your friend ' + this.$props.modalData.contact.username) : (' the contact ' + this.$props.modalData.contact.username)))
    },
    contactTag(){
      return (this.$props.modalData.contact.friendsrequests.status == 1 ?  'FRIEND': 'CONTACT')
    },
  }
}
</script>

<style scoped>
.modalTemplate{
  position: fixed;
  width: 35vw;
  height: 30vh;
  top: 35vh;
  right: 32.5vw;
  left: 32.5vw;
  bottom: 35vh;
  text-align: center;
}
</style>