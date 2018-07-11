<template>
  <div id="triglav-national-park">
    <h2>Triglav National Park</h2>
    <span id="nadmorska-visina">2864m</span>
  </div>
</template>

<script>
export default {
  name: 'TriglavNationalPark',
  methods: {
    handleScroll(scroll) {
      if (scroll > this.$el.offsetTop && !this.$store.getters.isPastDestinations) {
        this.$store.dispatch('pastDestinations', true);
      }
      if (scroll < this.$el.offsetTop && this.$store.getters.isPastDestinations) {
        this.$store.dispatch('pastDestinations', false)
      }
    }
  },
  mounted() {
    document.addEventListener('scroll', e => {
      this.handleScroll(e.target.scrollingElement.scrollTop);
    })
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="sass" scoped>
#triglav-national-park
  min-height: 100vh
  position: relative
  z-index: 10005
  background: $white
  margin-bottom: $footer-height

  h2
    font-weight: 900
    color: $black
    font-size: 3.5em
    text-align: left
    padding-top: .5em

#nadmorska-visina
  font-size: 6em
  font-weight: 900
  position: absolute
  bottom: 20px
  right: 20px
</style>
