<template>
  <a-card :bordered="false">
    <div class="newsPage">
      <div class="news-page-top">
        <div class="page-top">{{ $route.meta.title }}</div>
        <div class="news-operation">
          <a-button-group>
            <a-button @click="handleRefresh">刷新</a-button>
            <a-button type="primary" @click="handleAdd">
              <a-icon type="plus" />添加头条
            </a-button>
          </a-button-group>
        </div>
      </div>
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
  </a-card>
</template>

<script>
import TopItem from '@/components/News/TopItem'
import Empty from '@/components/Empty/Empty'
import { axios } from '@/utils/request'

export default {
  name: 'TopNews',
  components: { TopItem, Empty },
  data () {
    return {
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
        // this.totalCount = res.data.result.totalCount
        if (res.total === 0) {
          this.NotopLists = true
          this.topLists = []
          this.totalCount = 0
        } else {
          this.NotopLists = false
          this.topLists = res.list
          this.totalCount = res.total
        }
      }).catch(err => {
        if (err) {
          this.NotopLists = true
          this.$notification['error']({
            message: '注意！注意！',
            description: '网络链接中断...'
          })
        }
      })
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
    handleAdd () {
      // 点击行进入add页
      this.$router.push({
        path: '/intervenemanager/TopPush/add'
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
    handleRefresh () {
      // news列表刷新
      this.fetch()
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
.newsPage {
  width: 100%;
  min-height: calc(100vh - 280px);

  .news-page-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .page-top {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      text-align: center;
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
  .news-pagination {
    // bottom: 0;
    display: flex;
    justify-content: flex-start;
    margin-top: 0.6rem;
    height: 32px;
  }
  .news-pagination-bottom {
    // bottom: 0;
    display: flex;
    justify-content: center;
    margin-top: 0.6rem;
  }
  .news-container {
    .no-newsLists {
      width: 100%;
      height: calc(100vh - 450px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .news-main {
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
