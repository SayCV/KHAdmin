<template>
  <a-card :bordered="false" :bodyStyle="{ padding: '0px 16px 16px 16px ' }">
    <route-view></route-view>
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
