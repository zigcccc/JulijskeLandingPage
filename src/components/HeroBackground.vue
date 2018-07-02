<template>
  <div id="hero-background">
    <img :style="middleGroundStyle" id="middle-ground" class="hero-mountain" src="@/assets/sredina.png" alt="Julian Alps">
    <img :style="frontGroundStyle" id="front-ground" class="hero-mountain" src="@/assets/spredaj.png" alt="Julian Alps">
    <div id="clouds">
      <div class="hero-clouds" id="cloud1">
        <img src="/images/Clouds_01.png" alt="Clouds in Julian Alps">
      </div>
      <div class="hero-clouds" id="cloud2">
        <img src="/images/Clouds_02.png" alt="Clouds in Julian Alps">
      </div>
      <div class="hero-clouds" id="cloud3">
        <img src="/images/Clouds_03.png" alt="Clouds in Julian Alps">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroBackground',
  props: {
    heroHeight: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      middleGroundStyle: {
        perspective: '10px',
        transform: 'translate3d(0,0,0)',
        filter: 'blur(0) contrast(120%)'
      },
      frontGroundStyle: {
        perspective: '500px',
        transform: 'translate3d(0,0,0)'
      }
    }
  },
  methods: {
    parallax(scrollTop) {
      if (scrollTop < this.heroHeight) {
        let factor1 = window.map(scrollTop, 0, document.querySelector('body').clientHeight, 0, 2)
        let factor2 = window.map(scrollTop, 0, document.querySelector('body').clientHeight, 0, this.heroHeight / 4)
        this.middleGroundStyle.transform = `translate3d(0, -${factor2}%, ${factor1}px) scale(${(factor1 / 10) + 1})`
        this.middleGroundStyle.filter = `blur(${factor2}px) contrast(120%)`
        this.frontGroundStyle.transform = `translate3d(0, ${factor2 * 2}%, 0) scale(${(factor1) + 1})`
      }
    }
  },
  created(){
    document.addEventListener('scroll', e => {
      this.parallax(e.target.scrollingElement.scrollTop)
    })
  },
  destroyed(){
    document.removeEventListener('scroll', this.parallax)
  }
}
</script>

<style lang="sass" scoped>
.hero-mountain
  height: auto
  width: 100%
  position: absolute
  bottom: 0
  z-index: 10
  //+simpleTranstion
  &#middle-ground
    z-index: 5
  &#front-ground
    z-index: 20
    filter: contrast(130%)
    transform-origin: bottom center

#clouds
  #cloud1
    transform: translate3d(5%, 30%, 0)
    //background: red
  #cloud2
    transform: translate3d(0, 0, 0)
    //background: blue
  #cloud3
    transform: translate3d(5%, 30%, 0)
    //background: green
  .hero-clouds
    z-index: 10
    position: absolute
    bottom: 0
    display: flex
    justify-content: center
    width: 100%
    & > img
      max-height: 100%
      width: calc($container-width + 25%)
      object-fit: contain
</style>


