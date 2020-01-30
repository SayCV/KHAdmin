<template>
  <div class="info-container">
    <div class="info-top">
      <h2>设备详情页</h2>
      <div class="back">
        <a-button
          type="primary"
          @click="handleToTable"
        >返回设备列表
          <a-icon type="rollback" />
        </a-button>
      </div>
    </div>
    <description-list title="基本信息">
      <description-list-item term="设备类型">林东东</description-list-item>
      <description-list-item term="设备ID">{{ equipmentId }}</description-list-item>
      <description-list-item term="绑定账号">XX公司-YY部</description-list-item>
      <description-list-item term="设备状态">2018-08-08</description-list-item>
      <description-list-item term="设备型号">TCR12110-1</description-list-item>
      <description-list-item term="启动时间">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</description-list-item>
    </description-list>
    <description-list title="其他信息">
      <description-list-item term="IP地址">林东东</description-list-item>
      <description-list-item term="在线时间">1234567</description-list-item>
      <description-list-item term="生产商">XX公司-YY部</description-list-item>
      <description-list-item term="联系电话">2018-08-08</description-list-item>
      <description-list-item term="安装区域">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</description-list-item>
    </description-list>
  </div>
</template>

<script>
import { DescriptionList } from '@/components'
const DescriptionListItem = DescriptionList.Item
export default {
  name: 'EquipmentInfo',
  components: {
    DescriptionList,
    DescriptionListItem
  },
  data () {
    return {
      equipmentId: this.$route.query.equipmentId
    }
  },
  mounted () {
  },
  methods: {
    handleToTable () {
      this.$router.push({
        path: '/equipmentManager/table'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.info-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
</style>
