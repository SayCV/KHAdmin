<template>
  <div class="edit-customer-page">
    <div class="back">
      <ButtonBack></ButtonBack>
    </div>
    <div class="customer-container">
      <a-form @submit="handleSubmit" :form="form">
        <a-divider orientation="left">基本信息</a-divider>
        <div class="basic-info">
          <a-form-item
            label="用户名"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'username',
                {rules: [{ required: false, message: '请输入用户名' }],initialValue: data.username}
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
                {rules: [{ required: true, message: '请输入电话' }],initialValue: data.phone}
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
                initialValue: data.name
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
                initialValue: data.age
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
                {initialValue: data.sex}
              ]"
            >
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
                 initialValue: moment(data.createdTime, dateFormat)
                }
              ]"
            />
          </a-form-item>
        </div>
        <a-divider orientation="left">其他信息</a-divider>
        <div class="other-info">
          <a-form-item
            label="民族"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'nation',
                {rules: [{ required: false, message: '请输入民族' }],initialValue: data.nation}
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
                {rules: [{ required: false, message: '请输入身份证' }],initialValue: data.identityId}
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
                {rules: [{ required: false, message: '请输入邮箱' }],initialValue: data.email}
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
                {initialValue: data.maritalstatus}
              ]"
            >
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
                {rules: [{ required: false, message: '请填写学历' }],initialValue: data.education}
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
                {rules: [{ required: false, message: '请选择注册时间' }],initialValue: moment(data.createdTime, dateFormat) }
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
                {rules: [{ required: false, message: '请填写单位' }],initialValue: data.workplace}
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
                {rules: [{ required: false, message: '请填写家庭地址' }],initialValue: data.address}
              ]"
            />
          </a-form-item>
        </div>
        <div class="from-option" style="text-align: center">
          <a-button htmlType="submit" type="primary">提交</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ButtonBack from '@/components/Button/ButtonBack'

export default {
  // 客户管理编辑
  name: 'EditCusInfo',
  components: { ButtonBack },
  data () {
    return {
      dateFormat: 'YYYY-MM-DD',
      accountId: this.$route.query.accountId,
      description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
      value: 1,
      data: {},
      // form
      form: this.$form.createForm(this)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.accountId = vm.$route.query.newsaccountIdId
      vm.fetch()
    })
  },
  mounted () {
    this.fetch()
  },
  methods: {
    // default-date
    moment,
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      this.loading = true
      axios({
        url: '/api/account/userlist/info/',
        method: 'get',
        params: {
          accountId: this.accountId
        }
      }).then(res => {
        console.log('info-res')
        console.log(res)
        this.loading = false
        this.data = res.data.result.data
        console.log('info', this.data)
      })
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
    },
    handleBtnBack () {
      this.$router.push({ name: 'CustomerTable' })
    }
  }
}
</script>

<style lang='less' scoped>
.edit-customer-page {
  .back {
    display: flex;
    justify-content: flex-end;
  }
  .customer-container {
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

@media screen and (max-width: 900px) {
  /* 页面小于900px */
  .edit-customer-page {
    .back {
      display: flex;
      justify-content: flex-end;
    }
    .customer-container {
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
}
</style>
