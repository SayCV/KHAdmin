<template>
  <div>
    <div class="back">
      <ButtonBack></ButtonBack>
      <div class="edit-table-title">
        <h2>
          健管师信息
          <span>{{ accountId }}</span>
        </h2>
      </div>
    </div>
    <div class="customer-container">
      <a-form @submit="handleSubmit" :form="form">
        <div class="basic-info">
          <a-form-item
            label="机构"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'organization',
                {rules: [{ required: true, message: '请输入机构' }],
                 initialValue: data.organization}
              ]"
              name="organization"
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
                {rules: [{ required: true, message: '请输入用户名' }],
                 initialValue: data.username}
              ]"
              name="username"
            />
          </a-form-item>

          <a-form-item
            label="账号"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'AccountId',
                {rules: [{ required: true, message: '请输入账号' }],
                 initialValue: data.AccountId}
              ]"
              name="AccountId"
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
            label="等级"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="['grade', {
                rules: [{ required: true, message: '请输入等级' }],
                initialValue: data.grade
              }]"
              name="grade"
            />
          </a-form-item>

          <a-form-item
            label="创建时间"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-date-picker
              :format="dateFormat"
              name="createdTime"
              style="width: 100%"
              v-decorator="[
                'createdTime',
                {rules: [{ required: true, message: '请选择创建时间' }],
                 initialValue: moment(data.createdTime)
                }
              ]"
            />
          </a-form-item>
        </div>
        <div class="other-info">
          <a-form-item
            label="电话"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'phone',
                {rules: [{ required: true, message: '请输入电话' }],
                 initialValue: data.phone}
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
            label="地址"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'address',
                {rules: [{ required: true, message: '请输入民族' }],
                 initialValue: data.address}
              ]"
              name="address"
            />
          </a-form-item>
        </div>
        <div class="from-option" style="text-align: center">
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px">保存</a-button>
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
  // 健管师管理
  name: 'KhManagerEdit',
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
  watch: {
    '$route.path' (to, from) {
      if (to === '/basicdata/Healthmanager/edit') {
        console.log('再次进入健管师编辑页', to)
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
        url: '/api/basedata/healthreport/info/',
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
      this.$router.push({ name: 'HealthmanagerTable' })
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
