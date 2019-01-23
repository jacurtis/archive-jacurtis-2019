<template>
  <section>
    <div class="my-8">
      <p class="pb-4 leading-normal">
        Hey, I'm <strong>J. Alexander Curtis</strong>!  Around the web you find me under the name <strong>Jacurtis</strong> and I run the DevMarketer website and YouTube channel for software-focused entrepreneurs.
      </p>
      <p class="pb-4 leading-normal">
        Right now, I am focused on building DevMarketer into a thriving community focused on bringing smart marketing insights into the software products that we build everyday.
      </p>
      <p class="pb-4 leading-normal">
        I am available for hire or consulting work in the fields of marketing, project management, and network deployment (via Google Cloud Platform and Amazon Web Services).
      </p>
      <p class="pb-4 leading-normal">
        When I am not working, I focus on training for triathlons and running. I enjoy being outdoors and taking a break from the screen.
      </p>
    </div>
  </section>
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
