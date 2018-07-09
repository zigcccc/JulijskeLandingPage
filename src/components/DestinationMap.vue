<template>
  <aside :style="{top: `${heroHeight}px`}" :class="[{fixed : isPastHero}, activeDestination.id]" id="map">
    <h3>Location of {{ $store.state.activeDestination.name }}.</h3>
    <div class="map-container"></div>
    <div class="map-cta-container">
      <a :href="destinationMapUrl" target="_blank">See location <span><i class="fas fa-chevron-right"></i></span></a>
    </div>
    <div id="nadmorska-visina">
      <div id="sea-level-chart-container">
        <canvas id="sea-level-chart" width="100%" height="500"></canvas>
      </div>
      <p>{{ nadmorskaVisina }}m</p>
    </div>
  </aside>
</template>

<script>
import * as Chart from 'chart.js'
import * as count from 'count-js'
export default {
  name: 'DestinationMap',
  data() {
    return {
      chart: null,
      chartOptions: {
        hover: {
          mode: null
        },
        tooltips: {
          enabled: false
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              beginAtZero: true,
              max: 850
            }
          }],
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        }
      }
    }
  },
  computed: {
    heroHeight() {
      return this.$store.state.heroHeight;
    },
    destinations() {
      return this.$store.getters.getDestinations;
    },
    activeDestination() {
      return this.$store.state.activeDestination;
    },
    destinationMapUrl() {
      return this.$store.state.activeDestination.mapUrl;
    },
    isPastHero() {
      return this.$store.state.isPastHero;
    },
    prevAndNext() {
      return this.$store.getters.prevAndNext;
    },
    nadmorskaVisina() {
      return this.activeDestination.sea_level;
    },
    chartData() {
      return [0, this.nadmorskaVisina, 0]
    }
  },
  methods: {
    handleChart(data) {
      new Chart(this.chart, {
        type: 'line',
        data: {
          labels: ["", "", ""],
          datasets: [
            {
              lineTension: 1,
              showLines: false,
              spanGaps: false,
              cubicInterpolationMode: 'monotone',
              borderColor: 'rgba(38, 196, 133, 1)',
              pointRadius: 7,
              pointBackgroundColor: 'rgba(38, 196, 133, 1)',
              borderWidth: 5,
              backgroundColor: 'rgba(0,0,0,0)',
              data: data
            }
          ]
        },
        options: this.chartOptions
      })
    }
  },
  watch: {
    chartData(data) {
      this.handleChart(data)
    }
  },
  mounted() {
    this.chart = document.getElementById('sea-level-chart').getContext('2d')
    this.handleChart(this.chartData)
  }
}
</script>

<style lang="sass" scoped>
#map
  position: absolute
  right: 0
  width: 25vw
  background:
    image: url('/images/patterns/topography.png')
    repeat: repeat
    size: 600px 600px
  height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  &.fixed
    position: fixed
    top: 0 !important

h3
  font-weight: 900
  color: $black
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  +bounceTransition

#nadmorska-visina
  position: absolute
  bottom: 40px
  left: 20px
  font-size: 5em
  font-weight: 900
  color: $black
  width: calc(100% - 40px)
  height: 200px
  #sea-level-chart-container
    position: absolute
    bottom: 0
    left: -80px
    right: -40px
    top: 0
    z-index: 5
  p
    position: absolute
    z-index: 10
    text-shadow: 0 5px 10px rgba(0,0,0,.2)
    bottom: 0
    transform: translateY(25%)

.map-cta-container
  display: flex
  justify-content: center
  & > a
    padding: 1em
    display: flex
    align-items: center
    text-transform: uppercase
    font-weight: 900
    color: $primary
    text-shadow: 0 5px 10px rgba(0,0,0,.2)
    &:hover
      & > span
        transform: translateX(1em)
    & > span
      margin-left: 1em
      margin-top: 1px
      +bounceTransition
</style>

