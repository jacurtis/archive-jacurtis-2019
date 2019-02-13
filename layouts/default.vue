<template>
  <div class="site-wrapper">
    <page-header />
    <page-nav />
    <nuxt />
    <page-footer />
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import PageNav from '~/components/PageNav.vue'
import PageFooter from '~/components/PageFooter.vue'

export default {
  components: {
    PageHeader,
    PageNav,
    PageFooter
  }
}
</script>
