<template>
  <div id="app" :class="{'popup-active' : influencersPopupActive}">
    <div id="loader" :class="{done : allLoaded}">
      <div class="loading-map-container">
        <logo :class="{done : allLoaded}" mainColor="black" accentColor="green" />
        <slovenija-line-map :percent="parseFloat(loadedPercent)" />
      </div>
    </div>
    <Home v-images-loaded:on.progress="imageProgress" />
  </div>
</template>

<script>
import SmoothScroll from 'smoothscroll-polyfill'
import imagesLoaded from 'vue-images-loaded'
import SlovenijaLineMap from '@/components/SlovenijaLineMap'
import Logo from '@/components/Logo'
import Home from '@/pages/Home'

export default {
  name: 'app',
  components: {Home, Logo, SlovenijaLineMap},
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
    },
    influencersPopupActive() {
      return this.$store.getters.influencersPopupState;
    },
    menuOpen() {
      return this.$store.getters.menuState;
    }
  },
  methods: {
    imageProgress(instance, image) {      
      if (image.isLoaded) {
        this.loadedImages++
      }
      this.loadedPercent = ((this.loadedImages / this.allImages) * 100).toFixed(2);
      if (this.loadedImages === this.allImages) {
        this.allLoaded = true
        this.$store.dispatch('setAppLoading', false);
        this.$store.dispatch('setWindowWidth', window.innerWidth);
      }
    },
    determineSafari(){
      const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isSafari && iOS) {
        this.$store.dispatch('setIosSafari', true);
      }
    },
    preventScroll() {
      if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', event =>  event.preventDefault(), false);
      }
      window.onwheel = event => event.preventDefault();
      window.onmousewheel =  document.onmousewheel = event => event.preventDefault();
      window.ontouchmove  = event =>  event.preventDefault();
      document.onkeydown  = event => {
        ([38, 40].indexOf(event.keyCode) > -1) ? event.preventDefault() : null;
      }
    },
    enableScroll() {
      if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', event => event.preventDefault(), false);
      }
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;
    }
  },
  created() {
    SmoothScroll.polyfill();
  },
  mounted() {
    if(localStorage.getItem('lang')) {
      this.$store.dispatch('changeLanguage', localStorage.getItem('lang'));
    } else {
      this.$store.dispatch('changeLanguage', window.navigator.language);
    }
    this.determineSafari();
  },
  watch: {
    influencersPopupActive(cond) {
      if (cond) {
        this.preventScroll()
      } else {
        this.enableScroll()
      }
    },
    menuOpen(cond) {
      if (cond) {
        this.preventScroll()
      } else {
        this.enableScroll()
      }
    }
  }
}
</script>

<style lang="sass">
html,
body
  overflow-x: hidden
  background: $black
#app
  &::after
    content: ''
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    visibility: hidden
    opacity: 0
    +easeTransition(500ms)
  &.popup-active
    &::after
      background: transparentize($black, .1)
      z-index: 100000000
      visibility: hidden
      opacity: 1
      visibility: visible
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
  transition-delay: 1500ms
  opacity: 1
  &.done
    opacity: 0
    visibility: hidden
  .logo
    +easeTransition(500ms)
    transition-delay: 750ms
    text-align: center
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-75%, -50%)
    z-index: 10
    opacity: 0
    &.done
      opacity: 1
    @media screen and (max-width: 768px)
      text-align: center
      margin-bottom: 1em

  .loading-map-container
    max-width: 75vh
    max-height: 75vh
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
