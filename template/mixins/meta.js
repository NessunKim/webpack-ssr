export default {
  watch: {
    '$route' () {
      this.setMeta()
    }
  },

  created () {
    if (process.env.VUE_ENV === 'client') return

    const metaData = this.$route.matched[0].meta || {}

    this.$ssrContext.title = metaData.title
    this.$ssrContext.description = metaData.description
    this.$ssrContext.keywords = metaData.keywords
  },

  mounted () {
    this.$vuetify.load(this.setMeta)
  },

  methods: {
    setMeta () {
      if (typeof document === 'undefined') return

      const metaData = this.$route.matched[0].meta || {}

      document.title = metaData.title
      document.querySelector('meta[name="description"]').setAttribute('content', metaData.description)
      document.querySelector('meta[name="keywords"]').setAttribute('content', metaData.keywords)
    }
  }
}
