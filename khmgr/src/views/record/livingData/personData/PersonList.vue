<template>
  <div>
    <div class="person-table-page">
      <div class="page-top">
        <div class="top">
          <ButtonBack></ButtonBack>
        </div>
        <div class="page-top-wrapper">
          <div style="width:10%;">
            <PageName name="基本信息"></PageName>
          </div>
          <table class="table">
            <tbody>
              <tr>
                <td class="label">健康号</td>
                <td>{{ data.userNo }}</td>
                <td class="label">用户名</td>
                <td>{{ data.userName }}</td>
                <td class="label">电话</td>
                <td>{{ data.phone }}</td>
                <td class="label">邮箱</td>
                <td>{{ data.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 表格 -->
      <div style="width:10%;">
        <PageName></PageName>
      </div>
      <a-table
        ref="table"
        size="default"
        :columns="columns"
        rowKey="personId"
        :dataSource="persons"
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
        <span slot="sex" slot-scope="sex">{{ translateSex(sex) }}</span>
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
  </div>
</template>

<script>
import { axios } from '@/utils/request'
import PageName from '@/components/PageHeader/PageName'
import ButtonBack from '@/components/Button/ButtonBack'

const columns = [
  {
    title: '#',
    align: 'center',
    scopedSlots: { customRender: 'serial' }
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
    scopedSlots: { customRender: 'sex' }
  },
  {
    title: '年龄',
    align: 'center',
    dataIndex: 'age',
    sorter: false
  },
  {
    title: '从属关系',
    align: 'center',
    dataIndex: 'relationName',
    sorter: false
  },
  {
    title: '健康等级',
    align: 'center',
    dataIndex: 'healthLevel'
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  // PersonList
  name: 'PersonList',
  components: { PageName, ButtonBack },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [], // Check here to configure the default column
      userId: this.$route.query.userId,
      data: {},
      persons: [],
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
        url: `/api/admin/customers/${this.userId}`,
        method: 'get'
      }).then(res => {
        console.log('res', res)
        // const pagination = { ...this.pagination }
        // Read total count from server
        // pagination.total = res.total
        this.data = res
        this.persons = res.personArray
        this.loading = false
        // this.pagination = pagination
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
      console.log(' personId click! ', personId)
      this.$router.push({
        // path: '/basicdata/Healthmanager/info',
        path: '/record/livingData/person/data',
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
.person-table-page {
  .page-top {
    .top {
      margin-bottom: 40px;
    }
  }
  .page-top-wrapper {
    .table {
      width: 100%;
      margin-bottom: 80px;
      & tr {
        border: 1px solid #d9d9d9;
        & .img {
          width: 216px;
        }
        .label {
          background-color: #fafafa;
          padding: 16px 24px;
          color: rgba(0, 0, 0, 0.85);
        }
        & td {
          padding: 16px 24px;
          border: 1px solid #d9d9d9;
        }
        .img-td {
          padding: 0;
          padding-top: 0;
        }
      }
    }
  }
}
</style>
