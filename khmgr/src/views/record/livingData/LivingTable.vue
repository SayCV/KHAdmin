<template>
  <div class="living-table-page">
    <div class="page-top">
      <div class="operator-btns"></div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="健康号">
                <a-input-number v-model="queryParam.userNo" placeholder style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="电话">
                <a-input-number v-model="queryParam.phone" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="living-table-container"></div>
    <!-- STable 组件-->
    <s-table
      ref="table"
      size="default"
      :rowKey="(record) => record.userId"
      :columns="columns"
      :data="loadData"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      bordered
    >
      <a slot="userNo" slot-scope="text, record" @click="() => handleView(record.userId)">{{ text }}</a>
      <span slot="sex" slot-scope="sex">{{ translateSex(sex) }}</span>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span slot="operation">
            <a @click="() => handleEdit(record.userId)">编辑</a>
            <a-divider type="vertical" />
            <a @click="() => handleView(record.userId)">查看</a>
          </span>
        </div>
      </template>
    </s-table>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
import { STable } from '@/components'
import { getCustomerList } from '@/api/manage'
const columns = [
  {
    title: '健康号',
    align: 'center',
    dataIndex: 'userNo',
    scopedSlots: { customRender: 'userNo' },
    sorter: false
  },

  {
    title: '用户名',
    align: 'center',
    dataIndex: 'userName',
    scopedSlots: { customRender: 'userName' },
    sorter: false
  },
  {
    title: '电话',
    align: 'center',
    dataIndex: 'phone',
    sorter: false
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createOn',
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
  components: {
    STable
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 表头
      columns,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getCustomerList(Object.assign(parameter, this.queryParam)).then(res => {
          return res
        })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  mounted () {
    // this.fetch()
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
        url: '/api/admin/customers',
        method: 'get'
      }).then(res => {
        console.log('res', res)
        const pagination = { ...this.pagination }
        // Read total count from server
        pagination.total = res.total
        // pagination.total = 20;
        this.loading = false
        this.data = res.list
        this.pagination = pagination
      }).catch(err => {
        if (err) {
          console.log(err)
          this.loading = false
        }
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

    handleView (userId) {
      // 点击行进入详情页
      console.log(' edit click! ', userId)
      this.$router.push({
        // path: '/basicdata/Healthmanager/info',
        path: '/record/livingData/person',
        query: {
          userId: userId
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
  min-height: calc(100vh - 290px);
  .page-top {
    .top-btns {
      display: flex;
      justify-content: space-between;
      // margin-bottom: 20px;
    }
  }
}
</style>
