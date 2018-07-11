<template>
  <nav :class="{'is-hidden' : isPastHero}">
      <div class="left-side">
        <social-links :style="{marginRight: '2em'}" />
        <a href="#" class="influencers">
          <img src="@/assets/ikonaKamera.svg" alt="Influencers in Julian Alps">
          For influencers
        </a>
      </div>
      <div class="logo-container">
        <Logo />
      </div>
      <div class="right-side">
        <a @click.prevent="scrollToTNP" class="tnp">
          Triglav National Park
          <img src="@/assets/ikonaGora.svg" alt="Triglav National Park">
        </a>
        <div @click="toggleMenu" class="menu-icon">
          Destinations
          <img src="@/assets/Menu.svg" alt="Meni">
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
  &.is-hidden
    position: relative
.left-side
  min-width: 33%
  display: flex
  align-items: center
  .influencers
    display: flex
    align-items: center
    color: $white
    font-weight: 300
    font-size: 14px
    &:hover
      cursor: pointer
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
  &::before
    left: -75%
    transform: translate3d(-50%, -50%, 0)
  &::after
    right: -75%
    transform: translate3d(50%, -50%, 0)

.right-side
  display: flex
  align-items: center
  justify-content: flex-end
  font-weight: 300
  color: $white
  font-size: 14px
  min-width: 33%
  .menu-icon
    display: flex
    align-items: center
    margin-left: 2em
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
    color: $white
    font-weight: 300
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
