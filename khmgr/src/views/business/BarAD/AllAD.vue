<template>
  <a-card>
    <div class="all-ads">
      <div class="ads-page-top">
        <div class="page-top">{{ $route.meta.title }}</div>
        <div class="page-operation">
          <a-button-group>
            <a-button @click="handleRefresh">刷新</a-button>
            <a-button type="primary" @click="handleToAddAD">
              <a-icon type="plus" />投放广告
            </a-button>
          </a-button-group>
        </div>
      </div>
      <div class="ads-page-content">content</div>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'AllAD',
  components: {},
  data () {
    return {

    }
  },
  methods: {
    handleRefresh () {

    },
    handleToAddAD () { }
  }
}
</script>

<style lang="less" scoped>
.all-ads {
  height: calc(100vh - 315px);
  .ads-page-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .page-top {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      text-align: center;
      height: 34px;
      line-height: 34px;
      padding: 0 24px;
      border: 1px solid #d9d9d9;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      color: #2f54eb;
      background: #f0f5ff;
      border-color: #adc6ff;
    }
  }
  .ads-page-content {
  }
}
</style>
