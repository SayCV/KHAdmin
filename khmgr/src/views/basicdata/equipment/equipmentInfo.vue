<template>
  <div class="info-container">
    <a-card
      title="基本信息"
      :bordered="false"
      :loading="loading"
    >
      <div
        class="back"
        slot="extra"
      >
        <a-button
          type="primary"
          @click="handleToTable"
        >返回设备列表
          <a-icon type="rollback" />
        </a-button>
      </div>
      <description-list>
        <description-list-item term="设备类型">{{ data.type || '--' }}</description-list-item>
        <description-list-item term="设备ID">{{ data.equipmentId || '--' }}</description-list-item>
        <description-list-item term="绑定账号">{{ data.account || '--' }}</description-list-item>
        <description-list-item term="设备状态">{{ data.statys || '--' }}</description-list-item>
        <description-list-item term="设备型号">{{ data.modelType || '--' }}</description-list-item>
        <description-list-item term="启动时间">{{ data.startTime || '--' }}</description-list-item>
      </description-list>
    </a-card>
    <a-card
      title="其他信息"
      :bordered="false"
      :loading="loading"
    >
      <description-list>
        <description-list-item term="IP地址">{{ data.IP || '--' }}</description-list-item>
        <description-list-item term="在线时间">{{ data.onLineTime || '--' }}</description-list-item>
        <description-list-item term="生产商">{{ data.facturer || '--' }}</description-list-item>
        <description-list-item term="联系电话">{{ data.phone || '--' }}</description-list-item>
        <description-list-item term="安装区域">{{ data.address || '--' }}</description-list-item>
      </description-list>
    </a-card>
  </div>
</template>

<script>

import { getEquipmentItemByYapi } from '@/api/basicData/equipmentManager'
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
      equipmentId: this.$route.query.equipmentId,
      data: {}
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      getEquipmentItemByYapi({ equipmentId: this.equipmentId }).then(res => {
        console.log('mock =>', res)
        this.data = res || {}
      })
    },
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
