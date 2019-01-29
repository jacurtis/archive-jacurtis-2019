<template>
  <section>
    <div class="my-8">
      <h1 class="mb-6">
        Posts tagged with "{{ category }}"
      </h1>
      <ul class="flex flex-col w-full p-0">
        <li v-for="(post, key) in posts" :key="key" class="mb-6 w-full list-reset">
          <Tag v-for="(tag, tagkey) in post.tags" :key="tagkey" :name="tag">
            {{ tag }}
          </Tag>

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
</template>

<script>
import Tag from '~/components/Tag.vue'

export default {
  components: {
    Tag
  },
  async asyncData({ app, params, error, payload }) {
    if (payload) {
      return { posts: payload, category: params.tag }
    } else {
      const { data } = await app.$axios.post(
        process.env.POSTS_URL,
        JSON.stringify({
          filter: { published: true, tags: { $has: params.tag } },
          sort: { published_on: -1 },
          populate: 1
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (!data.entries[0]) {
        return error({ message: '404 Page not found', statusCode: 404 })
      }

      return { posts: data.entries, category: params.tag }
    }
  },
  head() {
    return {
      title: `Posts tagged with ${this.category}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `All journal posts categorized as ${this.category}.`
        }
      ]
    }
  }
}
</script>
