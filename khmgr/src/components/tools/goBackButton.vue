<template>
  <div class="go-back-button">
    <a-button type="primary" @click="goToHome"><a-icon type="left" />{{ $t('goBack') }}</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.go-back-button {
  float: right;
  margin-right: 12px;
}
</style>
