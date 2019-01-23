<template>
  <div>
    <section class="mt-8 mb-12">
      <h1 class="text-4xl pb-3">My Journal</h1>
      <p class="tracking-wide leading-normal text-grey-darker">
        Taking inspiration from other developers and influencers around me, I have decided to create a space to make my thoughts and musings throughout the year of 2019.  These won't be tutorials usually, which can be found over at <a href="https://devmarketer.io">DevMarketer.io</a>, but instead quick thoughts or things I learned.
      </p>
      <hr>
    </section>
    <section>
      <div class="my-8">
        <ul class="flex flex-col w-full p-0">
          <li v-for="(post, key) in posts" :key="key" class="mb-6 w-full list-reset">
            <div class="text-grey-dark font-bold text-sm tracking-wide flex justify-start flex-row items-center">
              <span>
                {{ post._created | toDate }}
              </span>
              <span class="mx-2">
                |
              </span>
              <a v-for="tag in post.tags" :key="tag" :href="'/category/'+tag" class="mr-2 bg-teal text-white px-2 py-1 no-underline text-xs font-light rounded hover:shadow">
                {{ tag }}
              </a>
            </div>
  
            <a :href="'/journal/'+post.title_slug" class="no-underline">
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
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const { data } = await app.$axios.post(
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

    return { posts: data.entries }
  },
  data() {
    return {
      url: process.env.POSTS_URL
    }
  }
}
</script>
