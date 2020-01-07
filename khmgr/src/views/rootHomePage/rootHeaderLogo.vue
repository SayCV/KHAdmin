<template>
  <div class="logo">
    <div class="logo-icon"><LogoSvg alt="logo" /></div>
    <div class="logo-title" v-if="showTitle">{{ $t('khmgr.name') }}</div>
  </div>
</template>

<script>
import LogoSvg from '@/assets/icon.svg?inline'

export default {
  name: 'RootLogo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '健康护航',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  cursor: pointer;
  width: 224px;
  height: 64px;
  line-height: 64px;
  transition: all 0.3s;
  overflow: hidden;
  display: flex;

  .logo-icon {
    margin: 8px;
    svg {
      height: 48px;
      width: 48px;
    }
  }
  .logo-title {
    color: #444;
    font-size: 22px;
  }
}
</style>
