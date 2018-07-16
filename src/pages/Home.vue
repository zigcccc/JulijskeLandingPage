<template>
  <div id="home" :class="{done : !loading}">
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

export default {
  name: 'Home',
  components: {MainMenu, Hero, DestinationMapContainer, Destinations, TriglavNationalPark, SiteFooter},
  computed: {
    loading() {
      return !this.$store.getters.doneLoading;
    }
  }
}
</script>

<style lang="sass" scoped>
#home
  transform: translate3d(0, 5%, 0)
  opacity: 0
  +easeTransition(750ms)
  transition-delay: 700ms
  &.done
    transform: translate3d(0,0,0)
    opacity: 1
</style>

