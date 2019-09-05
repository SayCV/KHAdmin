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
                { initialValue: ''}
              ]"
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
                {rules: [{ required: true, message: '请输入电话' }],initialValue: ''}
              ]"
              name="phone"
            />
          </a-form-item>

          <a-form-item
            label="姓名"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input v-decorator="['name', { initialValue: ''}]" />
          </a-form-item>
          <a-form-item
            label="年龄"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input v-decorator="['age', { initialValue: ''}]" />
          </a-form-item>
          <a-form-item
            label="性别"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-select
              v-decorator="[
                'sex',
                {initialValue: '0'}
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
                { initialValue: moment(Date.now()) }
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
                { initialValue: ''}
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
                { initialValue: ''}
              ]"
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
                { initialValue: ''}
              ]"
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
                {initialValue: '0'}
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
                { initialValue: ''}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="注册时间"
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-date-picker
              :format="dateFormat"
              style="width: 100%"
              v-decorator="[
                'register-time',
                { initialValue: moment(Date.now()) }
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
                { initialValue: ''}
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
                'address',
                { initialValue: ''}
              ]"
            />
          </a-form-item>
        </div>
        <div class="from-option" style="text-align: center">
          <a-button htmlType="submit" type="primary" >创建</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>

// import { axios } from '@/utils/request'
import moment from 'moment'
import ButtonBack from '@/components/Button/ButtonBack'

export default {

  name: 'CreateCustomer',
  components: { ButtonBack },
  data () {
    return {
      dateFormat: 'YYYY-MM-DD',
      data: {},
      // form
      form: this.$form.createForm(this)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  },
  mounted () {

  },
  methods: {
    // default-date
    moment,
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
