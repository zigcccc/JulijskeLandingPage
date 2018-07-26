<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123.53 61.64" :class="{inverted : !primary}">
    <defs></defs>
    <title>feelSloveniaLogo</title>
    <filter id="dropshadow" height="130%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="10"/> <!-- stdDeviation is how much to blur -->
      <feOffset dx="0" dy="5" result="offsetblur"/> <!-- how much to offset -->
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5"/> <!-- slope is the opacity of the shadow -->
      </feComponentTransfer>
      <feMerge> 
        <feMergeNode/> <!-- this contains the offset blurred image -->
        <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
      </feMerge>
    </filter>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <polygon class="cls-1" points="108.16 0 0 0.01 0 46.38 123.53 61.64 108.16 0"/>
        <path class="cls-2" d="M5.44,20.2H12V18.15l-1.84-.23V7.7L12,7.5v-2H5.44V7.5l1.84.2V17.92l-1.84.23ZM21.81,8h6.3V5.45H19V20.2h2.84V14h5.36V11.44H21.81Zm8,12.16h9.66V17.57H32.66V14h5.67V11.44H32.66V8h6.82V5.45H29.82Zm11.81,0h9.65V17.57H44.46V14h5.68V11.44H44.46V8h6.82V5.45H41.63Zm11.82,0h9.16V17.57H56.27V5.45H53.45Z"/>
        <path class="cls-3" d="M16.18,35.71c0-6.07-8.22-2.9-8.22-7,0-1.86,1.42-2.27,3.09-2.27a5.05,5.05,0,0,1,3.67,1.89l1.11-1.06a6.38,6.38,0,0,0-4.78-2.36c-2.4,0-4.82.88-4.82,3.65,0,6.26,8.2,2.65,8.2,7.2,0,2-1.57,2.79-3.34,2.79A6,6,0,0,1,7,36.71L5.88,37.77A6.83,6.83,0,0,0,11.07,40c2.63,0,5.11-1.33,5.11-4.27"/>
        <path class="cls-2" d="M18.7,39.75h9.16V37.13H21.52V25H18.7Zm22.61-7.88c0-4.24-1.31-7.07-6.07-7.07s-6.06,2.83-6.06,7.07S30,40,35.24,40s6.07-3.84,6.07-8.09m-3-.31v.83c0,2.86,0,5-3.11,5s-3.1-2.13-3.1-4.84v-1c0-2.32.16-4.22,3.1-4.22s3.11,1.82,3.11,4.22M50,39.75,55.54,25H52.47L48.64,36h0L44.73,25H41.67l5.52,14.75Zm6.72,0H66.4V37.13H59.59V33.54h5.67V31H59.59v-3.4H66.4V25H56.75Z"/>
        <path class="cls-3" d="M76.79,39.75h2.46V25.07H77.67V38h0L71.31,25.07H68.85V39.75h1.6V26.82h0Zm4.89,0h5.5v-1.1l-1.94-.24v-12l1.94-.25V25.09h-5.5v1.08l1.93.25v12l-1.93.24Zm17.45,0h1.8L95.59,25.07h-2L88.22,39.75H90l1.52-4.4h6ZM94.58,26.44l2.51,7.47h-5l2.48-7.47Z"/>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'FeelSlovenia',
  props: {
    primary: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>


<style lang="sass" scoped>
svg
  +bounceTransition(500ms)
  &:hover
    transform: scale(1.2)
  &.inverted
    .cls-1
      fill: $white
    .cls-2
      fill: $primary
    .cls-3
      fill: darken($primary, 5%)
  .cls-1
    fill: $primary
    //fill: $white
  .cls-2
    fill: $white
  .cls-3
    fill: darken($white, 5%)
</style>