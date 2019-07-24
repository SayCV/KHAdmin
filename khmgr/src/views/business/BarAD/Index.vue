<template>
  <route-view></route-view>
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
