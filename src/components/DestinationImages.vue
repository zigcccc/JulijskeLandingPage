<template>
  <div class="destination-images" :style="containerStyle">
    <div class="destination-images-controls">
      <span id="prev-image"><i class="fas fa-chevron-left"></i></span>
      <div class="images-controls-data">
        {{ activeImage + 1 }} <em>of</em> {{ images.length }}
      </div>
      <span id="next-image"><i class="fas fa-chevron-right"></i></span>
    </div>
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
</template>

<script>
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
      activeImage: 0
    }
  },
  computed: {
    containerStyle() {
      return {
        transform: `translateX(-${225 * this.activeImage}px)`
      }
    }
  },
  methods: {
    changeImage(i) {
      this.activeImage = i
    }
  }
}
</script>

<style lang="sass" scoped>
.destination-images
  display: flex
  align-items: center
  position: relative
  min-height: #{$destination-image-base-height * 2 + 20}
  +easeTransition(500ms)
  .image-container
    height: $destination-image-base-height
    min-width: 225px
    margin: 0 .5em
    box-shadow: $shadow-4
    display: flex
    +bounceTransition(400ms)
    transform-origin: center center
    border-radius: 5px
    overflow: hidden
    &.active
      height: 300px
      min-width: 450px
    & > img
      object-fit: cover

.destination-images-controls
  position: absolute
  top: -50px
  right: 0
  display: flex
  & > .images-controls-data
    margin: 0 1em
</style>
