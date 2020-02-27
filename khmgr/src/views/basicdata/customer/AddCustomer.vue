<template>
  <div class="create-customer-page">
    <a-card :bordered="false" :style="{ minHeight: '560px' }">
      <div class="title" slot="title">
        <span style="marginRight: 8px">添加客户</span>
        <a-icon type="user-add" />
      </div>
      <div class="query-form">
        <a-form :form="form" @submit="handleSearch">
          <a-row type="flex" :gutter="24">
            <a-col :span="24" :lg="24" :md="24">
              <a-form-item label="健康号" v-bind="formItemLayout">
                <a-input
                  name="userNo"
                  v-decorator="[ 'userNo', defaultFormConfig ]"
                  @change="findTheCustomer"
                ></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row type="flex" justify="center" :gutter="24">
            <a-col>
              <div class="search-btn">
                <a-button
                  type="primary"
                  html-type="submit"
                  :loading="loading"
                  :disabled="loading"
                >查询</a-button>
                <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清空</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="return-list" :style="{ marginTop: '48px' }">
        <a-row type="flex" justify="center" :gutter="24">
          <a-col :span="16" :lg="16" :md="24" :xs="24">
            <a-card v-if="notFound" :loading="loading" :bordered="true" title="用户基本信息">
              <template v-slot:extra>
                <a-button type="primary" icon="user-add" @click="showAddModel">邀请用户</a-button>
              </template>
              <description-list size="large">
                <div class="user-avatar">
                  <div class="text">头像：</div>
                  <a-avatar size="large" icon="user" />
                </div>
                <description-list-item term="账号ID">{{ data.accountId ||'--' }}</description-list-item>
                <description-list-item term="用户名">{{ data.userName ||'--' }}</description-list-item>
                <description-list-item term="用户组">{{ data.userGroup ||'--' }}</description-list-item>
                <description-list-item term="姓名">{{ data.name ||'--' }}</description-list-item>
                <description-list-item term="性别">{{ data.sex ||'--' }}</description-list-item>
                <description-list-item term="出生日期">{{ data.brithday ||'--' }}</description-list-item>
                <description-list-item term="身份证">{{ data.identityId ||'--' }}</description-list-item>
                <description-list-item term="工作单位">{{ data.workPlace ||'--' }}</description-list-item>
              </description-list>
            </a-card>
            <empty v-else />
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
import ButtonBack from '@/components/Button/ButtonBack'
import { findCustomer } from '@/api/basicData/customers'
import Empty from '@/components/Empty/Empty'
import { DescriptionList } from '@/components'
const DescriptionListItem = DescriptionList.Item

export default {
  name: 'AddCusromer',
  components: { ButtonBack, Empty, DescriptionList, DescriptionListItem },
  data () {
    return {
      formItemLayout: {
        labelCol: { lg: { span: 4 }, sm: { span: 4 } },
        wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
      },
      defaultFormConfig: {
        rules: [{ required: true, message: '请输入您要查询的健康号!' }]
      },
      form: this.$form.createForm(this),
      userNo: '',
      notFound: false,
      loading: false,
      data: []
    }
  },
  mounted () {

  },
  methods: {
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // this.getData(values.userNo)
        }
      })
    },
    handleReset () {
      this.form.resetFields()
      this.notFound = false
    },
    findTheCustomer (e) {
      console.log('input =>', e.target.value.trim())
      const userNo = e.target.value.trim()
      findCustomer(userNo).then(res => {
        if (res) {
          this.data = res
          this.loading = false
          this.notFound = true
        }
      }).catch(err => {
        if (err) {
          this.notFound = false
        }
      })
    },
    getData (userNo) {
      this.loading = true
      findCustomer(userNo).then(res => {
        this.loading = false
        this.data = res
        this.notFound = true
      }).catch(err => {
        if (err) {
          this.notFound = false
          this.loading = false
        }
      })
    },
    showAddModel () {
      this.$confirm({
        centered: true,
        title: '您确定要将该用户添加到当前机构?',
        onOk () {
          console.log('OK')
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.create-customer-page {
  min-height: calc(100vh - 290px);

  .user-avatar {
    display: flex;
    padding-bottom: 12px;
    .text {
      line-height: 40px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
