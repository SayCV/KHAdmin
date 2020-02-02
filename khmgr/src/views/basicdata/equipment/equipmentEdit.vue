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
          >返回设备列表
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
          <a-form-item
            label="绑定账号"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="['bindAccountId', {
                rules: [{ required: true, message: '请输入绑定账号' }],
                initialValue: data.bindAccountId
              }]"
              name="bindAccountId"
            />
          </a-form-item>

          <a-form-item
            label="设备状态"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'status',
                {rules: [{ required: true, message: '请输入设备状态' }],
                 initialValue: data.status}
              ]"
              name="status"
            />
          </a-form-item>
          <a-form-item
            label="设备型号"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'untiType',
                {rules: [{ required: true, message: '请输入设备型号' }],
                 initialValue: data.untiType}
              ]"
              name="untiType"
            />
          </a-form-item>
          <a-form-item
            label="启动时间"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-date-picker
              :format="dateFormat"
              name="createdTime"
              style="width: 100%"
              v-decorator="[
                'createdTime',
                {rules: [{ required: true, message: '请选择启动时间' }],
                 initialValue: moment(data.createdTime, dateFormat)
                }
              ]"
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
          <a-form-item
            label="生产商"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'producer',
                {rules: [{ required: true, message: '请输入生产商' }],
                 initialValue: data.producer}
              ]"
              name="producer"
            />
          </a-form-item>
          <a-form-item
            label="联系电话"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-input
              v-decorator="[
                'phone',
                {rules: [{ required: true, message: '请输入联系电话' }],
                 initialValue: data.phone}
              ]"
              name="phone"
            />
          </a-form-item>
          <a-form-item
            label="安装区域"
            :labelCol="{lg: {span: 6}, sm: {span: 6}}"
            :wrapperCol="{lg: {span: 16}, sm: {span: 16} }"
          >
            <a-textarea
              rows="4"
              v-decorator="[
                'address',
                {rules: [{ required: true, message: '请填写安装地址' }],
                 initialValue: data.address}
              ]"
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
import { getEquipmentItem } from '@/api/basicData/equipmentManager'

export default {
  name: 'EquipmentEdit',
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
      getEquipmentItem({ equipmentId: this.equipmentId }).then(res => {
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
        path: '/equipmentManager/table'
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
