import Vue from 'vue'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
const dayjs = require('dayjs')
dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)

Vue.filter('relativeTime', function(date) {
  return dayjs(date).fromNow()
})

Vue.filter('humanTime', function(date) {
  return dayjs(date).format('MMM Do, YYYY')
})

Vue.filter('clock', function(timestamp) {
  return dayjs(timestamp * 1000).format('h:mm A')
})
