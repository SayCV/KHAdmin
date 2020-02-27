<template>
  <div class="user-info-page">
    <a-card title="基本信息" :bordered="false" :loading="loading">
      <ButtonBack slot="extra"></ButtonBack>
      <description-list size="large">
        <div class="user-avatar">
          <div class="text">头像：</div>
          <a-avatar size="large" icon="user" />
        </div>
        <description-list-item term="账号ID">{{ data.accountId ||'--' }}</description-list-item>
        <description-list-item term="用户名">{{ data.userName ||'--' }}</description-list-item>
        <description-list-item term="用户组">{{ data.userGroup ||'--' }}</description-list-item>
        <description-list-item term="姓名">{{ data.name ||'--' }}</description-list-item>
        <description-list-item term="性别">{{ data.sex ||'--' }}</description-list-item>
        <description-list-item term="出生日期">{{ data.brithday ||'--' }}</description-list-item>
        <description-list-item term="身份证">{{ data.identityId ||'--' }}</description-list-item>
        <description-list-item term="工作单位">{{ data.workPlace ||'--' }}</description-list-item>
      </description-list>
    </a-card>
    <a-card title="其他信息" :bordered="false" :loading="loading">
      <description-list size="large">
        <description-list-item term="民族">{{ data.nation ||'--' }}</description-list-item>
        <description-list-item term="婚姻状况">{{ data.maritalStatus ||'--' }}</description-list-item>
        <description-list-item term="电话">{{ `${data.phone ||'--' } 人` }}</description-list-item>
        <description-list-item term="邮箱">{{ data.email ||'--' }}</description-list-item>
        <description-list-item term="最高学历">{{ data.education ||'--' }}</description-list-item>
        <description-list-item term="年龄">{{ data.age ||'--' }}</description-list-item>
        <description-list-item term="注册时间">{{ data.registerDate ||'--' }}</description-list-item>
        <description-list-item term="家庭地址">{{ data.address ||'--' }}</description-list-item>
      </description-list>
    </a-card>
    <!-- 基本信息 -->
    <div class="person-info">
      <!-- table -->
      <!-- <div class="ant-descriptions-view">
        <table>
          <tbody>
            <tr class="ant-descriptions-row"></tr>
            <tr class="ant-descriptions-row">
              <td
                class="ant-descriptions-item-content ant-descriptions-item-img"
                colspan="1"
                rowspan="3"
                :style="{backgroundImage: 'url(' + data.avatar + ')'}"
              ></td>
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
      </div>-->
      <!-- table -->
    </div>
    <div class="edit">
      <a-button type="primary" icon="form" @click="handleBtnToEdit">编辑</a-button>
    </div>
  </div>
</template>

<script>
import { getCustomerDetailInfo } from '@/api/basicData/customers'
import ButtonBack from '@/components/Button/ButtonBack'
import { DescriptionList } from '@/components'
const DescriptionListItem = DescriptionList.Item

export default {
  name: 'CustomerInfo',
  components: {
    ButtonBack,
    DescriptionList,
    DescriptionListItem
  },
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetch()
    })
  },
  methods: {
    // 获取数据
    fetch (params = {}) {
      this.loading = true
      getCustomerDetailInfo(this.accountId).then(res => {
        this.loading = false
        this.data = res || {}
      }).catch(() => { this.loading = false })
    },
    handleBtnToEdit () {
      this.$router.push({
        path: '/customerManager/table/edit',
        query: {
          accountId: this.accountId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-info-page {
  .back {
    display: flex;
    justify-content: flex-end;
  }

  .user-avatar {
    display: flex;
    padding-bottom: 12px;
    .text {
      line-height: 40px;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .edit {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
