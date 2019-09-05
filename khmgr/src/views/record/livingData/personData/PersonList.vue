<template>
  <div class="person-table-page">
    <div class="page-top">
      <ButtonBack></ButtonBack>
    </div>
    <div class="page-top-wrapper">
      <description-list title="基本信息" size="large">
        <description-list-item term="健康号">{{ data.userNo }}</description-list-item>
        <description-list-item term="用户名">{{ data.userName }}</description-list-item>
        <description-list-item term="电话">{{ data.phone }}</description-list-item>
        <description-list-item term="邮箱">{{ data.email }}</description-list-item>
      </description-list>
    </div>
    <!-- 表格 -->
    <PageName style="width:128px; margin-bottom:8px;"></PageName>
    <a-table
      ref="table"
      size="default"
      :columns="columns"
      rowKey="personId"
      :dataSource="persons"
      :loading="loading"
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
</template>

<script>
import { axios } from '@/utils/request'

import PageName from '@/components/PageHeader/PageName'
import ButtonBack from '@/components/Button/ButtonBack'
import { DescriptionList } from '@/components'
const DescriptionListItem = DescriptionList.Item

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
  components: {
    PageName,
    ButtonBack,
    DescriptionList,
    DescriptionListItem
  },
  data () {
    return {
      // 表头
      columns,
      selectedRowKeys: [],
      userId: this.$route.query.userId,
      data: {},
      persons: [],
      loading: false
    }
  },
  created () {
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
    // 获取数据
    fetch (params = {}) {
      this.loading = true
      axios({
        url: `/api/admin/customers/${this.userId}`,
        method: 'get'
      }).then(res => {
        console.log('customers detail info', res)
        this.data = res
        this.persons = res.personArray
        this.loading = false
      }).catch(err => {
        if (err) {
          console.log(err)
          this.loading = false
        }
      })
    },

    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
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
    }
  }
}
</script>
<style lang="less" scoped>
.person-table-page {
  .page-top {
    display: flex;
    justify-content: flex-start;
  }
  .page-top-wrapper {
    margin: 20px 0 20px 0;
  }
}
</style>
