<template>
  <div>
    <a-card :bordered="false" v-if="$route.name === 'LivingUserTable'" class="living-table-page">
      <div class="table-page-search-wrapper" style="marginBottom:24px">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="健康号">
                <a-input v-model="queryParam.userNo" placeholder style="width: 100%" />
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
              <a-form-item label="指标">
                <a-select
                  default-value="0"
                  v-model="queryParam.type"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <a-select-option value="0">体重</a-select-option>
                  <a-select-option value="1">体脂</a-select-option>
                  <a-select-option value="2">v-for</a-select-option>
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
          </a-row>
        </a-form>
      </div>
      <a-table
        ref="table"
        size="default"
        :rowKey="(record) => record.userId"
        :loading="loading"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        @change="handleTableChange"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        bordered
      >
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
              <a @click="() => showModalForm(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="() => handleDelete(record.userId)">删除</a>
            </span>
          </div>
        </template>
      </a-table>
    </a-card>
    <router-view v-else />
    <a-modal centered :visible="visible" title="编辑用户" @cancel="handleCancel" @ok="handleEditSubmit">
      <a-form layout="vertical" :form="form">
        <a-form-item label="用户名" key="username">
          <a-input
            v-decorator="['username',{rules: [{ required: true, message: 'Please input the username of collection!' }], initialValue:formValues.userName||'--' }]"
          />
        </a-form-item>
        <a-form-item label="电话" key="phone">
          <a-input
            v-decorator="['phone',{rules: [{ required: true, message: 'Please input the phone of collection!' }], initialValue:formValues.phone ||'--' }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

import { getUserList } from '@/api/basicData/livingData'

const columns = [
  {
    title: '健康号',
    dataIndex: 'userNo',
    key: 'userNo',
    scopedSlots: { customRender: 'userNo' },
    sorter: false
  },
  {
    title: '健管机构',
    dataIndex: 'organization',
    key: 'organization',
    customRender: (text) => text || '--'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    customRender: (text) => text || '--'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    customRender: (text) => text || '--'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    key: 'birthday',
    customRender: (text) => text || '--'
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
    sorter: false
  },
  {
    title: '记录数',
    dataIndex: 'record',
    key: 'record',
    customRender: (text) => text || '--'
  },
  {
    title: '操作',
    align: 'right',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  // 生活数据
  name: 'LivingUserTable',
  components: {
  },
  data () {
    return {
      columns,
      advanced: false,
      queryParam: {},
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      selectedRowKeys: [],
      selectedRows: [],
      visible: false,
      form: this.$form.createForm(this, { name: 'edit-user-form' }),
      formValues: {}
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
      getUserList(params).then(res => {
        console.log('userList res =>', res)
        this.loading = false
        const pagination = { ...this.pagination }
        pagination.total = res.total || 0
        this.data = res.list || []
        this.pagination = pagination
      }).catch(() => { this.loading = false })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleView (userId) {
      // 点击行进入详情页
      this.$router.push({
        name: 'PersonList',
        query: {
          userId: userId
        }
      })
    },
    handleDelete (accountId) {
      this.$confirm({
        centered: true,
        okType: 'danger',
        title: '你确定要删除该项?',
        onOk () { },
        onCancel () { }
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    showModalForm (record) {
      this.visible = true
      this.formValues = { ...record }
      console.log('form =>', { ...record })
    },
    handleCancel () {
      this.visible = false
    },
    handleEditSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.living-table-page {
  min-height: calc(100vh - 290px);
}
</style>
