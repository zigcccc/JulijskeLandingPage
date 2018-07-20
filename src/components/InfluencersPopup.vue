<template>
  <div id="influencers-popup" :class="{active : influencersPopupActive}">
    <div :class="{'has-errors' : formErrors.hasErrors}" class="errors">
      <p>{{formErrors.errorMsg}}</p>
      <a @click.prevent="clearErrors">Dismiss</a>
    </div>    
    <div class="columns">
      <div class="column is-two-fifths left"></div>
      <div class="column right">
        <div v-show="!formSubmitted" :class="{active : !formSubmitted}" class="form-not-submitted">
          <div class="form-intro">
            <h3>Interested in becoming an influencer?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti commodi dicta repellat unde harum officiis. Laboriosam soluta totam qui voluptas.</p>
          </div>
          <influencers-form />
        </div>
        <div v-show="formSubmitted" :class="{active : formSubmitted}" class="form-submitted">
          <img src="@/assets/like.svg" alt="Julian Alps form submitted successfully">
          <h4>Hooray! You submitted form successfully.</h4>
          <p>Our team will contact you as soon as possible. For now, you can keep exploring everything this gorgeous destination has to offer.</p>
          <div class="cta-container">
            <a @click.prevent="closePopup">Close form</a>
          </div>
        </div>
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
    },
    formSubmitted() {
      return this.$store.getters.getFormStatus.submitted;
    },
    formLoading() {
      return this.$store.getters.getFormStatus.loading;
    },
    formErrors() {
      return this.$store.getters.getFormStatus.errors;
    }
  },
  methods: {
    closePopup() {
      this.$store.dispatch('toggleInfluencersPopup');
    },
    clearErrors() {
      this.$store.dispatch('clearFormErrors');
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
  z-index: 0
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
    z-index: 999999999

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

.errors
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: transparentize($black, .07)
  color: $white
  text-align: center
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  +easeTransition(500ms)
  opacity: 0
  z-index: -1
  visibility: hidden
  transform: translate3d(0, 100%, 0)
  &.has-errors
    opacity: 1
    z-index: 200
    visibility: visible
    transform: translate3d(0, 0, 0)
  & > p
    background: $error
    padding: .75em 1em
    border-radius: 200px
    font-weight: 900
    font-size: 16px
  & > a
    margin-top: 1em
    color: $white
    font-weight: 900
    text-transform: uppercase
    text-shadow: 0 3px 6px rgba(0,0,0,.5)


.form-submitted,
.form-not-submitted
  visibility: hidden
  opacity: 0
  +easeTransition(500ms)
  &.active
    opacity: 1
    visibility: visible

.form-submitted
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  height: 100%
  img
    max-width: 25%
  h4
    font-weight: 900
    color: $black
    font-size: 1.25em
    margin: 2em 0 0
  p
    margin: .5em !important
    text-align: center !important
  .cta-container
    display: flex
    justify-content: center
    margin-top: 1em
    & > a
      background: $primary
      color: $white
      text-transform: uppercase
      box-shadow: $shadow-1
      padding: .75em 1em
      font-weight: 900
      border-radius: 200px
      font-size: 14px
      +bounceTransition(500ms)
      &:hover
        transform: translate3d(0, -3px, 0)
        box-shadow: $shadow-3
</style>