<template>
  <div id="destination-nav" :class="{fixed : isPastHero}">
    <div v-if="prevAndNext.next" @click="goToNext" id="next-dest">
      <span><i class="fas fa-long-arrow-alt-left"></i></span>
      {{ prevAndNext.next.name }}
    </div>
    <div v-else class="spacer"></div>
    <div id="destination-counter">
      {{ $store.state.activeDestination.index + 1 }} / {{ destinations.length }}
    </div>
    <div v-if="prevAndNext.prev" @click="goToPrev" id="prev-dest">
      {{ prevAndNext.prev.name }}
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
        top: (offset + height) - 240,
        behavior: 'smooth'
      })
    },
    goToNext() {
      let section = document.querySelector(`#${this.prevAndNext.next.id}`);
      let offset = section.offsetTop;
      let height = section.clientHeight;
      window.scrollTo({
        top: (offset + height) - 240,
        behavior: 'smooth'
      })
    },
    arrowKeys(event, key) {
      if (key === 40) {
        event.preventDefault();
        if (this.$store.state.activeDestination.index !== this.destinations.length - 1) {
          this.goToNext()
        }
      }
      if (key === 38) {
        event.preventDefault();
        if (this.$store.state.activeDestination.index !== 0) {
          this.goToPrev()
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
  top: 10px
  left: 0
  display: flex
  flex-direction: row
  width: 50vh
  justify-content: space-between
  transform-origin: top center
  transform: rotate(-90deg) translateY(-20vh) translateX(-55%)
  +bounceTransition
  & > div
    min-width: 100px
    display: flex
    font-weight: 900
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

#destination-counter
  display: flex
  justify-content: center

.spacer
  display: block
  min-height: 20vh
</style>
