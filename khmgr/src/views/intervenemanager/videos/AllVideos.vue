<template>
  <div class="videoPpage">
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
    <div class="videos-pagination">
      <div class="pagination" v-if="showPagination">
        <a-pagination
          @change="handlePageChange"
          v-model="current"
          :pageSize="pageSize"
          :total="totalCount"
        />
      </div>
    </div>
    <div class="all-videos">
      <div class="no-videdos" v-if="NoVideoList">
        <div class="null-icon">
          <div class="null-svg"></div>
          <div class="null-txt">还没有上传过视频&nbsp;yo&nbsp;！</div>
        </div>
      </div>
      <div class="video-container" v-else>
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
                <a-tag color="red">{{ video.createOn }}</a-tag>
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
    </div>
    <div class="videos-pagination-bottom" v-if="showPagination">
      <div class="pagination">
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
import { axios } from '@/utils/request'
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
      pageSize: 4
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
  computed: {
    showPagination () {
      return this.pageSize < this.totalCount
    }
  },
  methods: {
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      axios({
        url: `/api/admin/videos/?pageSize=${this.pageSize}&pageNum=${this.current}`,
        // url: '/api/admin/videos',
        method: 'get'
      }).then(res => {
        console.log('video', res)
        if (res.list.length === 0) {
          this.NoVideoList = true
          this.videoList = []
          this.totalCount = null
        } else {
          this.NoVideoList = false
          this.videoList = res.list
          this.totalCount = res.total
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
      return axios({
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
              if (res === '') {
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
.videoPpage {
  width: 100%;
  min-height: calc(100vh - 280px);
  .videos-pagination {
    // bottom: 0;
    display: flex;
    justify-content: flex-start;
    margin-top: 0.6rem;
    height: 32px;
  }
  .videos-pagination-bottom {
    // bottom: 0;
    display: flex;
    justify-content: center;
    margin-top: 0.6rem;
  }
  .video-page-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .page-top {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      text-align: center;
      line-height: 34px;
      padding: 0 24px;
      border: 1px solid #d9d9d9;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      color: #2f54eb;
      background: #f0f5ff;
      border-color: #adc6ff;
    }
  }
  .all-videos {
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
            border: 1px solid #d9d9d9;
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
    .no-videdos {
      width: 100%;
      height: calc(100vh - 450px);
      display: flex;
      justify-content: center;
      align-items: center;
      .null-icon {
        .null-svg {
          width: 220px;
          height: 260px;
          background-image: url('https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg');
          background-position: center center;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          background-size: contain;
        }
        .null-txt {
          font-size: 20px;
          color: rgba(0, 0, 0, 0.85);
          text-align: center;
          margin-top: 40px;
        }
      }
    }
  }
}
</style>
