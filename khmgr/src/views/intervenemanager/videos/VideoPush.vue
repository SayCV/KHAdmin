<template>
  <div class="video-container">
    <div class="video-push">
      <div class="video-info">
        <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
          <a-form-item
            label="标题"
            :labelCol="{md: {span: 2}, sm: {span: 2}}"
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
            :labelCol="{md: {span: 2}, sm: {span: 2}}"
            :wrapperCol="{md: {span: 18}, sm: {span: 16} }"
          >
            <a-textarea
              rows="3"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请输入简介' }] }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="视频"
            :required="true"
            :labelCol="{md: {span: 2}, sm: {span: 2}}"
            :wrapperCol="{md: {span: 18}, sm: {span: 16} }"
          >
            <a-upload-dragger
              name="file"
              :multiple="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">点击上传视频</p>
              <p class="ant-upload-hint">Support for a single or bulk upload.</p>
            </a-upload-dragger>
          </a-form-item>
          <a-form-item
            label="封面"
            :required="true"
            :labelCol="{md: {span: 2}, sm: {span: 2}}"
            :wrapperCol="{md: {span: 18}, sm: {span: 16} }"
          >
            <div class="clearfix">
              <div class="clearfix-txt">
                <a-tag color="blue">请上传视频封面</a-tag>
              </div>
              <a-upload
                action="http://172.31.214.104/khmsrv/api/resources"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="imgHandleChange"
              >
                <div v-if="fileList.length < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传视频封面</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
          </a-form-item>
          <a-form-item
            :labelCol="{md: {span: 2}, sm: {span: 2}}"
            :wrapperCol="{md: {span: 6}, sm: {span: 6} }"
            label="发送人群"
            has-feedback
          >
            <a-select default-value="1">
              <a-select-option value="1">全部推送</a-select-option>
              <a-select-option value="2">按条件推送</a-select-option>
            </a-select>
          </a-form-item>
          <div class="from-option">
            <a-button type="primary" html-type="submit">提交</a-button>
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
  display: flex;
  // justify-content: center;

  .video-push {
    width: 80%;
    display: block;
    padding: 20px;
    /* height: calc(100vh - 350px); */
  }

  .video-upload {
    width: 100%;
    padding: 0px 0px;
    display: flex;
    .clearfix {
      flex: 1;
    }
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
}
</style>
