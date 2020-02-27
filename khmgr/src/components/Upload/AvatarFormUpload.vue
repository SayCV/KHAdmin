<template>
  <div class="clearfix">
    <a-upload
      :action="upLoadAddress"
      listType="picture-card"
      :fileList="fileListByCompute"
      @preview="handlePreview"
      @change="handleChange"
      :beforeUpload="beforeUpload"
    >
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传头像</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
// https://www.mocky.io/v2/5cc8019d300000980a055e76
import { upLoadAddress } from '@/api/common'
export default {
  name: 'AvatarFormUpload',
  props: {
    avatarFileList: {
      type: Array,
      default: () => { return [] },
      required: false
    }
  },
  data () {
    return {
      upLoadAddress,
      previewVisible: false,
      previewImage: '',
      fileList: this.avatarFileList,
      noFIleList: []
    }
  },
  computed: {
    fileListByCompute () {
      if (!Array.isArray(this.fileList)) return []
      if (this.fileList === [] || this.fileList === null) return this.noFIleList
      return this.fileList
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList, file }) {
      this.fileList = fileList
      const base64Url = file.thumbUrl
      const img = {
        ...file, base64Url
      }
      this.$emit('avatarFile', img)
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('Image must smaller than 1MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
