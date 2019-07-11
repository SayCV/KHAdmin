<template>
  <a-card>
    <div class="adsPage">
      <div class="ads-page-top">
        <div class="page-top">{{ $route.meta.title }}</div>
        <div class="page-operation">
          <a-button-group>
            <a-button @click="handleRefresh">刷新</a-button>
            <a-button type="primary" @click="handleToAddAD">
              <a-icon type="plus" />投放广告
            </a-button>
          </a-button-group>
        </div>
      </div>
      <div class="ads-pagination">
        <div class="pagination" v-if="showPagination">
          <a-pagination
            @change="handlePageChange"
            v-model="current"
            :pageSize="pageSize"
            :total="totalCount"
          />
        </div>
      </div>
      <div class="ads-page-content">
        <div class="no-ads" v-if="NoadLists">
          <div class="null-icon">
            <div class="null-svg"></div>
            <div class="null-txt">还没有投放过广告&nbsp;yo&nbsp;！</div>
          </div>
        </div>
        <div class="ad-container" v-else>
          <div class="ad-item" v-for="(ad) in adList" :key="ad.adId">
            <div class="ad-inner">
              <div class="ad-cover">
                <div class="cover" :style="{ backgroundImage:'url(' + ad.imageUrl + ')' }"></div>
              </div>
              <div class="ad-meta">
                <div class="meta-title">
                  <a-tag color="red">{{ ad.createOn }}</a-tag>
                  <div class="title-text">{{ ad.title }}</div>
                </div>
                <div class="meta-url">{{ ad.adUrl }}</div>
                <div class="meta-date">
                  <div class="ad-date">
                    <div class="date-label">起止时间&nbsp;:&nbsp;</div>
                    <div class="start-end-date">
                      <a-tag>{{ moment(`${ad.startDate}`).format(dateFormat) }}</a-tag>
                      <span>~ &nbsp;</span>
                      <a-tag>{{ moment(`${ad.endDate}`).format(dateFormat) }}</a-tag>
                    </div>
                  </div>
                </div>
                <div class="meta-operation">
                  <div class="meta-contact">
                    <div class="contact-label">联系人&nbsp;:&nbsp;{{ ad.contact }}</div>
                    <div class="contact">电话&nbsp;:&nbsp;{{ ad.phone }}</div>
                  </div>
                  <a-button-group>
                    <a-button @click="() => handleToEditAD(ad.adId)">编辑</a-button>
                    <a-button type="danger" @click="() => deleteConfirm(ad.adId)">删除</a-button>
                  </a-button-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ads-pagination-bottom" v-if="showPagination">
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
  </a-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'NullAD',
  components: {},
  data () {
    return {
      dateFormat: 'YYYY-MM-DD',
      NoadLists: false,
      adList: [{
        adId: '1',
        imageUrl: 'https://picsum.photos/200/300',
        adUrl: 'https://www.bilibili.com/',
        createOn: '2019-7-10',
        startDate: '2019-7-1',
        endDate: '2019-9-1',
        contact: 'yahaha',
        title: 'bilibili',
        phone: 13372552822
      }, {
        adId: '2',
        imageUrl: 'https://picsum.photos/200/301',
        adUrl: 'https://dxy.com/',
        createOn: '2019-7-10',
        startDate: '2019-7-1',
        endDate: '2019-9-1',
        contact: 'wanghuahau',
        title: '丁香医生',
        phone: 13372552822
      }],
      totalCount: 9,
      current: 1,
      pageSize: 8
    }
  },
  computed: {
    showPagination () {
      return this.pageSize < this.totalCount
    }
  },
  methods: {
    moment,
    handleRefresh () {

    },
    handleToAddAD () {
      // 点击行进入add页
      this.$router.push({
        path: '/business/BarAD/addAD'
        // name: 'addAD'
      })
    },
    handleToEditAD (adId) {
      // 点击行进入edit页
      this.$router.push({
        path: '/business/BarAD/editAD',
        query: {
          adId: adId,
          data: null
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

<style lang="less" scoped>
.adsPage {
  min-height: calc(100vh - 280px);
  .ads-page-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .page-top {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      text-align: center;
      height: 34px;
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
  .ads-pagination {
    // bottom: 0;
    display: flex;
    justify-content: flex-start;
    margin-top: 0.6rem;
    height: 32px;
  }
  .ads-pagination-bottom {
    // bottom: 0;
    display: flex;
    justify-content: center;
    margin-top: 0.6rem;
  }
  .ads-page-content {
    margin-top: 10px;
    .no-ads {
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
    .ad-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      .ad-item {
        width: 940px;
        margin: 0 auto;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all 0.3s;
        margin-bottom: 10px;
      }
      .ad-item:hover {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
      }
      .ad-inner {
        display: flex;
        padding: 20px;
        .ad-cover {
          // flex: 1;
          width: 180px;
          height: 100px;
          .cover {
            width: 180px;
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
        .ad-meta {
          position: relative;
          flex: 1;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .meta-title {
            height: 24px;
            display: flex;
            align-items: center;
            .title-text {
              display: inline-block;
              max-width: 400px;
              font-size: 18px;
              color: rgba(0, 0, 0, 0.85);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              transition: all 0.23s;
            }
          }
          .meta-url {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.75);
            text-decoration: underline;
            max-width: 500px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: all 0.23s;
          }
          .meta-url:hover {
            cursor: pointer;
            color: #4facfe;
            transition: all 0.23s ease;
          }
          .meta-date {
            max-width: 300px;
            margin-bottom: 8px;
            .ad-date {
              display: flex;
              align-items: center;
              .date-label {
                font-size: 15px;
                color: rgba(0, 0, 0, 0.85);
              }
            }
          }
          .meta-operation {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            .meta-contact {
              margin-bottom: 10px;
              .contact-label {
                font-size: 15px;
                color: rgba(0, 0, 0, 0.85);
              }
              .contact {
                font-size: 15px;
                color: rgba(0, 0, 0, 0.85);
              }
            }
          }
        }
      }
    }
  }
}
</style>
