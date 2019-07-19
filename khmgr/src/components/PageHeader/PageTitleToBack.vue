<template>
  <div class="page-top">
    <div class="page-title">{{ $route.meta.title }}</div>
    <div class="page-btn">
      <a-button type="primary"
                @click="handleToBack">
        <a-icon type="left" />
        返回
      </a-button>
    </div>
  </div>
</template>

<script>
// 页面内部的头部分

export default {
  name: 'PageTitle',

  props: {
    name: {
      type: String
    },
    linkTo: {
      type: String
    },
    isLoading: {
      type: Boolean,
      default: false
    }  },
  data () {
    return {      refresh: false
    }
  },
  methods: {
    handleToBack () {
      // 点击返回
      console.log('click me to back !!')
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
        return false
      } else {
        this.$router.go(-1)
      }
      //上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
      //如果上面都执行了 页面都跳走了，这个也就不用管了   
      setTimeout(() => {
        this.$router.push({ path: '/' })
      }, 1000)
    },
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
