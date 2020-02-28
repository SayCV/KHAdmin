<template>
  <div class="living-data-info">
    <a-card title="基本信息" :bordered="false" :loading="loading">
      <ButtonBack slot="extra" name="返回成员列表页"></ButtonBack>
      <div class="basic-desription">
        <description-list>
          <description-list-item term="健康号">{{ level || '--' }}</description-list-item>
          <description-list-item term="姓名">{{ level || '--' }}</description-list-item>
          <description-list-item term="性别">{{ level || '--' }}</description-list-item>
          <description-list-item term="年龄">{{ level || '--' }}</description-list-item>
          <description-list-item term="健康评级">{{ level || '--' }}</description-list-item>
          <description-list-item term="启动时间">{{ level || '--' }}</description-list-item>
        </description-list>
      </div>
    </a-card>
    <a-card title="生活数据" :bordered="false" :loading="loading">
      <div class="select-date">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-form-item label="选择日期">
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
            <a-button type="primary" icon="search" :disabled="loading" html-type="submit">查询</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="no-datas" v-if="noDatas">
        <Empty></Empty>
      </div>
      <div v-else class="data-table">
        <div class="detail-data">
          <div class="label">
            <div class="label-item">名称</div>
            <div class="label-item">结果</div>
            <div class="label-item">参考</div>
            <div class="label-item">单位</div>
          </div>
          <div class="datas">
            <div class="row" v-for="data in detailData" :key="data.label">
              <div class="value-item">{{ data.indicatorNameCN }}</div>
              <div class="value-item">{{ isToiletTime(data) }}</div>
              <div class="value-item">{{ referenceValue }}</div>
              <div class="value-item">{{ data.indicatorUnit }}</div>
            </div>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
// import { axios } from '@/utils/request'
import ButtonBack from '@/components/Button/ButtonBack'
import Empty from '@/components/Empty/Empty'
import { getPersonLivingData } from '@/api/basicData/livingData'
import { DescriptionList } from '@/components'
const DescriptionListItem = DescriptionList.Item

export default {
  // 成员详细健康数据
  name: 'InfoData',
  components: {
    ButtonBack,
    Empty,
    DescriptionList,
    DescriptionListItem
  },
  data () {
    return {
      personId: this.$route.query.personId,
      loading: false,
      form: this.$form.createForm(this),
      detailData: [],
      noDatas: false,
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

      this.loading = true
      getPersonLivingData(this.personId).then(res => {
        console.log('person data =>', res)
        this.loading = false
        this.detailData = res.datas.list || []
        this.level = res.level || '--'
        if (res.datas.total === 0) {
          this.noDatas = true
        }
      }).catch(err => {
        this.loading = false
        if (err) {
          this.noDatas = true
        }
      })
    },
    isToiletTime (data) {
      if (data.indicatorName === 'toilet_time') {
        console.log(JSON.parse(data.indicatorValue))
        const toiletTime = JSON.parse(data.indicatorValue).TimeSpan.toString().substring(0, 12)
        console.log(toiletTime)
        return toiletTime || '0'
      }
      return data.indicatorValue === 'NaN' ? '0' : data.indicatorValue
    }
  }
}
</script>
<style lang="less" scoped>
.living-data-info {
  .select-date {
    height: 82px;
  }
  .data-table {
    border-right: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
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
      .datas {
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
            border-bottom: 1px solid #d9d9d9;
          }
        }
      }
    }
  }
}
</style>
