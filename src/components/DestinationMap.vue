<template>
	<div id="destination-map">
		<destination-map-image :active-destination="activeDestination" :zoom="zoom" />
	</div>
</template>

<script>
import DestinationMapImage from '@/components/DestinationMapImage'
export default {
  components: { DestinationMapImage },
  props: {
    activeDestination: {
      type: Object,
      required: true
    },
    zoom: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLanguage;
    },
    destinationNames() {
      return Array.from(this.$store.getters.getDestinations).map(destination => {
        return {
          name: destination.name[this.language],
          id: destination.id
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
#destination-map
  height: calc(100vh - 350px)
  //max-height: 75vh 
  width: 1050px
  overflow: hidden
  position: relative
  z-index: 5

</style>
