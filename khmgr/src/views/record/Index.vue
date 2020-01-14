<template>
  <a-card>
    <div class="view">
      <router-view />
    </div>
  </a-card>
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
.view {
  min-height: calc(100vh - 290px);
}
</style>
