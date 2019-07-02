<template>
  <div>
    <div
      class="no-videdos"
      v-if="NoVideoList"
    >
      <div class="null-svg"></div>
      <div class="null-txt">
        <h2>还没有上传过视频yo</h2>
      </div>
    </div>
    <div
      id="all-videos"
      v-else
    >
      <div class="video-container">
        <div
          class="video-item"
          v-for="video in videoList"
          :key="video.key"
        >
          <div class="video-inner">
            <div class="video-item-v">
              <div
                class="video-cover"
                :style="{ backgroundImage:'url(' + video.cover + ')' }"
              >
                <div class="duration">{{ video.totalTime }}</div>
              </div>
            </div>
            <div class="video-item-txt">
              <div class="item-txt-header">
                <div class="item-txt-title">
                  <p>{{ video.title }}</p>
                </div>
                <div class="item-txt-date">
                  <a-tag color="blue">{{ video.createdTime }}</a-tag>
                </div>
              </div>
              <div class="item-txt-content">
                <p>{{ video.content }}</p>
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
import axios from 'axios'
export default {
  name: 'AllVideos',
  data () {
    return {
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
  methods: {
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      axios({
        // url: `/api/intervene/videos/?pageSize=${this.pageSize}&currentPage=${this.current}`,
        url: '/api/intervene/videos/',
        method: 'get',
        params: {
          results: 8,
          ...params
        }
      }).then(res => {
        console.log('video', res)
        // 总页数
        this.totalCount = res.data.result.totalCount

        if (res.data.result.videos.length === 0) {
          this.NoVideoList = true
          this.videoList = []
        } else {
          this.NoVideoList = false
          this.videoList = res.data.result.videos
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
    }
  }
}
</script>

<style scoped>
.no-videdos {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.no-videdos .null-svg {
  width: 100%;
  height: 360px;
  margin-top: 5rem;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
}
.no-videdos .null-txt {
  text-align: center;
  margin-top: 2rem;
}
.video-container {
  display: flex;
  flex-wrap: wrap;
}
.video-item {
  width: 25%;
  padding: 5px;
}
.video-item .video-inner {
  /* height: 300px; */
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
}
.video-item .video-inner:hover {
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}
.video-item-v {
  width: 100%;
  padding: 10px;
}
.video-item-v .video-cover {
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center center;
  position: relative;
}
.video-cover .duration {
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  padding: 3px 5px;
  border-radius: 4px;
}
.item-txt-header {
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.item-txt-title {
  width: 72.5%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-txt-title p {
  color: rgba(0, 0, 0, 0.75);
  margin: 0;
}
.ant-tag {
  margin: 0;
}
.item-txt-content {
  padding: 10px;
}
.videos-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.6rem;
}
</style>
