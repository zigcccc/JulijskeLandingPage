<template>
  <div id="destination-nav" :class="{fixed : isPastHero}">
    <div v-if="prevAndNext.prev" @click="goToPrev" id="prev-dest">
      {{ prevAndNext.prev.name }}
      <span><i class="fas fa-long-arrow-alt-right"></i></span>
    </div>
    <!-- <div v-else class="spacer"></div> -->
    <div v-if="prevAndNext.next" @click="goToNext" id="next-dest">
      <span><i class="fas fa-long-arrow-alt-left"></i></span>
      {{ prevAndNext.next.name }}
    </div>
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
  }
}
</script>

<style lang="sass" scoped>
#destination-nav
  position: absolute
  top: 0
  display: flex
  flex-direction: column
  height: 100vh
  justify-content: flex-start
  //background: pink
  width: 50px
  padding: 0 0
  +bounceTransition
  & > div
    margin: 100px 0
    transform: rotate(-90deg)
    padding: 
    white-space: nowrap
    display: flex
    height: auto
    font-weight: 900
    +bounceTransition
    &:last-of-type
      &:hover
        & > span
          transform: translateX(-10px)
      & > span
        margin: 1px .75em
    & > span
      margin: 3px .75em
      display: block
      +bounceTransition
    &:hover
      cursor: pointer
      & > span
        transform: translateX(10px)

  &.fixed
    position: fixed
    top: 0

</style>
