<template>
  <div class="edit-container">
    <a-card :bordered="true">
      <h1>设备详情页</h1>
      <div class="back">
        <a-button
          type="primary"
          @click="handleBtnBack"
        >返回
          <a-icon type="rollback" />
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'EquipmentInfo',
  data () {
    return {}
  },
  mounted () {},
  methods: {
    handleBtnBack () {
    }
  }
}
</script>

<style scoped>
.back {
  display: flex;
  justify-content: flex-end;
}
</style>
