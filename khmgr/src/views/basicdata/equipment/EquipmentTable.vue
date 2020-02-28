<template>
  <div class="table-page">
    <a-card :bordered="false" v-if="$route.name === 'EquipmentTable'" class="table-page-card">
      <div class="table-operator">
        <div>
          <a-button
            type="primary"
            icon="plus"
            @click="()=> $router.puhs({ name: 'EquipmentRegister' })"
          >设备登记</a-button>
        </div>
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
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="设备ID">
                <a-input-number v-model="queryParam.id" placeholder style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="绑定账号">
                <a-input v-model="queryParam.accountId" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="设备状态">
                <a-select
                  defaultValue="0"
                  v-model="queryParam.status"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <a-select-option value="0">在线</a-select-option>
                  <a-select-option value="1">离线</a-select-option>
                  <a-select-option value="2">报修中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="设备类型">
                  <a-select
                    defaultValue="0"
                    v-model="queryParam.type"
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <a-select-option value="0">智能马桶盖</a-select-option>
                    <a-select-option value="1">智能手环</a-select-option>
                    <a-select-option value="2">体脂秤</a-select-option>
                  </a-select>
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
        rowKey="key"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        bordered
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <a
          slot="equipmentId"
          slot-scope="text, record"
          @click="() => handleToInfoPage(record.equipmentId)"
        >{{ text }}</a>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span slot="operation">
              <a @click="() => handleToInfoPage(record.equipmentId)">查看</a>
              <a-divider type="vertical" />
              <a @click="() => handleToEditPage(record.equipmentId)">编辑</a>
              <a-divider type="vertical" />
              <a @click="() => handleToDelete(record.equipmentId)">删除</a>
            </span>
          </div>
        </template>
      </a-table>
    </a-card>
    <router-view v-else />
  </div>
</template>

<script>
import { getEquipmentList } from '@/api/basicData/equipmentManager'
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '设备ID',
    dataIndex: 'equipmentId',
    scopedSlots: { customRender: 'equipmentId' },
    sorter: true
  },
  {
    title: '设备类型',
    dataIndex: 'category',
    sorter: true
  },
  {
    title: '绑定账号',
    dataIndex: 'bindAccountId',
    sorter: true
  },
  {
    title: '设备状态',
    dataIndex: 'status',
    sorter: true
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
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
  name: 'EquipmentTable',
  components: {
  },
  data () {
    return {
      advanced: false,
      queryParam: {},
      selectedRowKeys: [],
      data: [],
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      columns
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
      console.log(pagination)
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
      getEquipmentList(params).then(res => {
        console.log('设备列表', res)
        this.loading = false
        const pagination = { ...this.pagination }
        pagination.total = res.total || 0
        this.pagination = pagination
        this.data = res.result.data || []
      }).catch(() => { this.loading = false })
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
      this.selectedRowKeys = selectedRowKeys
    },
    handleToEditPage (equipmentId) {
      // 点击行进入编辑页
      this.$router.push({
        path: '/equipmentManager/table/edit',
        query: {
          equipmentId: equipmentId
        }
      })
    },
    handleToInfoPage (equipmentId) {
      // 点击行进入详情页
      this.$router.push({
        path: '/equipmentManager/table/info',
        query: {
          equipmentId: equipmentId
        }
      })
    },
    handleToDelete (equipmentId) {
      this.$confirm({
        centered: true,
        okType: 'danger',
        title: '您确定要删除该设备?',
        onOk () {
          console.log('delete ID =>', equipmentId)
        },
        onCancel () {
          console.log('Cancel')
        }
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
