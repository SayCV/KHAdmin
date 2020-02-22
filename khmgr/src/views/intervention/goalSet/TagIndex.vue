<template>
  <div class="main">
    <div class="top">
      <a-menu
        mode="horizontal"
        v-model="openKeys"
        @openChange="onOpenChange"
      >
        <a-menu-item key="QuantitativeGoal">
          <router-link :to="{ name: 'QuantitativeGoal' }">指标类</router-link>
        </a-menu-item>
        <a-menu-item key="UnquantitativeGoal">
          <router-link :to="{ name: 'UnquantitativeGoal' }">生活习惯类</router-link>
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
      this.openKeys = [routes.pop().name]
      console.log('ALLAD route', this.openKeys)
    }

  }
}
</script>

<style lang="less" scoped>
.main {
  padding:0 32px 12px 32px;
  .bottom {
  min-height: calc(100vh - 300px);
  .view{
    margin-top: 16px;
  }
}
}

</style>
