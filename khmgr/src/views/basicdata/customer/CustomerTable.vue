<template>
  <!-- 客户管理 -->
  <div class="table-page">
    <a-card :bordered="false" v-if="$route.name === 'CustomerTable'" class="table-page-card">
      <div class="table-operator">
        <div class="operator-btns">
          <a-button type="primary" @click="handleToCreateCustomer" style="marginRight:8px">新增客户</a-button>
          <a-button type="primary" @click="handleAddCustomer">转入客户</a-button>
        </div>
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
                <a-input v-model="queryParam.id" placeholder style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户名">
                <a-input v-model="queryParam.username" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户组">
                <a-select default-value="0" v-model="queryParam.group" placeholder="请选择">
                  <a-select-option value="0">VIP</a-select-option>
                  <a-select-option value="1">普通用户</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="姓名">
                  <a-input v-model="queryParam.name" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="健康评级">
                  <a-select default-value="0" v-model="queryParam.level" placeholder="请选择">
                    <a-select-option value="0">A</a-select-option>
                    <a-select-option value="1">B</a-select-option>
                    <a-select-option value="2">C</a-select-option>
                    <a-select-option value="3">D</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="健康机构">
                  <a-input v-model="queryParam.organization" style="width: 100%" />
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
                    <a-input style="width: 70%" />
                  </a-input-group>
                </a-form-item>
              </a-col>
            </template>
          </a-row>
        </a-form>
      </div>
      <a-table
        ref="table"
        size="default"
        :loading="loading"
        :columns="columns"
        :dataSource="customerList"
        :pagination="pagination"
        @change="handleTableChange"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        bordered
      >
        <a
          slot="userNo"
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
    <router-view v-else />
  </div>
</template>

<script>

import _ from 'lodash'
import { getCustomerList } from '@/api/basicData/customers'
import { translateSex } from '@/utils/util'
const columns = [
  {
    title: '健康号',
    dataIndex: 'userNo',
    key: 'userNo',
    scopedSlots: {
      customRender: 'userNo'
    },
    sorter: true
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
    scopedSlots: {
      customRender: 'userName'
    },
    sorter: true
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex'
  },

  {
    title: '健康评级',
    dataIndex: 'healthLevel',
    key: 'healthLevel',
    sorter: true
  },
  {
    title: '创建时间',
    dataIndex: 'createOn',
    key: 'createOn',
    sorter: true
  },

  {
    title: '操作',
    align: 'right',
    dataIndex: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

export default {
  name: 'CustomerTable',
  components: {
  },
  data () {
    return {
      advanced: false,
      columns,
      // 查询参数
      queryParam: {},
      customerList: [],
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  mounted () {
    this.fetch({
      pageSize: this.pagination.pageSize,
      pageNum: this.pagination.current
    })
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
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
      this.loading = true
      getCustomerList(params).then(res => {
        console.log('customerList res =>', res)
        this.loading = false
        const pagination = { ...this.pagination }
        pagination.total = res.total || 0
        this.pagination = pagination
        this.forEachCustomerList(res.list)
      }).catch(() => { this.loading = false })
    },
    forEachCustomerList (list) {
      if (list.length === 0) {
        this.customerList = []
      }
      list && _.forEach(list, item => {
        this.customerList.push({
          key: _.get(item, 'userId') || '--',
          accountId: _.get(item, 'userId') || '--',
          userNo: _.get(item, 'userNo') || '--',
          userName: _.get(item, 'userName') || '--',
          sex: translateSex(_.get(item, 'sex')),
          phone: _.get(item, 'phone') || '--',
          healthLevel: _.get(item, 'healthLevel') || '--',
          createOn: _.get(item, 'createOn') || '--'
        })
      })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleEdit (accountId) {
      // 点击行进入edit页
      this.$router.push({
        path: '/customerManager/table/edit',
        query: {
          accountId: accountId
        }
      })
    },
    handleView (accountId) {
      // 点击行进入详情页
      this.$router.push({
        path: '/customerManager/table/info',
        query: {
          accountId: accountId
        }
      })
    },
    handleAddCustomer () {
      // 点击行进入邀请客户页
      this.$router.push({
        path: '/customerManager/add'
      })
    },
    handleToCreateCustomer () {
      // 点击行进入创建客户页
      this.$router.push({
        path: '/customerManager/create'
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}
</script>

<style lang='less' scoped>
.table-page {
  min-height: calc(100vh - 290px);
  .table-page-card {
    min-height: 560px;
  }
  .table-operator {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
