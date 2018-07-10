<template>
  <main id="destinations">
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
    }
  }
}
</script>

<style lang="sass" scoped>
#destinations
  width: 75vw
  min-height: 2000px
  box-shadow: 5px 0 10px 0 rgba(0,0,0,0.4)
  position: relative
  z-index: 10000
  background: $black
  color: $white
  @media screen and (max-width: 768px)
    width: 100vw
</style>
