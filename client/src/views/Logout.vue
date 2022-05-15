<template>
  <div></div>
</template>

<script>
export default {
  name: "Logout",
  created() {
    localStorage.removeItem("token")
    this.$router.push("/home")
  },
}
</script>

<style scoped>

</style>