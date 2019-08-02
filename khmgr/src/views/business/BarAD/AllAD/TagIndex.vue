<template>
  <div class="ad-settings-info-main">
    <div class="ad-settings-info-top">
      <a-menu
        mode="horizontal"
        v-model="openKeys"
        @openChange="onOpenChange"
      >
        <a-menu-item key="UsedADList">
          <router-link :to="{ name: 'UsedADList' }">已使用广告</router-link>
        </a-menu-item>
        <a-menu-item key="UnusedADList">
          <router-link :to="{ name: 'UnusedADList' }">未使用广告</router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="ad-settings-info-bottom">
      <div class="ad-settings-info-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { mixinDevice } from '@/utils/mixin.js'

export default {
  components: {
    RouteView,
    PageView
  },
  mixins: [mixinDevice],
  data () {
    return {
      routeTarget: this.$route.path,
      route: this.$route.path,
      openKeys: [],
      defaultSelectedKeys: ['UsedAD']
    }
  },
  created () {
    this.updateMenu()
  },
  methods: {
    onOpenChange (openKeys) {
      this.openKeys = openKeys
    },
    updateMenu () {
      const routes = this.$route.matched.concat()
      // this.defaultSelectedKeys = [routes.pop().name]
      this.openKeys = [routes.pop().name]
      console.log('ALLAD route', this.openKeys)
    }

  }
}
</script>

<style lang="less" scoped>
.ad-settings-info-bottom{
 min-height: calc(100vh - 290px);
}

</style>
