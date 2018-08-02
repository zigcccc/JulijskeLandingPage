<template>
  <div v-if="images.length > 0" class="destination-images">
    <div class="destination-images-controls" :class="{'align-left' : controlsAlign === 'left', 'align-right' : controlsAlign === 'right'}">
      <span @click="toPrevImage" id="prev-image" :class="{disabled : activeImage === 0}"><i class="fas fa-chevron-left"></i></span>
      <div class="images-controls-data">
        {{ activeImage + 1 }} <em>{{ language === 'sl' ? 'od' : 'of' }}</em> {{ images.length }}
      </div>
      <span @click="toNextImage" id="next-image" :class="{disabled : activeImage === images.length - 1}"><i class="fas fa-chevron-right"></i></span>
    </div>
    <div class="destination-images-inner" :style="containerStyle">
      <div 
        v-for="(image, i) in images"
        :key="image"
        class="image-container"
        :class="{active : i === activeImage}"
        @click="changeImage(i)"
      >
        <img :src="`/images/destinations/${image}`" :alt="destination" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'

export default {
  name: 'DestinationImages',
  props: {
    images: {
      type: Array,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    controlsAlign: {
      type: String,
      required: false,
      default: 'right'
    }
  },
  data() {
    return {
      activeImage: 1
    }
  },
  computed: {
    containerStyle() {
      return {
        transform: `translateX(-${(this.imageWidth + 16 ) * this.activeImage}px)`
      }
    },
    activeDestination() {
      return this.$store.getters.getActiveDestination;
    },
    pastDestinations() {
      return this.$store.getters.isPastDestinations;
    },
    imageWidth() {
      const windowWidth = this.$store.getters.getWindowWidth;
      if (windowWidth > 414) {
        return 255;
      } else if (windowWidth < 414 && windowWidth > 320) {
        return 150;
      } else {
        return 120
      }
    },
    language() {
      return this.$store.getters.getLanguage;
    }
  },
  methods: {
    changeImage(i) {
      this.activeImage = i;
      if (this.destination === this.activeDestination.id) {
        this.$ga.event({
          eventCategory: 'Destination Image Change',
          eventAction: this.destination,
          eventLabel: `Changed to image ${i + 1}`
        });
      }
    },
    toPrevImage() {
      if (this.activeImage > 0) {
        this.changeImage(this.activeImage - 1)
      }
    },
    toNextImage() {
      if (this.activeImage < this.images.length - 1) {
        this.changeImage(this.activeImage + 1)
      }
    },
    handleArrowKeys(key) {
      if (this.destination === this.$store.getters.getActiveDestination.id || this.$store.getters.isPastDestinations) {
        if (key === 37) {
          this.toPrevImage();
        }
        if (key === 39) {
          this.toNextImage();
        }
      }
    }
  },
  watch: {
    pastDestinations(cond) {
      if (cond) {
        this.changeImage(0);
      }
      else {
        if (this.$store.getters.getWindowWidth > 768) {
          this.changeImage(1);
        } else {
          this.changeImage(0)
        }
      }
    },
    activeDestination() {
      if (this.$store.getters.getWindowWidth > 768) {
        this.changeImage(1); 
      } else {
        this.changeImage(0);
      }
    }
  },
  created() {
    document.addEventListener('keydown', e => {
      _.debounce(this.handleArrowKeys(e.keyCode), 500, true)
    })
  },
  destroyed() {
    document.removeEventListener('keydown', this.handleArrowKeys)
  }
}
</script>

<style lang="sass" scoped>
.destination-images
  position: relative
  z-index: 10
.destination-images-inner
  display: flex
  align-items: center
  position: relative
  min-height: #{$destination-image-active-height + 20}
  +easeTransition(500ms)
  @media screen and (max-width: 414px)
    min-height: #{$destination-image-mobile-active-height + 20}
  @media screen and (max-width: 320px)
    min-height: #{$destination-image-small-active-height + 20}
  .image-container
    height: $destination-image-base-height
    min-width: #{$destination-image-base-height * 1.5}
    margin: 0 .5em
    box-shadow: $shadow-4
    display: flex
    +bounceTransition(400ms)
    transform-origin: center center
    border-radius: 5px
    overflow: hidden
    @media screen and (max-width: 414px)
      height: $destination-image-mobile-base-height
      min-width: #{$destination-image-mobile-base-height * 1.5}
    @media screen and (max-width: 320px)
      height: $destination-image-small-base-height
      min-width: #{$destination-image-small-base-height * 1.5}
    &.active
      height: $destination-image-active-height
      min-width: #{$destination-image-active-height * 1.5} 
      @media screen and (max-width: 414px)
        height: $destination-image-mobile-active-height
        min-width: #{$destination-image-mobile-active-height * 1.5}
      @media screen and (max-width: 320px)
        height: $destination-image-small-active-height
        min-width: #{$destination-image-small-active-height * 1.5}
    & > img
      object-fit: cover

.destination-images-controls
  position: absolute
  top: -45px
  display: flex
  align-items: center
  font-size: 1.25em
  z-index: 10
  &.align-left
    left: 0
  &.align-right
    right: 20px
    @media screen and (max-width: 414px)
      right: unset
      left: 10px
  & > .images-controls-data
    margin: 0 1em
    font-weight: 900
    em
      margin: 0 .25em
      font-weight: 300
  & > span
    font-size: 1.75em
    text-shadow: 0 5px 10px rgba(0,0,0,.5)
    +bounceTransition
    &:hover
      transform: scale(1.25)
      cursor: pointer
      &.disabled
        transform: scale(1)
        cursor: default
        text-shadow: none
    &.disabled
      opacity: .5
      text-shadow: none
</style>
