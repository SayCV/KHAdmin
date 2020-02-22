<template>
  <div>
    <div
      v-if="$route.name === 'LivingUserTable'"
      class="living-table-page"
    >
      <a-card
        :bordered="false"
      >
        <div class="search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="健康号">
                  <a-input-number
                    v-model="queryParam.userNo"
                    placeholder
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="电话">
                  <a-input-number
                    v-model="queryParam.phone"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item>
                  <a-button type="primary">查询</a-button>
                  <a-button style="margin-left: 8px">重置</a-button>
                </a-form-item>
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
          <template
            slot="operation"
            slot-scope="text, record"
          >
            <div class="editable-row-operations">
              <span slot="operation">
                <a @click="() => showModalForm(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="() => handleView(record.userId)">查看</a>
              </span>
            </div>
          </template>
        </a-table>
      </a-card>

    </div>
    <router-view v-else />
    <a-modal
      centered
      :visible="visible"
      title="编辑用户"
      @cancel="handleCancel"
      @ok="handleEditSubmit"
    >
      <a-form
        layout="vertical"
        :form="form"
      >
        <a-form-item
          label="用户名"
          key="username"
        >
          <a-input v-decorator="['username',{rules: [{ required: true, message: 'Please input the username of collection!' }], initialValue:formValues.userName||'--' }]" />
        </a-form-item>
        <a-form-item
          label="电话"
          key="phone"
        >
          <a-input v-decorator="['phone',{rules: [{ required: true, message: 'Please input the phone of collection!' }], initialValue:formValues.phone ||'--' }]" />
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
    title: '用户名',
    dataIndex: 'userName',
    key: 'emaiuserNamel',
    scopedSlots: { customRender: 'userName' },
    sorter: false
  },

  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
    sorter: false
  },
  {
    title: '创建时间',
    dataIndex: 'createOn',
    key: 'phcreateOnone',
    sorter: true
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
      // 高级搜索 展开/关闭
      advanced: false,
      // 表头
      columns,
      // 查询参数
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
        path: '/livingData/userTable/person/list',
        query: {
          userId: userId
        }
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
  .search-wrapper {
    margin-bottom: 48px;
  }
}
</style>
