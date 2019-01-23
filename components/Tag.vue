<template>
  <a :href="href" class="mr-2 bg-teal text-white px-2 py-1 no-underline text-xs font-light rounded hover:shadow">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    url: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    href() {
      if (this.url === '' && this.name !== '') {
        return `/category/${this.name}`
      } else if (this.url === '' || this.url === '/') {
        return `/`
      } else {
        return this.url
      }
    }
  }
}
</script>
