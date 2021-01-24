<template>
  <div id="app">
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  components:{
    Footer
  }
}
</script>

<style lang="scss">
/* Стили для прижатия футера к низу страницы */
html, body {
  height: 100%;
}
#app{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
}
</style>