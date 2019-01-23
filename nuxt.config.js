// const PurgecssPlugin = require('purgecss-webpack-plugin')
// const glob = require('glob-all')
// const path = require('path')
import axios from 'axios'
require('dotenv').config()
const collect = require('collect.js')
const pkg = require('./package')

export default {
  env: {
    postsUrl: process.env.POSTS_URL
  }
}

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/tailwind.css', 'highlight.js/styles/atom-one-dark.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/filters.js'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  generate: {
    routes: async () => {
      const { data } = await axios.post(
        process.env.POSTS_URL,
        JSON.stringify({
          filter: { published: true },
          sort: { _created: -1 },
          populate: 1
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      const collection = collect(data.entries)

      const tags = collection
        .map(post => post.tags)
        .flatten()
        .unique()
        .map(tag => {
          const payload = collection
            .filter(item => {
              return collect(item.tags).contains(tag)
            })
            .all()

          return {
            route: `category/${tag}`,
            payload: payload
          }
        })
        .all()

      const posts = collection
        .map(post => {
          return {
            route: post.title_slug,
            payload: post
          }
        })
        .all()

      return posts.concat(tags)
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
