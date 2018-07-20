<template>
  <div id="influencers-popup" :class="{active : influencersPopupActive}">
    <div class="columns">
      <div class="column is-two-fifths left"></div>
      <div class="column right">
        <div class="form-intro">
          <h3>Interested in becoming an influencer?</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti commodi dicta repellat unde harum officiis. Laboriosam soluta totam qui voluptas.</p>
        </div>
        <influencers-form />
      </div>
    </div>
  </div>
</template>

<script>
import influencersForm from '@/components/InfluencersForm'

export default {
  name: 'InfluencersPopup',
  components: {influencersForm},
  computed: {
    influencersPopupActive() {
      return this.$store.getters.influencersPopupState;
    }
  },
  methods: {
    closePopup() {
      this.$store.dispatch('toggleInfluencersPopup');
    }
  },
  watch: {
    influencersPopupActive(cond) {
      if (cond) {
        window.addEventListener('keydown', e => {
          e.keyCode === 27 ? this.closePopup() : null;
        })
      } else {
        window.removeEventListener('keydown', this.closePopup)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#influencers-popup
  position: fixed
  top: 50%
  left: 50%
  transform: translate3d(-50%, 0%, 0)
  background: $white
  max-width: 960px
  max-height: 75vh
  width: 100%
  height: 620px
  z-index: 999999999
  box-shadow: $shadow-4
  border-radius: 5px
  overflow: hidden
  // display: grid
  // grid-template-columns: 4fr 5fr
  opacity: 0
  visibility: hidden
  +bounceTransition(500ms)
  &.active
    transform: translate3d(-50%, -50%, 0)
    opacity: 1
    visibility: visible

  .columns
    height: 100%
    margin: 0

  .left
    background:
      image: url('/images/influencers_bg.jpg')
      size: cover
      position: center center
      repeat: no-repeat
    padding: 4em 1em 1em
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    color: $white

  .right
    background: $white
    padding: 1em
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: flex-start
    position: relative
    .form-intro
      max-width: 500px
      margin: 3em 0 2em 2em
    h3
      text-align: left
      font-weight: 900
      font-size: 1.2em
      &::after
        content: ''
        width: 50px
        height: 3px
        border-radius: 20px
        background: $primary
        display: block
        margin-top: 10px
    p
      text-align: left
      line-height: 1.618
      max-width: 100%
      margin: 1em auto 0
</style>