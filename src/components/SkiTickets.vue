<template>
  <div id="ski-tickets" :class="{'is-ie' : isOldExplorer, 'loaded': loaded}">
    <h3>{{ language === 'sl' ? 'Smučarska vozovnica Julijske Alpe' : 'Ski ticket Julian Alps' }}</h3>
    <p class="intro" v-if="language === 'sl'">1 smučarska vozovnica za TOP 5 slovenskih smučarskih središč.</p>
    <p class="intro" v-if="language === 'en'">1 ski ticket for TOP 5 slovenian ski centres.</p>
    <div class="cta-container">
      <a @click="handleCtaClick" :href="language === 'sl' ? 'https://www.kranjska-gora.si/sl/spletna-trgovina/smucarske-karte-julijske-alpe' : 'https://www.kranjska-gora.si/en/online-shop/ski-pass-julian-alps'" target="_blank">{{ language === 'sl' ? 'Kupite svojo smučarsko vozovnico' : 'Buy your ski ticket online'}}</a>
    </div>
    <div class="skiier-container">
      <img :style="skiierOffset" id="skiier" src="@/assets/ski.svg" :alt="language === 'sl' ? 'Kupite smučarsko vozovnico Julijske Alpe' : 'Buy Julian Alps ski ticket'">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageOffset: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      sectionOffset: 0,
      skiierOffset: {
        transform: `translate3d(0,0,0)`
      },
    }
  },
  methods: {
    moveSkiier(scroll) {
      if (scroll) {
        let factor = ((scroll - this.sectionOffset + 100) / 1.5).toFixed(0);
        this.skiierOffset.transform = this.isMobile ? `translate3d(0,0,0)` :  `translate3d(${factor}px,0,0)`
      }
    },
    handleCtaClick() {
      this.$ga.event({
        eventCategory: 'Book Ski Ticket CTA Click',
        eventAction: this.language,
        eventLabel: this.isMobile ? 'mobile' : 'desktop'
      });
    }
  },
  computed: {
    isOldExplorer() {
      return this.$store.getters.getMicrosoft.version <= 11;
    },
    language() {
      return this.$store.getters.getLanguage;
    },
    scroll() {
      return this.$props.pageOffset;
    },
    loaded() {
      return this.$store.getters.doneLoading;
    },
    isMobile() {
      return this.$store.getters.getWindowWidth < 768;
    }
  },
  watch: {
    scroll(val) {
      this.moveSkiier(val);
    }
  },
  mounted() {
    this.sectionOffset = this.$el.offsetTop;
  }
}
</script>

<style lang="sass" scoped>
$imageHeight: 250px
$imageHeightMobile: 150px

#ski-tickets
  margin-bottom: $footer-height
  min-height: 50vh
  background: $white
  position: relative
  z-index: 1000001
  padding: 2em 0 #{$imageHeight + 70}
  opacity: 0
  visibility: hidden
  transition: 200ms ease-in-out all
  transition-delay: 1500ms
  @media screen and (max-width: 768px)
    margin-bottom: 0
    min-height: 75vh
    padding: 2em 0 #{$imageHeightMobile + 50}
  &.loaded
    opacity: 1
    visibility: visible

h3
  font-weight: 900
  color: $black
  font-size: 3.5em
  text-align: center
  padding-top: .5em
  @media screen and (max-width: 768px)
    font-size: 1.5em

.intro
  font-size: 1.25em
  text-align: center

.skiier-container
  position: absolute
  bottom: 0
  left: 0
  right: 0
  padding-bottom: 2em

  #skiier
    height: $imageHeight
    width: auto
    display: block
    margin-left: auto
    margin-right: auto
    @media screen and (max-width: 768px)
      height: $imageHeightMobile

.cta-container
  display: flex
  justify-content: center
  margin-top: 1.5em
  @media screen and (max-width: 768px)
    justify-content: center
  & > a
    background: $primary
    box-shadow: $shadow-2
    +bounceTransition(500ms)
    border-radius: 200px
    padding: 0.75em 1em
    color: $white
    text-transform: uppercase
    font-weight: 900
    &:hover
      transform: translate3d(0, -3px, 0)
      box-shadow: $shadow-4
</style>
