<template>
  <nav :class="{'is-hidden' : isPastHero}">
      <div class="left-side">
        <div class="social-links">
          <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
          <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
          <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
        </div>
        <a href="#" class="influencers">
          <img src="@/assets/ikonaKamera.svg" alt="Influencers in Julian Alps">
          For influencers
        </a>
      </div>
      <div class="logo-container">
        JulianAlps<span>.</span>
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
export default {
  name: 'Navbar',
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
  .social-links
    margin-right: 2em
    & > a
      font-size: 1.2em
      color: $white
      padding: 0 15px
      text-shadow: 0 3px 6px rgba(0,0,0,.2)
      & > i
        +bounceTransition(400ms)
      &:hover
        & > i
          transform: scale(1.25)
          color: $primary

.logo-container
  font-size: 2em
  color: $white
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  font-weight: 900
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

  & > span
    color: $black

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
