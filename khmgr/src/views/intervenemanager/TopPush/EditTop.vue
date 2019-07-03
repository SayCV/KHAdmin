<template>
  <div>
    编辑头条:{{ newsId }}
  </div>
</template>

<script>
export default {
  name: 'EditTop',
  data () {
    return {
      newsId: this.$route.query.newsId
    }
  },
  watch: {
    '$route.path' (to, from) {
      if (to === '/intervenemanager/TopPush/edit') {
        console.log('进入新闻编辑页面', to)
        this.newsId = this.$route.query.newsId
      }
    }
  }
}
</script>

<style scoped>
</style>
