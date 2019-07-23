<template>
  <a-card
    :bordered="false"
    :bodyStyle="{ padding: '16px 8px 24px 8px', height: '100%' }"
    :style="{ height: '100%' }"
  >
    <div class="living-table-page">
      <div class="page-top">
        <div class="top-btns">
          <div>
            <a-button type="primary" icon="export">导出</a-button>
            <a-button type="danger" icon="delete">删除</a-button>
          </div>
          <div
            class="table-page-search-submitButtons"
            :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
          >
            <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
            <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '展开' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </div>
        </div>
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="成员ID">
                  <a-input-number v-model="queryParam.id" placeholder style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="姓名">
                  <a-input v-model="queryParam.name" style="width: 100%" />
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item>
                    <a-input-group compact style="width: 100%;">
                      <a-select defaultValue="0" style="width: 30%;">
                        <a-select-option value="0">账号ID</a-select-option>
                        <a-select-option value="1">年龄</a-select-option>
                        <a-select-option value="2">性别</a-select-option>
                        <a-select-option value="3">提交时间</a-select-option>
                      </a-select>
                      <a-input style="width: 70%" defaultValue="input content" />
                    </a-input-group>
                  </a-form-item>
                </a-col>
              </template>
            </a-row>
          </a-form>
        </div>
      </div>
      <div class="living-table-container">
        <!-- 全选 -->
        <div style="margin-bottom: 16px">
          <a-button type="primary" @click="start" :disabled="!hasSelected" :loading="loading">重置</a-button>
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
        rowKey="personId"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        bordered
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <a
          slot="personId"
          slot-scope="text, record"
          @click="() => handleView(record.personId)"
        >{{ text }}</a>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span slot="operation">
              <a @click="() => handleView(record.personId)">查看</a>
              <a-divider type="vertical" />
              <a @click="() => handleDelete(record.personId)">删除</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { axios } from '@/utils/request'

const columns = [
  {
    title: '#',
    align: 'center',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '账号ID',
    align: 'center',
    dataIndex: 'userId',
    scopedSlots: { customRender: 'userId' },
    sorter: false
  },
  {
    title: '成员ID',
    align: 'center',
    dataIndex: 'personId',
    scopedSlots: { customRender: 'personId' },
    sorter: false
  },
  {
    title: '姓名',
    align: 'center',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    sorter: false
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'sex',
    sorter: false
  },
  {
    title: '年龄',
    align: 'center',
    dataIndex: 'age',
    sorter: false
  },
  {
    title: '提交时间',
    align: 'center',
    dataIndex: 'lastTime',
    sorter: true
  },
  {
    title: '设备ID',
    align: 'center',
    dataIndex: 'lastEquipmentId',
    sorter: true
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  // 生活数据
  name: 'LivingTable',
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [], // Check here to configure the default column
      count: 33,
      data: [],
      pagination: {},
      loading: false,
      // 表头
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
      axios({
        url: '/api/record/livingdata/table',
        // url: '/api/users/2/persons/',
        method: 'get'
      }).then(res => {
        console.log('res', res)
        const pagination = { ...this.pagination }
        // Read total count from server
        pagination.total = res.result.totalCount
        // pagination.total = 20;
        this.loading = false
        this.data = res.result.data
        this.pagination = pagination
      })
    },
    start () {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    handleDelete (personId) {
      // 点击行进入edit页
      console.log(' 点击删除 ', personId)
    },
    handleView (personId) {
      // 点击行进入详情页
      this.$router.push({
        // path: '/basicdata/Healthmanager/info',
        path: '/record/livingData/info',
        query: {
          personId: personId
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
.living-table-page {
  .page-top {
    .top-btns {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
}
</style>
