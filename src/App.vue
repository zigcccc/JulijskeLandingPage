<template>
  <div id="app">
    <hero />
    
    <div id="spacer"></div>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
export default {
  name: 'app',
  components: {Hero}
}
</script>

<style lang="sass">
html,
body
  overflow-x: hidden
#app
  font-family: $family-sans
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $black

#spacer
  min-height: 2000px
  display: block
  background: $black
</style>
