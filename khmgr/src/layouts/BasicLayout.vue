<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>

    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- layout header -->
      <div
        class="g-header"
        :style="{position: '-webkit-sticky',position:' sticky',top: '0', zIndex:'9'}"
      >
        <global-header
          :mode="layoutMode"
          :menus="menus"
          :theme="navTheme"
          :collapsed="collapsed"
          :device="device"
          @toggle="toggle"
        />
        <!-- pageHeader , route meta :true on hide -->
        <page-header
          v-if="!$route.meta.hiddenHeaderContent"
          :title="pageTitle"
        ></page-header>
      </div>

      <!-- layout content -->

      <!-- :style="{ height: '100%' , margin: multiTab ? '24px 24px 0' : '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }" -->
      <div
        class="g-content"
        :style="{height:'calc(100vh - 180px)',paddingTop: '24px' }"
      >
        <a-layout-content :style="{ height: '100%' , padding: multiTab ? '0 24px' : '0 24px', paddingTop: fixedHeader ? '64px' : '0' }">
          <multi-tab v-if="multiTab"></multi-tab>
          <transition name="page-transition">
            <route-view />
          </transition>
          <!-- layout footer -->
          <a-layout-footer>
            <global-footer />
          </a-layout-footer>
        </a-layout-content>
      </div>

      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer v-if="!production"></setting-drawer>
    </a-layout>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'
import { asyncRouterMap } from '@/config/router.config.js'

import PageHeader from '@/components/PageHeader'
import RouteView from './RouteView'
import MultiTab from '@/components/MultiTab'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    MultiTab,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer,
    PageHeader
  },
  data () {
    return {
      production: config.production,
      collapsed: false,
      menus: [],
      pageTitle: null
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '256px'
      }
      return '80px'
    }
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
    }
  },
  created () {
    const routerPath = this.$route.path

    const routerTree = asyncRouterMap[0].children.find((item) => routerPath.includes(item.path)) || {}
    // 根据不同模块，动态截取路由树
    this.menus.push(routerTree)
    console.log('tree =>', routerTree, this.$route)
    // this.menus = asyncRouterMap.find((item) => item.path === '/').children // 让菜单生成不经过动态路由
    // this.menus = this.mainMenu.find(item => item.path === '/' && !item.hidden).children // 让菜单生成经过动态路由
    this.collapsed = !this.sidebarOpened
  },
  mounted () {
    this.getPageMeta()
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  updated () {
    this.getPageMeta()
  },
  methods: {
    getPageMeta () {
      // this.pageTitle = (typeof (this.title) === 'string' || !this.title) ? this.title : this.$route.meta.title
      this.pageTitle = this.$route.meta.title
    },
    ...mapActions(['setSidebar']),
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc () {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    menuSelect () {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    drawerClose () {
      this.collapsed = false
    }
  }
}
</script>

<style lang="less">
@import url('../components/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
