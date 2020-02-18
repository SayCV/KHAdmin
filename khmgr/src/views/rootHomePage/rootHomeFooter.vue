<template>
  <a-layout-footer class="home-footer-wrapper">
    <UserMenu></UserMenu>
    <div class="footer-tight">
      <span style="marginRight:16px">Copyright © 2019 杭州师范大学工程中心</span>
      <a
        class="link"
        href="https://github.com/XQ0118/KHAdmin"
        target="_blank"
      >
        <a-icon type="github" />
      </a>
    </div>
  </a-layout-footer>
</template>

<script>

import UserMenu from '@/components/tools/UserMenu'

export default {
  name: 'RootHomeHeader',
  components: {
    UserMenu
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.home-footer-wrapper {
  padding: 0 50px;
  background: #002140;
  color: white;
  display: flex;
  justify-content: space-between;
  .footer-tight {
    padding: 24px 0;
    .link {
      color: #fff;
    }
  }
}
</style>
