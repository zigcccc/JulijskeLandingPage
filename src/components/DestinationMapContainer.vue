<template>
	<aside :style="{top: `${heroHeight}px`}" :class="[{fixed : isPastHero}, activeDestination.id]" id="map">
		<h3 v-if="language === 'sl'">Lokacija destinacije {{ $store.state.activeDestination.name[language] }}.</h3>
		<h3 v-else>Location of {{ $store.state.activeDestination.name[language] }}.</h3>
		<div class="zoom-control-container">
			<a @click.prevent="handleZoom"><span><i class="fas" :class="zoomControlIcon"></i></span></a>
		</div>
		<div id="map-container">
			<destination-map :active-destination="activeDestination" :zoom="zoomIn" />
		</div>
		<div class="map-cta-container">
			<a :href="destinationMapUrl" target="_blank">{{ language === 'sl' ? 'Poglej lokacijo' : 'See location' }} <span><i class="fas fa-chevron-right"></i></span></a>
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
import DestinationMap from '@/components/DestinationMap'

export default {
  name: 'DestinationMapContainer',
  components: {DestinationMap},
  data() {
    return {
      zoomIn: true,
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
      if (this.prevAndNext.prev && this.prevAndNext.next) {
        return [this.prevAndNext.prev.sea_level, this.nadmorskaVisina, this.prevAndNext.next.sea_level];
      } else if(this.prevAndNext.prev && !this.prevAndNext.next) {
        return [this.prevAndNext.prev.sea_level, this.nadmorskaVisina, 1000];
      } else if (!this.prevAndNext.prev && this.prevAndNext.next) {
        return [1000, this.nadmorskaVisina, this.prevAndNext.next.sea_level];
      } else {
        return [0, this.nadmorskaVisina, 0];
      }
    },
    zoomControlIcon() {
      return !this.zoomIn ? 'fa-search-plus' : 'fa-search-minus';
    },
    language() {
      return this.$store.getters.getLanguage;
    }
  },
  methods: {
    handleZoom() {
      this.zoomIn = !this.zoomIn;
    },
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
              borderColor: '#628E6D',
              pointRadius: 7,
              pointBackgroundColor: '#628E6D',
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
    this.handleChart(this.chartData);
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
  justify-content: flex-start
  align-items: center
  padding-top: 20px
  @media screen and (max-width: 768px)
    display: none
  &.fixed
    position: fixed
    top: 0 !important

h3
  font-weight: 900
  color: $black
  text-shadow: 0 5px 10px rgba(0,0,0,.2)
  +bounceTransition

.zoom-control-container
  text-transform: lowercase
  font-size: 16px
  margin-top: 10px
  position: absolute
  top: 10px
  right: 10px
  +bounceTransition
  &:hover
    transform: translate3d(0, -3px, 0)
    & > a
      box-shadow: $shadow-4
  & > a
    color: $white
    background: $primary
    border-radius: 200px
    padding: 0.5em .75em
    font-weight: 900
    box-shadow: $shadow-2
    +bounceTransition

#map-container
  margin: 20px 0
  overflow: hidden
  position: relative
  z-index: 6

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
  position: absolute
  bottom: 235px
  width: 100%
  z-index: 10
  & > a
    padding: .75em 1em
    display: flex
    font-size: 14px
    align-items: center
    text-transform: uppercase
    font-weight: 900
    color: $primary
    background: $white
    box-shadow: $shadow-1
    border-radius: 200px
    +bounceTransition
    //text-shadow: 0 5px 10px rgba(0,0,0,.2)
    &:hover
      box-shadow: $shadow-3
      & > span
        transform: translateX(.5em)
    & > span
      margin-left: 1em
      margin-top: 1px
      +bounceTransition
</style>

