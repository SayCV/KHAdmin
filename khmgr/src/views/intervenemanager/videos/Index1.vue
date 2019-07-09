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
            :mode="device == 'mobile' ? 'horizontal' : 'inline'"
            :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
            :defaultSelectedKeys="defaultSelectedKeys"
            type="inner"
            @openChange="onOpenChange"
          >
            <a-menu-item key="/intervenemanager/videos/videopush">
              <router-link :to="{ name: 'VideoPush' }">上传视频</router-link>
            </a-menu-item>
            <a-menu-item key="/intervenemanager/videos/allvideos">
              <router-link :to="{ name: 'AllVideos' }">全部视频</router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="video-settings-info-right">
          <div class="video-settings-info-title">
            <span>{{ $route.meta.title }}</span>
          </div>
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

  &.mobile {
    display: block;

    .video-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }
    .video-settings-info-right {
      padding: 20px 40px;
    }
  }

  .video-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 200px;
  }

  .video-settings-info-right {
    flex: 1 1;
    padding: 8px 24px;

    .video-settings-info-title > span {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      padding: 6px 24px;
      border: 1px solid #d9d9d9;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      color: #2f54eb;
      background: #f0f5ff;
      border-color: #adc6ff;
    }
    .video-settings-info-view {
    }
  }
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
