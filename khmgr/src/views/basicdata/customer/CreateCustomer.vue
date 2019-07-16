<template>
  <a-card>
    <div class="create-cus-page">
      <div class="create-container">
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
                  v-decorator="[ '健康号', {rules: [{ required: true, message: '请输入您要查询的健康号!' }]} ]"
                ></a-input>
              </a-form-item>
              <div class="search-btn">
                <a-button type="primary" html-type="submit">查询</a-button>
              </div>
            </a-form>
          </div>
          <div class="return-list">
            <a-list
              class="demo-loadmore-list"
              :loading="loading"
              itemLayout="horizontal"
              :dataSource="data"
            >
              <div
                v-if="showLoadingMore"
                slot="loadMore"
                :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
              >
                <a-spin v-if="loadingMore" />
                <a-button v-else @click="onLoadMore">loading more</a-button>
              </div>
              <a-list-item slot="renderItem" slot-scope="item">
                <a slot="actions">edit</a>
                <a slot="actions">more</a>
                <a-list-item-meta
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                >
                  <a slot="title" href="https://vue.ant.design/">{{ item.name.last }}</a>
                  <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </a-list-item-meta>
                <div>content</div>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>

import reqwest from 'reqwest'

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo'

export default {
  name: 'CreateCusromer',
  data () {
    return {
      form: this.$form.createForm(this),
      // list
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: []
    }
  },
  mounted () {
    this.getData((res) => {
      this.loading = false
      this.data = res.results
    })
  },
  methods: {
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    getData (callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
          callback(res)
        }
      })
    },
    onLoadMore () {
      this.loadingMore = true
      this.getData((res) => {
        this.data = this.data.concat(res.results)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.create-cus-page {
  min-height: calc(100vh - 280px);
  display: flex;
  justify-content: center;
  .create-container {
    padding: 24px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    width: 61.8%;
    height: 61.8vh;
    .top {
      padding: 16px;
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
        }
      }
      .return-list {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        padding: 12px;
        background: #fff;
        border: 1px solid #f3f3f3;
        border-radius: 4px;
      }
    }
  }
}
</style>
