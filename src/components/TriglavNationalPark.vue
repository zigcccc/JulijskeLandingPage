<template>
  <div id="triglav-national-park">
    <div class="container is-fluid">
      <h2>Triglav National Park</h2>
    </div>
    <span id="nadmorska-visina" v-if="isVisible">
      <i-count-up 
        :startVal="startVal"
        :endVal="endVal"
        :decimals="decimals"
        :duration="duration"
        :options="options"
      />m
    </span>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2';
export default {
  name: 'TriglavNationalPark',
  components: {ICountUp},
  data() {
    return {
      startVal: 491,
      endVal: 2864,
      duration: 3.5,
      decimals: 0,
      options: {
        useEasing: true,
        separator: '',
      }
    }
  },
  methods: {
    handleScroll(scroll) {
      if (scroll > this.$el.offsetTop - (window.innerHeight / 10)  && !this.$store.getters.isPastDestinations) {
        this.$store.dispatch('pastDestinations', true);
      }
      if (scroll < this.$el.offsetTop - (window.innerHeight / 10) && this.$store.getters.isPastDestinations) {
        this.$store.dispatch('pastDestinations', false)
      }
    },
    onStart(instance, CountUp) {
      console.log('Started...')
    }
    // onReady(instance, CountUp) {
    //   instance.update(this.startVal + 100);
    // }
  },
  computed: {
    isVisible() {
      return this.$store.getters.isPastDestinations;
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
  line-height: 1
</style>
