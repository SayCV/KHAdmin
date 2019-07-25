<template>
  <div class="page-header-index-wide">
    <a-card>
      <router-view></router-view>
    </a-card>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'

export default {
  components: {
    RouteView,
    PageView
  },

  data () {
    return {
      // horizontal  inline
      mode: 'inline'
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-index-wide {
  min-height: calc(100vh - 220px);
}
</style>
