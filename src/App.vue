<template>
  <div id="app">
    <div id="loader" :class="{done : allLoaded}">
      <span :class="{done : allLoaded}">{{ Math.floor(loadedPercent) }}%</span>
      <div :class="{done : allLoaded}" class="line" :style="{minWidth: `${loadedPercent}%`}"></div>
    </div>
    <Home v-images-loaded:on.progress="imageProgress" />
  </div>
</template>

<script>
import SmoothScroll from 'smoothscroll-polyfill'
import imagesLoaded from 'vue-images-loaded'
import Home from '@/pages/Home'

export default {
  name: 'app',
  components: {Home},
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
  transition-delay: 750ms
  opacity: 1
  &.done
    opacity: 0
    visibility: hidden
  span
    font-weight: 900
    margin-bottom: 1em
    +easeTransition(500ms)
    &.done
      opacity: 0
      visibility: hidden
      margin-bottom: 0
  .line
    min-height: 8px
    background: $white
    transition: 500ms ease-in-out transform, 250ms ease-in-out min-height 500ms
    &.done
      transform: rotate(90deg)
      min-height: 0
    //+simpleTransition(100ms)
#app
  font-family: $family-sans
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $black
</style>
