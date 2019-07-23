<template>
  <div>
    <a-button
      type="primary"
      @click="() => handleBack()"
    >
      <a-icon type="left" />返回
    </a-button>
  </div>
</template>

<script>

export default {
  name: 'ButtonRefresh',

  // props: ['name', 'linkTo', 'delay'],
  props: {
    name: {
      type: String,
      default: ''
    },
    linkTo: {
      type: String,
      default: ''
    }

  },
  data () {
    return {
      isShow: false
    }
  },
  watch: {
    $route (now, old) { // 监控路由变换，控制返回按钮的显示
      if (now.path === this.$route.path) {
        console.log('url !!', this.$route.path)
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  },
  methods: {
    handleBack () {
      // 点击行进入add页
      console.log('click me to back !!')
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
