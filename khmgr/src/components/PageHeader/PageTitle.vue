<template>
  <div class="page-top">
    <div class="page-title">{{ $route.meta.title }}</div>
    <div class="page-btn">
      <a-button-group>
        <a-button :disabled="isLoading" @click="handleRefresh">刷新</a-button>
        <a-button type="primary" @click="handleToAdd ">
          <a-icon type="plus" />
          {{ name }}
        </a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script>
// 页面内部的头部分

export default {
  name: 'PageTitle',

  props: {
    name: {
      type: String,
      required: true
    },
    linkTo: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    } },
  data () {
    return { refresh: false
    }
  },
  methods: {
    handleToAdd () {
      // 点击行进入add页
      console.log('click me to add !!')
      this.$router.push({
        path: this.linkTo
      })
    },
    handleRefresh () {
      // 手动刷新数据
      console.log('click me to refresh !!')
      this.$emit('toRefresh')
    }
  }
}
</script>

<style lang="less" scoped>
.page-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .page-title {
    font-weight: 400;
    text-align: center;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    font-size: 14px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    padding: 0 24px;
    border: 1px solid #d9d9d9;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    color: #2f54eb;
    background: #f0f5ff;
    border-color: #adc6ff;
  }
  .page-btn {
  }
}
</style>
