<template>
  <div class="sub-index">
    <router-view></router-view>
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

</style>
