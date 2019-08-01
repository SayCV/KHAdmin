<template>
  <div>
    <a-button-group>
      <a-button :disabled="isLoading" @click="handleRefresh">刷新</a-button>
      <a-button type="primary" @click="handleToAdd ">
        <a-icon type="plus" />
        {{ name }}
      </a-button>
    </a-button-group>
  </div>
</template>

<script>

export default {
  name: 'ButtonRefresh',

  // props: ['name', 'linkTo', 'delay'],
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
      refresh: false,
      spinning: true
    }
  },

  methods: {
    handleToAdd () {
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
</style>
