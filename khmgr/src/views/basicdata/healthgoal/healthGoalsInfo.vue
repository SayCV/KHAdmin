<template>
  <div class="info-container">
    <a-card title="基本信息" :bordered="false" :loading="loading">
      <template v-slot:extra>
        <ButtonBack name="返回目标列表" routerName="HealthGoalsTable"></ButtonBack>
      </template>
      <description-list>
        <description-list-item term="目标类型">{{ data.type || '--' }}</description-list-item>
        <description-list-item term="目标ID">{{ data.accountId || '--' }}</description-list-item>
        <description-list-item term="绑定账号">{{ data.account || '--' }}</description-list-item>
        <description-list-item term="目标状态">{{ data.statys || '--' }}</description-list-item>
        <description-list-item term="目标型号">{{ data.modelType || '--' }}</description-list-item>
        <description-list-item term="启动时间">{{ data.startTime || '--' }}</description-list-item>
      </description-list>
    </a-card>
    <a-card title="其他信息" :bordered="false" :loading="loading">
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
import { getHealthGoalInfo } from '@/api/basicData/healthGoal'
import { DescriptionList } from '@/components'
const DescriptionListItem = DescriptionList.Item

export default {
  name: 'HealthGoalsInfo',
  components: {
    ButtonBack,
    DescriptionList,
    DescriptionListItem
  },
  data () {
    return {
      accountId: this.$route.query.accountId,
      loading: false,
      data: {}
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.loading = true
      getHealthGoalInfo({ accountId: this.accountId }).then(res => {
        this.loading = false
        console.log('yapi =>', res)
        this.data = res || {}
      }).catch(() => { this.loading = false })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
