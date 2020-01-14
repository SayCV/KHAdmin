<template>
  <!-- 客户管理 -->
  <div>
    <div
      v-if="$route.name === 'CustomerTable'"
      class="table-page"
    >
      <div class="table-operator">
        <div class="operator-btns">
          <a-button
            type="primary"
            icon="user-add"
            @click="handleAddCus"
          >邀请用户</a-button>
          <a-button
            type="primary"
            @click="handleToCreateCustomer"
          >新增用户</a-button>
        </div>
        <div
          class="table-page-search-submitButtons"
          :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
        >
          <a-button type="primary">查询</a-button>
          <a-button
            style="margin-left: 8px"
            @click="() => queryParam = {}"
          >重置</a-button>
          <a
            @click="toggleAdvanced"
            style="margin-left: 8px"
          >
            {{ advanced ? '收起' : '展开' }}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </div>
      </div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col
              :md="8"
              :sm="24"
            >
              <a-form-item label="健康号">
                <a-input
                  v-model="queryParam.id"
                  placeholder
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col
              :md="8"
              :sm="24"
            >
              <a-form-item label="姓名">
                <a-input
                  v-model="queryParam.name"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col
              :md="8"
              :sm="24"
            >
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
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="人员ID">
                  <a-input
                    v-model="queryParam.name"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="用户单位">
                  <a-input
                    v-model="queryParam.name"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item>
                  <a-input-group
                    compact
                    style="width: 100%;"
                  >
                    <a-select
                      defaultValue="0"
                      style="width: 30%;"
                    >
                      <a-select-option value="0">性别</a-select-option>
                      <a-select-option value="1">邮箱地址</a-select-option>
                      <a-select-option value="2">手机号码</a-select-option>
                      <a-select-option value="3">固定电话</a-select-option>
                    </a-select>
                    <a-input
                      style="width: 70%"
                      defaultValue="input content"
                    />
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
          @click="() => handleView(record.userNo)"
        >{{ text }}</a>
        <template
          slot="operation"
          slot-scope="text, record"
        >
          <div class="editable-row-operations">
            <span slot="operation">
              <a @click="() => handleEdit(record.userId)">编辑</a>
              <a-divider type="vertical" />
              <a @click="() => handleView(record.userId)">查看</a>
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
import { STable } from '@/components'
import { getCustomerList } from '@/api/manage'
import { translateSex } from '@/utils/util'
const columns = [
  {
    title: '健康号',
    align: 'center',
    dataIndex: 'userNo',
    key: 'userNo',
    scopedSlots: {
      customRender: 'userNo'
    },
    sorter: true
  },
  {
    title: '用户名',
    align: 'center',
    dataIndex: 'userName',
    key: 'userName',
    scopedSlots: {
      customRender: 'userName'
    },
    sorter: true
  },
  {
    title: '电话',
    align: 'center',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'sex',
    key: 'sex'
  },

  {
    title: '健康评级',
    align: 'center',
    dataIndex: 'healthLevel',
    key: 'healthLevel',
    sorter: true
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createOn',
    key: 'createOn',
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
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 表头
      columns,
      // 查询参数
      queryParam: {},
      customerList: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 1,
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
      console.log('params:', params)
      this.loading = true
      getCustomerList(params).then(res => {
        console.log('customerList res =>', res)
        this.loading = false
        const pagination = { ...this.pagination }
        pagination.total = res.total || 0
        this.forEachCustomerList(res.list)
        this.pagination = pagination
      }).catch(() => { this.loading = false })
    },
    forEachCustomerList (list) {
      if (list.length === 0) {
        this.customerList = []
      } else {
        _.forEach(list, item => {
          this.customerList.push({
            key: _.get(item, 'userId') || '--',
            userId: _.get(item, 'userId') || '--',
            userNo: _.get(item, 'userNo') || '--',
            userName: _.get(item, 'userName') || '--',
            sex: translateSex(_.get(item, 'sex')),
            phone: _.get(item, 'phone') || '--',
            healthLevel: _.get(item, 'healthLevel') || '--',
            createOn: _.get(item, 'createOn') || '--'
          })
        })
      }
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleEdit (userId) {
      // 点击行进入edit页
      this.$router.push({
        path: '/customerManager/table/edit',
        query: {
          userId: userId
        }
      })
    },
    handleView (userId) {
      // 点击行进入详情页
      this.$router.push({
        path: '/customerManager/table/info',
        query: {
          userId: userId
        }
      })
    },
    handleAddCus () {
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
      // handleToTargetPage()
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
