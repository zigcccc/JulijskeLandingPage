<template>
  <div id="app">
    <div id="loader" :class="{done : allLoaded}">
      <div class="loading-map-container">
        <span class="percentage" :class="{done : allLoaded}">{{ Math.floor(loadedPercent) }}%</span>
        <logo :class="{done : allLoaded}" accentColor="green" />
        <loading-map :percent="parseFloat(loadedPercent)" />
      </div>
      <!-- <div :class="{done : allLoaded}" class="line" :style="{minWidth: `${loadedPercent}%`}"></div> -->
    </div>
    <Home v-images-loaded:on.progress="imageProgress" />
  </div>
</template>

<script>
import SmoothScroll from 'smoothscroll-polyfill'
import imagesLoaded from 'vue-images-loaded'
import LoadingMap from '@/components/LoadingMap'
import Logo from '@/components/Logo'
import Home from '@/pages/Home'

export default {
  name: 'app',
  components: {Home, LoadingMap, Logo},
  directives: {
    imagesLoaded
  },
  data() {
    return {
      loadedImages: 0,
      loadedPercent: 0,
      allLoaded: false
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.doneLoading
    },
    allImages() {
      return document.querySelectorAll('img').length
    }
  },
  methods: {
    imageProgress(instance, image) {
      if (image.isLoaded) {
        this.loadedImages++;
      }
      this.loadedPercent = ((this.loadedImages / this.allImages) * 100).toFixed(2);
      if (this.loadedImages === this.allImages) {
        this.allLoaded = true
        this.$store.dispatch('setAppLoading', false);
        this.$store.dispatch('setWindowWidth', window.innerWidth);
      }
    }
  },
  created() {
    SmoothScroll.polyfill();
  },
  mounted() {
		this.$nextTick(() => {
    });
    if(localStorage.getItem('lang')) {
      this.$store.dispatch('changeLanguage', localStorage.getItem('lang'));
    } else {
      this.$store.dispatch('changeLanguage', window.navigator.language);
    }
  }
}
</script>

<style lang="sass">
html,
body
  overflow-x: hidden
  background: $black
#loader
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $black
  z-index: 999999
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  color: $white
  +easeTransition(500ms)
  transition-delay: 900ms
  opacity: 1
  &.done
    opacity: 0
    visibility: hidden
  span.percentage
    font-weight: 900
    font-size: 3em
    line-height: 1
    +easeTransition(500ms)
    transition-delay: 500ms
    position: absolute
    bottom: 0
    right: 0
    transform: translate(0, 0)
    @media screen and (max-width: 768px)
      bottom: 10px
    &.done
      opacity: 0
      visibility: hidden
  .logo
    +easeTransition(500ms)
    transition-delay: 500ms
    @media screen and (max-width: 768px)
      text-align: center
      margin-bottom: 1em
    &.done
      opacity: 0
      visibility: hidden

  .loading-map-container
    max-width: 25vw
    max-height: 25vh
    width: 100%
    height: 100%
    position: relative
    @media screen and (max-width: 768px)
      max-width: unset
      width: 90%
      margin: 0 auto
      max-height: unset
      height: auto
#app
  font-family: $family-sans
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $black
</style>
