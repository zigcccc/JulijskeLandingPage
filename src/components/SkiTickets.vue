<template>
  <div id="ski-tickets" :class="{'is-ie' : isOldExplorer}">
    <h3>{{ language === 'sl' ? 'Smučarska vozovnica Slovenske Alpe' : 'Ski ticket Slovenian Alps' }}</h3>
    <p class="intro" v-if="language === 'sl'">1 smučarska vozovnica za TOP 5 slovenskih smučarskih središč.</p>
    <p class="intro" v-if="language === 'en'">1 ski ticket for TOP 5 slovenian ski centres.</p>
    <div class="cta-container">
      <a href="#">{{ language === 'sl' ? 'Kupite svojo smučarsko vozovnico' : 'Buy your ski ticket online'}}</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isOldExplorer() {
      return this.$store.getters.getMicrosoft.version <= 11;
    },
    language() {
      return this.$store.getters.getLanguage;
    }
  }
}
</script>

<style lang="sass" scoped>
#ski-tickets
  margin-bottom: $footer-height
  min-height: 50vh
  background: $white
  position: relative
  z-index: 1000001
  padding: 2em 0

h3
  font-weight: 900
  color: $black
  font-size: 3.5em
  text-align: center
  padding-top: .5em

.intro
  font-size: 1.25em
  text-align: center

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
