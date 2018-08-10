<template>
	<div class="language-switcher">
		<span :class="{active : language === 'en'}" @click="changeLanguage('en')">en</span> / <span :class="{active : language === 'sl'}" @click="changeLanguage('sl')">sl</span>
	</div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  props: {
    toggleMenu: {
      type: Boolean,
      required: false,
      default: false
    },
    location: {
      type: String,
      required: false,
      default: 'MainMenu'
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLanguage;
    }
  },
  methods: {
    changeLanguage(lang) {
      this.$ga.event({
        eventCategory: 'Language Change',
        eventAction: `From ${this.language} to ${lang}`,
        eventLabel: this.$store.getters.getWindowWidth > 768 ? 'Desktop' : 'Mobile'
      })
      this.$store.dispatch('changeLanguage', lang);
      if (this.toggleMenu) {
        this.$store.dispatch('toggleMenu');
      }
      if (this.location === 'footer') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.language-switcher
  span
    font-size: 1.2em
    opacity: .75
    +bounceTransition(500ms)
    &:hover
      cursor: pointer
      opacity: 1
    &.active
      font-weight: 900
    opacity: 1
</style>

