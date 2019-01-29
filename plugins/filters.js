import Vue from 'vue'
import highlightjs from 'highlight.js'
import marked, { Renderer } from 'marked'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
const dayjs = require('dayjs')
dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)

// Only import the languages that you need to keep our js bundle small
highlightjs.registerLanguage('php', require('highlight.js/lib/languages/php'))
highlightjs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript')
)
highlightjs.registerLanguage('css', require('highlight.js/lib/languages/css'))

// Create your custom renderer.
const renderer = new Renderer()
renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && highlightjs.getLanguage(language))
  // Highlight only if the language is valid.
  const highlighted = validLang
    ? highlightjs.highlight(language, code).value
    : code
  // Render the highlighted code with `hljs` class.
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
}

// Set the renderer to marked.
marked.setOptions({
  renderer
})

Vue.filter('parseMd', function(content) {
  return marked(content)
})

Vue.filter('relativeTime', function(date) {
  return dayjs(date).fromNow()
})

Vue.filter('humanTime', function(date) {
  return dayjs(date).format('MMM Do, YYYY')
})

Vue.filter('clock', function(date) {
  return dayjs(date).format('h:mm A')
})
