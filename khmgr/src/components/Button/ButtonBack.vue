<template>
  <div>
    <a-button
      type="primary"
      @click="() => handleBack()"
    >
      {{ name }}
      <a-icon :type="icon" />
    </a-button>
  </div>
</template>

<script>

export default {
  name: 'ButtonRefresh',

  // props: ['name', 'linkTo', 'delay'],
  props: {
    name: {
      type: String,
      default: '返回'
    },
    icon: {
      type: String,
      default: 'rollback'
    },
    routerName: {
      type: String,
      default: ''
    },
    routerPath: {
      type: String,
      default: ''
    }

  },
  data () {
    return {
    }
  },
  methods: {
    handleBack () {
      if (this.routerName !== '') {
        console.log('go name =?', this.routerName)
        this.$router.push({
          name: `${this.routerName}`
        })
      } else if (this.routerPath !== '') {
        console.log('go path =>', this.routerPath)
        this.$router.push({
          path: `${this.routerPath}`
        })
      } else { this.$router.go(-1) }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
