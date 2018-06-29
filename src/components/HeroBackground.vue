<template>
  <div id="hero-background">
    <img src="/images/mountain_left@2x.png" alt="Gorovje v Julijskih Alpah" id="mountain-left" class="hero-mountain">
    <img src="/images/mountain_right@2x.png" alt="Gorovje v Julijskih Alpah" id="mountain-right" class="hero-mountain">
    <div id="clouds">
      <div class="hero-clouds" id="cloud1">
        <img src="/images/Clouds_01.png" alt="Oblaki v Julijskih Alpah">
      </div>
      <div class="hero-clouds" id="cloud2">
        <img src="/images/Clouds_02.png" alt="Oblaki v Julijskih Alpah">
      </div>
      <div class="hero-clouds" id="cloud3">
        <img src="/images/Clouds_03.png" alt="Oblaki v Julijskih Alpah">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroBackground',
  methods: {
    parallax(scrollTop) {
      console.log(scrollTop)
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
  height: 100%
  position: absolute
  top: 0
  z-index: 10
  +easeTransition
  &#mountain-left
    left: -2.5%
    @media screen and (max-width: 1440px)
      left: -7.5%
  &#mountain-right
    right: -2.5%
    @media screen and (max-width: 1440px)
      right: -7.5%

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
    z-index: 1
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


