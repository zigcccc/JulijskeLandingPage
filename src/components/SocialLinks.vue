<template>
  <div class="social-links" :class="{inverted : inNavbar}">
    <a @click="handleSocialLinkClick('facebook')" href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
    <a @click="handleSocialLinkClick('instagram')" href="https://www.instagram.com/julian.alps/?hl=en" target="_blank"><i class="fab fa-instagram"></i></a>
    <a @click="handleSocialLinkClick('youtube')" href="#" target="_blank"><i class="fab fa-youtube"></i></a>
  </div>
</template>

<script>
export default {
  name: 'SocialLinks',
  props: {
    location: {
      type: String,
      required: false,
      default: 'footer'
    }
  },
  computed: {
    inNavbar() {
      return this.location === 'navbar';
    }
  },
  methods: {
    handleSocialLinkClick(platform) {
      this.$ga.event({
        eventCategory: 'Social Link Click',
        eventAction: platform,
        eventLabel: this.location
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.social-links
  &.inverted
    & > a
      font-size: 1.2em
      color: $black
      padding: 0 15px
      text-shadow: 0 3px 6px rgba(0,0,0,.2)
      & > i
        +bounceTransition(400ms)
      &:hover
        & > i
          transform: scale(1.25)
          color: $primary
  & > a
    font-size: 1.2em
    color: $white
    padding: 0 15px
    text-shadow: 0 3px 6px rgba(0,0,0,.2)
    & > i
      +bounceTransition(400ms)
    &:hover
      & > i
        transform: scale(1.25)
        color: $primary
</style>

