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
          <div v-for="item in videoList" :key="item.videoId">
            <VideoItem :videoItem="item" @toEdit="handleEdit(item)" @toDelete="handleDelete(item)"></VideoItem>
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
import { VideoItem, Empty, PageTitle } from '@/components'

export default {
  name: 'AllVideos',
  components: { Empty, PageTitle, VideoItem },
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.query.page) {
        vm.current = vm.$route.query.page
      } vm.fetch()
    })
  },
  mounted () {
    if (this.$route.query.page) {
      this.current = this.$route.query.page
    } this.fetch()
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
      })
    },
    handleEdit (item) {
      // 点击行进入edit页
      this.$router.push({
        path: '/intervenemanager/videos/videoedit',
        query: {
          videoId: item.videoId,
          data: item,
          page: this.current
        }
      })
    },
    handleDelete (item) {
      axios({
        url: `/api/admin/videos/${item.videoId}`,
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
    }
  }
}
</script>

<style lang="less" scoped>
.videoPpage {
  width: 100%;
  min-height: calc(100vh - 280px);

  .videos-pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 0.6rem;
    height: 32px;
  }
  .videos-pagination-bottom {
    display: flex;
    justify-content: center;
    margin-top: 0.6rem;
  }
  .all-videos {
    position: relative;
    min-height: 550px;
    .spin {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .data-loading {
      .video-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
      }
      .no-videdos {
        width: 100%;
        height: calc(657px - 32px);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
