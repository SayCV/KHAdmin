<template>
  <div class="page-header-index-wide">
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '0px 16px', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="ad-settings-info-main">
        <div class="ad-settings-info-top">
          <a-menu
            mode="horizontal"
            :defaultSelectedKeys="defaultSelectedKeys"
            @openChange="onOpenChange"
          >
            <a-menu-item key="/business/BarAD/allAD/usedAD">
              <router-link :to="{ name: 'usedAD' }">已使用广告</router-link>
            </a-menu-item>
            <a-menu-item key="/business/BarAD/allAD/UnusedAD">
              <router-link :to="{ name: 'unusedAD' }">未使用广告</router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="ad-settings-info-bottom">
          <div class="ad-settings-info-view">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </a-card>
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
      defaultSelectedKeys: []
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
      this.defaultSelectedKeys = [routes.pop().path]
      console.log('ALLAD route', this.defaultSelectedKeys)
    }

  }
}
</script>

<style lang="less" scoped>
.page-header-index-wide {
  min-height: calc(100vh - 221px);
  .ad-settings-info-main {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 220px);
  }
}
</style>
