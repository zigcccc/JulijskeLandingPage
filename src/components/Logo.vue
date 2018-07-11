<template>
  <h3 class="logo" :class="[`main__${mainColor}`, `accent__${accentColor}`]">JulianAlps<span>.</span></h3>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    mainColor: {
      type: String,
      required: false,
      default: 'white'
    },
    accentColor: {
      type: String,
      required: false,
      default: 'black'
    }
  }
}
</script>

<style lang="sass" scoped>
h3.logo
  font-size: 2em
  color: $white
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  font-weight: 900
  &.main__black
    color: $black
  &.main__green
    color: $primary
  &.accent__white
    & > span
      color: $white
  &.accent__green
    & > span
      color: $primary
  & > span
    color: $black
</style>
