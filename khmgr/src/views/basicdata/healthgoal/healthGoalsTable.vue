<template>
  <div>
    <a-card :bordered="false" v-if="$route.name === 'HealthGoalsTable'">
      <div class="table-operator" v-if="false">
        <div
          class="table-page-search-submitButtons"
          :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
        >
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{ advanced ? '收起' : '展开' }}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </div>
      </div>
      <div class="table-page-search-wrapper" style="marginBottom:24px">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="健康号">
                <a-input-number v-model.trim="queryParam.userNo" placeholder style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户名">
                <a-input v-model.trim="queryParam.userName" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="姓名">
                <a-input v-model.trim="queryParam.name" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="类别">
                <a-select
                  defaultValue="0"
                  v-model="queryParam.type"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <a-select-option value="0">减脂</a-select-option>
                  <a-select-option value="1">血压</a-select-option>
                  <a-select-option value="2">如厕</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <div
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              </div>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="类别">
                  <a-select defaultValue="0" v-model="queryParam.type" placeholder="请选择">
                    <a-select-option value="0">减脂</a-select-option>
                    <a-select-option value="1">血压</a-select-option>
                    <a-select-option value="2">如厕</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
          </a-row>
        </a-form>
      </div>

      <!-- 全选 -->
      <div style="margin-bottom: 16px">
        <a-button type="primary" :disabled="!hasSelected" :loading="loading">重置</a-button>
        <span style="margin-left: 8px;margin-right: 8px;">
          <template v-if="hasSelected">{{ `已选择 ${selectedRowKeys.length} 项` }}</template>
        </span>
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
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <a
          slot="userNo"
          slot-scope="text, record"
          @click="() => handleView(record.userId)"
        >{{ text }}</a>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span slot="operation">
              <a @click="() => handleView(record.userId)">查看</a>
              <a-divider type="vertical" />
              <a @click="() => handleDelete(record.userId)">删除</a>
            </span>
          </div>
        </template>
      </a-table>
    </a-card>
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
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      columns
    }
  },
  created () {
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
        pageSize: pagination.pageSize,
        pageNum: pagination.current,
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
.table-operator {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}
</style>
