<template>
  <div class="create-cus-page">
    <a-card :bordered="false">
      <div
        class="title"
        slot="title"
      >
        <span style="marginRight: 8px">添加客户</span>
        <a-icon type="user-add" />
      </div>
      <div class="query-form">
        <a-form
          :form="form"
          @submit="handleSearch"
        >
          <a-form-item
            label="健康号"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 10 }"
          >
            <a-input
              v-decorator="[ 'userNo', {rules: [{ required: true, message: '请输入您要查询的健康号!' }]} ]"
              @change="findTheCustomer"
            ></a-input>
          </a-form-item>
          <div class="search-btn">
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              :disabled="loading"
            >查询</a-button>
            <a-button
              :style="{ marginLeft: '8px' }"
              @click="handleReset"
            >清空</a-button>
          </div>
        </a-form>
      </div>
      <div class="return-list">
        <a-card
          :loading="loading"
          :bordered="false"
          :bodyStyle="{ padding: '0px', height: '100%' }"
          :style="{ height: '100%' }"
        >
          <div
            class="user-item"
            v-if="showResult"
          >
            <div class="avatar">
              <a-avatar
                :size="75"
                icon="user"
                :src="data.avatar"
              />
            </div>
            <div class="info">
              <div class="nickname">{{ data.name }}</div>
              <div class="name_id">
                <div>
                  昵称&nbsp;:
                  <span>{{ data.userName }}</span>
                </div>
                <div>
                  健康号&nbsp;:
                  <span>{{ data.userNo }}</span>
                </div>
              </div>
            </div>
            <div class="btn">
              <a-button
                type="primary"
                icon="user-add"
                @click="showAddModel"
              >邀请用户</a-button>
            </div>
          </div>
          <div
            class="no-user-item"
            v-else
          >
            <Empty />
          </div>
        </a-card>
      </div>
    </a-card>
  </div>
</template>

<script>
import ButtonBack from '@/components/Button/ButtonBack'
import { findCustomer } from '@/api/basicData/customers'
import Empty from '@/components/Empty/Empty'
export default {
  name: 'AddCusromer',
  components: { ButtonBack, Empty },
  data () {
    return {
      form: this.$form.createForm(this),
      userNo: '',
      showResult: false,
      notFound: false,
      loading: false,
      data: []
    }
  },
  mounted () {

  },
  methods: {
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.getData(values.userNo)
        }
      })
    },
    handleReset () {
      this.form.resetFields()
      this.notFound = false
      this.showResult = false
    },
    findTheCustomer (e) {
      console.log('input =>', e.target.value.trim())
      const userNo = e.target.value.trim()
      findCustomer(userNo).then(res => {
        this.showResult = true
        this.data = res
        this.loading = false
      }).catch(err => {
        if (err) {
          this.notFound = true
          this.showResult = false
        }
      })
    },
    getData (userNo) {
      this.loading = true
      findCustomer(userNo).then(res => {
        this.loading = false
        this.showResult = true
        this.data = res
      }).catch(err => {
        if (err) {
          this.notFound = true
          this.showResult = false
          this.loading = false
        }
      })
    },
    showAddModel () {
      this.$confirm({
        centered: true,
        title: '您确定要将该用户添加到当前机构?',
        onOk () {
          console.log('OK')
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.create-cus-page {
  min-height: calc(100vh - 290px);
  .return-list {
    margin-top: 24px;
    border-radius: 4px;
    .user-item {
      width: 100%;
      max-width: 700px;
      height: 95px;
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #e9e9e9;
      .avatar {
        // flex: 1;
        padding: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .info {
        flex: 1;
        padding-left: 6px;
        .nickname {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 8px;
        }
        .name_id {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.65);
          display: flex;
          & span {
            padding-right: 8px;
          }
        }
        .tag {
          margin-top: 8px;
        }
      }
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
