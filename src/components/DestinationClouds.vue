<template>
  <div class="destination-clouds">
    <div class="image-cloud" id="cloud1" :style="cloudStyle1" :class="{animated : animation, tnp : destination === 'tnp', video : destination === 'video'}">
      <img src="/images/Clouds_02.png" alt="Clouds in Julian Alps">
    </div>
    <div class="image-cloud" id="cloud2" :style="cloudStyle2" :class="{animated : animation, tnp : destination === 'tnp', video : destination === 'video'}">
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
      required: false
    },
    sectionOffset: {
      type: Number,
      required: false
    },
    animation: {
      type: Boolean,
      required: false,
      default: false
    },
    parallax: {
      type: Boolean,
      required: false,
      default: false
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
  computed: {
    isIE() {
      return this.$store.getters.getMicrosoft.isMicrosoft;
    }
  }, 
  methods: {
    cloudParallax(scrollTop) {
      if(this.parallax) {
        if (this.destination === this.$store.state.activeDestination.id) {
          let factor1 = -((scrollTop - this.sectionOffset) / 6).toFixed(2) + 50;
          let factor2 = -((scrollTop - this.sectionOffset) / 12).toFixed(2) + 50;

          this.cloudStyle1.transform = `translate3d(0, ${factor1}%, 0)`;
          this.cloudStyle2.transform = `translate3d(0, ${factor2}%, 0)`;
        }
      }
    }
  },
  created() {
    document.addEventListener('scroll', e => {
      if (this.isIE) {
        this.cloudParallax(document.documentElement.scrollTop);
      } else {
        this.cloudParallax(e.target.scrollingElement.scrollTop);
      } 
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
    &.animated
      animation-timing-function: ease-in-out
      animation-iteration-count: infinite
    &#cloud1
      bottom: 10%
      left: -50%
      &.tnp
        left: -25%
        bottom: -35%
      &.video
        left: -15%
        @media screen and (max-width: 768px)
          display: none
        &.animated
          animation-duration: 30s
          animation-name: cloud-anim-3
      &.animated
        animation-duration: 30s
        animation-name: cloud-anim-1
    &#cloud2
      bottom: 5%
      left: -45%
      &.tnp
        left: -15%
      &.video
        left: 0
        @media screen and (max-width: 768px)
          display: none
        &.animated
          animation-duration: 35s
          animation-name: cloud-anim-4
      &.animated
        animation-duration: 35s
        animation-name: cloud-anim-2

@keyframes cloud-anim-1
  0%
    transform: translate3d(0,0,0)
  50%
    transform: translate3d(25%,-15%,0)
  100%
    transform: translate3d(0,0,0)

@keyframes cloud-anim-2
  0%
    transform: translate3d(0,0,0)
  50%
    transform: translate3d(-15%,20%,0)
  100%
    transform: translate3d(0,0,0)

@keyframes cloud-anim-3
  0%
    transform: translate3d(0,0,0)
  50%
    transform: translate3d(-15%,5%,0)
  100%
    transform: translate3d(0,0,0)

@keyframes cloud-anim-4
  0%
    transform: translate3d(0,0,0)
  50%
    transform: translate3d(15%,5%,0)
  100%
    transform: translate3d(0,0,0)
</style>
