<template>
  <div id="menu" :class="{active : menuState}">
    <div :class="{visible : menuState}" @click="closeMenu" id="menu-icon">
      <span><i class="fas fa-times"></i></span>
    </div>
    <div :class="{visible: menuState}" id="social-links">
      <social-links />
    </div>
    <a class="destinations-links" :class="{visible : menuState}" @click.prevent="handleMenuClick(destination.id)" v-for="destination in destinations" :key="destination.id">
      {{ destination.name }}
    </a>
    <div v-show="menuState" class="mobile-bottom">
      <a href="#" class="mobile-influencers">
        <img src="@/assets/ikonaKamera.svg" alt="Influencers in Julian Alps">
        For influencers
      </a>
      <a @click.prevent="scrollToTNP" class="mobile-tnp">
        Triglav National Park
        <img src="@/assets/ikonaGora.svg" alt="Triglav National Park">
      </a>
    </div>
  </div>
</template>

<script>
import SocialLinks from '@/components/SocialLinks';
export default {
  name: 'MainMenu',
  components: {SocialLinks},
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
    },
    scrollToTNP() {
      this.closeMenu();
      window.scrollTo({
        top: document.querySelector('#triglav-national-park').offsetTop,
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
    color: $white
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

    .mobile-bottom
      position: absolute
      left: 0
      right: 0
      bottom: 0
      opacity: 0
      z-index: 10000001
      display: flex
      justify-content: space-between
      @media screen and (max-width: 414px)
        opacity: 1
      & > a
        font-size: 14px
        padding: .5em
        @media screen and (max-width: 320px)
          padding: 0
          font-size: 12px
      .mobile-influencers
        display: flex
        align-items: center
        color: $white !important
        font-weight: 300
        &:hover
          cursor: pointer
          & > img
            transform: scale(1.25)
        & > img
          height: 45px
          display: flex
          margin-top: 4px
          +bounceTransition(400ms)
      .mobile-tnp
        display: flex
        align-items: center
        color: $white
        font-weight: 300
        @media screen and (max-width: 414px)
          flex-direction: row-reverse
        &:hover
          & > img
            cursor: pointer
            transform: scale(1.25)
        & > img
          height: 35px
          margin-top: 2px
          margin-left: .5em
          +bounceTransition

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

    #social-links
      position: absolute
      top: 1.75em
      left: 1em
      font-size: 1.25em
      +bounceTransition(600ms)
      opacity: 0
      display: none
      @media screen and (max-width: 1024px)
        display: block
      &.visible
        opacity: 1

    a.destinations-links
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
      @media screen and (max-width: 414px)
        font-size: 1.125em
      @media screen and (max-width: 414px)
        font-size: 1em
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
