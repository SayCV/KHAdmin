<template>
  <div class="aimPage">
    <div class="aim-page-top">
      <PageName></PageName>
      <ButtonBack></ButtonBack>
    </div>
    <div class="aim-page-content">
      <div class="ad-info">
        <a-form layout="horizontal" :form="form" @submit="handleSubmit">
          <a-form-item
            label="目标名称"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'title',
                {rules: [{ required: true, message: '请输入小目标名称' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="目标描述"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'desc',
                {rules: [{ required: true, message: '请输入小目标描述' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="推荐计划"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'plan',
                {rules: [{ required: true, message: '请填写推荐计划' }] }
              ]"
            />
          </a-form-item>
          <div :span="24" class="form-img">
            <a-form-item
              label="目标图片"
              :required="true"
              :labelCol="{md: {span: 8}, sm: {span: 4}}"
              :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
            >
              <div class="clearfix">
                <div class="clearfix-txt">
                  <a-tag color="blue">请上传目标图片</a-tag>
                </div>
                <a-upload
                  accept="image/*"
                  :action="upLoadAddress"
                  listType="picture-card"
                  :fileList="imgList"
                  @preview="handlePreview"
                  @change="handleImgChange"
                  :beforeUpload="beforeUpload"
                >
                  <div v-if="imgList.length < 1">
                    <a-icon :type="imgLoading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">上传目标图片</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </a-form-item>
            <a-form-item
              label="目标图标"
              :required="true"
              :labelCol="{md: {span: 4}, sm: {span: 4}}"
              :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
            >
              <div class="clearfix">
                <div class="clearfix-txt">
                  <a-tag color="geekblue">请上传目标图标</a-tag>
                </div>
                <a-upload
                  accept="image/svg, image/png"
                  :action="upLoadAddress"
                  listType="picture-card"
                  :fileList="iconList"
                  @preview="handlePreview"
                  @change="handleIconChange"
                  :beforeUpload="beforeUpload"
                >
                  <div v-if="iconList.length < 1">
                    <a-icon :type="imgLoading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">上传目标图标</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </a-form-item>
          </div>
          <a-form-item
            label="重复时间"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <a-time-picker
              v-decorator="['time-picker', {rules: [{ required: true, message: '请选择重复时间' }] }]"
              format="HH:mm"
            />
          </a-form-item>
          <a-form-item
            label="重复日期"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 12}, sm: {span: 12} }"
          >
            <div>
              <a-checkbox-group
                :options="repeatTimeOptions"
                @change="onChange"
                v-decorator="[
                  'weeks',
                  {rules: [{ required: true, message: '请选择重复日期' }],
                   initialValue:defaultOptions }
                ]"
              />
            </div>
          </a-form-item>
          <a-form-item
            label="目标类型"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 4}, sm: {span: 4} }"
          >
            <a-select v-model="typeSelected">
              <a-select-option
                v-for="option in selectedType"
                :value="option.value"
                :key="option.value"
              >{{ option.text }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="启用目标值"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <a-switch
              @change="onSwitchChange"
              :checked="isChecked"
              v-decorator="[
                'hasValue', {rules: [{ required: false }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            v-if="isChecked"
            label="目标值"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 8}, sm: {span: 8} }"
          >
            <a-input
              :addonAfter="unit"
              v-decorator="[
                'goalValue',
                {rules: [{ required: true, message: '请输入目标值' }] }
              ]"
            >
              <a-select slot="addonBefore" v-model="valueSelected" style="width:9em;">
                <a-select-option
                  v-for="option in selectedValue"
                  :value="option.name"
                  :key="option.name"
                >{{ option.displayName }}</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
          <!-- fixed footer toolbar -->
          <footer-tool-bar>
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              :disabled="loading"
            >提&nbsp;交</a-button>
          </footer-tool-bar>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { axios } from '@/utils/request'
