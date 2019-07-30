<template>
  <div class="video-item">
    <div class="video-inner">
      <div class="video-cover">
        <div class="cover" :style="{ backgroundImage:'url(' + video.imageUrl + ')' }"></div>
      </div>
      <div class="video-meta">
        <div class="meta-title">
          <div class="title-text">{{ video.title }}</div>
        </div>
        <div class="meta-summary">{{ video.summary }}</div>
        <div class="meta-view">
          <a-tag color="blue">{{ video.createOn }}</a-tag>
          <div>{{ video.title }}</div>
        </div>
        <div class="meta-operation">
          <div class="operation-desc-txt">
            发送人群 :
            <span class="txt">{{ video.pubType ? '条件推送' : '全部推送' }}</span>
          </div>
          <a-button-group>
            <a-button @click="() => handleEdit(video)">编辑</a-button>
            <a-button type="danger" @click="() => showConfirm(video)">删除</a-button>
          </a-button-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VideoItem',
  props: {
    videoItem: {
      type: Object,
      default: () => { }
      // require: true // 必填
    }
  },
  data () {
    return {
      video: this.videoItem
    }
  },
  methods: {
    handleEdit (videoItem) {
      // 点击行进入edit页
      this.$emit('toEdit', videoItem.videoId)
    },

    showConfirm (videoItem) {
      const that = this
      this.$confirm({
        title: `你确定想要删除这条视频吗? videoID:${videoItem.videoId}`,
        content: '当你点击确定按钮时，就会删除选中的这条视频',
        okType: 'danger',
        onOk () {
          // 异步请求
          that.$emit('toDelete', videoItem.videoId)
        },
        onCancel () {
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.video-item {
  width: 940px;
  margin: 0 auto;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  margin-bottom: 10px;
  .video-inner {
    display: flex;
    padding: 12px 18px;
    .video-cover {
      // flex: 1;
      width: 160px;
      height: 100px;
      .cover {
        width: 160px;
        height: 100px;
        background-size: cover;
        background-position: center center;
        border: 1px solid #d9d9d9be;
        overflow: hidden;
      }
      .cover:hover {
        cursor: pointer;
      }
    }
    .video-meta {
      position: relative;
      flex: 1;
      padding-left: 20px;
      .meta-title {
        height: 24px;
        line-height: 24px;
        .title-text {
          display: inline-block;
          max-width: 420px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.85);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: all 0.23s;
        }
        .title-text:hover {
          cursor: pointer;
          color: #4facfe;
          transition: all 0.23s ease;
        }
      }
      .meta-summary {
        max-width: 500px;
        max-height: 53px;
        padding: 12px 0 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .meta-view {
        max-width: 460px;
        display: flex;
      }
      .meta-operation {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        .operation-desc-txt {
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 12.5px;
          .txt {
            color: rgba(0, 0, 0, 0.65);
            margin: 0 1px;
            background: #f2f4f5;
            padding: 2px 7px;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #eee;
          }
        }
      }
    }
  }
}
.video-item:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}
</style>
