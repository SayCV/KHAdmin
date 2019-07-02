<template>
  <div>
    编辑健康推送
    {{ newsId }}
  </div>
</template>

<script>
export default {
  // name: 'EditPush'
  data () {
    return {
      newsId: this.$route.query.newsId
    }
  }
}
</script>

<style scoped>

</style>
