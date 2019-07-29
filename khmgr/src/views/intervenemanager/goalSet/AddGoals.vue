<template>
  <div class="aimPage">
    <div class="aim-page-top">
      <PageName></PageName>
      <ButtonBack></ButtonBack>
    </div>
    <div class="aim-page-content">
      <div class="ad-info">
        <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
          <a-form-item
            label="目标名称"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 8}, sm: {span: 8} }"
          >
            <a-input
              v-decorator="[
                'title',
                {rules: [{ required: true, message: '请输入广告名称' }] }
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
                {rules: [{ required: true, message: '请输入广告链接' }] }
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
                  action="http://172.31.214.104/khmsrv/api/resources"
                  listType="picture-card"
                  :fileList="fileList"
                  @preview="handlePreview"
                  @change="handleCoverChange"
                  :beforeUpload="beforeUpload"
                >
                  <div v-if="fileList.length < 1">
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
                  action="http://172.31.214.104/khmsrv/api/resources"
                  listType="picture-card"
                  :fileList="fileList"
                  @preview="handlePreview"
                  @change="handleCoverChange"
                  :beforeUpload="beforeUpload"
                >
                  <div v-if="fileList.length < 1">
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
            <a-select
              mode="multiple"
              placeholder="选择重复日期"
              :setFieldsValue="selectedItems"
              @change="handleChange"
              v-decorator="[
                'week',
                {rules: [{ required: true, message: '请选择重复日期' }] }
              ]"
            >
              <a-select-option v-for="item in filteredOptions" :key="item" :value="item">{{ item }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="启用目标值"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <a-switch @change="onSwitchChange" />
          </a-form-item>
          <a-form-item
            v-if="isAimsValue"
            label="目标值"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 8}, sm: {span: 8} }"
          >
            <a-input
              v-decorator="[
                'value',
                {rules: [{ required: true, message: '请输入目标值' }] }
              ]"
            />
          </a-form-item>
          <!-- fixed footer toolbar -->
          <footer-tool-bar>
            <a-button type="primary" html-type="submit" :loading="loading">提&nbsp;交</a-button>
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

const OPTIONS = [
  0, 1, 2, 3, 4, 5, 6
]
export default {
  name: 'AddGoals',
  components: { FooterToolBar, PageName, ButtonBack },
  data () {
    return {
      disabled: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: [],
      loading: false,
      imgLoading: false,
      selectedItems: [],
      isAimsValue: false
    }
  },
  computed: {
    filteredOptions () {
      return OPTIONS.filter(o => !this.selectedItems.includes(o))
    }
  },
  methods: {
    moment,
    onSwitchChange (checked) {
      console.log(`a-switch to ${checked}`)
      this.isAimsValue = !this.isAimsValue
    },
    handleChange (selectedItems) {
      this.selectedItems = selectedItems
    },
    handleCoverChange (info) {
      console.log('cover', info)
      this.fileList = info.fileList
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
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
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          fieldsValue = {
            ...fieldsValue,
            isValue: this.isAimsValue
          }
          console.log('Received values of form: ', fieldsValue)
        }
      })
    },
    adFormPost (formData) {
      // Post且跳转
      console.log('提交的广告', formData)
      this.loading = true
      setTimeout(() => {
        axios({
          url: '/api/admin/ad',
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          console.log('广告提交了', res)
          if (res.successed === true) {
            // this.$router.push({ path: '/business/BarAD/allAD/usedAD' })
            this.$router.push({ name: 'allAD' })
          }
        }).catch(err => {
          if (err) {
            this.$notification['error']({
              message: '注意！注意！',
              description: '广告投放失败.'
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
