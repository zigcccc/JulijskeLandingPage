<template>
  <section id="hero" :style="{backgroundImage: `url(${bgimage})`}">
    <navbar :heroHeight="heroHeight" />
    <hero-background :heroHeight="heroHeight" :siteLoaded="loaded" />
    <div class="container">
      <div class="hero-columns">
        <div class="hero-title">
          <h1 v-if="language === 'sl'" :style="titleStyle">Julijske<span>Alpe</span></h1>
          <h1 v-else :style="titleStyle">Julian<span>Alps</span></h1>
        </div>
        <div class="hero-intro">
          <p v-if="language === 'sl'" :style="titleStyle" class="intro-paragraph">Raziščite lepote neokrnjene narave, ki obdaja to čudovito in slikovito pokrajino.</p>
          <p v-else :style="titleStyle" class="intro-paragraph">Explore the beauty of the pure and intact nature, surrounding this gorgeous destination.</p>
        </div>
      </div>
    </div><!-- END .container -->
    <div class="hero-cta-container">
      <a @click="scrollPastHero">{{ language === 'sl' ? 'razišči' : 'explore' }} <span><i class="fas fa-chevron-down"></i></span></a>
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
      bgimage: '/images/background_02.jpg',
      titleStyle: {
        transform: 'translate3d(0,0,0)'
      }
    }
  },
  computed: {
    heroHeight() {
      return this.$store.state.heroHeight;
    },
    language() {
      return this.$store.getters.getLanguage;
    },
    loaded() {
      return this.$store.getters.doneLoading;
    }
  },
  methods: {
    getHeroHeight() {
      return this.$el.clientHeight;
    },
    scrollPastHero() {
      window.scrollTo({
        top: this.heroHeight + 1,
        behavior: 'smooth'
      })
    },
    parallax(scrollTop) {
      if (scrollTop < this.heroHeight) {
        let factor1 = -(scrollTop / 4);
        this.titleStyle.transform = `translate3d(0,${factor1}px,0)`
        if (this.$store.state.isPastHero === true) {
          this.$store.dispatch('pastHero', false);
        }
      }

      if (scrollTop > this.heroHeight) {
        if (this.$store.state.isPastHero === false)
        this.$store.dispatch('pastHero', true);
      }
      
    }
  },
  created(){
    window.addEventListener('resize', () => {
      this.$store.dispatch('setHeroHeight', this.getHeroHeight());
    })
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
    position: 0% 0%
  @media screen and (max-width: 1440px)
    //height: calc(#{$hero-height} - 75px)

.hero-columns
  margin-top: 40vh
  position: relative
  z-index: 10
  @media screen and (max-width: 1440px)
    margin-top: 30vh
  @media screen and (max-width: 768px)
    margin-top: 35vh
  @media screen and (max-width: 414px)
    margin-top: 20vh

  .hero-title
    display: flex
    justify-content: center
    padding-right: 0
    @media screen and (max-width: 768px)
      padding-right: 0
      justify-content: center
    h1
      font-size: 9.25em
      line-height: 1
      font-weight: 900
      color: $black
      margin-top: -10%
      text-shadow: 0 5px 10px rgba(0,0,0,.2)
      text-align: right
      @media screen and (max-width: 768px)
        display: flex
        font-size: 7em
      @media screen and (max-width: 414px)
        font-size: 6em
        display: flex
        flex-wrap: wrap
        justify-content: center
        text-align: center
      & > span
        color: $primary

  .hero-intro
    font-size: 1.4em
    color: $black
    font-weight: 600
    margin-top: .75em
    text-align: center
    max-width: 700px
    margin: .75em auto 0
    @media screen and (max-width: 768px)
      font-size: 1.2em
      text-align: center
      max-width: 75%
      display: block
      margin: 1em auto 0
    & > p
      text-shadow: 0 3px 6px rgba(0,0,0,.2)

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
