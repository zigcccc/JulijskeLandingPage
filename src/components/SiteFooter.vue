<template>
  <footer v-show="visible || isOldExplorer" :class="{'is-ie' : isOldExplorer}">
    <div class="container is-fluid">
      <div class="footer-header">
        <div @click="scrollToTop" class="left">
          <Logo accentColor="green" />
        </div>
        <div class="right">
          <language-switcher :toggleMenu="false" location="footer" />
          <social-links />
        </div>
      </div><!-- END footer-header -->
      <div class="footer-content">
        <div class="destination-details" :class="{'is-ie' : isOldExplorer}">
          <div v-for="destination in destinationsContactInfo" :key="destination.name[language]">
            <h5>{{ destination.name[language] }}</h5>
            <a :href="destination.web" target="_blank">www{{ destination.web.split('www')[1] }}</a><br>
            <a :href="`tel:${destination.phone.full}`">{{ destination.phone.display }}</a><br>
            <a :href="`mailto:${destination.email}`">{{ destination.email }}</a><br>
          </div>
          <a href="https://www.slovenia.info/en" target="_blank" id="feel-slovenia-footer">
            <feel-slovenia />
          </a>
        </div>
      </div>
      <div class="footer-legal-info">
        &copy;{{ new Date().getFullYear() }}, Julian Alps<span>|</span>{{ language === 'sl' ? 'Izdelava spletne strani' : 'Website production' }}: <a href="https://forward.si" target="_blank">Forward - agencija za digitalni marketing</a>
      </div>
    </div>
    <a @click.prevent="scrollToTop" href="#" id="go-to-top">
      <span><i class="fas fa-angle-up"></i></span>
    </a>
    <div id="mountain1" class="footer-mountain">
      <img src="@/assets/footerMountain.svg" alt="Ikona Triglav">
    </div>
    <div id="mountain2" class="footer-mountain">
      <img src="@/assets/footerMountain.svg" alt="Ikona Triglav">
    </div>
  </footer>
</template>

<script>
import SocialLinks from '@/components/SocialLinks'
import FeelSlovenia from '@/components/FeelSlovenia'
import Logo from '@/components/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default {
  name: 'SiteFooter',
  components: {SocialLinks, Logo, FeelSlovenia, LanguageSwitcher},
  computed: {
    visible() {
      return this.$store.getters.isPastDestinations || this.$store.getters.getMicrosoft.version <= 11;
    },
    destinationsContactInfo() {
      return this.$store.getters.getDestinationsContactInfo
    },
    language(){
      return this.$store.getters.getLanguage;
    },
    isOldExplorer() {
      return this.$store.getters.getMicrosoft.version <= 11;
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="sass" scoped>
footer
  background: $black
  width: 100vw
  position: fixed
  bottom: 0
  min-height: $footer-height
  padding: 1em 0
  color: $white
  overflow: hidden
  &.is-ie
    position: relative
  @media screen and (max-width: 768px)
    position: relative

.footer-header
  display: flex
  justify-content: space-between
  align-items: center
  margin-top: 1em
  @media screen and (max-width: 768px)
    padding: 0 1em
  @media screen and (max-width: 345px)
    padding: 0 .5em
  .left
    &:hover
      cursor: pointer
  .right
    display: flex
    align-items: center
    .social-links
      @media screen and (max-width: 345px)
        font-size: .8em
    .language-switcher
      margin-right: 1em
      poisiton: relative
      z-index: 1000
      @media screen and (max-width: 414px)
        display: none

.footer-content
  color: $white
  text-align: left
  margin-top: 1.75em
  padding: 0 1em
  display: flex
  flex-wrap: wrap
  justify-content: flex-start
  position: relative
  z-index: 10
  @media screen and (max-width: 768px)
    padding: 0

  .destination-details
    // min-width: calc(20% - 1em)
    display: grid
    grid-template-columns: repeat(5, 1fr)
    width: 100%
    grid-gap: 2em
    margin-bottom: 2em
    &.is-ie
      display: flex
      flex-wrap: wrap
      & > div
        min-width: 20%
        margin-bottom: 1em
    @media screen and (max-width: 768px)
      grid-template-columns: repeat(2, 1fr)
    @media screen and (max-width: 414px)
      grid-template-columns: repeat(2, 1fr)
      padding-left: 1.5em
    @media screen and (max-width: 345px)
      padding-left: .5em
      grid-gap: .5em
    h5
      font-size: 1.2em
      font-weight: 900
      text-shadow: 0 5px 10px rgba(0,0,0,.2)
      margin-bottom: 5px
    a
      color: $white
      font-weight: 300
      font-size: 13px
      +simpleTransition
      &:hover
        color: $primary
    #feel-slovenia-footer
      display: flex
      justify-content: flex-start
      align-items: center
      & > svg
        width: 75%
        transform: translate3d(0, 20%, 0)
        &:hover
          transform: translate3d(0, 20%, 0) scale(1.2)

.footer-legal-info
  font-size: 14px
  text-align: center
  position: relative
  z-index: 10
  @media screen and (max-width: 414px)
    font-size: 12px
    padding: 0 1em
  &::before
    content: ''
    width: 450px
    max-width: 90%
    height: 3px
    border-radius: 20px
    background: $primary
    display: block
    margin: .25em auto 2em
  & > span
    margin: 0 1em
  & > a
    color: $white
    font-weight: 900
    +simpleTransition
    &:hover
      color: $primary

.footer-mountain
  position: absolute
  bottom: 0
  &#mountain1
    left: 0
    @media screen and (max-width: 768px)
      display: none
    & > img
      transform: scale(1.25) translate3d(10%, 45px, 0)
      opacity: 1
  &#mountain2
    right: 0
    & > img
      transform: scale(3) translate3d(-10%, -20px, 0)
      opacity: .25

#go-to-top
  position: absolute
  bottom: 1em
  right: 1em
  background: $white
  color: $primary
  border-radius: 50%
  +getSquare(45px)
  box-shadow: $shadow-2
  display: flex
  justify-content: center
  align-items: center
  z-index: 10
  +bounceTransition(500ms)
  @media screen and (max-width: 768px)
    bottom: 57px
    right: unset
    left: 50%
    transform: translate3d(-50%, 0, 0)
  & > span
    font-size: 1.5em
    +bounceTransition(750ms)
  &:hover
    transform: translate3d(0, -3px, 0)
    box-shadow: $shadow-4
    @media screen and (max-width: 768px)
      transform: translate3d(-50%, -3px, 0)
    & > span
      transform: translate3d(0, -5px, 0)
</style>  

