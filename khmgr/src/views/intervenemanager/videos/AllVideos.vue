<template>
  <div class="videoPpage">
    <PageTitle
      @toRefresh="fetch"
      name="添加视频"
      linkTo="/intervenemanager/videos/videopush"
      :isLoading="refresh"
    ></PageTitle>
    <div class="videos-pagination" v-if="showPagination">
      <div class="pagination">
        <a-pagination
          @change="handlePageChange"
          v-model="current"
          :pageSize="pageSize"
          :total="totalCount"
        />
      </div>
    </div>
    <div class="all-videos">
      <div class="spin" v-if="refresh">
        <a-spin></a-spin>
      </div>
      <div class="data-loading">
        <div class="no-videdos" v-if="NoVideoList">
          <Empty :image="image"></Empty>
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
                  <a-tag color="blue">{{ video.createOn }}</a-tag>
                  <div>{{ video.title }}</div>
                </div>
                <div class="meta-operation">
                  <div class="operation-desc-txt">
                    发送人群 :
                    <span class="txt">{{ video.pubType ? '条件推送' : '全部推送' }}</span>
                  </div>
                  <a-button-group>
                    <a-button @click="() => handleToEdit(video.videoId, video)">编辑</a-button>
                    <a-button type="danger" @click="() => deleteConfirm(video.videoId)">删除</a-button>
                  </a-button-group>
                </div>
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
import Empty from '@/components/Empty/Empty'

import PageTitle from '@/components/PageHeader/PageTitle'

import { axios } from '@/utils/request'

export default {
  name: 'AllVideos',
  components: { Empty, PageTitle },
  data () {
    return {
      refresh: false,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA2NCA0MSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K',
      NoVideoList: false,
      videoList: [],
      totalCount: null,
      current: 1,
      pageSize: 4
    }
  },
  mounted () {
    if (this.$route.query.page) {
      this.current = this.$route.query.page
    } this.fetch()
  },
  watch: {
    '$route.path': function (to, from) {
      if (to === '/intervenemanager/videos/allvideos') {
        console.log('再次进入全部视频页')
        window.scrollTo(0, 0)
        if (this.$route.query.page) {
          this.current = this.$route.query.page
        } this.fetch()
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
      this.refresh = true
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
          this.pageSize = res.pageSize
        }
        this.refresh = false
      }).catch(err => {
        if (err) {
          this.NoVideoList = true
          this.$notification['error']({
            message: '注意！注意！',
            description: '网络链接中断...'
          })
        }
        this.refresh = false
      }).finally(
        console.log('data loading done')
      )
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

    handleToEdit (videoId, video) {
      // 点击行进入edit页
      this.$router.push({
        path: '/intervenemanager/videos/videoedit',
        query: {
          videoId: videoId,
          data: video,
          page: this.current
        }
      })
    },
    handleRefresh () {
      // 手动刷新数据
      this.btnLoading = true
      this.refresh = true
      console.log('click me!!')
      setTimeout(() => {
        this.fetch()
        this.btnLoading = false
        this.refresh = false
      }, this.delay)
    },
    handleDelete (videoId) {
      axios({
        url: `/api/admin/videos/${videoId}`,
        method: 'delete'
      }).then(res => {
        console.log('删除！！！')
        console.log(this.totalCount)
        const totalPage = Math.ceil((this.totalCount - 1) / this.pageSize) // 总页数
        console.log('总页数', totalPage)
        console.log('计算前当前页', this.current)
        this.current = this.current > totalPage ? totalPage : this.current
        this.current = this.current < 1 ? 1 : this.current
        this.fetch()
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
  .all-videos {
    position: relative;
    min-height: 550px;
    .spin{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .data-loading {
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
      .no-videdos {
        width: 100%;
        height: calc(100vh - 450px);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
