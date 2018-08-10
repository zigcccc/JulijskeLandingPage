<template>
	<div id="destination-nav" :class="{fixed : isPastHero, hidden : isPastDestinations}">
		<div v-if="prevAndNext.next" @click="goToNext" id="next-dest">
			<span><i class="fas fa-long-arrow-alt-left"></i></span>
			{{ prevAndNext.next.name[language] }}
		</div>
		<div v-else class="spacer"></div>
		<div id="destination-counter">
			{{ $store.state.activeDestination.index + 1 }} / {{ destinations.length }}
		</div>
		<div v-if="prevAndNext.prev" @click="goToPrev" id="prev-dest">
			{{ prevAndNext.prev.name[language] }}
			<span><i class="fas fa-long-arrow-alt-right"></i></span>
		</div>
		<div v-else class="spacer"></div>
	</div>
</template>

<script>
export default {
  name: 'DestinationNavigation',
  methods: {
    goToPrev() {
      let section = document.querySelector(`#${this.prevAndNext.prev.id}`);
      let offset = section.offsetTop;
      let height = section.clientHeight;
      window.scrollTo({
        top: (offset + height) - this.sectionPadding,
        behavior: 'smooth'
      })
    },
    goToNext() {
      let section = document.querySelector(`#${this.prevAndNext.next.id}`);
      let offset = section.offsetTop;
      let height = section.clientHeight;
      window.scrollTo({
        top: (offset + height) - this.sectionPadding,
        behavior: 'smooth'
      })
    },
    arrowKeys(event, key) {
      if (key === 40 && !this.influencersPopupActive) {
        event.preventDefault();
        if (this.$store.getters.getActiveDestination.index !== this.destinations.length - 1 && this.$store.state.isPastHero) {
          this.goToNext()
        } else if (!this.$store.state.isPastHero) {
          window.scrollTo({
            top: this.$store.state.heroHeight + 1,
            behavior: 'smooth'
          })
        }
      }
      if (key === 38 && !this.influencersPopupActive) {
        event.preventDefault();
        if (this.$store.getters.getActiveDestination.index !== 0) {
          this.goToPrev()
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      }
    }
  },
  computed: {
    isPastHero() {
      return this.$store.state.isPastHero
    },
    destinations() {
      return this.$store.getters.getDestinations
    },
    prevAndNext() {
      return this.$store.getters.prevAndNext
    },
    isPastDestinations() {
      return this.$store.getters.isPastDestinations
    },
    sectionPadding(){
      const height = window.innerHeight;
      if (height > 800) {
        return height / 4;
      } else if (height < 800 && height >= 720) {
        return height / 3;
      } else if (height < 720 && height >= 500) {
        return height / 2;
      }
    },
    language() {
      return this.$store.getters.getLanguage;
    },
    influencersPopupActive() {
      return this.$store.getters.influencersPopupState;
    }
  },
  created() {
    document.addEventListener('keydown', e => {
      this.arrowKeys(e, e.keyCode)
    })
  },
  destroyed() {
    document.removeEventListener('keydown', this.arrowKeys)
  }
}
</script>

<style lang="sass" scoped>
#destination-nav
  position: absolute
  z-index: 15
  top: 10px
  left: 0
  display: flex
  flex-direction: row
  width: 50vh
  justify-content: space-between
  transform-origin: top center
  transform: rotate(-90deg) translateY(-20vh) translateX(-55%)
  +easeTransition
  opacity: 1
  visibility: visible
  @media screen and (max-width: 414px)
    display: none
  @media screen and (max-height: 770px)
    width: 65vh
    transform: rotate(-90deg) translateY(-30vh) translateX(-55%)
  & > div
    min-width: 100px
    display: flex
    font-weight: 900
    text-shadow: 0 5px 10px rgba(0,0,0,.5)
    +bounceTransition
    &:first-of-type
      justify-content: flex-start
    &:last-of-type
      &:hover
        & > span
          transform: translateX(10px)
      & > span
        margin: 2px .75em
    & > span
      margin: 1px .75em
      display: block
      +bounceTransition
    &:hover
      cursor: pointer
      & > span
        transform: translateX(-10px)

  &.fixed
    position: fixed
    top: 0
  
  &.hidden
    opacity: 0
    visibility: hidden

#destination-counter
  display: flex
  justify-content: center

.spacer
  display: block
  min-height: 20vh
</style>
