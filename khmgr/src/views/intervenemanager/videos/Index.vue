<template>
  <div class="page-header-index-wide">
    <a-card>
      <route-view></route-view>
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

    }
  }
}
</script>
