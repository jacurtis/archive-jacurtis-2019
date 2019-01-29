<template>
  <div class="markdown-content" v-html="parseMarkdown(content)" />
</template>

<script>
import render from '~/plugins/markdown.js'

export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  methods: {
    parseMarkdown(toParse) {
      return render(toParse)
    }
  }
}
</script>
