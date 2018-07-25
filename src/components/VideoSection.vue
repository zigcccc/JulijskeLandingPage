<template>
  <div id="video-section">
    <destination-clouds destination="video" :animation="true" />
    <div :class="{active : visible}" id="video-section-art">
      <img src="@/assets/video-section-art.svg" alt="Influencers at JulianAlps" />
    </div>
    <div class="container">
      <div class="columns">
        <div class="column is-three-fifths iframe-column">
          <div :class="{active : visible}" class="iframe-container" :style="{height: `${iframeHeight}px`, width: '100%'}">
            <iframe width="100%" :height="iframeHeight" src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        </div>
        <div :class="{active: visible}" class="column influencer-column">
          <h2 v-if="language === 'en'">Interested in becoming media content creator for this destination?</h2>
          <h2 v-if="language === 'sl'">Bi radi postali ustvarjalec medijskih vsebin za to destinacijo?</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora totam nihil et, quaerat quidem accusamus quam saepe quod, suscipit, aperiam veritatis cupiditate?</p>
          <div class="benefits-container">
            <div class="benefit" v-for="benefit in benefits" :key="benefit.en">
              <span><i class="fas fa-check"></i></span><p>{{ benefit[language] }}</p>
            </div>
          </div>
          <p>Beatae voluptas earum ipsam est quis ea porro provident quisquam, corporis tempora minus numquam. Laudantium, minima expedita!</p>
          <div class="cta-container">
            <a @click.prevent="openInfluencerForm">Fill out this form</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DestinationClouds from '@/components/DestinationClouds'
export default {
  name: 'VideoSection',
  components: {DestinationClouds},
  data() {
    return {
      iframeHeight: 0,
      benefits: [
        {
          'en': 'Free staying at the destination',
          'sl': 'Brezplačno bivanje v destinaciji'
        },
        {
          'en': 'Attend local activities',
          'sl': 'Udeležba na lokalnih aktivnostih'
        },
        {
          'en': 'Taste authentic local cusine',
          'sl': 'Okusite pristne okuse lokalne kulinarike'
        }
      ],
      visible: false
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLanguage;
    }
  },
  methods: {
    getIframeHeight(iframe) {
      return Math.round(iframe.clientWidth / 1.778);
    },
    openInfluencerForm() {
      this.$store.dispatch('toggleInfluencersPopup');
    },
    parallax(scrollTop) {
      const offsetTop = this.$el.offsetTop;
      const elemHeight = this.$el.clientHeight;
      const padding = Math.round(window.innerHeight / 5);
      
      if (scrollTop > (offsetTop - elemHeight + padding)) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    }
  },
  mounted() {
    this.iframeHeight = this.getIframeHeight(this.$el.querySelector('iframe'));
    document.addEventListener('scroll', e => {
      this.parallax(e.target.scrollingElement.scrollTop);
    })
  }
}
</script>

<style lang="sass" scoped>
#video-section
  //min-height: 100vh
  background:
    image: url('/images/patterns/topography.png')
    repeat: repeat
    size: 400px 400px
    attachment: fixed
  position: relative
  z-index: 10005
  margin-bottom: $footer-height
  padding-bottom: 15vh
  @media screen and (max-width: 768px)
    margin-bottom: 0

#video-section-art
  position: absolute
  min-width: 600px
  bottom: 0
  right: 0
  overflow: hidden
  +fadeInOnActive
  @media screen and (max-width: 600px)
    min-width: 100vw
  & > img
    transform: translate3d(12px, 10px, 0)
    @media screen and (max-width: 1385px)
      transform: translate3d(7.5%, 10px, 0)
    @media screen and (max-width: 1130px)
      transform: translate3d(25%, 5%, 0)
    @media screen and (max-width: 600px)
      transform: translate3d(10px, 15%, 0)
.columns
  padding-top: 15vh
  position: relative
  z-index: 10
  @media screen and (max-width: 768px)
    padding-top: 45px

.iframe-column
  display: flex
  justify-content: center
  align-items: center

.iframe-container
  overflow: hidden
  border-radius: 5px
  box-shadow: $shadow-4
  +fadeInOnActive
  @media screen and (max-width: 768px)
    margin: 0 1em

.influencer-column
  padding: 2em 0 2em 3em
  +fadeInOnActive
  @media screen and (max-width: 768px)
    padding: 2em

  h2
    font-weight: 900
    font-size: 1.4em
    &::after
      content: ''
      width: 50px
      height: 3px
      border-radius: 50px
      background: $primary
      display: block
      margin: 10px 0

  p
    line-height: 1.618
    text-align: justify
    margin: 1em 0

  .cta-container
    display: flex
    justify-content: center
    margin-top: 1.5em
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

.benefits-container  
  .benefit
    display: flex
    & > p
      margin: .25em 0
    font-weight: 700
    font-size: 1.15em
    align-items: center
    span
      margin-right: 1em
      color: $primary

</style>