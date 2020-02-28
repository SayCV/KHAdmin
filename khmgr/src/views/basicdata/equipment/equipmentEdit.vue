<template>
  <div class="equipment-edit-container">
    <a-form @submit="handleSubmit" :form="form">
      <a-card title="基本信息" :bordered="false" :loading="loading">
        <template v-slot:extra>
          <ButtonBack name="返回设备列表" routerName="EquipmentTable"></ButtonBack>
        </template>
        <a-row type="flex" :gutter="24">
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="设备类型" v-bind="formItemLayout">
              <a-select v-decorator="['category', categoryConfig]">
                <a-select-option value="0">智能马桶盖</a-select-option>
                <a-select-option value="1">智能手环</a-select-option>
                <a-select-option value="2">体脂秤</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="设备ID" v-bind="formItemLayout">
              <a-input v-decorator="['equipmentId', equipmentIdConfig]" name="equipmentId" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="绑定账号" v-bind="formItemLayout">
              <a-input v-decorator="['bindAccountId', bindAccountIdConfig]" name="bindAccountId" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="设备状态" v-bind="formItemLayout">
              <a-select v-decorator="['status', statusConfig]">
                <a-select-option value="0">在线</a-select-option>
                <a-select-option value="1">离线</a-select-option>
                <a-select-option value="2">报修中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="设备型号" v-bind="formItemLayout">
              <a-input v-decorator="['untiType', untiTypeConfig]" name="untiType" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="启动时间" v-bind="formItemLayout">
              <a-date-picker
                :format="dateFormat"
                style="width: 100%"
                name="createdTime"
                v-decorator="['createdTime', createdTimeConfig]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="其他信息" :bordered="false" :loading="loading">
        <a-row type="flex" :gutter="24">
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="IP地址" v-bind="formItemLayout">
              <a-input v-decorator="['IP', IPConfig]" name="IP" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="在线时长" v-bind="formItemLayout">
              <a-input v-decorator="['online', onlineConfig]" addonAfter="h" name="online" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="联系电话" v-bind="formItemLayout">
              <a-input v-decorator="['phone', phoneConfig]" name="phone" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="生产商" v-bind="formItemLayout">
              <a-input v-decorator="['producer', producerConfig]" name="producer" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :lg="12" :md="24">
            <a-form-item label="安装区域" v-bind="formItemLayout">
              <a-textarea rows="4" v-decorator="['address', addressConfig]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <footer-tool-bar>
        <div class="from-option" style="text-align: center">
          <a-button htmlType="submit" type="primary" :loading="posting">保存</a-button>
        </div>
      </footer-tool-bar>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment'
import ButtonBack from '@/components/Button/ButtonBack'
import FooterToolBar from '@/components/FooterToolbar'

import { getEquipmentItem } from '@/api/basicData/equipmentManager'

export default {
  name: 'EquipmentEdit',
  components: { ButtonBack, FooterToolBar },
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { lg: { span: 4 }, sm: { span: 4 } },
        wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
      },
      categoryConfig: { rules: [{ required: true, message: '' }], initialValue: null },
      equipmentIdConfig: { rules: [{ required: true, message: '' }], initialValue: null },
      bindAccountIdConfig: { rules: [{ required: true, message: '' }], initialValue: null },
      statusConfig: { rules: [{ required: true, message: '' }], initialValue: null },
      untiTypeConfig: { rules: [{ required: true, message: '' }], initialValue: null },
      createdTimeConfig: { rules: [{ required: true, message: '' }], initialValue: null },
      addressConfig: { initialValue: null },
      IPConfig: { initialValue: null },
      onlineConfig: { initialValue: null },
      phoneConfig: { initialValue: null },
      producerConfig: { initialValue: null },
      dateFormat: 'YYYY-MM-DD',
      equipmentId: this.$route.query.equipmentId,
      loading: false,
      posting: false,
      data: {}
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
