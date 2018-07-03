<template>
  <div class="single-destination" :id="destination.id" :style="sectionBackground">
    <div class="destination-container">
      <h2 class="destination-name">{{ destination.name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleDestination',
  data(){
    return {
      sectionBackground: {
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,.5),
            rgba(0,0,0,.5)
          ),
          url('/images/destinations/${this.destination.id}.png')
        `
      }
    }
  },
  props: {
    destination: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.single-destination
  height: 1075px
  max-height: 100vh
  background:
    size: cover
    repeat: no-repeat
    attachment: fixed

.destination-container
  width: calc(75% + 2em)
  margin-left: auto
  padding: 30px 1em 0

.destination-name
  font-weight: 900
  font-size: 4.5em
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  &::after
    content: ''
    width: 100px
    margin-left: 25px
    height: 4px
    border-radius: 200px
    background: $primary
    display: block
    margin-top: 5px
</style>

