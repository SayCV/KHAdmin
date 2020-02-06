<template>
  <div>
    <div
      v-if="$route.name === 'WeeklySummaryTable'"
      class="table-page"
    >
      <div class="table-operator">
        <a-button
          type="primary"
          @click="this.$refs.table.refresh(true)"
        >查询</a-button>
        <a-button
          style="margin-left: 8px"
          @click="() => queryParam = {}"
        >重置</a-button>
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
        rowKey="accountId"
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
        <span
          slot="file"
          slot-scope="text, record"
        >
          <a @click="() => handleView(record.accountId)">查看</a>
        </span>
        <template
          slot="operation"
          slot-scope="text, record"
        >
          <div class="editable-row-operations">
            <span slot="operation">
              <a @click="() => handleEdit(record.accountId)">编辑</a>
              <a-divider type="vertical" />
              <a @click="() => handleDelete(record.accountId)">删除</a>
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
import { translateSex } from '@/utils/util'
import { getWeeklySummaryList } from '@/api/interventionManager/weeklySummary'

const columns = [
  {
    title: '#',
    scopedSlots: {
      customRender: 'serial'
    }
  },
  {
    title: '健康号',
    dataIndex: 'userNo',
    key: 'userNo'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    scopedSlots: {
      customRender: 'sex'
    }
  },
  {
    title: '健康评级',
    dataIndex: 'healthLevel',
    key: 'healthLevel'
  },
  {
    title: '创建时间',
    dataIndex: 'createOn',
    key: 'createOn'
  },
  {
    title: '健康总结',
    align: 'center',
    dataIndex: 'file',
    scopedSlots: {
      customRender: 'file'
    }
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
  // WeeklySummary
  name: 'WeeklySummaryTable',
  components: {},
  data () {
    return {
      queryParam: {},
      selectedRowKeys: [],
      data: [],
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      loading: false,
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
      const pager = { ...this.pagination }
      // console.log('pager =>', pager)
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
    forEachList (list) {
      _.isArray(list) && _.forEach(list, item => {
        this.data.push({
          accountId: _.get(item, 'userId') || '--',
          userNo: _.get(item, 'userNo') || '--',
          name: _.get(item, 'name') || '--',
          sex: translateSex(_.get(item, 'sex')),
          healthLevel: _.get(item, 'healthLevel') || '--',
          createOn: _.get(item, 'createOn') || '--'
        })
      })
      if (list.length === 0) this.data = []
    },
    fetch () {
      this.loading = true
      getWeeklySummaryList({
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current
      }).then(res => {
        console.log('arr =>', res.list)
        this.loading = false
        const paging = { ...this.pagination }
        paging.total = res.total || 0
        this.pagination = paging
        // this.data = res.list || []
        this.forEachList(res.list)
      }).catch(() => { this.loading = false })
    },
    start () {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 500)
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

    handleEdit (accountId) {
      this.$router.push({
        path: '/weeklySummary/edit',
        query: {
          accountId: accountId
        }
      })
    },
    handleView (accountId) {
      this.$router.push({
        path: '/weeklySummary/info',
        query: {
          accountId: accountId
        }
      })
    },
    handleDelete (accountId) {
      this.$confirm({
        centered: true,
        title: '你确定要删除该项?',
        onOk () { },
        onCancel () { }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.table-page {
  min-height: calc(100vh - 290px);
  .table-operator {
    margin-bottom: 1.6rem;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
