<template>
  <div id="menu" :class="{active : menuState}">
    <div :class="{visible : menuState}" @click="closeMenu" id="menu-icon">
      <span><i class="fas fa-times"></i></span>
    </div>
    <a :class="{visible : menuState}" @click.prevent="handleMenuClick(destination.id)" v-for="destination in destinations" :key="destination.id">
      {{ destination.name }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  computed: {
    menuState() {
      return this.$store.state.menuOpen
    },
    destinations() {
      return this.$store.getters.getDestinations
    }
  },
  methods: {
    closeMenu() {
      this.$store.dispatch('toggleMenu');
    },
    handleMenuClick(destination) {
      this.$store.dispatch('toggleMenu');
      let offset = document.querySelector(`#${destination}`).offsetTop;

      window.scrollTo({
        top: offset + this.$store.state.heroHeight,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  #menu
    position: fixed
    z-index: 10000000
    background: $black
    width: 100vw
    height: 100vh
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    transform: translateY(-100%)
    +easeTransition
    &.active
      transform: translateY(0)

    #menu-icon
      position: absolute
      top: 1em
      right: 1em
      color: $white
      font-size: 2em
      +bounceTransition(600ms)
      opacity: 0
      line-height: 1
      &.visible
        opacity: 1
      &:hover
        cursor: pointer
        transform: scale(1.25)
        color: $primary
        transform-origin: center center

    a
      color: $white
      font-weight: 900
      text-transform: uppercase
      font-size: 1.5em
      padding: .5em 1em
      margin: .25em 0
      position: relative
      z-index: 10000005
      overflow: hidden
      opacity: 0
      transform: translateY(100%)
      transition: text-shadow 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 250ms, transform 750ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 250ms
      &.visible
        opacity: 1
        transform: translateY(0)
      &::before
        content: ''
        display: block
        background: $primary
        position: absolute
        bottom: 0
        left: 0
        right: 0
        top: 0
        z-index: -1
        transform: translateY(100%)
        +bounceTransition(500ms)
      &:hover
        text-shadow: 0 5px 10px rgba(0,0,0,.5)
        &::before
          transform: translateY(0)
</style>
