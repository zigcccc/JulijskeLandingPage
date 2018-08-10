<template>
	<div v-show="showGDPRmodal" :class="{active : true}" id="gdpr">
		<div class="image-container">
			<img src="@/assets/cookie.svg" alt="Web Cookies" />
		</div>
		<p>Do you allow us to collect anonymised data on the viewing of our content? We will improve your user experience.</p>
		<a @click.prevent="enableGDPR" href="#">i agree</a> 
		<a class="disable-gdpr" @click.prevent="disableGDPR" href="#">I don't agree</a>
	</div>
</template>

<script>
import * as Cookie from 'js-cookie';
export default {
  name: 'gdpr',
  computed: {
    allreadyOptIn() {
      return String(Cookie.get('ga_fb_allowed')) === 'true' ? true : false;
    },
    loaded() {
      return this.$store.getters.doneLoading;
    },
    showGDPRmodal() {
      return this.$store.getters.gdprModalOpen;
    },
    GTMEnabled() {
      return this.$gtm.enabled;
    }
  },
  methods: {
    enableGDPR() {
      Cookie.set('ga_fb_allowed', true, {expires: 365});
      this.$ga.enable();
      this.$ga.page('/');
      this.$gtm.enable(true);
      this.$gtm.trackEvent({
        event: 'AllowedTracking'
      });
      this.$store.dispatch('setGdprModalState', false);
    },
    disableGDPR() {
      const response = confirm('Are you sure you don\'t want cookies enabled? It can really help us get you the best content possible...');
      if (response) {
        Cookie.set('ga_fb_allowed', false, {expires: 365})
        this.$ga.disable();
        this.$gtm.enable(false);
        this.$store.dispatch('setGdprModalState', false);
      } 
    }
  },
  mounted() {
    if (this.allreadyOptIn) {
      this.$store.dispatch('setGdprModalState', false);
      this.$gtm.trackEvent({
        event: 'AllowedTracking'
      });
    } else {
      if (String(Cookie.get('ga_fb_allowed') === 'false') && Cookie.get('ga_fb_allowed') != undefined) {
        console.log('Tracking disabled...')
        this.$ga.disable();
        this.$gtm.enable(false);
      }
      this.$store.dispatch('setGdprModalState', true);
    }
  }
} 
</script>

<style lang="sass" scoped>
  #gdpr
    position: fixed
    bottom: 10px
    right: 10px
    width: 400px
    max-width: calc(100% - 20px)
    min-height: 200px
    box-shadow: $shadow-5
    border-radius: 5px
    background: $white
    z-index: 999999999
    opacity: 0
    +easeTransition(500ms)
    //transition-delay: 1500ms
    transform: translate3d(100%, 0, 0)
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    padding: 1em
    &.active
      transform: translate3d(0,0,0)
      opacity: 1

    .image-container
      width: 75px
      height: auto

    p
      max-width: 90%
      display: block
      margin: .5em auto 0
      font-size: 14px
      text-align: center
      color: $black
      line-height: 1.618

    a
      background: $primary
      color: $white
      padding: .75em 1.5em
      border-radius: 200px
      box-shadow: $shadow-1
      text-transform: uppercase
      font-weight: 900
      margin-top: 1em
      font-size: 14px
      +bounceTransition(500ms)
      &:hover
        box-shadow: $shadow-3
        transform: translate3d(0, -3px, 0)

      &.disable-gdpr
        background: none
        padding: .5em
        box-shadow: none
        margin-top: 5px
        font-size: 10px
        color: transparentize($black, .35)
        &:hover
          box-shadow: none
          transform: none
</style>


