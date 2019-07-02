<template>
  <div class="page-header-index-wide">
    <route-view></route-view>
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
@media screen and (max-width: 900px) {
  .page-header-index-wide {
    margin: 1rem;
  }
}
</style>
