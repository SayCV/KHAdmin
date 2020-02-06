<template>
  <div class="equipment-edit-container">
    <a-form
      @submit="handleSubmit"
      :form="form"
    >
      <a-card
        title="基本信息"
        :bordered="false"
        :loading="loading"
      >
        <div
          class="back"
          slot="extra"
        >
          <a-button
            type="primary"
            @click="handleToTable"
          >返回目标列表
            <a-icon type="rollback" />
          </a-button>
        </div>
        <div class="basic-info">
          <a-form-item
            label="设备类型"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="['category', {
                rules: [{ required: true, message: '请输入设备类型' }],
                initialValue: data.category
              }]"
              name="category"
            />
          </a-form-item>
          <a-form-item
            label="设备ID"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="['equipmentId', {
                rules: [{ required: true, message: '请输入设备ID' }],
                initialValue: data.equipmentId
              }]"
              name="equipmentId"
            />
          </a-form-item>
        </div>
      </a-card>
      <a-card
        title="其他信息"
        :bordered="false"
      >
        <div class="other-info">
          <a-form-item
            label="IP地址"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'IP',
                {rules: [{ required: true, message: '请输入IP地址' }],
                 initialValue: data.IP}
              ]"
              name="IP"
            />
          </a-form-item>
          <a-form-item
            label="在线时间"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'countTime',
                {rules: [{ required: true, message: '请输入在线时间' }],
                 initialValue: data.countTime}
              ]"
              name="countTime"
            />
          </a-form-item>
        </div>
      </a-card>
      <div
        class="from-option"
        style="text-align: center"
      >
        <a-button
          htmlType="submit"
          type="primary"
        >提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment'
import ButtonBack from '@/components/Button/ButtonBack'
import { getHealthGoalInfo } from '@/api/basicData/healthGoal'

export default {
  name: 'HealthGoalsEdit',
  components: { ButtonBack },
  data () {
    return {
      dateFormat: 'YYYY-MM-DD',
      equipmentId: this.$route.query.equipmentId,
      data: {},
      // form
      form: this.$form.createForm(this)
    }
  },
  watch: {
    '$route.path' (to, from) {
      if (to === '/basicdata/Equipmentmanager/edit') {
        console.log('再次进入设备管理编辑页', to)
        this.equipmentId = this.$route.query.equipmentId
        this.fetch()
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    // default-date
    moment,
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      this.loading = true
      getHealthGoalInfo({ equipmentId: this.equipmentId }).then(res => {
        console.log('equipment-info', res)
        this.loading = false
        this.data = res.result.data || {}
      })
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    },
    handleToTable () {
      this.$router.push({
        name: 'HealthGoalsTable'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.edit-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.equipment-container-title {
  text-align: center;
}

.basic-info {
  display: flex;
  flex-wrap: wrap;
  .ant-row {
    width: 50%;
  }
}

.other-info {
  display: flex;
  flex-wrap: wrap;
  .ant-row {
    width: 50%;
  }
}

@media screen and (max-width: 900px) {
  /* 页面小于900px */
  .basic-info {
    padding: 20px;
  }
  .basic-info .ant-row {
    width: 100%;
  }
  .other-info {
    padding: 20px;
  }
  .other-info .ant-row {
    width: 100%;
  }
}
</style>
