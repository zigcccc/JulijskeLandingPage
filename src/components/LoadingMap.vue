<template>
  <svg id="loading-map-line" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 1048.3 744" style="enable-background:new 0 0 1048.3 744;" xml:space="preserve">
    <g id="Layer_2_1_">
      <path class="st0" :class="{done : done}" d="M482.3,23.9c2.1-3.9,5.9-6.6,10.2-7.4c8.8-1.6,23.3-4.3,29.2-6c8.8-2.4,52.3,6.3,72.4,7.3
        c20.1,1,40.6,1,50.4,9.3s28.4,10.3,34.7,10.3s15.2,3.9,5.4,16.6s-11.7,34.2,20.1,38.1s24.9-1,38.6,15.2
        c13.7,16.1,29.8,10.8,37.2,22.5c7.3,11.7,2.4,17.1,22.5,23s30.8,11.7,37.2,12.7s25.6-7.8,25.6-20.6s3.3-18.5,12.8-20
        s8-22.4-12.8-28.7C845,90,834,96.2,834,83.4s30.1-3.4,46.7,0s36.6,14.1,44.9,19.5c8.3,5.4,2.8,10.7,21.7,16.3
        c5.7,1.7,13.4,4.3,12.8,12.8c-0.6,8.5,6.8,31.1,30.7,49.9s36.2,25.7,36.2,38.5s-19.6-18.7-51.8-21.6s-43.2-16.8-75.9-4
        s-32.7,22.6-41,41.7s3.9,24.9,0,33.3c-3.9,8.3-29.9,9.8-37.2,21s-5.4,19.7-55.3,14.5c-49.9-5.2-42.6,13.4-67.5,16.3
        s-56.1,6.2-86.2-3.5c-30.2-9.7-21.9,51-45.4,64.8c-23.5,13.9-1,57.8-15.3,74.2s-9.4,34.7-66,39.9s-18.8,37.8-14.7,55.2
        s30.7,37.8,11.2,69.5c-19.4,31.7,8.2,82.1-100.1,100.8s-155.3,12.8-170.6-12.8s11.2-48.1,34.7-89s74.6-29.6,100.1-60.3
        s33.7-54.2,27.6-81.7c-6.1-27.6-7.2-37.8-53.1-51.1c-46-13.3-75.6-0.2-109.3-44.5s-70.5-95.5-154.3-96.5s-26.6-38.8,35.8-55.2
        s77.7,22.5,154.3,8.2s151.2-78.7,177.8-73.6c26.6,5.1,19.4-25.5-1-39.9C404.2,112.5,463.8,58.3,482.3,23.9z"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'LoadingMap',
  props: {
    percent: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      path: {
        el: null,
        totalLength: 0
      }
    }
  },
  computed: {
    percantage() {
      return this.percent;
    },
    done() {
      return this.percent === 100;
    }
  },
  watch: {
    percantage(value) {
      let drawLength = (this.path.totalLength * value) / 100;
      this.path.el.style.strokeDashoffset = this.path.totalLength - drawLength;
      if (value === 1) {
        this.path.el.style.strokeDasharray = "none";
      } else {
        this.path.el.style.strokeDasharray = this.path.totalLength + ' ' + this.path.totalLength;
      }
    }
  },
  mounted() {
    this.path.el = document.querySelector('#loading-map-line path');
    this.path.totalLength = this.path.el.getTotalLength();
    this.path.el.style.strokeDasharray = this.path.totalLength + ' ' + this.path.totalLength;
    this.path.el.style.strokeDashoffset = this.path.totalLength;
    this.path.el.getBoundingClientRect();
  }
}
</script>


<style lang="sass" scoped>
  .st0
    fill: transparentize($white, 1)
    stroke: $white
    stroke-width: 14
    stroke-miterlimit: 10
    transition: fill 500ms ease-in-out 250ms, stroke-dasharray 400ms ease-in-out, transform 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 750ms
    transform-origin: center center
    &.done
      fill: $white
      transform: scale(0)
</style>