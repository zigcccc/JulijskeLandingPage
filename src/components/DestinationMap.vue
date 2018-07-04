<template>
  <aside :style="{top: `${heroHeight}px`}" :class="[{fixed : isPastHero}, activeDestination.id]" id="map">
    <h3>Location of the destination.</h3>
    <div class="map-container"></div>
    <div class="map-cta-container">
      <a :href="destinationMapUrl" target="_blank">See location <span><i class="fas fa-chevron-right"></i></span></a>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'DestinationMap',
  computed: {
    heroHeight() {
      return this.$store.state.heroHeight;
    },
    destinations() {
      return this.$store.getters.getDestinations
    },
    activeDestination() {
      return this.$store.state.activeDestination
    },
    destinationMapUrl() {
      return this.$store.state.activeDestination.mapUrl
    },
    isPastHero() {
      return this.$store.state.isPastHero
    }
  }
}
</script>

<style lang="sass" scoped>
#map
  position: absolute
  right: 0
  width: 25vw
  background:
    image: url('/images/patterns/topography.png')
    repeat: repeat
    size: 600px 600px
  height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  &.fixed
    position: fixed
    top: 0 !important

h3
  font-weight: 900
  color: $black
  text-shadow: 0 5px 10px rgba(0,0,0,.2)

.map-cta-container
  display: flex
  justify-content: center
  & > a
    padding: 1em
    display: flex
    align-items: center
    text-transform: uppercase
    font-weight: 900
    color: $primary
    text-shadow: 0 5px 10px rgba(0,0,0,.2)
    &:hover
      & > span
        transform: translateX(1em)
    & > span
      margin-left: 1em
      margin-top: 1px
      +bounceTransition
</style>

