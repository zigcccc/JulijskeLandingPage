<template>
  <div class="single-destination" :class="{'old-explorer' : isOldExplorer}" :id="destination.id" :style="sectionBackground">
    <div class="destination-container">
      <h2 class="destination-name" :class="{active : isActiveDestination || isOldExplorer}">{{ destination.name[language] }}</h2>
      <p class="destination-description" :class="{active : isActiveDestination || isOldExplorer}">{{ destination.description[language] }}</p>
      <div class="destination-cta-container" :class="{active : isActiveDestination || isOldExplorer}">
        <a @click="handleDestinationCtaClick" :href="destination.url" target="_blank">{{ destination.cta_text[language] }}</a>
        <span><i class="fas fa-arrow-right"></i></span>
      </div>
      <div class="destination-images-container" :class="{active : isActiveDestination || isOldExplorer}">
        <destination-images :images="destination.images" :destination="destination.id" controlsAlign="right" />
        <destination-clouds v-if="destination.images.length > 0" :destination="destination.id" :sectionOffset="sectionOffset" :animation="false" :parallax="true" />
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
          url('/images/destinations/${this.destination.id}.jpg')
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
      if (inFocus && this.destination !== this.$store.getters.getActiveDestination) {
        this.$store.dispatch('setActiveDestination', this.destination)
        this.$ga.event({
          eventCategory: 'Destination View',
          eventAction: this.destination.name[this.language],
          eventLabel: this.language
        });
      }
    },
    handleDestinationCtaClick() {
      this.$ga.event({
        eventCategory: 'Destination CTA Click',
        eventAction: this.destination.url,
        eventLabel: this.language
      });
    }
  },
  computed: {
    isActiveDestination() {
      if (this.$store.getters.getActiveDestination.name && !this.$store.getters.isPastDestinations) {
        return this.destination.name === this.$store.getters.getActiveDestination.name
      }
      else {
        return false
      }
    },
    language() {
      return this.$store.getters.getLanguage;
    },
    isIE() {
      return this.$store.getters.getMicrosoft.isMicrosoft;
    },
    isOldExplorer() {
      return this.$store.getters.getMicrosoft.version <= 11;
    }
  },
  created() {
    document.addEventListener('scroll', e => {
      if(this.isIE) {
        return
      }
      this.checkViewport(e.target.scrollingElement.scrollTop);
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
  min-height: 100vh
  padding-bottom: 100px
  overflow: hidden
  position: relative
  background:
    size: cover
    repeat: no-repeat
    attachment: fixed
  &.old-explorer
    background-size: cover
    background-attachment: scroll !important
  @media screen and (max-width: 414px)
    background-size: cover
    background-attachment: scroll !important

.destination-container
  width: calc(75% + 2em)
  margin-left: auto
  padding: 30px 0 0 1em
  @media screen and (max-width: 768px)
    width: calc(100% - 3em)
  @media screen and (max-width: 414px)
    width: 100%
    padding: 30px 1em 0

.destination-name
  font-weight: 900
  font-size: 4.5em
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  +fadeInOnActive
  @media screen and (max-width: 414px)
    font-size: 3em
  &::after
    content: ''
    width: 100px
    margin-left: 25px
    height: 4px
    border-radius: 200px
    background: $primary
    display: block
    margin-top: 10px
    @media screen and (max-width: 414px)
      width: 75px
      margin-left: 3px

.destination-description
  margin-left: 25px
  margin-top: 2em
  text-align: justify
  max-width: 620px
  font-weight: 400
  line-height: 1.618
  font-family: $family-sans
  +fadeInOnActive
  @media screen and (max-width: 414px)
    max-width: 100%
    margin: 1.5em 3px 0

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
  @media screen and (max-width: 768px)
    justify-content: center
    margin-top: 50px
  @media screen and (max-width: 414px)
    margin-top: 40px
    justify-content: center
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
    text-align: center
    font-size: .95em
    box-shadow: $shadow-3
    color: $white
    text-transform: uppercase
    font-weight: 900
    +bounceTransition
    @media screen and (max-width: 768px)
      transform: translate3d(7%, 0, 0)
    &:hover
      transform: translate3d(0, -5px, 0)
      @media screen and (max-width: 768px)
        transform: translate3d(7%, -5px, 0)
      & + span
        transform: translateY(-3px) translateX(-10%)
        @media screen and (max-width: 768px)
          transform: translate3d(17%, -3px, 0)

.destination-images-container
  padding-top: 75px
  transform: translateX(100%)
  opacity: 0
  +easeTransition(750ms)
  @media screen and (max-width: 768px)
    padding-top: 50px
    margin-left: 20px
  @media screen and (max-width: 414px)
    margin-left: 0
    margin-top: 20px
  &.active
    opacity: 1
    transform: translateX(0)
  //overflow: hidden
</style>

