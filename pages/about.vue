<template>
  <section class="my-8">
    <div class="text-left">
      <h1 class="mb-6">
        About Page
      </h1>
      <p class="pb-4 leading-normal">
        There really should be more here, but I threw this site together in only about 3-4 hours.  So I will come back and make some updates to this page in the future.
      </p>
      <p class="pb-4 leading-normal">
        This site was built as a static site using <a href="https://vuejs.org/">Vue.js</a> using the <a href="https://nuxtjs.org/">Nuxt.js</a> framework.  It is styled entirely using <a href="https://tailwindcss.com/">Tailwind.css</a>.  The content is created in <a href="https://getcockpit.com/">Cockpit</a>, a headless CMS, which syncs to <a href="https://www.netlify.com/">Netlify</a> for hosting.  Each time I make a change in Cockpit, a webhook is sent to Netlify to generate the site again with my new content.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: 'About',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is the about page!'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'This is the about page!'
        }
      ]
    }
  }
}
</script>
