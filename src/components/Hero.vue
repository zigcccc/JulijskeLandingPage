<template>
	<section id="hero" :style="{backgroundImage: `url(${bgimage})`}">
		<navbar :page-offset="pageOffset" :hero-height="heroHeight" />
		<hero-background :hero-height="heroHeight" :site-loaded="loaded" :page-offset="pageOffset" />
		<div class="container">
			<div class="hero-columns">
				<div class="hero-title" :class="{'is-ie' : isOldMicrosoft}">
					<h1 v-if="language === 'sl'" :style="titleStyle">Julijske<span>Alpe</span></h1>
					<h1 v-else :style="titleStyle">Julian<span>Alps</span></h1>
				</div>
				<div class="hero-intro" :class="{'is-ie' : isOldMicrosoft}">
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
  props: {
    pageOffset: {
      type: Number,
      required: true
    }
  },
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
    },
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
  methods: {
    getHeroHeight() {
      return this.$el.clientHeight;
    },
    scrollPastHero() {
      window.scrollTo({
        top: this.heroHeight + 1,
        behavior: 'smooth'
      })
      this.$ga.event({
        eventCategory: 'Hero CTA Click',
        eventAction: this.$store.getters.getWindowWidth > 768 ? 'Desktop' : 'Mobile',
        eventLabel: this.language
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
  watch: {
    offset(val) {
      this.parallax(val);
    }
  },
  mounted(){
    this.$store.dispatch('setHeroHeight', this.getHeroHeight());
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

.hero-columns
  margin-top: 45vh
  position: relative
  z-index: 10
  @media screen and (max-width: 1440px)
    margin-top: 30vh
  @media screen and (max-width: 768px)
    margin-top: 35vh
  @media screen and (max-width: 575px)
    margin-top: 30vh

  .hero-title
    display: flex
    justify-content: center
    padding-right: 0
    &.is-ie
      h1
        margin-top: -20%
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
      @media screen and (max-width: 575px)
        font-size: 6em
        display: flex
        flex-wrap: wrap
        justify-content: center
        text-align: center
      @media screen and (max-width: 345px)
        font-size: 4em
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
    &.is-ie
      margin-top: -8%
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
