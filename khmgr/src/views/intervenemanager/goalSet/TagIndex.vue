<template>
  <div class="main">
    <div class="top">
      <a-menu
        mode="horizontal"
        :defaultSelectedKeys="defaultSelectedKeys"
        @openChange="onOpenChange"
      >
        <a-menu-item key="/intervenemanager/quantifGoal/q">
          <router-link :to="{ name: 'SetQuanGoal' }">指标类</router-link>
        </a-menu-item>
        <a-menu-item key="/intervenemanager/quantifGoal/uq">
          <router-link :to="{ name: 'SetUnquanGoal' }">生活习惯类</router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="bottom">
      <div class="view">
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

.bottom {
  min-height: calc(100vh - 290px);
  .view{
    margin-top: 16px;
  }
}
</style>
