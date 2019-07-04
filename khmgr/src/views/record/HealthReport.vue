<template>
  <!-- 客户管理 -->
  <div>
    <a-card :bordered="false" v-if="is_toggle === this.$route.path">
      <a-row>
        <div class="table-operator">
          <a-button type="primary" icon="plus">新建</a-button>
          <a-button type="primary" icon="export">导出</a-button>
          <a-button type="danger" icon="edit">删除</a-button>
          <!-- <a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button> -->
        </div>
      </a-row>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="账号ID">
                <a-input v-model="queryParam.id" placeholder style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="姓名">
                <a-input v-model="queryParam.name" style="width: 100%" />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="用户组">
                  <a-input v-model="queryParam.group" style="width: 100%" />
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 全选 -->
      <div style="margin-bottom: 16px">
        <a-button type="primary" @click="start" :disabled="!hasSelected" :loading="loading">重置</a-button>
        <span style="margin-left: 8px;margin-right: 8px;">
          <template v-if="hasSelected">{{ `已选择 ${selectedRowKeys.length} 项` }}</template>
        </span>
      </div>

      <!-- 表格 -->
      <a-table
        ref="table"
        size="default"
        :columns="columns"
        rowKey="accountId"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        bordered
        :customRow="handleTableRow"
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <a
          slot="accountId"
          slot-scope="text, record"
          @click="() => handleView(record.accountId)"
        >{{ text }}</a>
        <a
          slot="name"
          slot-scope="text, record"
          @click="() => handleView(record.accountId)"
        >{{ text }}</a>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span slot="operation">
              <a @click="() => handleEdit(record.accountId)">编辑</a>
              <a-divider type="vertical" />
              <a @click="() => handleView(record.accountId)">查看</a>
            </span>
          </div>
        </template>
      </a-table>
    </a-card>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { STable } from '@/components'
// import { getBaseDataUserList } from '@/api/manage'
import axios from 'axios'

const columns = [
  {
    title: '#',
    align: 'center',
    scopedSlots: {
      customRender: 'serial'
    }
  },
  {
    title: '账号ID',
    align: 'center',
    dataIndex: 'accountId',
    scopedSlots: {
      customRender: 'accountId'
    },
    sorter: true
  },
  {
    title: '姓名',
    align: 'center',
    dataIndex: 'name',
    scopedSlots: {
      customRender: 'name'
    },
    sorter: true
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'sex',
    filters: [
      {
        text: '男',
        value: 'male'
      },
      {
        text: '女',
        value: 'female'
      }
    ]
  },
  {
    title: '健康评级',
    align: 'center',
    dataIndex: 'healthRate',
    sorter: true
  },
  {
    title: '健康档案',
    align: 'center',
    dataIndex: 'record',
    sorter: true
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

const data = []

export default {
  name: 'HealthReport',
  components: {
    STable
  },

  data () {
    // this.cacheData = data.map(item => ({ ...item }))
    return {
      is_toggle: this.$route.path,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [], // Check here to configure the default column
      count: 33,
      data, // 表格数据
      pagination: {},
      loading: false,
      // 表头
      columns
    }
  },
  mounted () {
    console.log('route', this.$route.path)
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
      const pager = {
        ...this.pagination
      }
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
    handleTableRow (record, index) {
      // 点击表格行进入详情页
      console.log('clikcTbale')
      return {
        props: {
          // 属性
        },
        on: {
          // 事件
          dblclick: () => { }
        }
      }
    },
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      this.loading = true
      axios({
        // url: 'http://yapi.sagaii.cn/mock/11/api/basedata/userlist',
        url: '/api/record/healthreport',
        method: 'get',
        params: {
          results: 10,
          ...params
        }
      }).then(res => {
        console.log('res', res)

        const pagination = {
          ...this.pagination
        }
        // Read total count from server
        pagination.total = res.data.result.totalCount
        // console.log('totalCount', res.data.result.totalCount)
        this.loading = false
        this.data = res.data.result.data
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

    handleEdit (accountId) {
      // 点击行进入详情页
      this.$router.push({
        name: 'editInfo',
        params: {
          accountId: accountId
        }
      })
    },
    handleView (accountId) {
      // 点击行进入详情页
      this.$router.push({
        name: 'customInfo',
        params: {
          accountId: accountId
        }
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}
</script>

<style scoped>
.table-operator {
  margin-bottom: 2rem;
}

.table-operator .ant-btn {
  margin-right: 10px;
}
</style>
