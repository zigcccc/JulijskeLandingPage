<template>
  <div id="triglav-national-park">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-three-fifths">
          <h2 :class="{active : isVisible}">Triglav National Park</h2>
          <p :class="{active : isVisible}">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
          <div class="tnp-cta-container" :class="{active : isVisible}">
            <a href="https://www.tnp.si/en/learn/" target="_blank">discover triglav national park</a>
          </div>
        </div>
        <div class="column is-special">
          <span :class="{active : isVisible}" id="nadmorska-visina" v-if="isVisible">
            <small><span><i class="fas fa-map-pin"></i></span>highest point in country - <strong>Mt. Triglav</strong></small>
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
      <div class="images-container" :class="{active : mountainsVisible}">
        <destination-images :images="images" destination="Triglav National Park"  />
        <destination-clouds destination="tnp" :animation="true" :parallax="false" class="tnp-images-clouds" />
      </div>
    </div>
    <div :class="{visible : mountainsVisible}" id="mountain1" class="tnp-mountain">
      <img src="@/assets/tnp_cutted_bg_01.png" alt="Triglav national park sightseeing">
    </div>
    <div :class="{visible : mountainsVisible}" id="mountain2" class="tnp-mountain">
      <img src="@/assets/aljazev_stolp.png" alt="Aljaz Tower on the top of Triglav mountain">
    </div>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2';
import DestinationImages from '@/components/DestinationImages';
import DestinationClouds from '@/components/DestinationClouds';
export default {
  name: 'TriglavNationalPark',
  components: {ICountUp, DestinationImages, DestinationClouds},
  data() {
    return {
      footerHeight: 455,
      startVal: 491,
      endVal: 2864,
      duration: 3.5,
      decimals: 0,
      mountainsVisible: false,
      options: {
        useEasing: true,
        separator: '',
      }
    }
  },
  methods: {    
    handleScroll(scroll) {
      const padding = this.sectionHeight - this.footerHeight;
      // Handle store dispatch
      if (scroll >= this.$el.offsetTop - padding  && !this.$store.getters.isPastDestinations) {
        this.$store.dispatch('pastDestinations', true);
      }
      if (scroll < this.$el.offsetTop - padding && this.$store.getters.isPastDestinations) {
        this.$store.dispatch('pastDestinations', false)
      }
      // Handle mountains
      const mountainsPadding = Math.floor((this.sectionHeight / 6));
      if (scroll > this.$el.offsetTop - mountainsPadding) {
        this.mountainsVisible = true;
      }
      if (scroll < this.$el.offsetTop - mountainsPadding) {
        this.mountainsVisible = false;
      }
    }
  },
  computed: {
    images() {
      let arr = [];
      for (let i = 1; i < 9; i++) {
        arr.push(`tnp/tnp_0${i}.jpg`);
      }
      return arr
    },
    isVisible() {
      return this.$store.getters.isPastDestinations;
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
    attachment: fixed
  margin-bottom: $footer-height
  @media screen and (max-width: 768px)
    margin-bottom: 0

  h2
    font-weight: 900
    color: $black
    font-size: 4.5em
    text-align: left
    padding-top: .5em
    +fadeInOnActive
    @media screen and (max-width: 768px)
      font-size: 3em
      text-align: center
    @media screen and (max-width: 414px)
      font-size: 2em
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
      @media screen and (max-width: 768px)
        margin: 10px auto 0

  p
    //max-width: 750px
    width: 90%
    margin-left: 25px
    margin-top: 2em
    line-height: 1.618
    +fadeInOnActive
    @media screen and (max-width: 768px)
      width: 75%
      margin: 1.5em auto 0
    @media screen and (max-width: 414px)
      width: 90%

  .tnp-cta-container
    width: 100%
    padding: 0 25px
    margin-top: 25px
    display: flex
    justify-content: flex-start
    align-items: center
    position: relative
    z-index: 10
    +fadeInOnActive
    @media screen and (max-width: 768px)
      justify-content: center
    & > a
      position: relative
      z-index: 3
      background: $primary
      border-radius: 200px
      padding: .75em 1.5em
      box-shadow: $shadow-3
      color: $white
      text-transform: uppercase
      font-weight: 900
      +bounceTransition
      &:hover
        transform: translate3d(0, -5px, 0)

.column.is-special
  display: flex
  align-items: flex-start
  justify-content: center
  margin-top: 9em
  @media screen and (max-width: 768px)
    margin-top: 2em

#nadmorska-visina
  font-size: 7.5em
  font-weight: 900
  position: relative
  line-height: 1
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  z-index: 10
  margin-left: auto
  display: block
  +fadeInOnActive
  @media screen and (max-width: 768px)
    margin-right: auto
  @media screen and (max-width: 414px)
    font-size: 4em
    margin-left: auto
    margin-right: auto
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
  max-height: 1100px
  @media screen and (max-height: 900px)
    max-height: 85vh
  +easeTransition(1000ms)
  &#mountain1
    transition-delay: 250ms
    transform: scaleX(-1) translate3d(0, 100%, 0)
    &.visible
      transform: translate3d(0,10%,0) scaleX(-1)
      @media screen and (max-width: 768px)
        transform: translate3d(0,0%,0) scaleX(-1)
  &#mountain2
    //display: none
    transition-delay: 0ms
    transform: translate3d(2.5%, 100%, 0) scale(1.05);
    z-index: 5
    &.visible
      transform: translate3d(2.5%,20%,0) scale(1.05)
      @media screen and (max-width: 768px)
        transform: translate3d(2.5%,-25%,0) scale(1.05)
        opacity: .75
      @media screen and (max-width: 414px)
        transform: translate3d(2.5%, -10%, 0) scale(1.05)

.images-container
  margin-left: 45%
  opacity: 0
  transform: translate3d(100%, 0, 0)
  +bounceTransition(750ms)
  position: relative
  z-index: 10
  @media screen and (max-width: 768px)
    margin-left: 2em
    margin-bottom: 2em
  @media screen and (max-width: 768px)
    margin-top: 75px
  &.active
    opacity: 1
    transform: translate3d(0,0,0)
</style>
