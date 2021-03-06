<template>
	<div id="hero-background">
		<img :class="{loaded : siteLoaded, 'is-ie' : isOldMicrosoft}" :style="middleGroundStyle" id="middle-ground" class="hero-mountain" src="@/assets/cutted_background/middleGround.png" alt="Julian Alps">
		<img :class="{loaded : siteLoaded, 'is-ie' : isOldMicrosoft}" :style="frontGroundStyle" id="front-ground" class="hero-mountain" src="@/assets/cutted_background/frontGround.png" alt="Julian Alps">
		<img :class="{loaded : siteLoaded, 'is-ie' : isOldMicrosoft}" :style="frontHikerStyle" id="front-hiker" class="hero-mountain" src="@/assets/cutted_background/frontHiker.png" alt="Julian Alps">
		<div id="clouds">
			<div class="hero-clouds" id="cloud1">
				<img :style="cloudsStyle1" src="/images/Clouds_01.png" alt="Clouds in Julian Alps">
			</div>
			<div class="hero-clouds" id="cloud2">
				<img :style="cloudsStyle2" src="/images/Clouds_02.png" alt="Clouds in Julian Alps">
			</div>
			<div class="hero-clouds" id="cloud3">
				<img :style="cloudsStyle3" src="/images/Clouds_03.png" alt="Clouds in Julian Alps">
			</div>
			<div class="hero-clouds" id="cloud4">
				<img :style="cloudsStyle4" src="/images/Clouds_03.png" alt="Clouds in Julian Alps">
			</div>
			<div class="hero-clouds" id="cloud5">
				<img :style="cloudsStyle5" src="/images/Clouds_02.png" alt="Clouds in Julian Alps">
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
    },
    siteLoaded: {
      type: Boolean,
      required: true
    },
    pageOffset: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      middleGroundStyle: {
        transform: 'translate3d(0,0,0)',
        filter: 'blur(0) contrast(120%)'
      },
      frontGroundStyle: {
        transform: 'translate3d(0,0,0)'
      },
      frontHikerStyle: {
        transform: 'translate3d(0,0,0)'
      },
      cloudsStyle1: {
        transform: 'translate3d(0,0,0)'
      },
      cloudsStyle2: {
        transform: 'translate3d(0,0,0)'
      },
      cloudsStyle3: {
        transform: 'translate3d(0,0,0)'
      },
      cloudsStyle4: {
        transform: 'translate3d(0,0,0)'
      },
      cloudsStyle5: {
        transform: 'translate3d(0,0,0)'
      }
    }
  },
  methods: {
    parallax(scrollTop) {
      if (scrollTop < this.heroHeight) {
        let factor1 = (scrollTop / 50)
        let factor2 = (scrollTop / 20)
        this.middleGroundStyle.transform = `translate3d(0, ${factor1 * 8}%, 0) scale(${(factor1 / 20) + 1})`
        this.middleGroundStyle.filter = `blur(${factor2.toFixed(2)}px) contrast(120%)`
        this.frontGroundStyle.transform = `translate3d(0, ${factor1 * 20}%, 0) scale(${(factor1 / 7.5) + 1})`
        this.frontHikerStyle.transform = `translate3d(0, ${factor1 * 10}%, 0) scale(${(factor1 / 20) + 1})`
        this.cloudsStyle1.transform = `translate3d(0,${Math.floor(scrollTop / 3)}px, 0)`
        this.cloudsStyle2.transform = `translate3d(0,${Math.floor(scrollTop / 5)}px, 0)`
        this.cloudsStyle3.transform = `translate3d(0,${Math.floor(scrollTop / 4)}px, 0)`
        this.cloudsStyle4.transform = `translate3d(0,${Math.floor(scrollTop / 10)}px, 0)`
        this.cloudsStyle5.transform = `translate3d(0,${Math.floor(scrollTop / 2)}px, 0)`
      }
    }
  },
  computed: {
    isIE() {
      return this.$store.getters.getMicrosoft.isMicrosoft;
    },
    isOldMicrosoft() {
      return this.$store.getters.getMicrosoft.version <= 11;
    },
    offset() {
      return this.$props.pageOffset;
    }
  },
  watch: {
    offset(val) {
      this.parallax(val);
    }
  }
}
</script>

<style lang="sass" scoped>
.hero-mountain
  height: auto
  width: 100%
  position: absolute
  bottom: -100%
  z-index: 10
  &.is-ie
    &#middle-ground
      bottom: -60% !important
    &#front-ground
      bottom: -25% !important
    &#front-hiker
      bottom: 0 !important
  &.loaded
    &#middle-ground
      bottom: -35%
      @media screen and (max-width: 414px)
        bottom: -10%
    &#front-ground
      bottom: -15%
      @media screen and (max-width: 414px)
        bottom: -30%
    &#front-hiker
      bottom: 0
      @media screen and (max-width: 414px)
        bottom: -15%
  &#middle-ground
    z-index: 15
    transform-origin: bottom center
    transition: 1000ms ease-in-out bottom 1150ms
    @media screen and (max-width: 414px)
      width: auto
      max-width: none
      height: 365px
      left: -50%
  &#front-ground
    z-index: 20
    filter: contrast(130%)
    transform-origin: bottom center
    transition: 1000ms ease-in-out bottom 1150ms
    @media screen and (max-width: 414px)
      width: auto
      max-width: none
      height: 365px
      left: -50%
  &#front-hiker
    z-index: 100
    filter: contrast(110%)
    transform-origin: bottom center
    transition: 1000ms ease-in-out bottom 1150ms
    max-height: 320px
    width: auto
    right: 0
    @media screen and (max-width: 414px)
      width: auto
      max-width: none
      height: 365px
      left: -50%

#clouds
  #cloud1
    width: 250%
    left: -5%
    bottom: 45%
    animation: clouds-anim-4 ease-in-out 20s infinite

  #cloud2
    width: 200%
    left: -75%
    bottom: 25%
    animation: clouds-anim-3 ease-in-out 35s infinite
    @media screen and (max-width: 768px)
      bottom: 0

  #cloud3
    width: 150%
    left: -25%
    bottom: 18%
    animation: clouds-anim-2 ease-in-out 25s infinite
    @media screen and (max-width: 768px)
      bottom: 0
    
  #cloud4
    z-index: 50
    width: 100%
    right: -10%
    bottom: 7%
    animation: clouds-anim-1 ease-in-out 20s infinite
  #cloud5
    z-index: 50
    width: 50%
    right: 25%
    bottom: -5%
    animation: clouds-anim-3 ease-in-out 30s infinite
    animation-delay: 200ms

  .hero-clouds
    z-index: 10
    position: absolute
    bottom: 0
    display: flex
    justify-content: center
    width: 100%
    height: auto
    & > img
      max-height: 100%
      width: calc($container-width + 25%)
      object-fit: contain

@keyframes clouds-anim-1
  0%
    transform: translateX(0)
  50%
    transform: translateX(5%)
  100%
    transform: translateX(0)

@keyframes clouds-anim-2
  0%
    transform: translateY(0)
  50%
    transform: translateY(-15%)
  100%
    transform: translateY(0)

@keyframes clouds-anim-3
  0%
    transform: translateX(0)
  50%
    transform: translateX(10%)
  100%
    transform: translateX(0)

@keyframes clouds-anim-4
  0%
    transform: translateY(0)
  50%
    transform: translateY(-10%)
  100%
    transform: translateY(0)
</style>


