<template>
  <div class="goalPage">
    <div class="page-top">
      <PageTitle name="新建目标" :linkTo="addGoalLink" :isLoading="dataIsLoading"></PageTitle>
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
          <div class="aim-item">
            <div class="aim-inner">
              <div class="aim-top">
                <div class="img">
                  <img
                    src="http://172.31.214.104/khmsrv/api/resources/282967f73b0f40e19808ef6644b38eb0"
                    alt="img"
                  />
                </div>
                <div class="aim-info">
                  <div class="label">
                    <div class="icon">
                      <a-icon type="github" />
                    </div>
                    <div class="title">Title Name</div>
                  </div>
                  <p
                    class="desc"
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi unde saepe explicabo voluptatibus, provident fugiat ea vel optio quod natus tempora doloribus. Veniam earum, quod assumenda molestias eius in culpa.</p>
                  <div class="remind">
                    <div class="label">提醒时间&nbsp;:</div>
                    <a-tag>20:00</a-tag>
                  </div>
                </div>
              </div>
              <div class="aim-content">
                <div class="repeat-time">
                  <div class="week" v-for="week in weeks" :key="week">
                    <a-tag color="blue">{{ week }}</a-tag>
                  </div>
                </div>
                <div class="aim-btns">
                  <a-button-group>
                    <a-button>编辑</a-button>
                    <a-button type="danger">删除</a-button>
                  </a-button-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-botton"></div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageHeader/PageTitle'
import Empty from '@//components/Empty/Empty'

export default {
  name: 'Healthgoals',
  components: { PageTitle, Empty },
  data () {
    return {
      addGoalLink: '/intervenemanager/goalSet/add',
      dataIsLoading: false,
      noDataList: false,
      goalList: [],
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.aim-item {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 400px;
  padding: 10px;
  .aim-inner {
    overflow: hidden;
    .aim-top {
      display: flex;
      .img {
        img {
          width: 120px;
          height: auto;
        }
      }
      .aim-info {
        flex: 1;
        padding-left: 16px;
        .label {
          display: flex;
          .icon {
            margin-right: 8px;
            font-size: 18px;
          }
          .title {
            max-width: 300px;
            font-size: 18px;
            color: rgba(0, 0, 0, 0.85);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .desc {
          margin-top: 4px;
          min-height: 40px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.75);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .remind {
          display: flex;
          .label {
            color: rgba(0, 0, 0, 0.85);
            margin-right: 8px;
          }
        }
      }
    }
    .aim-content {
      margin: 10px 0;
      display: flex;
      .repeat-time {
        flex: 1;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        background-color: #fafafa;
        padding: 10px;
        padding-bottom: 0px;
        display: flex;
        flex-wrap: wrap;
        .week {
          margin-bottom: 8px;
        }
      }
      .aim-btns {
        margin-left: 8px;
        width: 130px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
    }
  }
}
</style>
