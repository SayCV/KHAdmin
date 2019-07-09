<template>
  <div>
    <div class="video-page-top">
      <div class="page-top">{{ $route.meta.title }}</div>
      <div class="video-operation">
        <a-button-group>
          <a-button @click="handleRefresh">刷新</a-button>
          <a-button type="primary" @click="handleToAddVideo">
            <a-icon type="plus" />添加视频
          </a-button>
        </a-button-group>
      </div>
    </div>
    <div id="all-videos">
      <div class="no-videdos" v-if="NoVideoList">
        <div class="null-svg"></div>
        <div class="null-txt">
          <h2>还没有上传过视频yo</h2>
        </div>
      </div>
      <div class="video-container" v-else>
        <!-- <div class="video-item" v-for="(video, index) in videoList" :key="video.videoId">
          <div class="video-inner" @mouseover="showIndex = index" @mouseleave="showIndex = null">
            <div class="video-item-v">
              <div class="video-cover" :style="{ backgroundImage:'url(' + video.imageUrl + ')' }">
                <div class="duration">{{ "02:23" }}</div>
              </div>
            </div>
            <div class="video-item-txt">
              <div class="item-txt-header">
                <div class="item-txt-title">{{ video.title }}</div>
              </div>
              <div
                class="item-txt-content"
                :class="{'hoverColor':showIndex===index}"
              >{{ video.summary }}</div>
              <div class="item-operation" v-show="showIndex === index">
                <div>
                  <a-button-group>
                    <a-button size="small">查看</a-button>
                    <a-button size="small" type="primary">删除</a-button>
                  </a-button-group>
                </div>
              </div>
            </div>
          </div>
        </div>-->
        <div class="video-item" v-for="(video) in videoList" :key="video.videoId">
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
                <a-tag color="red">{{ video.videoId }}</a-tag>
                <div>{{ video.title }}</div>
              </div>
              <div class="meta-operation">
                <a-button-group>
                  <a-button>编辑</a-button>
                  <a-button type="danger" @click="() => deleteConfirm(video.videoId)">删除</a-button>
                </a-button-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="videos-footer">
        <a-pagination
          @change="handlePageChange"
          v-model="current"
          :pageSize="pageSize"
          :total="totalCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'AllVideos',
  data () {
    return {
      showIndex: null,
      active: false,
      NoVideoList: false,
      videoList: [],
      totalCount: null,
      current: 1,
      pageSize: 8
    }
  },
  mounted () {
    this.fetch()
  },
  watch: {
    '$route.path': function (to, from) {
      if (to === '/intervenemanager/videos/allvideos') {
        console.log('再次进入全部视频页')
        // 切换页面时滚动条自动滚动到顶部
        console.log('置顶')
        window.scrollTo(0, 0)
        this.fetch()
      }
    }
  },
  methods: {
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      Axios({
        // url: `/api/intervene/videos/?pageSize=${this.pageSize}&currentPage=${this.current}`,
        url: '/api/admin/videos',
        method: 'get'
      }).then(res => {
        console.log('video', res)

        if (res.data.length === 0) {
          this.NoVideoList = true
          this.videoList = []
        } else {
          this.NoVideoList = false
          this.videoList = res.data
        }
      })
    },
    handlePageChange (pagination) {
      console.log('pagination', pagination)
      const pager = {
        ...this.pagination
      }
      console.log('pager', pager)
      pager.current = pagination
      this.current = pager.current
      this.fetch({
        results: this.pageSize,
        page: pagination
      })
    },
    handleToAddVideo () {
      // 点击行进入add页
      this.$router.push({
        path: '/intervenemanager/videos/videopush'
      })
    },
    mouseOver (index) {
      this.active = !this.active
    },
    handleRefresh () {
      // 手动刷新数据
      this.fetch()
    },
    handleDelete (videoId) {
      return Axios({
        url: `/api/admin/videos/${videoId}`,
        method: 'delete'
      })
    },
    deleteConfirm (videoId) {
      const that = this
      this.$confirm({
        title: `你确定想要删除这条视频吗? videoId:${videoId}`,
        content: '当你点击确定按钮时，就会删除选中的这条视频',
        okType: 'danger',
        onOk () {
          // 异步请求
          that.handleDelete(videoId)
            .then(res => {
              console.log('delete', res)
              if (res.status === 204) {
                // refresh data
                that.fetch()
              }
            })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
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

.video-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  .video-item {
    width: 940px;
    margin: 0 auto;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
    margin-bottom: 10px;
  }
  .video-item:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }
  .video-inner {
    display: flex;
    padding: 20px;
    .video-cover {
      // flex: 1;
      width: 160px;
      height: 100px;
      .cover {
        width: 160px;
        height: 100px;
        background-size: cover;
        background-position: center center;
        border-radius: 4px;
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
          font-size: 18px;
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
      }
    }
  }
}

.videos-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.6rem;
}
.no-videdos {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .null-svg {
    width: 100%;
    height: 360px;
    margin-top: 5rem;
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    .null-txt {
      text-align: center;
      margin-top: 2rem;
    }
  }
}
</style>
