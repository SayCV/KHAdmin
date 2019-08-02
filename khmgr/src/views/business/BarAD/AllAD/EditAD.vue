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
                { rules: [{ required: true, message: '请输入广告名称' }],
                  initialValue: data.title}
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
                {rules: [{ required: true, message: '请输入广告链接' }],initialValue: data.adUrl }
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
              v-decorator="['range-picker', {rules: [{ required: true, message: '请选择起止时间' }], initialValue:[moment(data.beginDate, dateFormat), moment(data.endDate, dateFormat)] }]"
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
                {rules: [{ required: true, message: '请输入联系人' }], initialValue:data.contact }
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
                {rules: [{ required: true, message: '请输入联系方式' }], initialValue:data.phone }
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
import moment from 'moment'
import FooterToolBar from '@/components/FooterToolbar'
import PageName from '@/components/PageHeader/PageName'
import ButtonBack from '@/components/Button/ButtonBack'
import { upLoadAddress } from '@/core/icons' // import 资源上传地址

export default {
  name: 'EditAD',
  components: { FooterToolBar, PageName, ButtonBack },
  data () {
    return {
      upLoadAddress: upLoadAddress,
      dateFormat: 'YYYY-MM-DD',
      disabled: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: [],
      loading: false,
      imgLoading: false,
      data: [], // 进入编辑页面填充表单的数据
      adId: this.$route.query.adId, // ADid
      current: 1
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getFormData()
    })
  },
  // watch: {
  //   '$route.path' (to, from) {
  //     if (to === this.$route.path) {
  //       console.log('进入广告编辑页面', to)

  //       this.getFormData(this.adId)
  //     }
  //   }
  // },
  mounted () {
    this.getFormData(this.adId)
  },
  methods: {
    moment,
    handleCoverChange ({ fileList }) {
      console.log('cover', fileList)
      this.fileList = fileList
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片文件超过 2MB!')
        return false
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
    getFormData (newsId) {
      // 进入广告编辑页面时表单填入数据
      this.adId = this.$route.query.adId
      this.data = this.$route.query.data
      console.log('元素数据:', this.data)
      this.initFileList(this.data)
    },
    initFileList (data) {
      // 设置默认封面
      this.fileList = [{
        uid: '-1',
        name: 'default',
        status: 'done',
        url: data.imageUrl
      }]
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
            if (this.fileList[0].name === 'default') {
              // 判断是否修改了默认填充的封面
              this.cover = null
              this.cover = this.fileList[0].url
            } else {
              this.cover = null
              this.cover = this.upLoadAddress + this.fileList[0].response
            }
            const rangeValue = fieldsValue['range-picker']
            const values = {
              ...fieldsValue,
              // 'imageUrl': `http://172.31.214.104/khmsrv/api/resources/${this.fileList[0].response}`,
              'imageUrl': this.cover,
              'useDate': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
              'startDate': rangeValue[0].format('YYYY-MM-DD'),
              'endDate': rangeValue[1].format('YYYY-MM-DD'),
              'status': this.selected
            }
            console.log('Received values of form: ', values)
            this.adFormPost(values)
          }
        }
      })
    },
    adFormPost (formData) {
      // Post且跳转
      console.log('要提交的表单', formData)
      this.loading = true
      setTimeout(() => {
        axios({
          url: `/api/admin/ad/${this.adId}`,
          method: 'put',
          data: formData,
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          console.log('表单更新了', res)
          if (res) {
            this.$router.push({ name: 'allAD' })
          }
        }).catch(err => {
          if (err) {
            this.$notification['error']({
              message: '注意！注意！',
              description: '更新广告失败.'
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
