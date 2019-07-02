<template>
  <div>
    编辑头条
    {{ newsId }}
  </div>
</template>

<script>
export default {
  name: 'EditTop',
  data () {
    return {
      newsId: this.$route.query.newsId
    }
  }
}
</script>

<style scoped>

</style>
