<template>
  <nav :class="{'is-hidden' : isPastHero}">
      <div class="social-links">
        <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
      </div>
      <div class="logo-container">
        JulianAlps<span>.</span>
      </div>
      <div class="menu-icon">
        Destinations
        <img @click="toggleMenu" src="@/assets/Menu.svg" alt="Meni">
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
      menuOpen: false,
      isPastHero: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen === false ? this.menuOpen = true : this.menuOpen = false
    },
    scrollTop(offset) {
      offset > (this.heroHeight - (this.heroHeight / 2)) ? this.isPastHero = true : this.isPastHero = false
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
  padding: 20px 2em 0
  display: flex
  justify-content: space-between
  align-items: center
  &.is-hidden
    position: relative

.social-links
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
    max-width: 300px
    height: 2px
    background: $primary
    display: block
    position: absolute
    top: 50%
  &::before
    left: -100%
    transform: translate3d(-50%, -50%, 0)
  &::after
    right: -100%
    transform: translate3d(50%, -50%, 0)

  & > span
    color: $black

.menu-icon
  display: flex
  align-items: center
  font-weight: 300
  color: $white
  font-size: 14px
  & > img
    margin-left: 1em
    +bounceTransition(400ms)
    &:hover
      transform: scale(1.25) rotate(90deg)
      cursor: pointer

</style>
