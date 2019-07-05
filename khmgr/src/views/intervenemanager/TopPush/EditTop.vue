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
            <a-form-item label="标题" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="[ 'title', {rules: [{ required: true, message: 'Please input your title!' }],initialValue: data.title} ]"
              />
            </a-form-item>
            <a-form-item label="摘要" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
              <a-textarea
                rows="4"
                v-decorator="[
                  'summary',
                  {rules: [{ required: true, message: '请填写安装地址' }],initialValue: data.summary}
                ]"
              />
            </a-form-item>
            <a-form-item label="作者" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="[
                  'author',
                  {rules: [{ required: true, message: 'Please input your author!' }], initialValue: data.author }
                ]"
              />
            </a-form-item>
            <a-form-item label="封面" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
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
              <a-button type="primary" :loading="loading" html-type="submit">提交</a-button>
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
import Axios from 'axios'
import moment from 'moment'
import Mdjs from 'md-js'
import FooterToolBar from '@/components/FooterToolbar'
export default {
  name: 'EditTop',
  components: { FooterToolBar },
  data () {
    return {
      newsId: this.$route.query.newsId,
      data: {},
      previewMdHtml: null,
      ModalTitle: null,
      ModalText: {},
      visible: false,
      confirmLoading: false,
      editorContent: '',
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: [], // 上传封面
      loading: false,
      toPostForm: {}
    }
  },
  watch: {
    '$route.path' (to, from) {
      if (to === '/intervenemanager/TopPush/edit') {
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
        path: '/intervenemanager/TopPush/list'
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // this.$refs.目标标签ref的属性值就能找到dom对象
          // const md = this.$refs.md
          const md = this.$refs.myEditor.querySelector('.auto-textarea-block').textContent
          const cover = `http://172.31.214.104/khmsrv/api/resources/${this.fileList[0].response}`

          // $set给post的表单json数据追加字段
          this.$set(values, 'content', md)
          this.$set(values, 'cover', cover)
          // 点滴内容恒为isTop===false
          this.$set(values, 'isTop', true)
          this.toPostForm = values
          console.log('追加 values of form: ', this.toPostForm)

          if (md === ' ') {
            this.$message.warning('MarkDown文本编辑器内容不能为空！')
          } else {
            // post form
            // this.formSubmit(this.toPostForm)
            this.showModal()
          }
        }
      })
    },
    getFormData (newsId) {
      Axios({
        url: `/api/admin/news/${newsId}`,
        method: 'get'
      }).then(res => {
        console.log('新闻详情', res)
        this.data = res.data
        // this.initFileList(this.data)
        this.fileList = [{
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'http://172.31.214.104/khmsrv/api/resources/282967f73b0f40e19808ef6644b38eb0'
        }]
        console.log('defaultFileList', this.fileList)
      })
    },
    initFileList (data) {
      console.log('defaultFileList', this.defaultFileList)
      this.defaultFileList = [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://172.31.214.104/khmsrv/api/resources/282967f73b0f40e19808ef6644b38eb0'
      }]
    },
    formPost (formData, newsId) {
      // put 编辑
      Axios({
        url: `/api/admin/news/${newsId}`,
        // url: '/api/admin/news',
        method: 'put',
        data: formData,
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        console.log('修改后提交表单', res.data)
        if (res.data.successed === true) {
          // 跳转到新闻详情页面
          this.$router.push({
            path: '/intervenemanager/TopPush/list'
            // query: { newsId: res.data.value }
          })
        } else {
          this.$notification['error']({
            message: '注意！注意！',
            description: '发表新闻失败.'
          })
        }
      })
    },
    showModal () {
      this.visible = true
      this.ModalTitle = '头条预览'
      this.ModalText = this.toPostForm
      this.previewMdHtml = Mdjs.md2html(this.ModalText.content)
    },
    handleOk () {
      this.confirmLoading = true
      setTimeout(() => {
        this.formPost(this.toPostForm)
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
      Axios({
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
        const mdImgUrl = `http://172.31.214.104/khmsrv/api/resources/${url.data}`
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
