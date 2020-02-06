<template>
  <div>
    <div
      v-if="$route.name === 'HealthGoalsTable'"
      class="aims-table-page"
    >
      <div class="page-top">
        <div class="top-btns"></div>
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="健康号">
                  <a-input-number
                    v-model="queryParam.userNo"
                    placeholder
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="用户名">
                  <a-input
                    v-model="queryParam.userName"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item>
                  <a-button
                    type="primary"
                    @click="$refs.table.refresh(true)"
                  >查询</a-button>
                  <a-button
                    style="margin-left: 8px"
                    @click="() => queryParam = {}"
                  >重置</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <div class="aims-table-container">
        <!-- 全选 -->
        <div style="margin-bottom: 16px">
          <a-button
            type="primary"
            :disabled="!hasSelected"
            :loading="loading"
          >重置</a-button>
          <span style="margin-left: 8px;margin-right: 8px;">
            <template v-if="hasSelected">{{ `已选择 ${selectedRowKeys.length} 项` }}</template>
          </span>
        </div>
      </div>
      <!-- 表格 -->
      <a-table
        ref="table"
        size="default"
        :columns="columns"
        rowKey="userId"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        bordered
      >
        <span
          slot="serial"
          slot-scope="text, record, index"
        >{{ index + 1 }}</span>
        <a
          slot="userNo"
          slot-scope="text, record"
          @click="() => handleView(record.userId)"
        >{{ text }}</a>
        <template
          slot="operation"
          slot-scope="text, record"
        >
          <div class="editable-row-operations">
            <span slot="operation">
              <a @click="() => handleView(record.userId)">查看</a>
              <a-divider type="vertical" />
              <a @click="() => handleDelete(record.userId)">删除</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import _ from 'lodash'
import { getHealthGoalList } from '@/api/basicData/healthGoal'
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '健康号',
    dataIndex: 'userNo',
    scopedSlots: { customRender: 'userNo' },
    sorter: false
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    scopedSlots: { customRender: 'userName' },
    sorter: false
  },
  {
    title: '目标',
    dataIndex: 'aims',
    sorter: true
  },
  {
    title: '目标建立时间',
    dataIndex: 'createOn',
    sorter: true
  },
  {
    title: '操作',
    align: 'right',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  // 健康小目标
  name: 'HealthGoalsTable',
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      data: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  mounted () {
    this.fetch()
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      this.loading = true
      getHealthGoalList(params).then(res => {
        console.log('res', res)
        const pagination = { ...this.pagination }
        pagination.total = res.total
        this.loading = false
        this.pagination = pagination
        this.forEachHealthGoals(res.list)
      }).catch(() => { this.loading = false })
    },
    forEachHealthGoals (list) {
      _.isArray(list) && _.forEach(list, item => {
        this.data.push({
          key: _.get(item, 'userId') || '--',
          accountId: _.get(item, 'userId') || '--',
          userNo: _.get(item, 'userNo') || '--',
          userName: _.get(item, 'userName') || '--',
          aims: _.get(item, 'aims') || '--',
          createOn: _.get(item, 'createOn') || '--'
        })
      })
      if (list.length === 0) this.data = []
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleDelete (accountId) {
      this.$confirm({
        centered: true,
        title: '你确定要删除该项?',
        onOk () { },
        onCancel () { }
      })
    },
    handleView (accountId) {
      this.$router.push({
        name: 'HealthGoalsInfo',
        query: {
          accountId: accountId
        }
      })
    },
    handleEdit (accountId) {
      this.$router.push({
        name: 'HealthGoalsEdit',
        query: {
          accountId: accountId
        }
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    tableRefresh () {
      this.$refs.table.refresh()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
