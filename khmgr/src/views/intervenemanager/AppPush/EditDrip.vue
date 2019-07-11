<template>
  <a-card :bordered="true">
    <div class="create-container">
      <div class="create-top">
        <a-button type="primary" @click="() => handleBack()">
          <a-icon type="left" />返回
        </a-button>
      </div>
      <div class="create-main">
        <a-form :form="form" @submit="handleSubmit">
          <div class="main-basic">
            <a-form-item label="标题" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="[ 'title', {rules: [{ required: true, message: '请填写点滴标题!' }],initialValue: data.title} ]"
              />
            </a-form-item>
            <a-form-item label="摘要" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
              <a-textarea
                rows="4"
                v-decorator="[
                  'summary',
                  {rules: [{ required: true, message: '请填写点滴摘要!' }],initialValue: data.summary}
                ]"
              />
            </a-form-item>
            <a-form-item label="作者" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="[
                  'author',
                  {rules: [{ required: true, message: 'Please input your author!' }], initialValue: data.author }
                ]"
              />
            </a-form-item>
            <a-form-item label="封面" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
              <div class="clearfix">
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
          </div>
          <div class="main-content">
            <a-form-item>
              <div id="main" ref="myEditor">
                <mavon-editor ref="md" v-model="editorContent" @imgAdd="$imgAdd" />
              </div>
            </a-form-item>
          </div>
          <!-- fixed footer toolbar -->
          <footer-tool-bar>
            <div>
              <a-button type="primary" html-type="submit">提交</a-button>
              <a-modal
                :title="ModalTitle"
                :visible="visible"
                @ok="handleOk"
                :confirmLoading="confirmLoading"
                @cancel="handleCancel"
              >
                <div class="model-content">
                  <div class="title">{{ ModalText.title }}</div>
                  <div class="desc">
                    <a-tag class="author" color="blue">{{ ModalText.author }}</a-tag>
                    <span class="time">{{ moment().format('YYYY-MM-DD hh:mm') }}</span>
                  </div>
                  <div class="content">
                    <div v-html="previewMdHtml"></div>
                  </div>
                </div>
              </a-modal>
            </div>
          </footer-tool-bar>
        </a-form>
      </div>
    </div>
  </a-card>
</template>

<script>
import { axios } from '@/utils/request'
import moment from 'moment'
import Mdjs from 'md-js'
import FooterToolBar from '@/components/FooterToolbar'
export default {
  name: 'EditDrip',
  components: { FooterToolBar },
  data () {
    return {
      newsId: this.$route.query.newsId, // 新闻id
      data: {}, // 进入编辑页面填充表单的数据
      previewMdHtml: null, // 预览markdown的语法生成的html
      ModalTitle: null, // 预览标题
      ModalText: {}, // 预览内容
      visible: false, // 预览model是否可见
      confirmLoading: false, // 预览model的确认loading
      editorContent: '', // markdown编辑器的正文
      form: this.$form.createForm(this),
      previewVisible: false, // 是否预览的布尔值
      previewImage: '', // 预览封面
      fileList: [], // 上传封面的json数组
      toPostForm: {}, // 最终需要提交的表单
      cover: null // 封面的全局变量
    }
  },
  watch: {
    '$route.path' (to, from) {
      if (to === '/intervenemanager/AppPush/edit') {
        console.log('进入新闻编辑页面', to)
        this.newsId = this.$route.query.newsId
        // this.data = this.$route.query.data
        this.getFormData(this.newsId)
      }
    }
  },
  mounted () {
    this.getFormData(this.newsId)
  },
  methods: {
    moment,
    handleBack () {
      // 返回PushList页面
      this.$router.push({
        path: '/intervenemanager/AppPush/list'
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.editorContent === '') {
            this.$message.warning('MarkDown文本编辑器内容不能为空！')
          } else {
            // 追加表单字段
            this.appendForm(values)
            // 弹出model层，等待进一步操作
            this.showModal()
          }
        }
      })
    },
    appendForm (values) {
      if (this.fileList[0].name === 'default') {
        // 判断是否修改了默认填充的封面
        this.cover = null
        this.cover = this.fileList[0].url
      } else {
        this.cover = null
        this.cover = `http://172.31.214.104/khmsrv/api/resources/${this.fileList[0].response}`
      }
      // $set给post的表单json数据追加字段
      this.$set(values, 'content', this.editorContent)
      this.$set(values, 'cover', this.cover)
      // 点滴内容恒为isTop===false
      this.$set(values, 'isTop', false)
      this.toPostForm = values
      console.log('函数：追加表单字段: ', this.toPostForm)
    },
    getFormData (newsId) {
      // 进入新闻详情页面时表单填入数据
      axios({
        url: `/api/admin/news/${newsId}`,
        method: 'get'
      }).then(res => {
        console.log('进入点滴详情页面时表单数据', res)
        this.data = res
        this.initFileList(this.data)
        this.editorContent = res.content
      })
    },
    initFileList (data) {
      // 设置默认封面
      this.fileList = [{
        uid: '-1',
        name: 'default',
        status: 'done',
        url: data.cover
      }]
    },
    formPost (formData, newsId) {
      // put 编辑
      axios({
        url: `/api/admin/news/${newsId}`,
        // url: '/api/admin/news',
        method: 'put',
        data: formData,
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        console.log('修改后提交表单', res)
        if (res) {
          // 跳转到新闻详情页面
          this.$router.push({
            path: '/intervenemanager/AppPush/list'
            // query: { newsId: res.data.value }
          })
        } else {
          this.$notification['error']({
            message: '注意！注意！',
            description: '修改点滴失败.'
          })
        }
      })
    },
    showModal () {
      this.visible = true
      this.ModalTitle = '点滴预览'
      this.ModalText = this.toPostForm
      this.previewMdHtml = Mdjs.md2html(this.ModalText.content)
    },
    handleOk () {
      this.confirmLoading = true
      setTimeout(() => {
        this.formPost(this.toPostForm, this.newsId)
        this.visible = false
        this.confirmLoading = false
      }, 500)
    },
    handleCancel (e) {
      this.visible = false
      this.previewVisible = false
    },
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 将图片上传到服务器
      const formData = new FormData()
      formData.append('image', $file)
      axios({
        url: '/api/resources',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(url => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        const mdImgUrl = `http://172.31.214.104/khmsrv/api/resources/${url}`
        this.$refs.md.$img2Url(pos, mdImgUrl)
      })
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    imgHandleChange ({ fileList }) {
      this.fileList = fileList
    }
  }
}
</script>

<style lang="less" scoped>
@import './createedit';
</style>
