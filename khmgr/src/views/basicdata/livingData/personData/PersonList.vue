<template>
  <div class="person-table-page">
    <a-card
      title="基本信息"
      :bordered="false"
      :loading="loading"
    >
      <div
        class="back"
        slot="extra"
      >
        <ButtonBack
          name="返回用户列表"
          routerName="LivingUserTable"
        ></ButtonBack>
      </div>
      <description-list size="large">
        <description-list-item term="健康号">{{ data.userNo || '--' }}</description-list-item>
        <description-list-item term="用户名">{{ data.userName || '--' }}</description-list-item>
        <description-list-item term="电话">{{ data.phone || '--' }}</description-list-item>
        <description-list-item term="邮箱">{{ data.email || '--' }}</description-list-item>
        <description-list-item term="成员数量">{{ `${data.personCount } 人` || '--' }}</description-list-item>
      </description-list>
    </a-card>
    <!-- 表格 -->
    <a-card
      title="成员列表"
      :bordered="false"
      :loading="loading"
    >
      <a-table
        ref="table"
        size="default"
        :columns="columns"
        :rowKey="(record) => record.key"
        :dataSource="persons"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        bordered
      >
        <span
          slot="serial"
          slot-scope="text, record, index"
        >{{ index + 1 }}</span>
        <a
          slot="personId"
          slot-scope="text, record"
          @click="() => handleView(record.personId)"
        >{{ text }}</a>
        <template
          slot="operation"
          slot-scope="text, record"
        >
          <div class="editable-row-operations">
            <span slot="operation">
              <a @click="() => handleView(record.personId)">查看</a>
              <a-divider type="vertical" />
              <a @click="() => handleDelete(record)">删除</a>
            </span>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>

import { getPersonList } from '@/api/basicData/livingData'
import _ from 'lodash'
import ButtonBack from '@/components/Button/ButtonBack'
import { translateSex } from '@/utils/util'
import { DescriptionList } from '@/components'
const DescriptionListItem = DescriptionList.Item

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    sorter: false
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    scopedSlots: { customRender: 'sex' }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: false
  },
  {
    title: '从属关系',
    dataIndex: 'relationName',
    key: 'relationName',
    sorter: false
  },
  {
    title: '健康等级',
    dataIndex: 'healthLevel',
    key: 'healthLevel'
  },
  {
    title: '操作',
    align: 'right',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  // PersonList
  name: 'PersonList',
  components: {
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
  mounted () {
    this.fetch(this.userId)
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    // 获取数据
    fetch (params = {}) {
      this.loading = true
      getPersonList(params).then(res => {
        this.loading = false
        console.log('customers detail', res)
        this.data = res
        this.forEachPersonList(res.personArray)
      }).catch(() => {
        this.loading = false
      })
    },
    forEachPersonList (personArray) {
      if (personArray.length === 0) {
        this.persons = []
      }
      personArray && _.forEach(personArray, item => {
        this.persons.push({
          key: _.get(item, 'personId'),
          personId: _.get(item, 'personId'),
          name: _.get(item, 'name') || '--',
          sex: translateSex(_.get(item, 'sex')),
          age: _.get(item, 'age') || '--',
          relationName: _.get(item, 'relationName') || '--',
          healthLevel: _.get(item, 'healthLevel') || '--'
        })
      })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    handleDelete (record) {
      this.$confirm({
        centered: true,
        title: '确定删除此成员？',
        content: `成员姓名：${record.name}`,
        onOk () {
        },
        onCancel () { }
      })
    },
    handleView (personId) {
      this.$router.push({
        path: '/livingData/userTable/person/data',
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
}
</style>
