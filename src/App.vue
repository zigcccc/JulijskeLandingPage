<template>
  <div id="app">
    <div v-if="isLoading" id="loader"></div>
    <Home />
  </div>
</template>

<script>
import SmoothScroll from 'smoothscroll-polyfill'
import Home from '@/pages/Home'

export default {
  name: 'app',
  components: {Home},
  computed: {
    isLoading() {
      return this.$store.getters.doneLoading
    }
  },
  created() {
    SmoothScroll.polyfill();
  },
  mounted() {
		this.$nextTick(() => {
      this.$store.dispatch('setAppLoading', false);
      this.$store.dispatch('setWindowWidth', window.innerWidth);
    });
    if(localStorage.getItem('lang')) {
      this.$store.dispatch('changeLanguage', localStorage.getItem('lang'));
    } else {
      this.$store.dispatch('changeLanguage', window.navigator.language);
    }
  }
}
</script>

<style lang="sass">
html,
body
  overflow-x: hidden
  background: $black
#loader
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $black
  z-index: 999999
#app
  font-family: $family-sans
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $black
</style>
