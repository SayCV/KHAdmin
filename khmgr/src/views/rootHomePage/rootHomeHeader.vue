<template>
  <a-layout-header class="home-header-wrapper">
    <logo />
    <div class="header-right">
      <HeadMenu />
    </div>
  </a-layout-header>
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
.home-header-wrapper {
  padding: 0 12px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
}
</style>
