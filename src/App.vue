<template>
  <div id="app">
    <hero />
    <destination-map />
    <destinations />
    <triglav-national-park />
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import DestinationMap from '@/components/DestinationMap'
import Destinations from '@/components/Destinations'
import TriglavNationalPark from '@/components/TriglavNationalPark'

export default {
  name: 'app',
  components: {Hero, DestinationMap, Destinations, TriglavNationalPark}
}
</script>

<style lang="sass">
html,
body
  overflow-x: hidden
#app
  font-family: $family-sans
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $black
</style>
