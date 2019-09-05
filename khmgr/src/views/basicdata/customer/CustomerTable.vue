<template>
  <!-- 客户管理 -->
  <div class="table-page">
    <div class="table-operator">
      <div class="operator-btns">
        <a-button type="primary" icon="user-add" @click="handleAddCus">邀请用户</a-button>
        <a-button type="primary" @click="handleToCreateCustomer">创建用户</a-button>
        <a-button type="primary">编辑</a-button>
        <a-button type="primary">删除</a-button>
      </div>
      <div
        class="table-page-search-submitButtons"
        :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
      >
        <a-button type="primary" @click="this.$refs.table.refresh(true)">查询</a-button>
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
      <a slot="userNo" slot-scope="text, record" @click="() => handleView(record.userNo)">{{ text }}</a>
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
    scopedSlots: {
      customRender: 'userNo'
    },
    sorter: true
  },
  {
    title: '用户名',
    align: 'center',
    dataIndex: 'userName',
    scopedSlots: {
      customRender: 'userName'
    },
    sorter: true
  },
  {
    title: '电话',
    align: 'center',
    dataIndex: 'phone'
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
    title: '创建时间',
    align: 'center',
    dataIndex: 'createOn',
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

    handleEdit (userId) {
      // 点击行进入详情页
      this.$router.push({
        path: '/basicdata/Customermanage/edit',
        query: {
          userId: userId
        }
      })
    },
    handleView (userId) {
      // 点击行进入详情页
      this.$router.push({
        path: '/basicdata/Customermanage/info',
        query: {
          userId: userId
        }
      })
    },
    handleAddCus () {
      // 点击行进入邀请客户页
      this.$router.push({
        path: '/basicdata/Customermanage/add'
      })
    },
    handleToCreateCustomer () {
      // 点击行进入创建客户页
      this.$router.push({
        path: '/basicdata/Customermanage/create'
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}
</script>

<style lang='less' scoped>
@import '../tablestyle.less';
</style>
