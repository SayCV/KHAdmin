<template>
  <a-card
    :bordered="false"
    :bodyStyle="{ padding: '8px 8px 24px 8px', height: '100%' }"
    :style="{ height: '100%' }"
  >
    <div class="living-data-info">
      <div class="data-info">
        <div class="info-top">
          <div class="title">
            <a-icon type="profile" theme="twoTone" />
            <span>成员详细指标数据</span>
          </div>
        </div>
        <div class="info-content">
          <div class="basic-info">
            <div class="title">基本信息</div>
            <div class="basic-data">
              <div class="item">
                <span class="label">姓名：</span>
                <span class="data">强啊强</span>
              </div>
              <div class="item">
                <span class="label">成员ID：</span>
                <span class="data">1</span>
              </div>
              <div class="item">
                <span class="label">用户ID：</span>
                <span class="data">10000000000001</span>
              </div>
              <div class="item">
                <span class="label">性别：</span>
                <span class="data">男</span>
              </div>
              <div class="item">
                <span class="label">年龄：</span>
                <span class="data">21</span>
              </div>
            </div>
          </div>
          <div class="detail-info">
            <div class="title">生活数据</div>
            <div class="detail-data">
              <div class="label">
                <div class="label-item">名称</div>
                <div class="label-item">结果</div>
                <div class="label-item">参考</div>
                <div class="label-item">单位</div>
              </div>
              <div class="content">
                <div class="row" v-for="data in detailData" :key="data.label">
                  <div class="value-item">{{ data.label }}</div>
                  <div class="value-item">{{ data.value }}</div>
                  <div class="value-item">{{ data.reference }}</div>
                  <div class="value-item">{{ data.unit }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { axios } from '@/utils/request'
export default {
  // 生活数据
  name: 'InfoData',
  data () {
    return {
      detailData: []
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      this.loading = true
      axios({
        url: '/api/record/livingdata/info',
        method: 'get'

      }).then(res => {
        console.log('生活数据详情:', res)
        this.loading = false
        this.detailData = res.result.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.living-data-info {
  padding: 16px 0;
  .data-info {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    .info-top {
      padding: 14px;
      border-bottom: 1px solid #d9d9d9;
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        font-size: 22px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        .anticon {
          font-size: 24px;
          padding: 0px 8px;
        }
      }
    }
    .info-content {
      display: flex;
      .basic-info {
        max-width: 256px;
        flex: 1;
        border-right: 1px solid #d9d9d9;
        .title {
          background: #fafafa;
          padding: 12px 24px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.9);
        }
        .basic-data {
          background: #fefefe;
          .item {
            padding: 12px 24px;
            font-size: 15px;
            .label {
              color: rgba(0, 0, 0, 0.85);
            }
            .data {
              padding-left: 2px;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
            }
          }
        }
      }
      .detail-info {
        flex: 3;
        .title {
          background: #e6f7ff;
          padding: 12px 24px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.9);
        }
        .detail-data {
          .label {
            display: flex;
            border-bottom: 1px solid #d9d9d9;
            .label-item {
              flex: 1;
              padding: 12px 24px;
              font-size: 15px;
              color: rgba(0, 0, 0, 0.85);
              border-right: 1px solid #d9d9d9;
              &:last-child {
                border-right: 0px solid #d9d9d9;
              }
            }
          }
          .content {
            .row {
              display: flex;
              border-bottom: 1px solid #d9d9d9;
              .value-item {
                flex: 1;
                padding: 8px 24px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.65);
                border-right: 1px solid #d9d9d9;
                &:last-child {
                  border-right: 0px solid #d9d9d9;
                }
              }
              &:last-child {
                border-bottom: 0px solid #d9d9d9;
              }
            }
          }
        }
      }
    }
  }
}
</style>
