<template>
  <div class="create-container">
    <div class="create-top">
      <ButtonBack></ButtonBack>
    </div>
    <div class="create-main">
      <a-form :form="form" @submit="handleSubmit">
        <div class="main-basic">
          <a-form-item label="标题" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <a-input
              v-decorator="[ 'title', {rules: [{ required: true, message: 'Please input your title!' }]} ]"
            />
          </a-form-item>
          <a-form-item label="摘要" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <a-textarea
              rows="4"
              v-decorator="[
                'summary',
                {rules: [{ required: true, message: '请填写摘要' }]}
              ]"
            />
          </a-form-item>
          <a-form-item label="作者" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <a-input
              v-decorator="[
                'author',
                {rules: [{ required: true, message: 'Please input your author!' }], initialValue: author }
              ]"
            />
          </a-form-item>
          <a-form-item label="封面" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <div class="clearfix">
              <a-upload
                accept="image/*"
                :action="upLoadAddress"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="imgHandleChange"
                :beforeUpload="beforeUpload"
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
            <a-button type="primary" html-type="submit">提 交</a-button>
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
</template>

<script>
import { axios } from '@/utils/request'
import moment from 'moment'
import Mdjs from 'md-js'
import FooterToolBar from '@/components/FooterToolbar'
import { ButtonBack } from '@/components'
import { upLoadAddress } from '@/core/icons' // import 资源上传地址

export default {
  name: 'CreateTop',
  components: { FooterToolBar, ButtonBack },
  data () {
    return {
      upLoadAddress: upLoadAddress,
      previewMdHtml: null,
      ModalTitle: null,
      ModalText: {},
      visible: false,
      confirmLoading: false,
      author: this.$store.getters.nickname,
      editorContent: '',
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: [], // 上传组件的图片
      toPostForm: {},
      cover: null
    }
  },
  watch: {
    '$route.path': function (to, from) {
      if (to === this.$route.path) {
        console.log('再次进入新建新闻页且清空表单')
        this.clearFormData()
      }
    }
  },
  mounted () {

  },
  methods: {
    moment,
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isLt2M
    },
    clearFormData () {
      // 清空表单内容
      this.form.resetFields()
      this.editorContent = ''
      this.fileList = []
    },
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
          // const md = this.$refs.myEditor.querySelector('.auto-textarea-block').textContent
          if (this.editorContent === '') {
            this.$message.warning('MarkDown编辑器内容不能为空！')
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
      // const md = this.$refs.myEditor.querySelector('.auto-textarea-block').textContent
      if (this.fileList[0]) {
        this.cover = this.upLoadAddress + this.fileList[0].response
      } else {
        this.cover = ''
      }
      // $set给post的表单json数据追加字段
      this.$set(values, 'content', this.editorContent)
      this.$set(values, 'cover', this.cover)
      // 点滴内容恒为isTop===false
      this.$set(values, 'isTop', true)
      this.toPostForm = values
      console.log('追加表单字段: ', this.toPostForm)
    },
    formPost (formData) {
      // Post且跳转
      axios({
        url: '/api/admin/news',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        console.log('表单post', res)
        if (res.successed === true) {
          // 跳转到新闻详情页面
          this.$router.push({
            path: '/intervenemanager/TopPush/list'
            // query: { newsId: res.data.value }
          })
        }
      }).catch(err => {
        if (err) {
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
      }, 1000)
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
        console.log('markdown图片', url)
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
// @import './../createedit';
@import '../createedit.less';
</style>
