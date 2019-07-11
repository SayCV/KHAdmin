<template>
  <div class="page-header-index-wide">
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="video-settings-info-main" :class="device">
        <div class="video-settings-info-left">
          <a-menu
            mode="inline"
            :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
            :defaultSelectedKeys="defaultSelectedKeys"
            type="inner"
            @openChange="onOpenChange"
          >
            <a-menu-item key="/business/BarAD/allAD">
              <router-link :to="{ name: 'allAD' }">正在使用</router-link>
            </a-menu-item>
            <a-menu-item key="/business/BarAD/nullAD">
              <router-link :to="{ name: 'nullAD' }">未使用</router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="video-settings-info-right">
          <div class="video-settings-info-view">
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
      // horizontal  inline
      mode: 'inline',

      openKeys: [],
      defaultSelectedKeys: [],

      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },

      pageTitle: ''
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
    }
  }
}
</script>

<style lang="less" scoped>
.video-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  // overflow: auto;
}
@media screen and (max-width: 576px) {
  /* 页面小于576px */
  .video-settings-info-left {
    border-right: unset;
    border-bottom: 1px solid #e8e8e8;
    width: 450px;
    height: 50px;
    overflow-x: auto;
    overflow-y: scroll;
  }
}
</style>
