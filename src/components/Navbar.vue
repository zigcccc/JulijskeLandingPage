<template>
  <nav :class="{'is-hidden' : isPastHero}">
      <div class="left-side">
        <social-links :style="{marginRight: '2em'}" location="navbar" />
        <a href="#" class="influencers">
          <img src="@/assets/ikonaKameraInverted.svg" alt="Influencers in Julian Alps">
          {{ language === 'en' ? 'For influencers' : 'Za "influencerje"' }}
        </a>
      </div>
      <div class="logo-container">
        <Logo mainColor="black" accentColor="green" />
      </div>
      <div class="right-side">
        <a href="#" class="influencers tablet">
          <img src="@/assets/ikonaKameraInverted.svg" alt="Influencers in Julian Alps">
          {{ language === 'en' ? 'For influencers' : 'Za influencerje' }}
        </a>
        <a @click.prevent="scrollToTNP" class="tnp">
          {{ language === 'en' ? 'Triglav National Park' : 'Triglavski narodni park' }}
          <img src="@/assets/ikonaGoraInverted.svg" alt="Triglav National Park">
        </a>
        <div @click="toggleMenu" class="menu-icon">
          {{ menuText }}
          <img src="@/assets/MenuInverted.svg" alt="Meni">
        </div>
      </div>
  </nav>
</template>

<script>
import SocialLinks from '@/components/SocialLinks'
import Logo from '@/components/Logo'
export default {
  name: 'Navbar',
  components: {SocialLinks, Logo},
  props: {
    heroHeight: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      isPastHero: false
    }
  },
  computed: {
    menuOpen() {
      return this.$store.state.menuOpen;
    },
    menuText() {
      if (this.language === 'en') {
        return this.$store.getters.getWindowWidth > 414 ? 'Destinations' : 'Menu'
      } else {
        return this.$store.getters.getWindowWidth > 414 ? 'Destinacije' : 'Meni'
      }
    },
    language() {
      return this.$store.getters.getLanguage;
    }
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch('toggleMenu');
    },
    scrollTop(offset) {
      offset > (this.heroHeight - (this.heroHeight / 2)) ? this.isPastHero = true : this.isPastHero = false
    },
    scrollToTNP() {
      window.scrollTo({
        top: document.querySelector('#triglav-national-park').offsetTop,
        behavior: 'smooth'
      })
    }
  },
  created(){
    document.addEventListener('scroll', e => {
      this.scrollTop(e.target.scrollingElement.scrollTop)
    })
  },
  destroyed() {
    document.removeEventListener('scroll', this.scrollTop)
  }
}
</script>

<style lang="sass" scoped>
nav
  position: fixed
  top: 0
  width: 100%
  //z-index: 100
  padding: 10px 2em 0
  display: flex
  justify-content: space-between
  align-items: center
  @media screen and (max-width: 414px)
    padding: 1em 1em 0
  &.is-hidden
    position: relative
.left-side
  min-width: 33%
  display: flex
  align-items: center
  @media screen and (max-width: 1024px)
    display: none

.influencers
  display: flex
  align-items: center
  color: $black
  font-weight: 300
  font-size: 14px
  &.tablet
    display: none
    @media screen and (max-width: 1024px)
      display: flex
      flex-direction: row-reverse
      margin-right: 1.5em
    @media screen and (max-width: 414px)
      display: none
  &:hover
    cursor: pointer
    color: $black
    & > img
      transform: scale(1.25)
  & > img
    height: 45px
    display: flex
    margin-top: 4px
    +bounceTransition(400ms)

.logo-container
  position: relative
  &::before,
  &::after
    content: ''
    width: 20vw
    max-width: 200px
    height: 2px
    background: $primary
    display: block
    position: absolute
    top: 50%
    @media screen and (max-width: 1360px)
      max-width: 150px
    @media screen and (max-width: 1300px)
      max-width: 100px
    @media screen and (max-width: 1024px)
      display: none
  &::before
    left: -75%
    transform: translate3d(-50%, -50%, 0)
    @media screen and (max-width: 1300px)
      left: -50%
    @media screen and (max-width: 1300px)
      left: -25%
  &::after
    right: -75%
    transform: translate3d(50%, -50%, 0)
    @media screen and (max-width: 1300px)
      right: -50%
    @media screen and (max-width: 1300px)
      right: -25%

.right-side
  display: flex
  align-items: center
  justify-content: flex-end
  font-weight: 300
  color: $black
  font-size: 14px
  min-width: 33%
  .menu-icon
    display: flex
    align-items: center
    margin-left: 2em
    position: relative
    z-index: 10
    &:hover
      cursor: pointer
      & > img
        transform: scale(1.25) rotate(90deg)
    & > img
      margin-left: 1em
      +bounceTransition(400ms)

  .tnp
    display: flex
    align-items: center
    color: $black
    font-weight: 300
    @media screen and (max-width: 414px)
      display: none
    &:hover
      & > img
        cursor: pointer
        transform: scale(1.25)
    & > img
      height: 35px
      margin-top: 2px
      margin-left: .5em
      +bounceTransition

</style>
