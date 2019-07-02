<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <img src="~@/assets/logo.svg" class="logo" alt="logo">
          <span class="title">健康护航</span>
        </div>
      </div>

      <route-view></route-view>

      <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">Copyright &copy; 2019 杭州师范大学工程中心</div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 456px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    // background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    // background: radial-gradient(690px at 50% 50%, rgba(8, 138, 209) 0, rgba(6, 115, 174) 100%);
    background: url(~@/assets/loginbk.png) repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    .top {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      text-align: left;

      .header {
        height: 44px;
        line-height: 44px;

        .logo {
          height: 50px;
          vertical-align: top;
          margin-right: 12px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: #fff;
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 525;
          position: relative;
          top: 2px;
        }
      }
    }

    .main {
      //这里是登录框
      min-width: 800px;
      width: 800px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(255, 255, 255, 0.822);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(255, 255, 255, 0.822);
        font-size: 14px;
      }
    }
  }
}
</style>
