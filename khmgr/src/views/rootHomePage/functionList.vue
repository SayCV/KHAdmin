<template>
  <a-drawer
    placement="right"
    :closable="false"
    :visible="visible"
    width="100vw"
    wrapClassName="app-list-wrapper"
    :wrapStyle="{padding:'0px'}"
    :bodyStyle="{padding:'0px'}"
  >
    <div class="app-list-page">
      <div class="top-part">
        <div class="title">
          <a-icon type="appstore" />
          <div class="app-list">应用管理</div>
        </div>
        <a-icon
          type="home"
          class="home-icon"
          @click="() => $emit('onClose')"
        />
      </div>
      <div class="swiper-container">
        <swiper :options="swiperOption">
          <swiper-slide
            v-for="(group, groupIndex) in appGroups"
            :key="groupIndex"
          >
            <div class="slide-item">
              <ul
                v-for="(list, listIndex) in group || []"
                :key="listIndex"
                class="menus-list-ul"
              >
                <div class="list-type">{{ list.typeTitle || '--' }}</div>
                <li
                  v-for="(item, index) in (list.list || [])"
                  :key="index"
                  class="item-list-li"
                  @click="handleClick(item)"
                >

                  <div class="item-title">
                    <a-icon
                      type="appstore"
                      :style="{paddingRight:'8px'}"
                    />{{ item.title ||'--' }}</div>
                </li>
              </ul>
            </div>
          </swiper-slide>
          <div
            class="swiper-pagination swiper-pagination-white"
            slot="pagination"
          ></div>
          <div
            class="swiper-button-prev swiper-button-white"
            slot="button-prev"
          ></div>
          <div
            class="swiper-button-next swiper-button-white"
            slot="button-next"
          ></div>
        </swiper>
      </div>
    </div>
  </a-drawer>

</template>

<script>
import Axios from 'axios'
import _ from 'lodash'
// swiper require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'AppSwiper',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      swiperOption: {
        spaceBetween: 30,
        // effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      appList: []
    }
  },
  computed: {
    appGroups () {
      const appTypeArr = []
      const appSize = 4
      const appList = this.appList
      for (let i = 0, j = appList.length; i < j; i += appSize) {
        appTypeArr.push(_.slice(appList, i, i + appSize))
      }
      console.log(appTypeArr)
      return appTypeArr || []
    }
  },
  mounted () {
    this.mockFetch()
  },
  methods: {
    mockFetch () {
      Axios({
        url: 'http://yapi.sagaii.cn/mock/11/root/functionlist',
        method: 'get'
      }).then(({ data }) => {
        console.log('mock =>', data)
        this.appList = data && data.menus
      })
    },
    handleClick (item) {
      console.log('click', item)
    }
  }
}
</script>

<style lang="less" >
.app-list-wrapper {
  .ant-drawer-body {
    padding: 0 !important;
  }
  .app-list-page {
    background: #30468b;
    padding: 24px;
    .top-part {
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 60px;

      color: #fff;
      font-size: 30px;
      line-height: 30px;
      .title {
        display: flex;
        .anticon {
          margin-right: 16px;
        }
      }
      .home-icon {
        cursor: pointer;
      }
    }
    .swiper-container {
      width: 100%;
      height: calc(100vh - 148px);
      .slide-item {
        padding: 0 60px;
        padding-top: 48px;
        display: flex;
        color: #fff;
        .menus-list-ul {
          // flex: 1;
          flex: 0 0 25%;
          .list-type {
            font-size: 24px;
            margin-bottom: 12px;
            padding-left: 8px;
            &::after {
              content: '';
              margin-top: 4px;
              display: block;
              width: 124px;
              height: 0px;
              border: 1px solid white;
            }
          }
          .item-list-li {
            list-style: none;
            padding: 8px;
            cursor: pointer;
            position: relative;
            transition: all 0.3s;
            border-radius: 4px;
            &:hover {
              background: #26386f;
              transition: all 0.3s;
            }
            &::after {
              content: '';
              width: 0;
              height: 2px;
              background: #fff;
              position: absolute;
              top: 100%;
              left: 50%;
              transition: all 0.3s;
            }
            &:hover::after {
              left: 0%;
              width: 100%;
            }
            .item-title {
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
