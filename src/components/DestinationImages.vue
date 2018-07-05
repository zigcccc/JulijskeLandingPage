<template>
  <div v-if="images.length > 0" class="destination-images">
    <div class="destination-images-controls">
      <span @click="toPrevImage" id="prev-image" :class="{disabled : activeImage === 0}"><i class="fas fa-chevron-left"></i></span>
      <div class="images-controls-data">
        {{ activeImage + 1 }} <em>of</em> {{ images.length }}
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
    }
  },
  data() {
    return {
      activeImage: 1,
      imageWidth: 255
    }
  },
  computed: {
    containerStyle() {
      return {
        transform: `translateX(-${this.imageWidth * this.activeImage}px)`
      }
    }
  },
  methods: {
    changeImage(i) {
      this.activeImage = i
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
      if (this.destination === this.$store.state.activeDestination.name) {
        if (key === 37) {
          this.toPrevImage();
        }
        if (key === 39) {
          this.toNextImage();
        }
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
    &.active
      height: $destination-image-active-height
      min-width: #{$destination-image-active-height * 1.5} 
    & > img
      object-fit: cover

.destination-images-controls
  position: absolute
  top: 5px
  right: 20px
  display: flex
  align-items: center
  font-size: 1.25em
  z-index: 10
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
    &.disabled
      opacity: .5
</style>
