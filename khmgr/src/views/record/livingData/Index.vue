<template>
  <div class="page-header-index-wide">
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '0px 32px 0px 16px', height: '100%' }"
      :style="{ height: '100%' }"
    >
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
  min-height: calc(100vh - 221px);
}
</style>
