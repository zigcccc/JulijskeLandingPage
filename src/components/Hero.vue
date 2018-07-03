<template>
  <section id="hero" :style="{backgroundImage: `url(${bgimage})`}">
    <navbar :heroHeight="heroHeight" />
    <hero-background :heroHeight="heroHeight" />
    <div class="container">
      <div class="columns hero-columns">
        <div class="column hero-title">
          <h1 :style="titleStyle">Julian<span>Alps</span></h1>
        </div>
        <div class="column hero-intro">
          <p :style="titleStyle" class="intro-paragraph">Explore the beauty of the pure and intact nature, surrounding this gorgeous destination.</p>
        </div>
      </div>
    </div><!-- END .container -->
    <div class="hero-cta-container">
      <a @click.prevent="scrollPastHero">explore <span><i class="fas fa-chevron-down"></i></span></a>
    </div>
  </section>
</template>

<script>
import HeroBackground from '@/components/HeroBackground'
import Navbar from '@/components/Navbar'
export default {
  name: 'Hero',
  components: {Navbar, HeroBackground},
  data(){
    return {
      bgimage: '/images/julian_alps_05.png',
      titleStyle: {
        transform: 'translate3d(0,0,0)'
      }
    }
  },
  computed: {
    heroHeight() {
      return this.$store.state.heroHeight;
    }
  },
  methods: {
    getHeroHeight() {
      return this.$el.clientHeight;
    },
    scrollPastHero() {
      window.scrollTo({
        top: this.heroHeight - 100,
        behavior: 'smooth'
      })
    },
    parallax(scrollTop) {
      if (scrollTop < this.heroHeight) {
        let factor1 = window.map(scrollTop, 0, this.heroHeight, 0, 25).toFixed(2);
        this.titleStyle.transform = `translate3d(0,${factor1}%,0)`
      }
    }
  },
  created(){
    document.addEventListener('scroll', e => {
      this.parallax(e.target.scrollingElement.scrollTop)
    })
  },
  mounted(){
    this.$store.dispatch('setHeroHeight', this.getHeroHeight());
  },
  destroyed(){
    document.removeEventListener('scroll', this.parallax)
  }
}
</script>

<style lang="sass" scoped>
#hero
  position: relative
  height: $hero-height
  overflow: hidden
  background:
    repeat: no-repeat
    size: cover
    position: 0% 50%
  @media screen and (max-width: 1440px)
    height: calc(#{$hero-height} - 75px)

.hero-columns
  margin-top: 25vh
  position: relative
  z-index: 10

  .hero-title
    display: flex
    justify-content: flex-end
    padding-right: 10vw
    h1
      font-size: 9.25em
      line-height: 1
      font-weight: 900
      color: $white
      margin-top: -10%
      text-shadow: 0 5px 10px rgba(0,0,0,.2)
      text-align: right
      & > span
        display: block
        color: $primary

  .hero-intro
    font-size: 1.4em
    color: $white
    font-weight: 600
    margin-top: .75em
    & > p
      text-shadow: 0 3px 6px rgba(0,0,0,.5)

.hero-cta-container
  position: absolute
  bottom: 1.5em
  z-index: 10000
  width: 100%
  display: flex
  justify-content: center
  font-size: 1.25em
  text-transform: uppercase
  font-weight: 900
  & > a
    padding: .5em 1.5em
    box-shadow: $shadow-3
    border-radius: 200px
    display: flex
    align-items: center
    background: $primary
    color: $white
    +bounceTransition(500ms)
    &:hover
      box-shadow: $shadow-5
      transform: translateY(-4px)
      background: darken($primary, 5%)
    & > span
      margin-left: .5em
      margin-top: 2px
      transform: translateY(-50%)
      animation: arrowAnimation ease-in-out 2s infinite

@keyframes arrowAnimation
  0%
    transform: translateY(-10%)
  50%
    transform: translateY(10%)
  100%
    transform: translateY(-10%)
</style>
