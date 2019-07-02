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
    <div class="videos-paid">
      <a-carousel
        arrows
        fade
        autoplay
      >
        <div
          slot="prevArrow"
          slot-scope=""
          class="custom-slick-arrow"
          style="left: 10px;zIndex: 1;"
        >
          <a-icon type="left-circle" />
        </div>
        <div
          slot="nextArrow"
          slot-scope=""
          class="custom-slick-arrow"
          style="right: 10px;"
        >
          <a-icon type="right-circle" />
        </div>
        <div
          class="slide-item"
          v-for="slide in videoUseds"
          :key="slide.key"
        >
          <div
            class="slide-content"
            :style="{ backgroundImage:'url(' + slide.cover + ')' }"
          >
            <div class="slide-content-txt">{{ slide.title }}</div>
            <div class="slide-content-duration">{{ slide.totalTime }}</div>
          </div>

        </div>
      </a-carousel>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HDVideoOnPaid',
  data () {
    return {
      NoVideoList: false,
      videoUseds: []
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      axios({
        url: '/api/intervene/videoused/',
        method: 'get'
      }).then(res => {
        console.log('video', res)
        if (res.data.result.videos.length === 0) {
          this.NoVideoList = true
          this.videoUseds = []
        } else {
          this.NoVideoList = false
          this.videoUseds = res.data.result.videos
        }
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
.videos-paid {
  width: calc(100vw - 600px);
  overflow: hidden;
}
.ant-carousel {
  width: 100%;
  height: calc(100vh - 400px);
  overflow: hidden;
  border-radius: 3px;
  overflow: hidden;
}
.ant-carousel >>> .slide-item {
  width: 100%;
  height: calc(100vh - 400px);
  overflow: hidden;
}
.slide-content {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slide-content .slide-content-txt {
  position: absolute;
  top: 80px;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 40px;
  font-size: 22px;
  border-radius: 10px;
  z-index: 1;
}
.slide-content .slide-content-duration {
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  padding: 3px 5px;
  border-radius: 4px;
}
.ant-carousel >>> .custom-slick-arrow {
  width: 40px;
  height: 40px;
  font-size: 40px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  border-radius: 40%;
  opacity: 0.6;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.8;
}

@media screen and (max-width: 1200px) {
  /* 页面小于1200px */
  .videos-paid {
    width: calc(100vw - 300px);
    overflow: hidden;
  }
}
@media screen and (max-width: 576px) {
  /* 页面小于576px */
  .videos-paid {
    width: calc(100vw - 100px);
    overflow: hidden;
  }
  .slide-content .slide-content-txt {
    position: absolute;
    top: 40px;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 30px;
    font-size: 16px;
    border-radius: 10px;
    z-index: 1;
  }
}
</style>
