<template>
  <a-card :bordered="false" :bodyStyle="{ padding: '0px' }">
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

    }
  }
}
</script>
