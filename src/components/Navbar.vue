<template>
  <nav>
    <div class="container">
      <div class="social-links">
        <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
      </div>
      <div class="logo-container">
        JulianAlps<span>.</span>
      </div>
      <div class="menu-icon">
        Destinations
        <img src="@/assets/Menu.svg" alt="Meni">
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style lang="sass" scoped>
nav
  position: relative
  z-index: 100
  padding-top: 20px
  .container
    display: flex
    justify-content: space-between
    align-items: center

.social-links
  padding-left: 2em
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

.logo-container
  font-size: 2em
  color: $white
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  font-weight: 900
  position: relative
  &::before,
  &::after
    content: ''
    width: 20vw
    max-width: 300px
    height: 2px
    background: $primary
    display: block
    position: absolute
    top: 50%
  &::before
    left: -100%
    transform: translate3d(-50%, -50%, 0)
  &::after
    right: -100%
    transform: translate3d(50%, -50%, 0)

  & > span
    color: $black

.menu-icon
  display: flex
  align-items: center
  font-weight: 300
  color: $white
  font-size: 14px
  & > img
    margin-left: 1em
    +bounceTransition(400ms)
    &:hover
      transform: scale(1.25) rotate(90deg)
      cursor: pointer

</style>
