<template>
  <a-card
    :bordered="false"
    :bodyStyle="{ padding: '8px 8px 24px 8px', height: '100%' }"
    :style="{ height: '100%' }"
  >
    <div class="adsPage">
      <div class="spin" v-if="refresh">
        <a-spin></a-spin>
      </div>
      <div class="data-loading" v-else>
        <div class="ads-page-top">
          <div class="page-top">
            <div class="pagination" v-if="showPagination">
              <a-pagination
                @change="handlePageChange"
                v-model="current"
                :pageSize="pageSize"
                :total="totalCount"
              />
            </div>
          </div>
          <div class="page-operation">
            <ButtonRefresh
              @toRefresh="fetch"
              name="投放广告"
              linkTo="/business/BarAD/addAD"
              :isLoading="refresh"
            ></ButtonRefresh>
          </div>
        </div>
        <div class="ads-page-content">
          <div class="no-ads" v-if="NoadList">
            <Empty :description="noAdDescription"></Empty>
          </div>
          <div class="ad-container" v-else>
            <div v-for="item in adList" :key="item.adId">
              <AdItem :adItem="item" @toEdit="handleEdit(item)" @toDelete="handleDelete"></AdItem>
            </div>
            <!-- <div class="ad-item" v-for="(ad) in adList" :key="ad.adId">
            <div class="ad-inner">
              <div class="ad-cover">
                <div class="cover" :style="{ backgroundImage:'url(' + ad.imageUrl + ')' }"></div>
              </div>
              <div class="ad-meta">
                <div class="meta-title">
                  <a-tag color="blue">{{ ad.createOn.substring(0,16) }}</a-tag>
                  <div class="title-text">{{ ad.title }}</div>
                </div>
                <div class="meta-url">{{ ad.adUrl }}</div>
                <div class="meta-date">
                  <div class="ad-date">
                    <div class="date-label">起止时间&nbsp;:&nbsp;</div>
                    <div class="start-end-date">
                      <a-tag>{{ moment(`${ad.beginDate}`).format(dateFormat) }}</a-tag>
                      <span>~ &nbsp;</span>
                      <a-tag>{{ moment(`${ad.endDate}`).format(dateFormat) }}</a-tag>
                    </div>
                  </div>
                </div>
                <div class="meta-operation">
                  <div class="meta-contact">
                    <div class="contact-label">
                      联系人&nbsp;:&nbsp;
                      <div class="name">{{ ad.contact }}</div>
                    </div>
                    <div class="contact">
                      电话&nbsp;:&nbsp;
                      <div class="phone">{{ ad.phone }}</div>
                    </div>
                  </div>
                  <a-button-group>
                    <a-button @click="() => handleToEditAD(ad.adId)">编辑</a-button>
                    <a-button type="danger" @click="() => deleteConfirm(ad.adId)">删除</a-button>
                  </a-button-group>
                </div>
              </div>
            </div>
            </div>-->
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
    </div>
  </a-card>
</template>

<script>
import moment from 'moment'
import { axios } from '@/utils/request'
import AdItem from '@/components/AdItems/AdItem'
import Empty from '@/components/Empty/Empty'
import ButtonRefresh from '@/components/Button/ButtonRefresh'

export default {
  name: 'UsedAD',
  components: { AdItem, Empty, ButtonRefresh },
  data () {
    return {
      refresh: false,
      noAdDescription: '暂无广告',
      dateFormat: 'YYYY-MM-DD',
      NoadList: false,
      adList: [],
      totalCount: 0,
      current: 1,
      pageSize: 4
    }
  },

  watch: {
    '$route.path': function (to, from) {
      if (to === '/business/BarAD/allAD/usedAD') {
        console.log('再次进入已使用广告列表页')
        window.scrollTo(0, 0)
        if (this.$route.query.page) {
          this.current = this.$route.query.page
        } this.fetch()
      }
    }
  },
  computed: {
    showPagination () {
      console.log('计算分页是否显示', this.pageSize < this.totalCount)
      return this.pageSize < this.totalCount
    }
  },
  mounted () {
    if (this.$route.query.page) {
      this.current = this.$route.query.page
    } this.fetch()
    console.log('current', this.current)
  },
  methods: {
    moment,
    fetch (params = {}) {
      this.refresh = true
      axios({
        url: `/api/admin/ad/used/?pageSize=${this.pageSize}&pageNum=${this.current}`,
        method: 'get',
        params: {
          ...params
        }
      }).then(res => {
        console.log('广告列表', res)
        if (res.total === 0) {
          this.NoadList = true
          this.adList = []
          this.totalCount = 0
        } else {
          this.NoadList = false
          this.adList = res.list
          this.totalCount = res.total
        }
        this.refresh = false
      }).catch(err => {
        if (err) {
          this.NoadList = true
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

    handleToAddAD () {
      // 点击行进入add页
      this.$router.push({
        path: '/business/BarAD/addAD'
        // name: 'addAD'
      })
    },

    handleEdit (item) {
      // 点击行进入edit页
      this.$router.push({
        path: '/business/BarAD/editAD',
        query: {
          adId: item.adId,
          page: this.current,
          data: item
        }
      })
    },
    handleDelete (adId) {
      axios({
        url: `/api/admin/ad/${adId}`,
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
      }).catch(err => {
        if (err) {
          this.$notification['error']({
            message: '注意！注意！',
            description: '删除广告失败.'
          })
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
  min-height: calc(100vh - 310px);
  position: relative;
  .data-loading {
    .ads-page-top {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .page-top {
        display: flex;
        justify-content: flex-start;
      }
    }
    .ads-pagination-bottom {
      // bottom: 0;
      display: flex;
      justify-content: center;
      margin-top: 0.6rem;
    }
    .ads-page-content {
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
        width: 940px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
      }
    }
  }

  .spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
