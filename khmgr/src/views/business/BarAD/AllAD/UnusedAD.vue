<template>
  <a-card
    :bordered="false"
    :bodyStyle="{ padding: '0px 8px 24px 8px', height: '100%' }"
    :style="{ height: '100%' }"
  >
    <div class="adsPage">
      <div class="data-loading">
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
          <div class="spin" v-if="refresh">
            <a-spin></a-spin>
          </div>
          <div class="data-loading" v-else>
            <div class="no-ads" v-if="NoadList">
              <Empty :description="noAdDescription"></Empty>
            </div>
            <div class="ad-container" v-else>
              <div v-for="item in adList" :key="item.adId">
                <AdItem :adItem="item" @toEdit="handleEdit(item)" @toDelete="handleDelete"></AdItem>
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
  name: 'UnusedAD',
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.query.page) {
        vm.current = vm.$route.query.page
      } vm.fetch()
    })
  },
  // watch: {
  //   '$route.path': function (to, from) {
  //     if (to === '/business/BarAD/allAD/usedAD') {
  //       console.log('再次进入为使用广告列表页')
  //       window.scrollTo(0, 0)
  //       if (this.$route.query.page) {
  //         this.current = this.$route.query.page
  //       } this.fetch()
  //     }
  //   }
  // },
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
        url: `/api/admin/ad/unused/?pageSize=${this.pageSize}&pageNum=${this.current}`,
        method: 'get',
        params: {
          ...params
        }
      }).then(res => {
        console.log('为使用广告列表', res)
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
@import './adslist.less';
</style>
