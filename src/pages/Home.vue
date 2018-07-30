<template>
  <div id="home">
    <main-menu />
    <influencers-popup />
    <hero />
    <destination-map-container v-if="!microsoft.isMicrosoft" />
    <destinations />
    <triglav-national-park />
    <video-section />
    <site-footer />
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import InfluencersPopup from '@/components/InfluencersPopup'
import Hero from '@/components/Hero'
import DestinationMapContainer from '@/components/DestinationMapContainer'
import Destinations from '@/components/Destinations'
import TriglavNationalPark from '@/components/TriglavNationalPark'
import VideoSection from '@/components/VideoSection'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'Home',
  components: {MainMenu, InfluencersPopup, Hero, DestinationMapContainer, Destinations, TriglavNationalPark, VideoSection, SiteFooter},
  computed: {
    microsoft() {
      return this.$store.getters.getMicrosoft;
    }
  }
}
</script>