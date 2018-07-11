<template>
  <div class="social-links">
    <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
    <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
    <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
  </div>
</template>

<script>
export default {
  name: 'SocialLinks'
}
</script>

<style lang="sass" scoped>
.social-links
  //margin-right: 2em
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

