// const PurgecssPlugin = require('purgecss-webpack-plugin')
// const glob = require('glob-all')
// const path = require('path')
import axios from 'axios'
require('dotenv').config()
const collect = require('collect.js')
const pkg = require('./package')

export default {
  env: {
    // postsUrl: process.env.POSTS_URL,
    // uploadsUrl: process.env.UPLOADS_URL
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/okq6dhr.css'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // '~/assets/css/tailwind.css',
    'highlight.js/styles/atom-one-dark.css',
    '~/assets/scss/styles.scss'
  ],

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
          sort: { published_on: -1 },
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
            route: `topic/${tag}`,
            payload: payload
          }
        })
        .all()

      const posts = collection
        .map(post => {
          return {
            route: `journal/${post.slug}`,
            payload: post
          }
        })
        .all()

      return posts.concat(tags)
    }
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.URL,
    cacheTime: 1000 * 60 * 15,
    generate: true, // Enable me when using nuxt generate
    async routes() {
      const { data } = await axios.post(
        process.env.POSTS_URL,
        JSON.stringify({
          filter: {
            published: true
          },
          sort: {
            published_on: -1
          },
          populate: 1
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const collection = collect(data.entries)

      const tags = collection
        .map(post => post.tags)
        .flatten()
        .unique()
        .map(tag => `topic/${tag}`)
        .all()

      const posts = collection.map(post => `journal/${post.slug}`).all()

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
