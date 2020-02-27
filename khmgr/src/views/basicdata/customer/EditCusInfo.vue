<template>
  <div class="edit-customer-container">
    <a-form @submit="handleSubmit" :form="form">
      <a-card title="基本信息" :bordered="false" :loading="loading">
        <a-row type="flex" :gutter="24">
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="账号ID" v-bind="formItemLayout">
              <a-input v-decorator="['accountId', accountIdConfig]" name="accountId" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="用户名" v-bind="formItemLayout">
              <a-input v-decorator="['username', userNameConfig]" name="username" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="用户组" v-bind="formItemLayout">
              <a-select v-decorator="['user-group', userGroupConfig]">
                <a-select-option value="0">VIP</a-select-option>
                <a-select-option value="1">普通用户</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="姓名" v-bind="formItemLayout">
              <a-input v-decorator="['name', nameConfig]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="性别" v-bind="formItemLayout">
              <a-select v-decorator="['sex', sexConfig]">
                <a-select-option value="0">男</a-select-option>
                <a-select-option value="1">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="出生日期" v-bind="formItemLayout">
              <a-date-picker
                :format="dateFormat"
                style="width: 100%"
                name="brithday"
                v-decorator="['brithday', brithdayConfig]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="单位" v-bind="formItemLayout">
              <a-textarea rows="4" v-decorator="['workPlace', workPlaceConfig]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="身份证" v-bind="formItemLayout">
              <a-input v-decorator="['identityId', identityIdConfig]" name="identityId" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="头像" v-bind="formItemLayout">
              <AvatarUpload @avatarFile="avatarFileChange" :avatarFileList="avatarFileList"></AvatarUpload>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="其他信息" :bordered="false" :loading="loading">
        <a-row type="flex" :gutter="24">
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="民族" v-bind="formItemLayout">
              <a-input v-decorator="['nation', nationConfig]" name="nation" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="婚姻状况" v-bind="formItemLayout">
              <a-select v-decorator="['maritalStatus', maritalStatusConfig]">
                <a-select-option value="0">未婚</a-select-option>
                <a-select-option value="1">已婚</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="联系方式" v-bind="formItemLayout">
              <a-input v-decorator="['phone', phoneConfig]" name="phone" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="邮箱" v-bind="formItemLayout">
              <a-input v-decorator="['email', emailConfig]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="学历" v-bind="formItemLayout">
              <a-select v-decorator="['education', educationConfig]">
                <a-select-option value="0">本科</a-select-option>
                <a-select-option value="1">硕士</a-select-option>
                <a-select-option value="2">博士</a-select-option>
                <a-select-option value="3">其他</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="年龄" v-bind="formItemLayout">
              <a-input v-decorator="['age', ageConfig]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="注册时间" v-bind="formItemLayout">
              <a-date-picker
                :format="dateFormat"
                style="width: 100%"
                v-decorator="['register-time', registerDateConfig]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="家庭地址" v-bind="formItemLayout">
              <a-textarea rows="4" v-decorator="['address',addressConfig]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <footer-tool-bar>
        <div class="from-option" style="text-align: center">
          <a-button htmlType="submit" type="primary" :loading="posting">保存</a-button>
        </div>
      </footer-tool-bar>
    </a-form>
    <!-- <a-form
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
                 initialValue: data.workPlace||''}
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
    </a-form>-->
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import ButtonBack from '@/components/Button/ButtonBack'
import { getCustomerDetailInfo, updateCustomerInfo } from '@/api/basicData/customers'
import { AvatarUpload } from '@/components'
import FooterToolBar from '@/components/FooterToolbar'

