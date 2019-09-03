<template>
  <div class="table-page">
    <div class="table-operator">
      <PageName></PageName>
      <div class="table-page-search-submitButtons">
        <a-button type="primary" @click="this.$refs.table.refresh(true)">查询</a-button>
        <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
      </div>
    </div>
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
      rowKey="userId"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      bordered
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <a slot="userNo" slot-scope="text, record" @click="() => handleView(record.userId)">{{ text }}</a>
      <a slot="name" slot-scope="text, record" @click="() => handleView(record.userId)">{{ text }}</a>
      <span slot="file" slot-scope="text, record">
        <a @click="() => handleView(record.userId)">查看</a>
      </span>
      <span slot="sex" slot-scope="sex">{{ translateSex(sex) }}</span>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span slot="operation">
            <a @click="() => handleEdit(record.userId)">编辑</a>
            <a-divider type="vertical" />
            <a @click="() => handleDelete(record.userId)">删除</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
import { PageName } from '@/components'

const columns = [
  {
    title: '#',
    align: 'center',
    scopedSlots: {
      customRender: 'serial'
    }
  },
  {
    title: '健康号',
    align: 'center',
    dataIndex: 'userNo',
    scopedSlots: {
      customRender: 'userNo'
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
    scopedSlots: {
      customRender: 'sex'
    },
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
    dataIndex: 'healthLevel',
    sorter: true
  },
  {
    title: '健康档案',
    align: 'center',
    dataIndex: 'file',
    scopedSlots: {
      customRender: 'file'
    }
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
export default {
  // 多维健康报告
  name: 'HealthReport',
  components: { PageName },
  data () {
    return {
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
    translateSex (key) {
      switch (key) {
        case 0:
          return '男'
        case 1:
          return '女'
        default:
          return '未知'
      }
    },
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
        url: '/api/admin/customers',
        method: 'get',
        params: {
          ...params
        }
      }).then(res => {
        console.log('customer table', res)
        const pagination = {
          ...this.pagination
        }
        // Read total count from server
        pagination.total = res.total
        // pagination.total = 20;
        this.loading = false
        this.data = res.list
        this.pagination = pagination
      }).catch(err => {
        if (err) {
          console.log('yahaha', err)
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

    handleEdit (userId) {
      // 点击行进入详情页
      this.$router.push({
        path: '/report/HealthReport/edit',
        query: {
          userId: userId
        }
      })
    },
    handleView (userId) {
      // 点击行进入详情页
      this.$router.push({
        path: '/report/HealthReport/info',
        query: {
          userId: userId
        }
      })
    },
    handleDelete () {

    }
  }
}
</script>

<style lang='less' scoped>
@import '../tablestyle.less';
</style>
