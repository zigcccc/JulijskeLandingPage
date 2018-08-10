<template>
	<div id="menu" :class="{active : menuState, 'is-ie' : isOldExplorer}">
		<div :class="{visible : menuState}" @click="closeMenu" id="menu-icon">
			<span><i class="fas fa-times"></i></span>
		</div>
		<div :class="{visible: menuState}" id="social-links">
			<social-links />
		</div>
		<div id="language-toggle" :class="{visible : menuState}">
			<language-switcher :toggle-menu="true" />
		</div>
		<div id="main-menu__destinations" :class="{visible : menuState, 'ios-safari' : iosSafari, 'is-ie' : isOldExplorer}">
			<a class="destinations-links" :class="{'is-ie' : isOldExplorer}" :style="{backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url('/images/destinations/${destination.id}.jpg')`}" @click.prevent="handleMenuClick(destination.id)" v-for="destination in destinations" :key="destination.id">
				{{ destination.name[language] }}
			</a>
		</div>
		<div v-show="menuState" class="mobile-bottom" :class="{'ios-safari' : iosSafari}">
			<a @click.prevent="toggleInfluencersPopup" href="#" class="mobile-influencers">
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
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default {
  name: 'MainMenu',
  components: {SocialLinks, LanguageSwitcher},
  computed: {
    menuState() {
      return this.$store.state.menuOpen;
    },
    destinations() {
      return this.$store.getters.getDestinations;
    },
    language() {
      return this.$store.getters.getLanguage;
    },
    iosSafari() {
      return this.$store.getters.isIosSafari;
    },
    isOldExplorer() {
      return this.$store.getters.getMicrosoft.version <= 11;
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
    },
    toggleInfluencersPopup() {
      this.closeMenu();
      this.$store.dispatch('toggleInfluencersPopup');
      this.$ga.event({
        eventCategory: 'Influencers Form Open',
        eventAction: 'Section - Navbar',
        eventLabel: this.language
      });
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
      @media screen and (max-width: 730px)
        opacity: 1
        bottom: 0
        &.ios-safari
          bottom: 65px
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

    #language-toggle
      position: absolute
      top: 2em
      left: 50%
      transform: translateX(-50%)
      @media screen and (max-width: 414px)
        top: 2.3em
        margin-left: 1.5em

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
    #main-menu__destinations
      display: grid
      grid-template-columns: repeat(3, 1fr)
      grid-gap: 0 0
      opacity: 0
      visibility: hidden
      transform: translateY(50%)
      transition: text-shadow 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 250ms, transform 750ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 250ms
      &.visible
        transform: translateY(0)
        opacity: 1
        visibility: visible
      &.is-ie
        display: flex
        flex-direction: column
      @media screen and (max-width: 414px)
        display: flex
        flex-direction: column
        &.isIosSafari
          &.visible
            transform: translateY(-20px)
      a.destinations-links
        align-self: center
        justify-self: center
        display: flex
        justify-content: center
        align-items: center
        color: $white
        background:
          size: cover
          position: center center
          repeat: no-repeat
        font-weight: 900
        text-transform: uppercase
        min-height: calc(75vh / 3)
        min-width: calc(75vw / 3)
        font-size: 1.5em
        padding: .5em 1em
        //margin: .25em 0
        position: relative
        z-index: 10000005
        overflow: hidden
        transition: text-shadow 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 250ms, transform 750ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 250ms
        &.is-ie
          font-size: 1em
          min-width: 100%
          padding: .65em 1em
          background-image: none !important
          min-height: 0 !important
          text-align: center
        @media screen and (max-width: 414px)
          font-size: 1em
          min-width: 100%
          padding: .65em 1em
          background-image: unset !important
          min-height: unset
          text-align: center
        @media screen and (max-width: 345px)
          padding: .4em 1em
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
          opacity: 0
        &:hover
          text-shadow: 0 5px 10px rgba(0,0,0,.5)
          transform: scale(.75)
          z-index: 10000010
          &::before
            transform: translateY(0)
            opacity: 1
</style>
