<template>
  <section>
    <div class="my-8">
      <h1 class="mb-6">
        Posts tagged with "{{ category }}"
      </h1>
      <ul class="flex flex-col w-full p-0">
        <li v-for="(post, key) in posts" :key="key" class="mb-6 w-full list-reset">
          <div class="text-grey-dark font-bold text-sm tracking-wide">
            <a v-for="(tag, tagkey) in post.tags" :key="tagkey" :href="'/category/'+tag" class="ml-1 no-underline">
              {{ tag }}
            </a>
          </div>

          <a :href="'/'+post.title_slug" class="no-underline">
            <h2 class="my-2 text-grey-darkest text-lg lg:text-xl">
              {{ post.title }}
            </h2>
          </a>

          <div class="page-content hidden md:block text-base mb-2" v-html="post.excerpt" />
          <a class="text-sm text-blue-light no-underline" :href="'/journal/'+post.title_slug">
            Read more
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ app, params, error, payload }) {
    if (payload) {
      return { posts: payload, category: params.tag }
    } else {
      const { data } = await app.$axios.post(
        process.env.POSTS_URL,
        JSON.stringify({
          filter: { published: true, tags: { $has: params.tag } },
          sort: { _created: -1 },
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
