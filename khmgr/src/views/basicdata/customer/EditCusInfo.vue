<template>
  <a-card>
    <div class="back">
      <div class="edit-table-title">
        <h1>
          个人信息
          <span>{{ accountId }}</span>
        </h1>
      </div>
      <a-button type="primary" @click="handleBtnBack">
        <a-icon type="left" />
        返回
      </a-button>
    </div>
    <div class="customer-container">
      <a-form @submit="handleSubmit" :form="form">
        <div class="basic-info">
          <a-form-item
            label="账号ID"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'accountId',
                {rules: [{ required: true, message: '请输入账号ID' }],initialValue: data.accountId}
              ]"
              name="accountId"
            />
          </a-form-item>
          <a-form-item
            label="用户名"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入用户名' }],initialValue: data.username}
              ]"
              name="username"
            />
          </a-form-item>

          <a-form-item
            label="用户组"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'usergroup',
                {rules: [{ required: true, message: '请输入用户组' }],initialValue: data.usergroup}
              ]"
              name="usergroup"
            />
          </a-form-item>
          <a-form-item
            label="姓名"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="['name', {
                rules: [{ required: true, message: '请输入姓名' }],
                initialValue: data.name
              }]"
              name="name"
            />
          </a-form-item>
          <a-form-item
            label="年龄"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="['age', {
                rules: [{ required: true, message: '请输入年龄' }],
                initialValue: data.age
              }]"
              name="age"
            />
          </a-form-item>
          <a-form-item
            label="性别"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="['sex', {
                rules: [{ required: true, message: '请输入性别' }],
                initialValue: data.sex
              }]"
              name="sex"
            />
          </a-form-item>

          <a-form-item
            label="出生日期"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-date-picker
              :format="dateFormat"
              name="brithday"
              style="width: 100%"
              v-decorator="[
                'brithday',
                {rules: [{ required: true, message: '请选择出生日期' }],
                 initialValue: moment(data.createdTime, dateFormat)
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="身份证"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'identityId',
                {rules: [{ required: true, message: '请输入身份证' }],initialValue: data.identityId}
              ]"
              name="identityId"
            />
          </a-form-item>
        </div>
        <div class="other-info">
          <a-form-item
            label="民族"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'nation',
                {rules: [{ required: true, message: '请输入民族' }],initialValue: data.nation}
              ]"
              name="nation"
            />
          </a-form-item>

          <a-form-item
            label="电话"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
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
            label="邮箱"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'email',
                {rules: [{ required: true, message: '请输入邮箱' }],initialValue: data.email}
              ]"
              name="email"
            />
          </a-form-item>

          <a-form-item
            label="婚姻状况"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'maritalstatus',
                {rules: [{ required: true, message: '请输入婚姻状况' }],initialValue: data.maritalstatus}
              ]"
              name="maritalstatus"
            />
          </a-form-item>
          <a-form-item
            label="学历"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'education',
                {rules: [{ required: true, message: '请填写学历' }],initialValue: data.education}
              ]"
              name="education"
            />
          </a-form-item>
          <a-form-item
            label="注册时间"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-date-picker
              :format="dateFormat"
              name="register-time"
              style="width: 100%"
              v-decorator="[
                'register-time',
                {rules: [{ required: true, message: '请选择注册时间' }],initialValue: moment(data.createdTime, dateFormat) }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="单位"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-textarea
              rows="4"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请填写单位' }],initialValue: data.workplace}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="家庭地址"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-textarea
              rows="4"
              v-decorator="[
                'type',
                {rules: [{ required: true, message: '请填写家庭地址' }],initialValue: data.address}
              ]"
            />
          </a-form-item>
        </div>
        <div class="from-option" style="text-align: center">
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px">保存</a-button>
        </div>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  // 客户管理编辑
  name: 'EditCusInfo',
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
  watch: {
    '$route.path' (to, from) {
      if (to === '/basicdata/Customermanage/edit') {
        console.log('再次进入客户管理编辑页', to)
        this.accountId = this.$route.query.accountId
        this.fetch()
      }
    }
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

<style scoped>
/* ////// */
.back {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
}
.back h1 {
  margin: 0;
}
.edit-table-title {
  text-align: center;
}

.basic-info {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  border-top-left-radius: 0;
  padding: 40px 0;
  margin-bottom: 4rem;
}
.basic-info::before {
  content: '基本信息';
  color: rgba(0, 0, 0, 0.65);
  position: absolute;
  left: -1px;
  top: -36px;
  font-size: 16px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  padding: 0 16px;
  border: 1px solid #d9d9d9;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  color: #2f54eb;
  background: #f0f5ff;
  border-color: #adc6ff;
}
.basic-info .ant-row {
  width: 50%;
}

.other-info {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  border-top-left-radius: 0;
  padding: 40px 0;
  margin-bottom: 4rem;
}
.other-info::before {
  content: '其他信息';
  color: rgba(0, 0, 0, 0.65);
  position: absolute;
  left: -1px;
  top: -36px;
  font-size: 16px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  padding: 0 16px;
  border: 1px solid #d9d9d9;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  color: #2f54eb;
  background: #f0f5ff;
  border-color: #adc6ff;
}
.other-info .ant-row {
  width: 50%;
}
@media screen and (max-width: 900px) {
  /* 页面小于900px */
  .basic-info {
    padding: 20px;
  }
  .basic-info .ant-row {
    width: 100%;
  }
  .other-info {
    padding: 20px;
  }
  .other-info .ant-row {
    width: 100%;
  }
}
</style>
