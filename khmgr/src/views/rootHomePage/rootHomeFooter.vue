<template>
  <a-layout-footer class="home-footer-wrapper">
    Copyright © 2019 杭州师范大学工程中心
    <!-- <div class="footer-info">当前用户：呀哈哈</div> -->
  </a-layout-footer>
</template>

<script>
import HeadMenu from '@/views/rootHomePage/rootHeadMenu'
import Logo from '@/views/rootHomePage/rootHeaderLogo'

export default {
  name: 'RootHomeHeader',
  components: {
    HeadMenu,
    Logo
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.home-footer-wrapper {
  text-align: center;
  background: #002140;
  color: white;
}
</style>
