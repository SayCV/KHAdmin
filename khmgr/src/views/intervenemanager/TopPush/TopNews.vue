<template>
  <a-card :bordered="false">
    <div class="newsPage">
      <PageTitle
        @toRefresh="fetch"
        name="添加头条"
        linkTo="/intervenemanager/TopPush/add"
        :isLoading="refresh"
      ></PageTitle>

      <div class="spin" v-if="refresh">
        <a-spin></a-spin>
      </div>
      <div class="data-loading" v-else>
        <div class="news-pagination" v-if="showPagination">
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
          <div class="no-newsLists" v-if="NotopLists">
            <Empty></Empty>
          </div>
          <div class="news-main" v-else>
            <div v-for="Item in topLists" :key="Item.newsId">
              <TopItem
                ref="top"
                :topItem="Item"
                @update-topList="fetch()"
                @toEdit="handleEdit"
                @toDelete="handleDelete"
              ></TopItem>
            </div>
          </div>
        </div>
        <div class="news-pagination-bottom" v-if="showPagination">
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
import TopItem from '@/components/News/TopItem'
import Empty from '@/components/Empty/Empty'
import PageTitle from '@/components/PageHeader/PageTitle'

import { axios } from '@/utils/request'

export default {
  name: 'TopNews',
  components: { TopItem, Empty, PageTitle },
  data () {
    return {
      refresh: false,
      NotopLists: false,
      topLists: [],
      totalCount: 0,
      current: 1,
      pageSize: 4
    }
  },
  updated () {
    // 切换页面时滚动条自动滚动到顶部
    console.log('置顶')
    window.scrollTo(0, 0)
  },
  mounted () {
    if (this.$route.query.page) {
      this.current = this.$route.query.page
    } this.fetch()
  },
  watch: {
    '$route.path': function (to, from) {
      if (to === '/intervenemanager/TopPush/list') {
        console.log(' 进入头条列表页面')
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
      console.log('yahaha')
      this.refresh = true
      axios({
        url: `/api/admin/news/top/?pageSize=${this.pageSize}&pageNum=${this.current}`,
        // url: '/api/admin/news/top', // 后台数据
        method: 'get',
        params: {
          ...params
        }
      }).then(res => {
        console.log('获取头条列表', res)
        // 后台数据
        if (res.total === 0) {
          this.NotopLists = true
          this.topLists = []
          this.totalCount = 0
        } else {
          this.NotopLists = false
          this.topLists = res.list
          this.totalCount = res.total
        }
        this.refresh = false
      }).catch(err => {
        if (err) {
          this.NotopLists = true
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
    handleEdit (newsId) {
      // 点击行进入edit页
      this.$router.push({
        path: '/intervenemanager/TopPush/edit',
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
@import '../newslist.less';
</style>
