<template>
  <main id="destinations" :class="{'full-width' : microsoft}">
    <destination-navigation />
    <single-destination
      v-for="destination in destinations"
      :key="destination.id"
      :destination="destination"
    />
  </main>
</template>

<script>
import DestinationNavigation from '@/components/DestinationNavigation'
import SingleDestination from '@/components/SingleDestination'

export default {
  name: 'Destinations',
  components: { DestinationNavigation, SingleDestination },
  computed: {
    destinations() {
      return this.$store.getters.getDestinations
    },
    microsoft() {
      return this.$store.getters.isMicrosoft;
    }
  }
}
</script>

<style lang="sass" scoped>
#destinations
  width: 75vw
  box-shadow: 5px 0 10px 0 rgba(0,0,0,0.4)
  position: relative
  z-index: 10000
  background: $black
  color: $white
  &.full-width
    width: 100vw
  @media screen and (max-width: 768px)
    width: 100vw
</style>
