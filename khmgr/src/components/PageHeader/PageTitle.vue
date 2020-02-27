<template>
  <div class="page-btn">
    <a-button-group>
      <a-button
        :disabled="isLoading"
        @click="handleRefresh"
      >刷新</a-button>
      <a-button
        type="primary"
        @click="handlePageChange "
      >
        <a-icon type="plus" />
        {{ name }}
      </a-button>
    </a-button-group>
  </div>
</template>

<script>
// 页面内部的头部分

export default {
  name: 'PageAction',
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
    }
  },
  data () {
    return {
      refresh: false
    }
  },
  methods: {
    handlePageChange () {
      // 点击行进入add页
      if (this.linkTo.indexOf('/') !== -1) {
        console.log('click me to add !!', this.linkTo)
        this.$router.push({
          path: this.linkTo
        })
      } else {
        console.log('click me to add !!', this.linkTo)
        this.$router.push({
          name: this.linkTo
        })
      }
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

  .page-btn {
  }
}
</style>
