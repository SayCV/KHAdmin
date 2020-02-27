<template>
  <a-card
    title="健康点滴"
    :bordered="false"
  >
    <template v-slot:extra>
      <a-button-group>
        <a-button @click="() => fetch()">刷新</a-button>
        <a-button
          type="primary"
          @click="() => $router.push({name:'CreateBit'})"
        >
          <a-icon type="plus" />
          发布点滴
        </a-button>
      </a-button-group>
    </template>
    <div
      class="news-pagination"
      v-if="showPagination"
    >
      <div class="pagination">
        <a-pagination
          @change="handlePageChange"
          v-model="current"
          :pageSize="pageSize"
          :total="totalCount"
        />
      </div>
    </div>
    <div class="news-container">
      <div
        class="spin"
        v-if="loading"
      >
        <a-spin></a-spin>
      </div>
      <div
        class="data"
        v-else
      >
        <Empty v-if="totalCount === 0"></Empty>
        <div
          class="news-main"
          v-else
        >
          <div
            v-for="Item in dripLists"
            :key="Item.newsId"
          >
            <DripItem
              :dripItem="Item"
              @toEdit="handleEdit"
              @toDelete="handleDelete"
            ></DripItem>
          </div>
        </div>
      </div>
    </div>
    <div
      class="news-pagination-bottom"
      v-if="showPagination"
    >
      <div class="pagination">
        <a-pagination
          @change="handlePageChange"
          v-model="current"
          :pageSize="pageSize"
          :total="totalCount"
        />
      </div>
    </div>
  </a-card>
</template>

<script>
import { DripItem, Empty } from '@/components'
import { getHealthBitList } from '@/api/interventionManager/healthBit'
import { axios } from '@/utils/request'

export default {
  name: 'HealthBits',
  components: { DripItem, Empty },
  data () {
    return {
      loading: false,
      dripLists: [],
      totalCount: 0,
      current: 1,
      pageSize: 1
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.fetch()
    })
  },
  mounted () {
    // if (this.$route.query.page) {
    //   this.current = this.$route.query.page
    // }
    this.fetch()
  },
  computed: {
    showPagination () {
      return this.pageSize < this.totalCount
    }
  },
  methods: {
    fetch () {
      this.loading = true
      getHealthBitList({
        pageNum: this.current,
        pageSize: this.pageSize
      }).then(res => {
        this.loading = false
        if (res.total === 0) {
          this.dripLists = []
          this.totalCount = 0
        }
        this.dripLists = res.list || []
        this.totalCount = res.total || 0
      }).catch(() => {
        this.loading = false
        this.totalCount = 0
      })
    },
    handlePageChange (pagination) {
      console.log('pagination', pagination)
      const pager = {
        ...this.pagination
      }
      pager.current = pagination
      // console.log('pagerCurrent', pager.current)
      // this.current = pager.current
      this.current = pagination
      console.log('pagerCurrent', this.current)
      this.fetch({
        results: this.pageSize,
        page: pagination
      })
    },
    handleEdit (newsId) {
      // 点击行进入edit页
      this.$router.push({
        name: 'EditBit',
        query: {
          newsId: newsId,
          page: this.current
        }
      })
    },
    handleDelete (newsId) {
      axios({
        url: `/api/admin/news/${newsId}`,
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
    }
  }
}
</script>

<style lang="less" scoped>
@import '../newslist.less';
</style>
