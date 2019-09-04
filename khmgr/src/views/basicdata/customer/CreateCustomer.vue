<template>
  <div class="create-cus-page">
    <div class="create-container">
      <div class="page-top">
        <ButtonBack></ButtonBack>
      </div>
      <div class="top">
        <div class="title">
          <a-icon type="user-add" />
          <span>添加客户</span>
        </div>
      </div>
      <div class="content">
        <div class="query-form">
          <a-form :form="form" @submit="handleSearch">
            <a-form-item label="健康号" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
              <a-input
                v-decorator="[ 'userNo', {rules: [{ required: true, message: '请输入您要查询的健康号!' }]} ]"
              ></a-input>
            </a-form-item>
            <div class="search-btn">
              <a-button type="primary" html-type="submit" :loading="loading" :disabled="loading">查询</a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清空</a-button>
            </div>
          </a-form>
        </div>
        <div class="return-list">
          <a-card
            :bordered="false"
            :bodyStyle="{ padding: '0px', height: '100%' }"
            :style="{ height: '100%' }"
          >
            <div class="user-item" v-if="showResult">
              <div class="avatar">
                <a-avatar :size="75" icon="user" :src="data.avatar" />
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
                <div class="tag">
                  <a-tag color="blue">客户</a-tag>
                </div>
              </div>
              <div class="btn">
                <a-button type="primary" icon="user-add">邀请用户</a-button>
              </div>
            </div>
            <div class="nofind-user-item" v-else-if="notFound">{{ notFoundUser }}</div>
            <div class="no-user-item" v-else>{{ noData }}</div>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { axios } from '@/utils/request'
import ButtonBack from '@/components/Button/ButtonBack'

export default {
  name: 'CreateCusromer',
  components: { ButtonBack },
  data () {
    return {
      notFoundUser: '未找到该用户，请确认健康号是否正确！',
      noData: '暂无数据',
      form: this.$form.createForm(this),
      // userNo 健康号
      userNo: '',
      // result
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
          this.handleOk(values)
        }
      })
    },
    handleReset () {
      this.form.resetFields()
      this.notFound = false
      this.showResult = false
    },
    getData (values) {
      axios({
        url: `/api/admin/customers/summary/${values.userNo}`,
        methods: 'get'
      }).then((res) => {
        console.log(res)
        this.data = res
        this.showResult = true
      }).catch(err => {
        console.log(err.response.status)
        if (err.response.status) {
          this.notFound = true
          this.showResult = false
        }
      })
    },
    handleOk (values) {
      this.loading = true
      setTimeout(() => {
        this.getData(values)
        this.loading = false
      }, 500)
    },
    handleBtnBack () {
      // this.$router.push({ name: 'CustomerTable' })
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.create-cus-page {
  min-height: calc(100vh - 290px);
  display: flex;
  justify-content: center;
  align-items: center;
  .create-container {
    padding: 24px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    width: 60%;
    height: 50vh;
    .page-top {
      display: flex;
      justify-content: flex-start;
    }
    .top {
      padding-bottom: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        font-size: 22px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        .anticon {
          font-size: 24px;
          padding: 0px 8px;
        }
      }
    }
    .content {
      .query-form {
        .search-btn {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .return-list {
        margin-top: 20px;
        border-radius: 4px;
        .user-item {
          width: 100%;
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
        .nofind-user-item {
          text-align: center;
          padding: 20px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.85);
        }
        .no-user-item {
          padding: 20px;
          text-align: center;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }
}
</style>