import FooterToolBar from '@/components/FooterToolbar'
import { PageName, ButtonBack } from '@/components'
import { upLoadAddress } from '@/core/icons' // import 资源上传地址

const repeatTimeOptions = [
  { label: '周一', value: 0 },
  { label: '周二', value: 1 },
  { label: '周三', value: 2 },
  { label: '周四', value: 3 },
  { label: '周五', value: 4 },
  { label: '周六', value: 5 },
  { label: '周日', value: 6 }
]
const defaultOptions = [
  0, 1, 2, 3, 4, 5, 6
]
export default {
  name: 'AddGoal',
  components: { FooterToolBar, PageName, ButtonBack },
  data () {
    return {
      valueSelected: null, // 默认选中的目标值
      selectedValue: [],
      typeSelected: 0,
      selectedType: [
        { text: '生活习惯类', value: 0 },
        { text: '指标类', value: 1 }
      ],
      upLoadAddress: upLoadAddress,
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      imgList: [],
      iconList: [],
      loading: false,
      imgLoading: false,
      selectedItems: [],
      isChecked: false,
      repeatTimeOptions,
      defaultOptions,
      repeatTimeValue: defaultOptions
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.initFormData()
    })
  },
  computed: {
    unit: (vm) => {
      const units = vm.selectedValue.filter((value, index, array) => {
        return value.name === vm.valueSelected
      })
      if (units.length < 1) {
        return ''
      }
      return units[0].unit || ''
    }
  },
  mounted () {
    this.getTargetValueType()
  },
  methods: {
    moment,
    initFormData () {
      // 清空表单内容
      this.form.resetFields()
      this.iconList = []
      this.imgList = []
      this.isChecked = false
    },
    handleImgChange (info) {
      console.log('img', info)
      this.imgList = info.fileList
    },
    handleIconChange (info) {
      console.log('icon', info)
      this.iconList = info.fileList
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小必须限制在 2MB 以内!')
      }
      return isLt2M
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      this.repeatTimeValue = checkedValues
      console.log('repeatTimeValue = ', this.repeatTimeValue)
    },
    onSwitchChange (checked) {
      console.log(`a-switch to ${checked}`)
      this.isChecked = !this.isChecked
    },
    // 获取目标值类型
    getTargetValueType () {
      axios({
        url: 'api/admin/targets/indicatortypes',
        method: 'get'
      }).then(res => {
        console.log('type', res)
        if (res) {
          this.selectedValue = res
          this.valueSelected = res[0].name
        }
      })
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          if (this.imgList.length === 0 || this.iconList.length === 0) {
            this.$message.warning('目标图片或者图标不能为空')
          } else {
            fieldsValue = {
              ...fieldsValue,
              typeSelected: this.typeSelected,
              hasValue: this.isChecked,
              valueType: this.valueSelected,
              remindTime: fieldsValue['time-picker'].format('HH:mm'),
              imgUrl: this.upLoadAddress + this.imgList[0].response,
              iconUrl: this.upLoadAddress + this.iconList[0].response
            }
            console.log('Received values of form: ', fieldsValue)
          }
        }
      })
    },
    adFormPost (formData) {
      // Post且跳转
      this.loading = true
      setTimeout(() => {
        axios({
          url: '/api/admin/',
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          console.log('done', res)
          if (res.successed === true) {
            this.$router.push({ name: '' })
          }
        }).catch(err => {
          if (err) {
            this.$notification['error']({
              message: '注意！注意！',
              description: '添加目标失败.'
            })
          }
        })
        this.loading = false
      }, 1000)
    }
  }
}
</script>

 <style lang="less" scoped>
.aimPage {
  padding: 24px 32px;
  min-height: calc(100vh - 280px);
  .aim-page-top {
    display: flex;
    justify-content: space-between;
  }
  .form-img {
    display: flex;
    .ant-form-item {
      flex: 1;
    }
  }
}
</style>
