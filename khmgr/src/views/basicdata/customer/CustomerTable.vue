<template>
  <!-- 客户管理 -->
  <div>
    <a-card :bordered="false">
      <a-row>
        <div class="table-operator">
          <a-button type="primary" icon="user-add" @click="handleAddCus">邀请用户</a-button>
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
      </a-row>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="健康号">
                <a-input v-model="queryParam.id" placeholder style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="姓名">
                <a-input v-model="queryParam.name" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="健康评级">
                <a-select default-value="0">
                  <a-select-option value="0">A</a-select-option>
                  <a-select-option value="1">B</a-select-option>
                  <a-select-option value="2">C</a-select-option>
                  <a-select-option value="3">D</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="人员ID">
                  <a-input v-model="queryParam.name" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="用户单位">
                  <a-input v-model="queryParam.name" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item>
                  <a-input-group compact style="width: 100%;">
                    <a-select defaultValue="0" style="width: 30%;">
                      <a-select-option value="0">性别</a-select-option>
                      <a-select-option value="1">邮箱地址</a-select-option>
                      <a-select-option value="2">手机号码</a-select-option>
                      <a-select-option value="3">固定电话</a-select-option>
                    </a-select>
                    <a-input style="width: 70%" defaultValue="input content" />
                  </a-input-group>
                </a-form-item>
              </a-col>
            </template>
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
  </div>
</template>

<script>
import { STable } from '@/components'
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
    title: '用户组',
    align: 'center',
    dataIndex: 'group',
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
    title: '单位',
    align: 'center',
    dataIndex: 'workplace',
    sorter: true
  },
  {
    title: '健康评级',
    align: 'center',
    dataIndex: 'healthRate',
    sorter: true
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createdTime',
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
  name: 'CustomerTable',
  components: {
    STable
  },
  data () {
    // this.cacheData = data.map(item => ({ ...item }))
    return {

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [], // Check here to configure the default column
      count: 33,
      data,
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
      console.log('pager', pager)
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
        // url: 'http://yapi.sagaii.cn/mock/11/api/basedata/userlist',
        url: '/api/basedata/userlist',
        method: 'get',
        params: {
          results: 10,
          ...params
        }
      }).then(res => {
        console.log('res')
        console.log(res)
        const pagination = {
          ...this.pagination
        }
        // Read total count from server
        pagination.total = res.data.result.totalCount
        // pagination.total = 20;
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
        path: '/basicdata/Customermanage/edit',
        query: {
          accountId: accountId
        }
      })
    },
    handleView (accountId) {
      // 点击行进入详情页
      this.$router.push({
        path: '/basicdata/Customermanage/info',
        query: {
          accountId: accountId
        }
      })
    },
    handleAddCus () {
      // 点击行进入邀请客户页
      this.$router.push({
        path: '/basicdata/Customermanage/add'
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
  margin-bottom: 1.6rem;
  display: flex;
  justify-content: space-between;
}

.table-operator .ant-btn {
  margin-right: 10px;
}
@media screen and (max-width: 900px) {
}
</style>
