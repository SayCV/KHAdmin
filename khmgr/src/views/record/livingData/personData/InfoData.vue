<template>
  <div>
    <ButtonBack></ButtonBack>
    <div class="living-data-info">
      <div class="data-info">
        <div class="info-top">
          <div class="title">
            <a-icon type="profile" theme="twoTone" />
            <span>成员详细指标数据</span>
          </div>
        </div>
        <div class="info-content">
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
                <div class="spin" v-if="refresh">
                  <a-spin></a-spin>
                </div>
                <div v-else class="row" v-for="data in detailData" :key="data.label">
                  <div class="value-item">{{ data.indicatorNameCN }}</div>
                  <div class="value-item">{{ isToiletTime(data) }}</div>
                  <div class="value-item">{{ referenceValue }}</div>
                  <div class="value-item">{{ data.indicatorUnit }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="basic-info">
            <div class="title">基本信息</div>
            <div class="basic-data">
              <div class="item">
                <div class="label">姓名</div>
                <div class="data">强啊强</div>
              </div>
              <div class="item">
                <div class="label">健康号</div>
                <div class="data">1000001</div>
              </div>
              <div class="item">
                <div class="label">性别</div>
                <div class="data">男</div>
              </div>
              <div class="item">
                <div class="label">年龄</div>
                <div class="data">21</div>
              </div>
              <div class="item">
                <div class="label">健康评级</div>
                <div class="data">{{ level }}</div>
              </div>
            </div>
            <div class="data-change">
              <div class="label">选择日期</div>
              <div class="content">
                <a-form layout="inline" :form="form" @submit="handleSubmit">
                  <a-form-item>
                    <a-date-picker
                      format="YYYY-MM-DD"
                      :disabledDate="disabledDate"
                      v-decorator="['date-picker', {
                        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                        initialValue:moment(moment().endOf('day'),'YYYY-MM-DD')
                      }]"
                    />
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" icon="search" :disabled="refresh" html-type="submit">查询</a-button>
                  </a-form-item>
                </a-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { axios } from '@/utils/request'
import ButtonBack from '@/components/Button/ButtonBack'

export default {
  // 生活数据
  name: 'InfoData',
  components: { ButtonBack },
  data () {
    return {
      personId: this.$route.query.personId,
      refresh: false,
      form: this.$form.createForm(this),
      detailData: [],
      level: '',
      referenceValue: '暂无参考值'
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    moment,
    disabledDate (current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day')
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD')
          }
          console.log('Received values of form: ', values)
          this.fetch(values)
        }
      })
    },
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      this.refresh = true
      axios({
        url: `/api/persons/${this.$route.query.personId}/indicators`,
        // url: '/api/record/livingdata/info',
        method: 'get'

      }).then(res => {
        console.log('生活数据详情:', res)
        if (res) {
          this.detailData = res.datas.list
          this.level = res.level
        }
        this.refresh = false
      })
    },
    isToiletTime (data) {
      if (data.indicatorName === 'toilet_time') {
        return JSON.parse(data.indicatorValue).TimeSpan || '0'
      }
      return data.indicatorValue === 'NaN' ? '0' : data.indicatorValue
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
      padding: 10px;
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
        max-width: 340px;
        flex: 1;
        border-left: 1px solid #d9d9d9;
        .title {
          background: #fafafa;
          padding: 12px 24px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.9);
          border-bottom: 1px solid #d9d9d9;
        }
        .basic-data {
          .item {
            display: flex;
            border-bottom: 1px solid #d9d9d9;
            .label {
              flex: 1;
              background: #fafafa;
              color: rgba(0, 0, 0, 0.85);
              padding: 12px 24px;
              border-right: 1px solid #d9d9d9;
              &:last-child {
                border-right: 0px solid #d9d9d9;
              }
            }
            .data {
              flex: 2;
              padding: 12px 24px;
              color: rgba(0, 0, 0, 0.65);
            }
          }
        }
        .data-change {
          .label {
            color: rgba(0, 0, 0, 0.85);
            background: #fafafa;
            padding: 12px 24px;
            border-bottom: 1px solid #d9d9d9;
          }
          .content {
            padding: 12px 24px;
            border-bottom: 1px solid #d9d9d9;
          }
        }
      }
      .detail-info {
        flex: 3;
        .title {
          background: #fafafa;
          padding: 12px 24px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.9);
        }
        .detail-data {
          .label {
            display: flex;
            background: #fafafa;
            border-top: 1px solid #d9d9d9;
            border-bottom: 1px solid #d9d9d9;
            .label-item {
              flex: 1;
              padding: 12px 24px;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.85);
              border-right: 1px solid #d9d9d9;
              &:last-child {
                border-right: 0px solid #d9d9d9;
              }
            }
          }
          .content {
            position: relative;
            min-height: calc(45px * 12 + 12px);
            .spin {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .row {
              display: flex;
              border-bottom: 1px solid #d9d9d9;
              .value-item {
                flex: 1;
                padding: 12px 24px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.65);
                border-right: 1px solid #d9d9d9;
                &:first-child {
                  background: #fafafa;
                }
                &:nth-child(2n + 1) {
                  background: #fafafa;
                  color: rgba(0, 0, 0, 0.85);
                }
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
