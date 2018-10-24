<template>
	<div id="home">
		<gdpr />
		<main-menu />
		<influencers-popup />
		<hero :page-offset="pageOffset" />
		<destination-map-container v-if="!microsoft.isMicrosoft" />
		<destinations :page-offset="pageOffset" />
		<triglav-national-park :page-offset="pageOffset" />
		<video-section :page-offset="pageOffset" />
		<!-- <ski-tickets /> -->
		<site-footer />
	</div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import gdpr from '@/components/gdpr';
import InfluencersPopup from '@/components/InfluencersPopup'
import Hero from '@/components/Hero'
import DestinationMapContainer from '@/components/DestinationMapContainer'
import Destinations from '@/components/Destinations'
import TriglavNationalPark from '@/components/TriglavNationalPark'
import VideoSection from '@/components/VideoSection'
import SkiTickets from '@/components/SkiTickets'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'Home',
	components: {MainMenu, gdpr, InfluencersPopup, Hero, DestinationMapContainer, Destinations, TriglavNationalPark, VideoSection, SkiTickets, SiteFooter},
	data() {
		return {
			pageOffset: 0
		}
	},
  computed: {
    microsoft() {
      return this.$store.getters.getMicrosoft;
		}
	},
	methods: {
		handleScroll(offset) {
			this.pageOffset = offset;
		}
	},
	created() {
    document.addEventListener('scroll', e => {
      if(this.isIE) {
        return
      }
      this.handleScroll(e.target.scrollingElement.scrollTop);
    })
	},
	destroyed() {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>