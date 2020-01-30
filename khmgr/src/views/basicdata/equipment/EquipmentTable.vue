<template>
  <div>
    <!-- 客户管理 -->
    <div
      v-if="$route.name === 'EquipmentTable'"
      class="table-page"
    >
      <div class="table-operator">
        <div>
          <a-button
            type="primary"
            icon="plus"
          >新建</a-button>
          <a-button
            type="primary"
            icon="export"
          >导出</a-button>
          <a-button
            type="primary"
            icon="edit"
          >修改</a-button>
        </div>
        <!-- <a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button> -->
      </div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col
              :md="8"
              :sm="24"
            >
              <a-form-item label="设备ID">
                <a-input-number
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
              <a-form-item label="绑定账号">
                <a-input
                  v-model="queryParam.name"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
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
                      <a-select-option value="0">设备状态</a-select-option>
                      <a-select-option value="1">注册时间</a-select-option>
                      <a-select-option value="2">绑定人电话</a-select-option>
                    </a-select>
                    <a-input
                      style="width: 70%"
                      defaultValue="input content"
                    />
                  </a-input-group>
                </a-form-item>
              </a-col>
            </template>
            <a-col
              :md="!advanced && 8 || 24"
              :sm="24"
            >
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button
                  type="primary"
                  @click="$refs.table.refresh(true)"
                >查询</a-button>
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
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 全选 -->
      <div style="margin-bottom: 16px">
        <a-button
          type="primary"
          @click="start"
          :disabled="!hasSelected"
          :loading="loading"
        >重置</a-button>
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
        <span
          slot="serial"
          slot-scope="text, record, index"
        >{{ index + 1 }}</span>
        <a
          slot="equipmentId"
          slot-scope="text, record"
          @click="() => handleToInfoPage(record.equipmentId)"
        >{{ text }}</a>
        <template
          slot="operation"
          slot-scope="text, record"
        >
          <div class="editable-row-operations">
            <span slot="operation">
              <a @click="() => handleToEditPage(record.equipmentId)">编辑</a>
              <a-divider type="vertical" />
              <a @click="() => handleToInfoPage(record.equipmentId)">查看</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import { STable } from '@/components'

// import axios from 'axios'
import { axios } from '@/utils/request'

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
        url: '/api/basedata/equipmentlist',
        method: 'get',
        params: {
          results: 10,
          ...params
        }
      }).then(res => {
        console.log('设备列表', res)
        const pagination = { ...this.pagination }
        // Read total count from server
        pagination.total = res.result.totalCount
        // pagination.total = 20;
        this.loading = false
        this.data = res.result.data
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
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}
</script>

<style lang='less' scoped>
@import '../tablestyle.less';
</style>
