<template>
  <div class="adsPage">
    <div class="ads-page-top">
      <PageName></PageName>
      <ButtonBack></ButtonBack>
    </div>
    <div class="ads-page-content">
      <div class="ad-info">
        <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
          <a-form-item
            label="广告名称"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'title',
                {rules: [{ required: true, message: '请输入广告名称' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="广告链接"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'adUrl',
                {rules: [{ required: true, message: '请输入广告链接' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="广告图片"
            :required="true"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <div class="clearfix">
              <div class="clearfix-txt">
                <a-tag color="blue">请上传广告图片</a-tag>
              </div>
              <a-upload
                accept="image/*"
                :action="upLoadAddress"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="handleCoverChange"
                :beforeUpload="beforeUpload"
              >
                <div v-if="fileList.length < 1">
                  <a-icon :type="imgLoading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传广告图片</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
          </a-form-item>
          <a-form-item
            label="起止时间"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 16}, sm: {span: 16} }"
          >
            <a-range-picker
              v-decorator="['range-picker', {rules: [{ required: true, message: '请选择起止时间' }] }]"
            />
          </a-form-item>
          <a-form-item
            label="联系人"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 4}, sm: {span: 4} }"
          >
            <a-input
              v-decorator="[
                'contact',
                {rules: [{ required: true, message: '请输入联系人' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="联系方式"
            :labelCol="{md: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{md: {span: 5}, sm: {span: 5} }"
          >
            <a-input
              v-decorator="[
                'phone',
                {rules: [{ required: true, message: '请输入联系方式' }] }
              ]"
            />
          </a-form-item>
          <!-- fixed footer toolbar -->
          <footer-tool-bar>
            <a-button type="primary" html-type="submit" :loading="loading" :disabled="loading" >提&nbsp;交</a-button>
          </footer-tool-bar>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>

import { axios } from '@/utils/request'
import FooterToolBar from '@/components/FooterToolbar'
import { PageName, ButtonBack } from '@/components'
import { upLoadAddress } from '@/core/icons' // import 资源上传地址

export default {
  name: 'AddAD',
  components: { FooterToolBar, PageName, ButtonBack },
  data () {
    return {
      upLoadAddress: upLoadAddress,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: [],
      loading: false,
      imgLoading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.clearFormData()
    })
  },
  methods: {
    clearFormData () {
      // 清空表单内容
      this.form.resetFields()
      this.fileList = []
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
          if (this.fileList.length === 0) {
            this.$message.warning('广告图片不能为空')
          } else {
            // 追加表单字段
            const rangeValue = fieldsValue['range-picker']
            const values = {
              ...fieldsValue,
              'imageUrl': this.upLoadAddress + this.fileList[0].response,
              'startDate': rangeValue[0].format('YYYY-MM-DD'),
              'endDate': rangeValue[1].format('YYYY-MM-DD')
            }
            console.log('Received values of form: ', values)
            this.adFormPost(values)
          }
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
@import './adsform.less';
</style>
