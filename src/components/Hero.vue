<template>
  <section id="hero" :style="{backgroundImage: `url(${bgimage})`}">
    <hero-background />
    <div class="container">
      test text
    </div>
  </section>
</template>

<script>
import HeroBackground from '@/components/HeroBackground'
export default {
  name: 'Hero',
  components: {HeroBackground},
  data(){
    return {
      bgimage: '/images/hero_bg.png'
    }
  }
}
</script>

<style lang="sass" scoped>
#hero
  position: relative
  height: $hero-height
  overflow: hidden
  background:
    repeat: no-repeat
    size: cover
    position: 0% 50%
  @media screen and (max-width: 1440px)
    height: calc(#{$hero-height} - 100px)
  .container
    background: pink
</style>
