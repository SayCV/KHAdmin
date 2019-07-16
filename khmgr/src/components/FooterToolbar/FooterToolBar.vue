<template>
  <div :class="prefixCls">
    <div>
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div class="footer-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterToolBar',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-footer-toolbar'
    },
    extra: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-footer-toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
