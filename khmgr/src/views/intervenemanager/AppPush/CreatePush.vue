<template>
  <a-card :bordered="false">
    <div class="create-container">
      <div class="create-top">
        <a-button
          type="primary"
          @click="() => handleBack()"
        >
          <a-icon type="left" />返回
        </a-button>
      </div>
      <div class="create-main">
        <a-form
          :form="form"
          @submit="handleSubmit"
        >
          <div class="main-basic">
            <a-form-item
              label="标题"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-input v-decorator="[ 'title', {rules: [{ required: true, message: 'Please input your title!' }]} ]" />
            </a-form-item>
            <a-form-item
              label="摘要"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-textarea
                rows="4"
                v-decorator="[
                  'summary',
                  {rules: [{ required: true, message: '请填写安装地址' }]}
                ]" />
            </a-form-item>
            <a-form-item
              label="作者"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-input
                v-decorator="[
                  'author',
                  {rules: [{ required: true, message: 'Please input your author!' }], initialValue: author }
                ]" />
            </a-form-item>
            <a-form-item
              label="封面"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }">
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
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img
                    alt="example"
                    style="width: 100%"
                    :src="previewImage"
                  />
                </a-modal>
              </div>
            </a-form-item>
          </div>
          <div class="main-content">
            <a-form-item>
              <div id="main" ref="myEditor">
                <mavon-editor ref="md" v-model="value" @imgAdd="$imgAdd" />
              </div>
            </a-form-item>
          </div>
          <div
            ref="mybtn"
            class="form-submit"
          >
            <a-button>
              保存
            </a-button>
            <a-button
              type="primary"
              html-type="submit"
            >
              Submit
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </a-card>
</template>

<script>
import Axios from 'axios'
export default {
  // name: 'EditPush'
  data () {
    return {
      author: this.$store.getters.nickname,
      value: '',
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: [],
      isLoadedCover: ''
    }
  },
  methods: {
    handleBack () {
      // 清空表单内容
      this.form.resetFields()
      this.value = ''
      this.fileList = []
      // 返回PushList页面
      this.$router.push({
        path: '/intervenemanager/Healthpush/list'
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // this.$refs.目标标签ref的属性值就能找到dom对象
          // const md = this.$refs.md
          const md = this.$refs.myEditor.querySelector('.auto-textarea-block').textContent
          const cover = `http://172.31.214.104/khmsrv/api/resources/${this.isLoadedCover}`

          // $set给post的表单json数据追加字段
          this.$set(values, 'content', md)
          this.$set(values, 'cover', cover)
          // 点滴内容恒为isTop===false
          this.$set(values, 'isTop', false)
          console.log('追加 values of form: ', values)
          // post form
          this.formSubmit()
        }
      })
    },
    formSubmit (formData) {
      Axios({
        url: '/api/admin/news',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        console.log('表单post', res.data)
        if (res.data.successed === true) {
          // 跳转到新闻详情页面
          this.$router.push({
            path: '/intervenemanager/TopPush/edit',
            query: { newsId: res.data.value }
          })
        } else {
          this.$notification['error']({
            message: '注意！注意！',
            description: '发表新闻失败.'
          })
        }
      })
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
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        */
        const mdImgUrl = `http://172.31.214.104/khmsrv/api/resources/${url.data}`
        this.$refs.md.$img2Url(pos, mdImgUrl)
        console.log('Md-imgUrl', mdImgUrl)
      })
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
      this.isLoadedCover = fileList[0].response
      console.log('isLoadedCover', this.isLoadedCover)
      console.log('file', fileList)
    }
  }
}
</script>

<style lang="less" scoped>
.create-container {
  .create-top {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .create-main {
    .main-basic {
      padding-top: 24px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      border-top-left-radius: 0;
      display: block;
      position: relative;
      margin-bottom: 56px;
    }
    .main-basic::before {
      content: '基本内容';
      position: absolute;
      left: -1px;
      top: -36px;
      font-size: 16px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      padding: 0 16px;
      border: 1px solid #d9d9d9;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      color: #2f54eb;
      background: #f0f5ff;
      border-color: #adc6ff;
    }
    .main-content {
      // border: 1px solid #d9d9d9;
      border-radius: 4px;
      border-top-left-radius: 0;
      display: block;
      position: relative;
      // padding: 10px;
      background-color: #d9d9d9a6;
    }
    .main-content::before {
      content: '详细内容';
      position: absolute;
      left: -1px;
      top: -36px;
      font-size: 16px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      padding: 0 16px;
      border: 1px solid #d9d9d9;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      color: #2f54eb;
      background: #f0f5ff;
      border-color: #adc6ff;
    }
    .form-submit {
      display: flex;
      justify-content: center;
      align-items: center;
      & > .ant-btn {
        margin: 5px;
      }
    }
  }
}
</style>
