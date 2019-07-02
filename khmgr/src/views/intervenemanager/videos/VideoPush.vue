<template>
  <div>
    <div id="video-push">
      <div class="video-upload">
        <a-upload-dragger
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          listType="picture"
          :VideoList="VideoList">
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">点击或拖拽视频到此处也可上传</p>
          <p class="ant-upload-hint">上传视频，请勿上传色情，反动等违法视频。</p>
        </a-upload-dragger>
      </div>
      <div class="video-info">
        <a-form
          :layout="formLayout"
          :form="form"
          @submit="handleSubmit">
          <a-form-item>
            <div class="clearfix">
              <div class="clearfix-txt">
                <a-tag color="blue">请上传视频封面</a-tag>
              </div>
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="imgHandleChange">
                <div v-if="fileList.length < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传视频封面</div>
                </div>
              </a-upload>
              <a-modal
                :visible="previewVisible"
                :footer="null"
                @cancel="handleCancel">
                <img
                  alt="example"
                  style="width: 100%"
                  :src="previewImage" />
              </a-modal>
            </div>
          </a-form-item>
          <a-form-item
            label="标题"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 18 }">
            <a-input
              v-decorator="[
                'title',
                {rules: [{ required: true, message: '请输入标题' }] }
              ]" />
          </a-form-item>
          <a-form-item
            label="简介"
            :labelCol="{lg: {span: 2}, sm: {span: 2}}"
            :wrapperCol="{lg: {span: 18}, sm: {span: 18} }">
            <a-textarea
              rows="4"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请输入简介' }] }
              ]" />
          </a-form-item>
          <div class="from-option">
            <a-button
              type="primary"
              html-type="submit">提交</a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPush',
  data () {
    return {
      isUsed: false,
      showVideoFrom: false,
      VideoList: [],
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  },
  methods: {
    handleChange (info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log('video', info.file, info.VideoList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
        this.showVideoFrom = !this.showVideoFrom
        this.isUsed = !this.isUsed
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
        this.showVideoFrom = !this.showVideoFrom
        this.isUsed = !this.isUsed
      }
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
      this.showVideoFrom = false
    },
    imgHandleChange ({ fileList }) {
      this.fileList = fileList
      console.log('file', fileList)
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
    }
  }
}
</script>

<style  scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
#video-push {
  height: calc(100vh - 300px);
}
.video-upload {
  width: 100%;
  padding: 0px 0px;
}
.video-info {
  margin-top: 1.6rem;
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
.from-option {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
