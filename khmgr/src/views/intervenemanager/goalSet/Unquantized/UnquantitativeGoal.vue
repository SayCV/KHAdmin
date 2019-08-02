<template>
  <div class="goalPage">
    <div class="page-top">
      <PageTitle name="新建目标" @toRefresh="fetch" :linkTo="addGoalLink" :isLoading="dataIsLoading"></PageTitle>
    </div>
    <div class="pagination"></div>
    <div class="page-content">
      <div class="spin" v-if="dataIsLoading">
        <a-spin></a-spin>
      </div>
      <div class="data-loading" v-else>
        <div class="no-goalList" v-if="noDataList">
          <Empty></Empty>
        </div>
        <div class="goal-container" v-else>
          <!-- 目标组件 -->
          <div class="item" v-for="item in goalList" :key="item.aimId">
            <AimItem :aimItem="item" @toEdit="handleEdit(item)" @toDelete="handleDelete(item)"></AimItem>
          </div>
          <!-- 目标组件 -->
        </div>
      </div>
    </div>
    <div class="pagination-bottom"></div>
  </div>
</template>

<script>
import { PageTitle, Empty, AimItem } from '@/components'
import { axios } from '@/utils/request'

export default {
  name: 'UnquantitativeGoal',
  components: { PageTitle, Empty, AimItem },
  data () {
    return {
      // addGoalLink: '/intervenemanager/goalSet/add',
      addGoalLink: 'AddGoal',
      dataIsLoading: false,
      noDataList: false,
      goalList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.query.page) {
        vm.current = vm.$route.query.page
      } vm.fetch()
    })
  },
  mounted () {
    this.fetch()
  },
  methods: {
    // 获取数据
    fetch (params = {}) {
      this.dataIsLoading = true
      axios({
        // url: `/api/admin/news/?pageSize=${this.pageSize}&pageNum=${this.current}`,
        url: '/api/intervene/aimsUnquan/', // mock
        method: 'get',
        params: {
          ...params
        }
      }).then(res => {
        console.log('list', res)
        // 后台数据
        if (res) {
          this.noDataList = false
          this.goalList = res.result.list
        } else {
          this.noDataList = true
          this.goalList = []
        }
        this.dataIsLoading = false
      }).catch(err => {
        if (err) {
          this.noDataList = true
          this.$notification['error']({
            message: '注意！注意！',
            description: '网络链接中断...'
          })
        }
        this.dataIsLoading = false
      })
    },
    handleEdit (item) {
      console.log('click edit ', item.aimId)
      // 点击行进入edit页
      this.$router.push({
        name: 'EditUnquanGoal',
        query: {
          aimId: item.aimId,
          page: this.current,
          data: item
        }
      })
    },
    handleDelete (item) {
      console.log('click delete ', item.aimId)
    }
  }
}
</script>

<style lang="less" scoped>
.goalPage {
  width: 100%;

  .pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
  }

  .pagination-bottom {
    display: flex;
    justify-content: center;
    // margin-top: 10px;
  }
  .page-content {
    margin-top: 10px;
    position: relative;
    min-height: 550px;
    .spin {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .data-loading {
      .no-goalList {
        width: 100%;
        height: calc(100vh - 450px);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .goal-container {
        display: flex;
        flex-wrap: wrap;
        .item {
          // width: 25%;
        }
      }
    }
  }
}
</style>
