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
        >返回总结列表
          <a-icon type="rollback" />
        </a-button>
      </div>
      <description-list>
        <description-list-item term="健康号">{{ data.userNo || '--' }}</description-list-item>
        <description-list-item term="姓名">{{ data.name || '--' }}</description-list-item>
        <description-list-item term="性别">{{ data.sex || '--' }}</description-list-item>
        <description-list-item term="健康评级">{{ data.healthLevel || '--' }}</description-list-item>
        <description-list-item term="创建时间">{{ data.createOn || '--' }}</description-list-item>
      </description-list>
    </a-card>
    <a-card
      title="健康小结"
      :bordered="false"
      :loading="loading"
    >
      <description-list>

      </description-list>
    </a-card>
  </div>
</template>

<script>
import { getWeeklySummaryInfo } from '@/api/interventionManager/weeklySummary'
import { DescriptionList } from '@/components'
const DescriptionListItem = DescriptionList.Item

export default {
  // 体检数据
  name: 'WSInfo',
  components: {
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
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.loading = true
      getWeeklySummaryInfo(this.accountId).then(res => {
        this.loading = false
        console.log('yapi =>', res)
        this.data = res || {}
      }).catch(() => { this.loading = false })
    },
    handleToTable () {
      this.$router.push({
        name: 'WeeklySummaryTable'
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
