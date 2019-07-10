<template>
  <a-card :bordered="false">
    <div class="newsPage">
      <div class="news-page-top">
        <div class="page-top">{{ $route.meta.title }}</div>
        <div class="news-operation">
          <a-button-group>
            <a-button @click="handleRefresh">刷新</a-button>
            <a-button type="primary" @click="handleAdd">
              <a-icon type="plus" />添加点滴
            </a-button>
          </a-button-group>
        </div>
      </div>
      <div class="news-pagination">
        <div class="pagination" v-if="showPagination">
          <a-pagination
            @change="handlePageChange"
            v-model="current"
            :pageSize="pageSize"
            :total="totalCount"
          />
        </div>
      </div>
      <div class="news-container">
        <div class="no-newsLists" v-if="NodripLists">
          <div class="null-icon">
            <div class="null-svg"></div>
            <div class="null-txt">还没有上传过文章&nbsp;yo&nbsp;！</div>
          </div>
        </div>
        <div class="news-main" v-else>
          <div v-for="Item in dripLists" :key="Item.newsId">
            <DripItem :dripItem="Item" @update-dripList="handleRefresh()"></DripItem>
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
import DripItem from '@/components/News/DripItem'

import Axios from 'axios'
export default {
  name: 'DripNews',
  components: { DripItem },
  data () {
    return {
      NodripLists: false,
      dripLists: [],
      totalCount: 9,
      current: 1,
      pageSize: 8
    }
  },
  updated () {
    // 切换页面时滚动条自动滚动到顶部
    console.log('置顶')
    window.scrollTo(0, 0)
  },
  mounted () {
    this.fetch()
  },
  watch: {
    '$route.path': function (to, from) {
      if (to === '/intervenemanager/AppPush/list') {
        console.log('再次进入列表页面')
        // 切换页面时滚动条自动滚动到顶部
        console.log('置顶')
        window.scrollTo(0, 0)
        this.fetch()
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
      Axios({
        // url: `/api/intervene/dripLists/?pageSize=${this.pageSize}&currentPage=${this.current}`,
        url: '/api/admin/news/', // 后台数据
        method: 'get',
        params: {
          ...params
        }
      }).then(res => {
        console.log('获取点滴列表', res)
        // 后台数据
        // this.totalCount = res.data.result.totalCount
        if (res.data.length === 0) {
          this.NodripLists = true
          this.dripLists = []
        } else {
          this.NodripLists = false
          this.dripLists = res.data
        }
      })
    },
    handleEdit (newsId) {
      // 点击行进入edit页
      this.$router.push({
        path: '/intervenemanager/AppPush/edit',
        query: {
          newsId: newsId
        }
      })
    },
    handleAdd () {
      // 点击行进入add页
      this.$router.push({
        path: '/intervenemanager/AppPush/add'
      })
    },
    handleRefresh () {
      // news列表刷新
      this.fetch()
    },
    handleDelete (newsId) {
      return Axios({
        url: `/api/admin/news/${newsId}`,
        method: 'delete'
      })
    },
    showConfirm (newsId) {
      const that = this
      this.$confirm({
        title: `你确定想要删除这条新闻吗? NewsID:${newsId}`,
        content: '当你点击确定按钮时，就会删除选中的这条新闻',
        onOk () {
          // 异步请求
          that.handleDelete(newsId)
            .then(res => {
              // refresh data
              that.fetch()
            })
        },
        onCancel () {
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
.newsPage {
  width: 100%;
  min-height: calc(100vh - 320px);

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
    .news-main {
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
