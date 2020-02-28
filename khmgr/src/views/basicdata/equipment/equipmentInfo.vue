<template>
  <div class="info-container">
    <a-card title="基本信息" :bordered="false" :loading="loading">
      <template v-slot:extra>
        <ButtonBack name="返回设备列表" routerName="EquipmentTable"></ButtonBack>
      </template>
      <description-list>
        <description-list-item term="设备类型">{{ data.type || '--' }}</description-list-item>
        <description-list-item term="设备ID">{{ data.equipmentId || '--' }}</description-list-item>
        <description-list-item term="绑定账号">{{ data.account || '--' }}</description-list-item>
        <description-list-item term="设备状态">{{ data.statys || '--' }}</description-list-item>
        <description-list-item term="设备型号">{{ data.modelType || '--' }}</description-list-item>
        <description-list-item term="启动时间">{{ data.startTime || '--' }}</description-list-item>
      </description-list>
    </a-card>
    <a-card title="其他信息" :bordered="false" :loading="loading" class="other-info-card">
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
import ButtonBack from '@/components/Button/ButtonBack'
import { getEquipmentItemByYapi } from '@/api/basicData/equipmentManager'
import { DescriptionList } from '@/components'
const DescriptionListItem = DescriptionList.Item

export default {
  name: 'EquipmentInfo',
  components: {
    ButtonBack,
    DescriptionList,
    DescriptionListItem
  },
  data () {
    return {
      equipmentId: this.$route.query.equipmentId,
      loading: false,
      data: {}
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      getEquipmentItemByYapi({ equipmentId: this.equipmentId }).then(res => {
        console.log('mock =>', res)
        this.data = res || {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.other-info-card {
  min-height: 300px;
}
</style>