export default {
  // 客户管理编辑
  name: 'CustomerEditInfo',
  components: { ButtonBack, AvatarUpload, FooterToolBar },
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { lg: { span: 4 }, sm: { span: 4 } },
        wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
      },
      accountIdConfig: { rules: [{ required: true }], initialValue: null },
      userNameConfig: { rules: [{ required: true }], initialValue: null },
      userGroupConfig: { rules: [{ required: true }], initialValue: null },
      nameConfig: { rules: [{ required: true }], initialValue: null },
      sexConfig: { rules: [{ required: true }], initialValue: null },
      brithdayConfig: { rules: [{ required: true }], initialValue: null },
      workPlaceConfig: { rules: [{ required: true }], initialValue: null },
      identityIdConfig: { rules: [{ required: true }], initialValue: null },
      avatarConfig: { rules: [{ required: true }], initialValue: null },
      nationConfig: { rules: [{ required: true }], initialValue: null },
      maritalStatusConfig: { rules: [{ required: true }], initialValue: null },
      phoneConfig: { rules: [{ required: true }], initialValue: null },
      emailConfig: { rules: [{ required: true }], initialValue: null },
      educationConfig: { rules: [{ required: true }], initialValue: null },
      ageConfig: { rules: [{ required: true }], initialValue: null },
      registerDateConfig: { rules: [{ required: true }], initialValue: null },
      addressConfig: { rules: [{ required: true }], initialValue: null },
      dateFormat: 'YYYY-MM-DD',
      accountId: this.$route.query.accountId,
      customerData: {},
      loading: false,
      posting: false,
      avatarUrl: '',
      avatarFileList: []
    }
  },
  created () {
    this.fetch()
  },
  mounted () {
    // this.fetch()
    console.log('data =>', this.$data)
  },
  computed: {
    initAccountIdValue () { return this.customerData.accountId || '' },
    initUserNameValue () { return this.customerData.userName || '' },
    initUserGroupValue () { return this.customerData.userGroup || '' },
    initNameValue () { return this.customerData.name || '' },
    initSexValue () { return this.customerData.sex || '' },
    initBirthDateValue () {
      return _.isEmpty(this.customerData.birthday) || isNaN(this.customerData.birthday)
        ? null : moment(this.customerData.birthday, this.dateFormat)
    },
    initWorkPlaceValue () { return this.customerData.workPlace || '' },
    initIdentityValue () { return this.customerData.identityId || '' },
    initAvatarValue () { return this.customerData.avatar || '' },
    initNationValue () { return this.customerData.nation || '' },
    initMaritalStatusValue () { return this.customerData.maritalStatus || '' },
    initPhoneValue () { return this.customerData.phone || '' },
    initEmailValue () { return this.customerData.email || '' },
    initEducationValue () { return this.customerData.education || '' },
    initAgeValue () { return this.customerData.age || '' },
    initRegisterDateValue () {
      return _.isEmpty(this.customerData.registerDate) || isNaN(this.customerData.registerDate)
        ? null : moment(this.customerData.registerDate, this.dateFormat)
    },
    initAddressValue () { return this.customerData.address || '' }
  },
  methods: {
    // default-date
    moment,
    // 获取数据
    fetch (params = {}) {
      this.loading = true
      getCustomerDetailInfo(this.accountId).then(res => {
        this.loading = false
        this.customerData = res || {}
        this.accountIdConfig.initialValue = this.initAccountIdValue
        this.userNameConfig.initialValue = this.initUserNameValue
        this.nameConfig.initialValue = this.initNameValue
        this.sexConfig.initialValue = this.initSexValue
        this.brithdayConfig.initialValue = this.initBirthDateValue
        this.workPlaceConfig.initialValue = this.initWorkPlaceValue
        this.identityIdConfig.initialValue = this.initIdentityValue
        this.nationConfig.initialValue = this.initNationValue
        this.maritalStatusConfig.initialValue = this.initMaritalStatusValue
        this.phoneConfig.initialValue = this.initPhoneValue
        this.emailConfig.initialValue = this.initEmailValue
        this.educationConfig.initialValue = this.initEducationValue
        this.ageConfig.initialValue = this.initAgeValue
        this.registerDateConfig.initialValue = this.initRegisterDateValue
        this.addressConfig.initialValue = this.initAddressValue
        this.avatarConfig.initialValue = this.initAvatarValue
        this.initAvatarFile(this.customerData.avatar)
        console.log('customerData =>', this.customerData)
      }).catch(() => { this.loading = false })
    },
    initAvatarFile (url = '') {
      console.log('_.isEmpty(avatar) =>', _.isEmpty(url), url)
      if (_.isEmpty(url)) {
        this.avatarFileList = []
      }
      const avatar = {
        uid: '-1',
        name: 'default.png',
        status: 'done',
        url: url
      }
      this.avatarFileList.push(avatar)
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            'register-time': fieldsValue['register-time'].format('YYYY-MM-DD'),
            brithday: fieldsValue['brithday'].format('YYYY-MM-DD'),
            avatar: _.isEmpty(this.avatarUrl) ? this.avatarFileList.url : this.avatarUrl
          }
          this.posting = true
          updateCustomerInfo(values).then(res => {
            this.posting = false
            this.$message.success(`successfully`)
          }).catch(() => {
            this.posting = false
            this.$message.error('error')
          })
        }
      })
    },
    avatarFileChange (file) {
      console.log('avater =>', file)
      this.avatarUrl = file.base64Url || ''
    }
  }
}
</script>

<style lang='less' scoped>
</style>
