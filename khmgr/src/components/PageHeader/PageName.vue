<template>
  <div class="page-name">
    <div class="page-title">{{ title }}</div>
  </div>
</template>

<script>
// 页面内部的头部分

export default {
  name: 'PageName',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      title: this.name || this.$route.meta.title
    }
  }
}
</script>

<style lang="less" scoped>
.page-title {
  font-weight: 400;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  font-size: 14px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  padding: 0 24px;
  border: 1px solid #d9d9d9;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  color: #2f54eb;
  background: #f0f5ff;
  border-color: #adc6ff;
}
</style>
