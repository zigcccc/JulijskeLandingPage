<template>
  <div class="single-destination" :id="destination.id" :style="sectionBackground">
    <div class="destination-container">
      <h2 class="destination-name" :class="{active : isActiveDestination}">{{ destination.name }}</h2>
      <p class="destination-description" :class="{active : isActiveDestination}">{{ destination.description }}</p>
      <div class="destination-cta-container" :class="{active : isActiveDestination}">
        <a :href="destination.url" target="_blank">discover {{ destination.name }}</a>
        <span><i class="fas fa-arrow-right"></i></span>
      </div>
      <div class="destination-images-container" :class="{active : isActiveDestination}">
        <destination-images :images="destination.images" :destination="destination.name" />
        <destination-clouds v-if="destination.images.length > 0" :destination="destination.name" :sectionOffset="sectionOffset" />
      </div>
    </div><!-- END destination-container -->
  </div>
</template>

<script>
import DestinationImages from '@/components/DestinationImages'
import DestinationClouds from '@/components/DestinationClouds'

export default {
  name: 'SingleDestination',
  components: {DestinationImages, DestinationClouds},
  data(){
    return {
      isInViewport: false,
      sectionOffset: 0,
      sectionPadding: window.innerHeight / 3,
      sectionBackground: {
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,.65),
            rgba(0,0,0,.65)
          ),
          url('/images/destinations/${this.destination.id}.png')
        `
      }
    }
  },
  props: {
    destination: {
      type: Object,
      required: true
    }
  },
  methods: {
    checkViewport(scrollTop) {
      let inFocus = scrollTop + this.sectionPadding > this.sectionOffset && scrollTop + this.sectionPadding < this.sectionOffset + this.$el.clientHeight;
      if (inFocus && this.destination !== this.$store.state.activeDestination) {
        this.$store.dispatch('setActiveDestination', this.destination)
      }
    }
  },
  computed: {
    isActiveDestination() {
      return this.destination.name === this.$store.state.activeDestination.name
    }
  },
  created() {
    document.addEventListener('scroll', e => {
      this.checkViewport(e.target.scrollingElement.scrollTop)
    })
  },
  mounted() {
    this.sectionOffset = this.$el.offsetTop + this.$store.state.heroHeight
  },
  destroyed() {
    document.removeEventListener('scroll', this.checkViewport)
  }
}
</script>

<style lang="sass" scoped>
.single-destination
  //height: 1075px
  min-height: 100vh
  padding-bottom: 100px
  overflow: hidden
  position: relative
  background:
    size: cover
    repeat: no-repeat
    attachment: fixed

.destination-container
  width: calc(75% + 2em)
  margin-left: auto
  padding: 30px 0 0 1em

.destination-name
  font-weight: 900
  font-size: 4.5em
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  +fadeInOnActive
  &::after
    content: ''
    width: 100px
    margin-left: 25px
    height: 4px
    border-radius: 200px
    background: $primary
    display: block
    margin-top: 10px

.destination-description
  margin-left: 25px
  margin-top: 2em
  text-align: justify
  max-width: 620px
  font-weight: 400
  line-height: 1.618
  font-family: $family-sans
  +fadeInOnActive

.destination-cta-container
  width: 100%
  padding: 0 25px
  margin-top: 75px
  display: flex
  justify-content: flex-start
  align-items: center
  position: relative
  z-index: 10
  +fadeInOnActive
  & > span
    position: relative
    z-index: 2
    font-size: 2em
    line-height: 1
    transform: translateY(-3px) translateX(-100%)
    +bounceTransition
    transition-delay: 200ms
    color: $primary
  & > a
    position: relative
    z-index: 3
    background: $primary
    border-radius: 200px
    padding: .75em 1.5em
    box-shadow: $shadow-3
    color: $white
    text-transform: uppercase
    font-weight: 900
    +bounceTransition
    &:hover
      transform: translate3d(0, -5px, 0)
      & + span
        transform: translateY(-3px) translateX(-10%)

.destination-images-container
  padding-top: 75px
  transform: translateX(100%)
  opacity: 0
  +easeTransition(750ms)
  &.active
    opacity: 1
    transform: translateX(0)
  //overflow: hidden
</style>

