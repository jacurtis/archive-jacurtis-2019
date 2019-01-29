<template>
  <section>
    <article class="my-8">
      <p class="text-grey-dark font-bold text-sm tracking-wide">
        Published {{ post._created | humanTime }} at {{ post._created | clock }}
      </p>
      <h1 class="mt-2">
        {{ post.title }}
      </h1>
      <div class="mt-4 markdown" v-html="$options.filters.parseMd(post.excerpt + '\n' + post.content)" />
      <div class="text-grey-dark font-bold text-sm tracking-wide">
        <Tag v-for="(tag, key) in post.tags" :key="key" :name="tag">
          {{ tag }}
        </Tag>
      </div>
    </article>
  </section>
</template>

<script>
import Tag from '~/components/Tag.vue'

export default {
  async asyncData({ app, params, error, payload }) {
    if (payload) {
      return { post: payload }
    } else {
      const { data } = await app.$axios.post(
        process.env.POSTS_URL,
        JSON.stringify({
          filter: { published: true, slug: params.slug },
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

      return { post: data.entries[0] }
    }
  },
  components: {
    Tag
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.meta_description
        }
      ]
    }
  }
}
</script>
