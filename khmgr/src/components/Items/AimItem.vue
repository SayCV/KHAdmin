<template>
  <div class="aim-item">
    <div class="aim-inner">

    </div>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'AimItem',
  // eslint-disable-next-line vue/require-prop-types
  // props: ['aimItem'],
  props: {
    aimItem: {
      type: JSON,
      default: () => {}
      // require: true // 必填
    }
  },
  data () {
    return {
      dateFormat: 'YYYY-MM-DD'

    }
  },
  methods: {
    moment,
    handleToEditAD (aimId) {
      // 点击行进入edit页
      this.$emit('toEdit', aimId)
    },

    deleteConfirm (aimId) {
      const that = this
      this.$confirm({
        title: `你确定想要删除这条广告吗? aimId:${aimId}`,
        content: '当你点击确定按钮时，就会删除选中的这条广告',
        okType: 'danger',
        onOk () {
          // 异步请求
          that.$emit('toDelete', aimId)
        },
        onCancel () {
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
