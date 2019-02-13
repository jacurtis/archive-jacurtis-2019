<template>
  <div class="post-index">
    <header class="post-list-header">
      <div class="container">
        <h1 class="text-4xl pb-3">
          My Journal
        </h1>
        <p class="tracking-wide leading-normal text-grey-darker">
          Taking inspiration from other developers and influencers around me, I have decided to create a space to make my thoughts and musings throughout the year of 2019.  These won't be tutorials usually, which can be found over at <a href="https://devmarketer.io">
            DevMarketer.io
          </a>, but instead quick thoughts or things I learned.
        </p>
      </div>
    </header>
    <section>
      <div class="my-8">
        <ul class="flex flex-col w-full p-0">
          <li v-for="(post, key) in posts" :key="key" class="mb-6 w-full list-reset">
            <div class="text-grey-dark font-bold text-sm tracking-wide flex justify-start flex-row items-center">
              <span>
                {{ post.published_on | relativeTime }}
              </span>
              <span class="mx-2">
                |
              </span>
              <Tag v-for="tag in post.tags" :key="tag" :name="tag">
                {{ tag }}
              </Tag>
            </div>
  
            <a :href="'/journal/'+post.slug" class="no-underline">
              <h2 class="my-2 text-grey-darkest text-lg lg:text-xl">
                {{ post.title }}
              </h2>
            </a>
  
            <div class="page-content hidden md:block text-base mb-2" v-html="post.excerpt" />
            <a class="text-sm text-blue-light no-underline" :href="'/journal/'+post.slug">
              Read more
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import Tag from '~/components/Tag.vue'

export default {
  async asyncData({ app }) {
    const { data } = await app.$axios.post(
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

    return { posts: data.entries }
  },
  components: {
    Tag
  },
  head() {
    return {
      title: 'Journal Entries for Jacurtis',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'J. Alexander Curtis writes musings and thoughts about work and life in this online journal.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.post-list-header {
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background: #090a0b no-repeat 50%;
  background-size: cover;
}
</style>
