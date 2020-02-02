<template>
  <div class="edit-customer-container">
    <a-form
      @submit="handleSubmit"
      :form="form"
    >
      <a-card
        title="基本信息"
        :bordered="false"
        :loading="loading"
      >
        <ButtonBack slot="extra"></ButtonBack>
        <div class="basic-info">
          <a-form-item
            label="用户名"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'username',
                {rules: [{ required: false, message: '请输入用户名' }],
                 initialValue: data.username||''}
              ]"
              name="username"
            />
          </a-form-item>
          <a-form-item
            label="电话"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'phone',
                {rules: [{ required: true, message: '请输入电话' }],
                 initialValue: data.phone||''}
              ]"
              name="phone"
            />
          </a-form-item>
          <a-form-item
            label="姓名"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="['name', {
                rules: [{ required: false, message: '请输入姓名' }],
                initialValue: data.name||''
              }]"
              name="name"
            />
          </a-form-item>
          <a-form-item
            label="年龄"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="['age', {
                rules: [{ required: false, message: '请输入年龄' }],
                initialValue: data.age||''
              }]"
              name="age"
            />
          </a-form-item>
          <a-form-item
            label="性别"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-select
              v-decorator="[
                'sex',
                {initialValue: data.sex||'0'}
              ]">
              <a-select-option value="0">男</a-select-option>
              <a-select-option value="1">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="出生日期"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-date-picker
              :format="dateFormat"
              name="brithday"
              style="width: 100%"
              v-decorator="[
                'brithday',
                {rules: [{ required: false, message: '请选择出生日期' }],
                 initialValue: initBirthDateValue
                }
              ]"
            />
          </a-form-item>
        </div>
      </a-card>
      <a-card
        title="其他信息"
        :bordered="false"
        :loading="loading"
      >
        <div class="other-info">
          <a-form-item
            label="民族"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'nation',
                {rules: [{ required: false, message: '请输入民族' }],
                 initialValue: data.nation||''}
              ]"
              name="nation"
            />
          </a-form-item>
          <a-form-item
            label="身份证"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'identityId',
                {rules: [{ required: false, message: '请输入身份证' }],
                 initialValue: data.identityId||''}
              ]"
              name="identityId"
            />
          </a-form-item>
          <a-form-item
            label="邮箱"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'email',
                {rules: [{ required: false, message: '请输入邮箱' }],
                 initialValue: data.email||''}
              ]"
              name="email"
            />
          </a-form-item>
          <a-form-item
            label="婚姻状况"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-select
              v-decorator="[
                'maritalstatus',
                {initialValue: data.maritalstatus||''}
              ]">
              <a-select-option value="0">未婚</a-select-option>
              <a-select-option value="1">已婚</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="学历"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'education',
                {rules: [{ required: false, message: '请填写学历' }],
                 initialValue: data.education||''}
              ]"
              name="education"
            />
          </a-form-item>
          <a-form-item
            label="注册时间"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-date-picker
              :format="dateFormat"
              name="register-time"
              style="width: 100%"
              v-decorator="[
                'register-time',
                {rules: [{ required: false, message: '请选择注册时间' }],
                 initialValue: initCreatedDateValue }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="单位"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-textarea
              rows="4"
              v-decorator="[
                'description',
                {rules: [{ required: false, message: '请填写单位' }],
                 initialValue: data.workplace||''}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="家庭地址"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-textarea
              rows="4"
              v-decorator="[
                'type',
                {rules: [{ required: false, message: '请填写家庭地址' }],
                 initialValue: data.address||''}
              ]"
            />
          </a-form-item>
        </div>
      </a-card>
      <div
        class="from-option"
        style="text-align: center"
      >
        <a-button
          htmlType="submit"
          type="primary"
          style="marginRight: 8px"
        >提交</a-button>
        <a-button>保存</a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment'
import ButtonBack from '@/components/Button/ButtonBack'
import { getCustomerDetailInfo } from '@/api/basicData/customers'

export default {
  // 客户管理编辑
  name: 'CustomerEditInfo',
  components: { ButtonBack },
  data () {
    return {
      dateFormat: 'YYYY-MM-DD',
      accountId: this.$route.query.accountId,
      data: {},
      loading: false,
      form: this.$form.createForm(this)
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.accountId = vm.$route.query.accountId
  //     vm.fetch()
  //   })
  // },
  mounted () {
    this.fetch()
  },
  computed: {
    initCreatedDateValue () {
      return this.data.createdTime === '' || isNaN(this.data.createdTime)
        ? null
        : moment(this.data.createdTime, this.dateFormat)
    },
    initBirthDateValue () {
      return this.data.birthday === '' || isNaN(this.data.birthday)
        ? null
        : moment(this.data.birthday, this.dateFormat)
    }
  },
  methods: {
    // default-date
    moment,
    // 获取数据
    fetch (params = {}) {
      this.loading = true
      getCustomerDetailInfo(this.accountId).then(res => {
        this.loading = false
        this.data = res || {}
      }).catch(() => { this.loading = false })
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.edit-customer-container {
  .basic-info,
  .other-info {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  .basic-info .ant-row,
  .other-info .ant-row {
    width: 50%;
  }
}

@media screen and (max-width: 900px) {
  /* 页面小于900px */
  .edit-customer-container {
    .basic-info,
    .other-info {
      display: flex;
      flex-wrap: wrap;
      position: relative;
    }
    .basic-info .ant-row,
    .other-info .ant-row {
      width: 50%;
    }
  }
}
</style>
