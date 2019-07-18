<template>
  <div class="video-container">
    <div class="video-page-top">
      <div class="page-top">{{ $route.meta.title }}</div>
      <div class="video-operation">
        <a-button type="primary" @click="() => handleBack()">
          <a-icon type="left" />返回
        </a-button>
      </div>
    </div>
    <div class="video-push">
      <div class="video-info">
        <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
          <a-form-item
            label="标题"
            :labelCol="{md: {span: 3}, sm: {span: 3}}"
            :wrapperCol="{md: {span: 18}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'title',
                {rules: [{ required: true, message: '请输入标题' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="简介"
            :labelCol="{md: {span: 3}, sm: {span: 3}}"
            :wrapperCol="{md: {span: 18}, sm: {span: 16} }"
          >
            <a-textarea
              rows="3"
              v-decorator="[
                'summary',
                {rules: [{ required: true, message: '请输入简介' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="视频"
            :required="true"
            :labelCol="{md: {span: 3}, sm: {span: 3}}"
            :wrapperCol="{md: {span: 18}, sm: {span: 16} }"
          >
            <a-upload-dragger
              accept="video/*"
              name="file"
              :fileList="videoList"
              :disabled="disabled"
              action="http://172.31.214.104/khmsrv/api/resources"
              listType="picture"
              @change="handleVideoChange"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">点击上传视频（拖拽）</p>
            </a-upload-dragger>
          </a-form-item>
          <a-form-item
            label="封面"
            :required="true"
            :labelCol="{md: {span: 3}, sm: {span: 3}}"
            :wrapperCol="{md: {span: 18}, sm: {span: 16} }"
          >
            <div class="clearfix">
              <div class="clearfix-txt">
                <a-tag color="blue">请上传视频封面</a-tag>
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
                  <div class="ant-upload-text">上传视频封面</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
          </a-form-item>
          <a-form-item
            :labelCol="{md: {span: 3}, sm: {span: 3}}"
            :wrapperCol="{md: {span: 4}, sm: {span: 4} }"
            label="发送人群"
            has-feedback
          >
            <a-select v-model="selected">
              <a-select-option
                v-for="option in options"
                :value="option.value"
                :key="option.value"
              >{{ option.text }}</a-select-option>
            </a-select>
          </a-form-item>
          <!-- fixed footer toolbar -->
          <footer-tool-bar>
            <a-button type="primary" html-type="submit" :loading="loading">提 交</a-button>
          </footer-tool-bar>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
import FooterToolBar from '@/components/FooterToolbar'

export default {
  name: 'VideoPush',
  components: { FooterToolBar },
  data () {
    return {
      selected: 0, // 比如想要默认选中为 Three 那么就把他设置为C
      options: [
        { text: '全部推送', value: 0 }, // 每个选项里面就不用在多一个selected 了
        { text: '条件推送', value: 1 }
      ],
      disabled: false,
      videoList: [],
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: [],
      loading: false,
      imgLoading: false
    }
  },
  watch: {
    '$route.path': function (to, from) {
      if (to === '/intervenemanager/videos/videopush') {
        console.log('再次进入新建video页且清空表单')
        this.clearFormData()
      }
    }
  },
  methods: {
    clearFormData () {
      // 清空表单内容
      this.form.resetFields()
      this.videoList = []
      this.fileList = []
      this.disabled = false
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
    handleVideoChange (info) {
      this.videoList = info.fileList
      console.log('videoList', info)
      switch (this.videoList.length) {
        case 0: this.disabled = false
          console.log('启用', this.videoList.length)
          break
        case 1: this.disabled = true
          console.log('禁用', this.videoList.length)
          break
      }
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
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.videoList.length === 0) {
            this.$message.warning('视频不能为空')
          } else if (this.fileList.length === 0) {
            this.$message.warning('封面不能为空')
          } else {
            // 追加表单字段
            values = {
              ...values,
              'imageUrl': `http://172.31.214.104/khmsrv/api/resources/${this.fileList[0].response}`,
              'videoUrl': `http://172.31.214.104/khmsrv/api/resources/${this.videoList[0].response}`,
              'pubType': this.selected
            }
            console.log('Received values of form: ', values)
            this.videoFormPost(values)
          }
        }
      })
    },
    videoFormPost (formData) {
      // Post且跳转
      console.log('要提交的表单', formData)
      this.loading = true
      setTimeout(() => {
        axios({
          url: '/api/admin/videos',
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          console.log('表单提交了', res)
          if (res.successed === true) {
            this.$router.push({ path: '/intervenemanager/videos/allvideos' })
          }
        }).catch(err => {
          if (err) {
            this.$notification['error']({
              message: '注意！注意！',
              description: '上传视频失败.'
            })
          }
        })
        this.loading = false
      }, 1000)
    },
    handleBack () {
      // 返回PushList页面
      this.$router.push({
        path: '/intervenemanager/videos/allvideos'
      })
    }

  }
}
</script>

<style lang="less" scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.video-container {
  min-height: calc(100vh - 280px);
  .video-page-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .page-top {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      text-align: center;
      line-height: 36px;
      padding: 0 24px;
      border: 1px solid #d9d9d9;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      color: #2f54eb;
      background: #f0f5ff;
      border-color: #adc6ff;
    }
  }
  .video-push {
    // width: 80%;
    display: block;
    .video-info {
      margin-top: 0.8rem;
      display: flex;
      justify-content: center;
    }
    .ant-form {
      width: 100%;
      /* padding: 20px; */
    }
    .ant-form-item {
      width: 100%;
    }
  }
}
</style>
