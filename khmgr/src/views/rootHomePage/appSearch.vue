<template>
  <a-drawer
    placement="right"
    :closable="false"
    :visible="visible"
    @close="() => $emit('onClose')"
    wrapClassName="app-search-wrapper"
  >
    <div class="app-search-page">

    </div>
  </a-drawer>

</template>

<script>
import Axios from 'axios'

export default {
  name: 'AppSearch',
  components: {

  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      appList: []
    }
  },
  mounted () {
    this.mockFetch()
  },
  methods: {
    mockFetch () {
      Axios({
        url: 'http://yapi.sagaii.cn/mock/11/root/functionlist',
        method: 'get'
      }).then(({ data }) => {
        console.log('mock =>', data)
        this.appList = data && data.menus
      })
    },
    handleClick (item) {
      console.log('click', item)
    }
  }
}
</script>

<style lang="less" >
.app-search-wrapper {
  .ant-drawer-body {
    padding: 0 !important;
  }
  .app-search-page {
  }
}
</style>
