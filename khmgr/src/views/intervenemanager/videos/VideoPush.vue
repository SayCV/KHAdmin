<template>
  <div class="video-container">
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
              name="file"
              :multiple="false"
              :disabled="isDisabled"
              action="http://172.31.214.104/khmsrv/api/resources"
              :videoList="videoList"
              listType="picture"
              @change="handleChange"
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
            :labelCol="{md: {span: 3}, sm: {span: 3}}"
            :wrapperCol="{md: {span: 6}, sm: {span: 6} }"
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
            <a-button type="primary" html-type="submit">提 交</a-button>
          </footer-tool-bar>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
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
      isDisabled: false,
      videoList: [],
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  },
  methods: {
    handleChange (file) {
      this.videoList = file.fileList
      console.log('videoList', this.videoList)
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    imgHandleChange ({ fileList }) {
      this.fileList = fileList
      console.log('cover', fileList)
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
            // this.appendForm(values)
            // eslint-disable-next-line no-console
            this.$set(values, 'imageUrl', `http://172.31.214.104/khmsrv/api/resources/${this.fileList[0].response}`)
            this.$set(values, 'videoUrl', `http://172.31.214.104/khmsrv/api/resources/${this.videoList[0].response}`)
            this.$set(values, 'pubType', this.selected)
            console.log('Received values of form: ', values)
            this.videoFormPost(values)
          }
        }
      })
    },
    videoFormPost (formData) {
      // Post且跳转
      console.log('要提交的表单', formData)
      Axios({
        url: '/api/admin/videos',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        console.log('表单提交了', res)
        if (res.data.successed === true) {

        } else {
          this.$notification['error']({
            message: '注意！注意！',
            description: '发表点滴失败.'
          })
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
    // padding: 20px;
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
}
</style>
