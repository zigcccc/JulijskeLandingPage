<template>
  <div id="app">
    <div v-if="isLoading" id="loader"></div>
    <main-menu />
    <hero />
    <destination-map-container />
    <destinations />
    <triglav-national-park />
    <site-footer />
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import Hero from '@/components/Hero'
import DestinationMapContainer from '@/components/DestinationMapContainer'
import Destinations from '@/components/Destinations'
import TriglavNationalPark from '@/components/TriglavNationalPark'
import SiteFooter from '@/components/SiteFooter'

import SmoothScroll from 'smoothscroll-polyfill'

export default {
  name: 'app',
  components: {MainMenu, Hero, DestinationMapContainer, Destinations, TriglavNationalPark, SiteFooter},
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
      this.$store.commit('setAppLoading', false);
      this.$store.commit('setWindowWidth', window.innerWidth);
		});
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
