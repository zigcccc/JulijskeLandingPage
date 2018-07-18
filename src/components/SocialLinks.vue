<template>
  <div class="social-links" :class="{inverted : inNavbar}">
    <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
    <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
    <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
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

