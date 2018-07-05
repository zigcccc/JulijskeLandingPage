<template>
  <div class="destination-clouds">
    <div class="image-cloud" id="cloud1" :style="cloudStyle1">
      <img src="/images/Clouds_02.png" alt="Clouds in Julian Alps">
    </div>
    <div class="image-cloud" id="cloud2" :style="cloudStyle2">
      <img src="/images/Clouds_03.png" alt="Clouds in Julian Alps">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DestinationClouds',
  props: {
    destination: {
      type: String,
      required: true
    },
    sectionOffset: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cloudStyle1: {
        transform: `translate3d(0,0,0)`
      },
      cloudStyle2: {
        transform: `translate3d(0,0,0)`
      }
    }
  },
  methods: {
    cloudParallax(scrollTop) {
      if (this.destination === this.$store.state.activeDestination.name) {
        let factor1 = -((scrollTop - this.sectionOffset) / 6).toFixed(2) + 50;
        let factor2 = -((scrollTop - this.sectionOffset) / 12).toFixed(2) + 50;

        this.cloudStyle1.transform = `translate3d(0, ${factor1}%, 0)`;
        this.cloudStyle2.transform = `translate3d(0, ${factor2}%, 0)`;
      }
    }
  },
  created() {
    document.addEventListener('scroll', e => {
      this.cloudParallax(e.target.scrollingElement.scrollTop)
    })
  },
  destroyed() {
    document.removeEventListener('scroll', this.cloudParallax)
  }
}
</script>

<style lang="sass" scoped>
.destination-clouds
  .image-cloud
    position: absolute
    bottom: 0
    left: 0
    right: unset
    max-width: 150%
    &#cloud1
      bottom: 10%
      left: -50%
    &#cloud2
      bottom: 5%
      left: -45%
</style>
