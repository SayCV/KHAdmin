<template>
  <div class="edit-customer-page">
    <a-form @submit="handleSubmit" :form="form">
      <a-card title="基本信息" :bordered="false">
        <div class="basic-info">
          <a-form-item label="账号ID" v-bind="formItemLayout">
            <a-input v-decorator="['accountId', defaultFormConfig]" name="accountId" />
          </a-form-item>
          <a-form-item label="用户名" v-bind="formItemLayout">
            <a-input v-decorator="['username', defaultFormConfig]" name="username" />
          </a-form-item>
          <a-form-item label="用户组" v-bind="formItemLayout">
            <a-select v-decorator="['user-group', defaultSelectConfig]">
              <a-select-option value="0">VIP</a-select-option>
              <a-select-option value="1">普通用户</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="姓名" v-bind="formItemLayout">
            <a-input v-decorator="['name', defaultFormConfig]" />
          </a-form-item>
          <a-form-item label="性别" v-bind="formItemLayout">
            <a-select v-decorator="['sex', defaultSelectConfig]">
              <a-select-option value="0">男</a-select-option>
              <a-select-option value="1">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="出生日期" v-bind="formItemLayout">
            <a-date-picker
              :format="dateFormat"
              style="width: 100%"
              name="brithday"
              v-decorator="['brithday', defaultFormConfig]"
            />
          </a-form-item>
          <a-form-item label="单位" v-bind="formItemLayout">
            <a-textarea rows="4" v-decorator="['workplace', defaultFormConfig]" />
          </a-form-item>
          <a-form-item label="身份证" v-bind="formItemLayout">
            <a-input v-decorator="['identityId', defaultFormConfig]" name="identityId" />
          </a-form-item>
          <a-form-item label="头像" v-bind="formItemLayout">
            <AvatarUpload @avatarFile="avatarFileChange"></AvatarUpload>
          </a-form-item>
        </div>
      </a-card>
      <a-card title="其他信息" :bordered="false">
        <div class="other-info">
          <a-form-item label="民族" v-bind="formItemLayout">
            <a-input v-decorator="['nation', defaultFormConfig]" name="nation" />
          </a-form-item>
          <a-form-item label="婚姻状况" v-bind="formItemLayout">
            <a-select v-decorator="['maritalStatus', defaultSelectConfig]">
              <a-select-option value="0">未婚</a-select-option>
              <a-select-option value="1">已婚</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="联系方式" v-bind="formItemLayout">
            <a-input v-decorator="['phone', defaultFormConfig]" name="phone" />
          </a-form-item>
          <a-form-item label="邮箱" v-bind="formItemLayout">
            <a-input v-decorator="['email', emailConfig]" />
          </a-form-item>
          <a-form-item label="学历" v-bind="formItemLayout">
            <a-select v-decorator="['education', defaultSelectConfig]">
              <a-select-option value="0">本科</a-select-option>
              <a-select-option value="1">硕士</a-select-option>
              <a-select-option value="2">博士</a-select-option>
              <a-select-option value="3">其他</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="年龄" v-bind="formItemLayout">
            <a-input v-decorator="['age', defaultFormConfig]" />
          </a-form-item>
          <a-form-item label="注册时间" v-bind="formItemLayout">
            <a-date-picker
              :format="dateFormat"
              style="width: 100%"
              v-decorator="[
                'register-time',
                { initialValue: moment() }
              ]"
            />
          </a-form-item>
          <a-form-item label="家庭地址" v-bind="formItemLayout">
            <a-textarea rows="4" v-decorator="['address']" />
          </a-form-item>
        </div>
        <div class="from-option" style="text-align: center">
          <a-button htmlType="submit" type="primary" style="marginRight: 8px" :loading="posting">创建</a-button>
          <a-button>保存</a-button>
        </div>
      </a-card>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment'
import { AvatarUpload } from '@/components'
import { createCustomer } from '@/api/basicData/customers'

export default {
  name: 'CreateCustomer',
  components: { AvatarUpload },
  data () {
    return {
      formItemLayout: {
        labelCol: { lg: { span: 4 }, sm: { span: 4 } },
        wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
      },
      defaultFormConfig: {
        rules: [
          { required: true }
        ]
      },
      defaultSelectConfig: { rules: [{ required: true }], initialValue: '0' },
      emailConfig: {
        rules: [
          { type: 'email', message: 'The input is not valid E-mail!' },
          { required: true, message: 'Please input your E-mail!' }
        ]
      },
      phoneConfig: {
        rules: [
          { pattern: '' },
          { required: true, message: 'Please input your Phone!' }
        ]
      },
      dateFormat: 'YYYY-MM-DD',
      data: {},
      posting: false,
      avatarUrl: '',
      form: this.$form.createForm(this)
    }
  },
  mounted () {
  },
  methods: {
    // default-date
    moment,
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            'register-time': fieldsValue['register-time'].format('YYYY-MM-DD'),
            brithday: fieldsValue['brithday'].format('YYYY-MM-DD'),
            avatar: this.avatarUrl
          }
          console.log('form values =>', values)
          console.log('date =>', moment(fieldsValue['register-time']).format('YYYY-MM-DD'))
          this.posting = true
          createCustomer(values).then(res => {
            this.posting = false
            this.$message.success(`successfully`)
          }).catch(() => {
            this.posting = false
            this.$message.error('error')
          })
        }
      })
    },
    saveForm () {
    },
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) return e
      return e && e.fileList
    },
    avatarFileChange (file) {
      console.log('avater =>', file)
      this.avatarUrl = file.base64Url || ''
    }
  }
}
</script>

<style lang='less' scoped>
.edit-customer-page {
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
  .edit-customer-page {
    .basic-info,
    .other-info {
      display: flex;
      flex-wrap: wrap;
      position: relative;
    }
    .basic-info .ant-row,
    .other-info .ant-row {
      width: 100%;
    }
  }
}
</style>
