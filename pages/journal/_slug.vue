<template>
  <section class="post-section">
    <div class="container">
      <article class="my-8 post">
        <header class="post-header">
          <section class="post-meta">
            <time class="post-meta-date" :datetime="post.published_on">
              {{ post.published_on | humanTime }}
            </time>
            <!-- <span class="date-divider">/</span>
            <a href="/tag/getting-started">Getting Started</a> -->
          </section>
          <h1 class="post-title">
            {{ post.title }}
          </h1>
        </header>

        <figure class="post-image">
          <img :src="featuredImageUrl" :alt="post.image.description">
        </figure>
        
        <section class="post-content content">
          <!-- Rendered Markdown -->
          <Markdown class="mt-4 markdown" :content="post.content" />  
        </section>
        
  
        <div class="text-grey-dark font-bold text-sm tracking-wide">
          <Tag v-for="(tag, key) in post.tags" :key="key" :name="tag">
            {{ tag }}
          </Tag>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import Tag from '~/components/Tag.vue'
import Markdown from '~/components/Markdown.vue'

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
    Tag,
    Markdown
  },
  computed: {
    featuredImageUrl() {
      return process.env.UPLOADS_URL + this.post.image.path
    }
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


<style lang="scss" scoped>
.post-header {
  text-align: center;
  padding: 6vw 3vw 3vw 3vw;
  .post-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #738a94;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    .post-meta-date {
      color: #3eb0ef;
    }
  }
  .post-title {
    margin: 0;
    padding-top: 10px;
    color: #090a0b;
    font-family: lexia, sans-serif;
    font-size: 50px;
    font-weight: 800;
    font-style: normal;
  }
}
.post-image {
  margin: 0 -10vw -165px;
  padding: 0;
  background: #c5d2d9 50%;
  border-radius: 5px;
  overflow: hidden;

  img {
    width: 100%;
    max-height: 650px;
    object-fit: cover;
    vertical-align: middle;
  }
}

.post-content {
  position: relative;
  border-radius: 5px 5px 0 0;
  margin: 0 auto;
  padding: 70px 100px 0;
  min-height: 300px;
  background: #fff;

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 15px;
    z-index: -1;
    display: block;
    width: 20px;
    height: 200px;
    background: rgba(39, 44, 49, 0.15);
    filter: blur(5px);
  }
  &:before {
    left: -5px;
    transform: rotate(-5deg);
  }
  &:after {
    right: -5px;
    transform: rotate(5deg);
  }
}
</style>
