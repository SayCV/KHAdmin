<template>
  <a-card>
    <div class="back">
      <a-button
        type="primary"
        icon="form"
        @click="handleBtnToEdit"
      >编辑
      </a-button>
      <a-button
        type="primary"
        @click="handleBtnBack"
      >返回
        <a-icon type="rollback" />
      </a-button>
    </div>
    <div class="info-title">
      <h1>个人信息表
        <span class="account-id">{{ accountId }}</span>
      </h1>
    </div>
    <!-- 基本信息 -->
    <div class="person-info">
      <!-- table -->
      <div class="ant-descriptions-view">
        <table>
          <tbody>
            <tr class="ant-descriptions-row">
            </tr>
            <tr class="ant-descriptions-row">
              <td
                class="ant-descriptions-item-content ant-descriptions-item-img"
                colspan="1"
                rowspan="3"
                :style="{backgroundImage: 'url(' + data.avatar + ')'}"
              >
              </td>
              <td class="ant-descriptions-item-label">姓名</td>
              <td
                class="ant-descriptions-item-content"
                colspan="1"
              >{{ data.name }}</td>
              <td class="ant-descriptions-item-label">身份证</td>
              <td
                class="ant-descriptions-item-content"
                colspan="2"
              >{{ data.identityId }}</td>
            </tr>
            <tr class="ant-descriptions-row">
              <td class="ant-descriptions-item-label">性别</td>
              <td class="ant-descriptions-item-content">{{ data.sex }}</td>
              <td class="ant-descriptions-item-label">民族</td>
              <td class="ant-descriptions-item-content">{{ data.nation }}</td>
            </tr>
            <tr class="ant-descriptions-row">
              <td class="ant-descriptions-item-label">年龄</td>
              <td class="ant-descriptions-item-content">{{ data.age }}</td>
              <td class="ant-descriptions-item-label">电话</td>
              <td
                class="ant-descriptions-item-content"
                colspan="2"
              >{{ data.phone }}</td>
            </tr>
            <tr class="ant-descriptions-row">
              <td class="ant-descriptions-item-label">邮箱</td>
              <td class="ant-descriptions-item-content">{{ data.email }}</td>
              <td class="ant-descriptions-item-label">出生日期</td>
              <td class="ant-descriptions-item-content">{{ data.birthday }}</td>
              <td class="ant-descriptions-item-label">婚姻状况</td>
              <td class="ant-descriptions-item-content">{{ data.maritalstatus }}</td>
            </tr>
            <tr class="ant-descriptions-row">
              <td class="ant-descriptions-item-label">账号ID</td>
              <td
                class="ant-descriptions-item-content"
                colspan="1"
              >{{ data.accountId }}</td>
              <td class="ant-descriptions-item-label">单位</td>
              <td
                class="ant-descriptions-item-content"
                colspan="5"
              >{{ data.workplace }}</td>
            </tr>
            <tr class="ant-descriptions-row">
              <td class="ant-descriptions-item-label">用户名</td>
              <td
                class="ant-descriptions-item-content"
                colspan="1"
              >{{ data.username }}</td>
              <td class="ant-descriptions-item-label">最高学历</td>
              <td
                class="ant-descriptions-item-content"
                colspan="5"
              >{{ data.education }}</td>
            </tr>
            <tr class="ant-descriptions-row">
              <td class="ant-descriptions-item-label">用户组</td>
              <td
                class="ant-descriptions-item-content"
                colspan="1"
              >{{ data.usergroup }}</td>
              <td class="ant-descriptions-item-label">创建时间</td>
              <td
                class="ant-descriptions-item-content"
                colspan="5"
              >{{ data.createdTime }}</td>
            </tr>
            <tr class="ant-descriptions-row">
              <td class="ant-descriptions-item-label">家庭地址</td>
              <td
                class="ant-descriptions-item-content"
                colspan="5"
              >{{ data.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- table -->
    </div>

    <div class="edit">
      <a-button
        type="primary"
        icon="form"
        @click="handleBtnToEdit"
      >编辑
      </a-button>
    </div>
  </a-card>

</template>

<script>
import axios from 'axios'

export default {
  // 客户管理详情页
  name: 'CustomerInfo',
  data () {
    return {
      accountId: this.$route.query.accountId,
      loading: false,
      data: {}
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
        url: '/api/account/userlist/info/',
        method: 'get',
        params: {
          accountId: this.accountId
        }
      }).then(res => {
        console.log('info-res')
        console.log(res)
        this.loading = false
        this.data = res.data.result.data
        console.log('info', this.data)
      })
    },
    handleBtnToEdit () {
      this.$router.push({
        path: '/basicdata/Customermanage/edit',
        query: {
          accountId: this.accountId
        }
      })
    },
    handleBtnBack () {
      this.$router.push({ name: 'CustomerTable' })
    }
  }
}
</script>

<style scoped>
.back {
  display: flex;
  justify-content: space-between;
}

.edit {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.account-id {
  height: 32px;
  font-size: 18px;
  padding: 0 15px;
  margin-left: 15px;
  color: #fff;
  background-color: #66a6ff;
  border-radius: 4px;
  border: 1px solid #66a6ff;
  line-height: 32px;
  display: inline-block;
  font-weight: 400;
  text-align: center;
}

.info-title {
  text-align: center;
  margin: 2rem;
}
.ant-descriptions-view {
  border: 1px solid #e8e8e8;
}

.ant-descriptions-view {
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
}

.ant-descriptions-view table {
  width: 100%;
}

.ant-descriptions-view table {
  border-collapse: collapse;
}

.ant-descriptions-row {
  border-bottom: 1px solid #e8e8e8;
}

.ant-descriptions-row:last-child {
  border-bottom: 0px solid #e8e8e8;
}

.ant-descriptions-item-label {
  background-color: #fafafa;
}

.ant-descriptions-item-label,
.ant-descriptions-item-content {
  border-right: 1px solid #e8e8e8;
  height: 65px;
}

.ant-descriptions-item-content:last-child {
  border-right: 0px solid #e8e8e8;
}

.ant-descriptions-item-label,
.ant-descriptions-item-content {
  padding: 16px 24px;
}

.ant-descriptions-row > td {
  padding-bottom: 16px;
}

.ant-descriptions-item-label {
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5;
  white-space: nowrap;
}

.ant-descriptions-item-content {
  display: table-cell;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
}

.ant-descriptions-item-img {
  width: 180px;
  height: 200px;
  padding: 0;
  background-position: center center;
  background-size: cover;
}

@media screen and (max-width: 900px) {
  .person-info {
    padding: 2.5%;
  }

  .ant-descriptions-view {
    min-width: 610px;
    border: 1px solid #e8e8e8;
  }
}
</style>
