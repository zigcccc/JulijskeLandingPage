<template>
  <div id="home">
    <main-menu />
    <hero />
    <destination-map-container />
    <destinations />
    <triglav-national-park />
    <site-footer />
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu'
import Hero from '@/components/Hero'
import DestinationMapContainer from '@/components/DestinationMapContainer'
import Destinations from '@/components/Destinations'
import TriglavNationalPark from '@/components/TriglavNationalPark'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'Home',
  components: {MainMenu, Hero, DestinationMapContainer, Destinations, TriglavNationalPark, SiteFooter},
}
</script>

