<template>
  <div id="triglav-national-park">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-three-fifths">
          <h2>Triglav National Park</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
        </div>
        <div class="column is-special">
          <span id="nadmorska-visina" v-if="isVisible">
            <small><span><i class="fas fa-map-pin"></i></span>highest point in coutry - <strong>Mt. Triglav</strong></small>
            <i-count-up 
              :startVal="startVal"
              :endVal="endVal"
              :decimals="decimals"
              :duration="duration"
              :options="options"
            />m
          </span>
        </div>
      </div>
    </div>
    <div id="mountain1" class="tnp-mountain" :class="{'is-visible' : isVisible}">
      <img src="@/assets/tnp_cutted_bg_01.png" alt="Triglav national park sightseeing">
    </div>
    <div id="mountain2" class="tnp-mountain" :class="{'is-visible' : isVisible}">
      <img src="@/assets/tnp_cutted_bg_02.png" alt="Triglav national park sightseeing">
    </div>
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
      if (scroll > this.$el.offsetTop - (this.sectionHeight - 450)  && !this.$store.getters.isPastDestinations) {
        this.$store.dispatch('pastDestinations', true);
      }
      if (scroll < this.$el.offsetTop - (this.sectionHeight - 450) && this.$store.getters.isPastDestinations) {
        this.$store.dispatch('pastDestinations', false)
      }
    }
  },
  computed: {
    isVisible() {
      return this.$store.getters.isPastDestinations;
    },
    footerHeight() {
      return this.$store.getters.getFooterHeight;
    },
    sectionHeight() {
      if(this.$el) {
        return this.$el.clientHeight
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
  overflow: hidden
  z-index: 10005
  background: $white
  background:
    image: url('/images/patterns/topography.png')
    repeat: repeat
    size: 400px 400px
  margin-bottom: $footer-height

  h2
    font-weight: 900
    color: $black
    font-size: 4.5em
    text-align: left
    padding-top: .5em
    &::after
      content: ''
      width: 100px
      margin-left: 25px
      height: 4px
      border-radius: 200px
      background: $primary
      display: block
      margin-top: 10px
      box-shadow: $shadow-1

  p
    max-width: 750px
    width: 90%
    margin-left: 25px
    margin-top: 2em
    line-height: 1.618

.column.is-special
  display: flex
  align-items: flex-end

#nadmorska-visina
  font-size: 7.5em
  font-weight: 900
  position: relative
  line-height: 1
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  z-index: 10
  margin-left: auto
  display: block
  & > span
    text-align: right
  & > small
    font-size: 1.125rem
    text-shadow: none
    font-weight: 400
    color: $primary
    display: block
    margin-bottom: 5px
    & > strong
      color: $primary
    & > span
      margin-right: .5em

.tnp-mountain
  position: absolute
  bottom: -20px
  left: 0
  right: 0
  &#mountain1

  &#mountain2
    display: none
</style>
