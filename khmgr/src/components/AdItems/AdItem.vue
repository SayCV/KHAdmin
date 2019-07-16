<template>
  <div>
    <div class="ad-item">
      <div class="ad-inner">
        <div class="ad-cover">
          <div class="cover" :style="{ backgroundImage:'url(' + adItem.imageUrl + ')' }"></div>
        </div>
        <div class="ad-meta">
          <div class="meta-title">
            <a-tag color="blue">{{ adItem.createOn.substring(0,16) }}</a-tag>
            <div class="title-text">{{ adItem.title }}</div>
          </div>
          <div class="meta-url">{{ adItem.adUrl }}</div>
          <div class="meta-date">
            <div class="ad-date">
              <div class="date-label">起止时间&nbsp;:&nbsp;</div>
              <div class="start-end-date">
                <a-tag>{{ moment(`${adItem.beginDate}`).format(dateFormat) }}</a-tag>
                <span>~ &nbsp;</span>
                <a-tag>{{ moment(`${adItem.endDate}`).format(dateFormat) }}</a-tag>
              </div>
            </div>
          </div>
          <div class="meta-operation">
            <div class="meta-contact">
              <div class="contact-label">
                联系人&nbsp;:&nbsp;
                <div class="name">{{ adItem.contact }}</div>
              </div>
              <div class="contact">
                电话&nbsp;:&nbsp;
                <div class="phone">{{ adItem.phone }}</div>
              </div>
            </div>
            <a-button-group>
              <a-button @click="() => handleToEditAD(adItem.adId)">编辑</a-button>
              <a-button type="danger" @click="() => deleteConfirm(adItem.adId)">删除</a-button>
            </a-button-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
import moment from 'moment'

export default {
  name: 'AdItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['adItem'],
  // props: {
  //   adItem: {
  //     type: JSON,
  //     default: () => {}
  //     // require: true // 必填
  //   }
  // },
  data () {
    return {
      dateFormat: 'YYYY-MM-DD',
      adData: this.adItem
    }
  },
  methods: {
    moment,
    handleToEditAD (adId) {
      // 点击行进入edit页
      this.$router.push({
        path: '/business/BarAD/editAD',
        query: {
          adId: adId,
          data: this.adItem
        }
      })
    },
    handleDelete (adId) {
      return axios({
        url: `/api/admin/ad/${adId}`,
        method: 'delete'
      })
    },
    deleteConfirm (adId) {
      const that = this
      this.$confirm({
        title: `你确定想要删除这条广告吗? adID:${adId}`,
        content: '当你点击确定按钮时，就会删除选中的这条广告',
        okType: 'danger',
        onOk () {
          // 异步请求
          that.handleDelete(adId)
            .then(res => {
              // refresh data
              that.$emit('update-adList', res)
              console.log('子组件更新父组件数据', res)
            })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ad-item {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  margin-bottom: 10px;
  .ad-inner {
    display: flex;
    padding: 20px;
    .ad-cover {
      // flex: 1;
      width: 180px;
      height: 100px;
      .cover {
        width: 180px;
        height: 100px;
        background-size: cover;
        background-position: center center;
        border-radius: 4px;
        overflow: hidden;
      }
      .cover:hover {
        cursor: pointer;
      }
    }
    .ad-meta {
      position: relative;
      flex: 1;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .meta-title {
        height: 24px;
        display: flex;
        align-items: center;
        .title-text {
          display: inline-block;
          max-width: 400px;
          font-size: 18px;
          color: rgba(0, 0, 0, 0.85);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: all 0.23s;
        }
      }
      .meta-url {
        font-size: 15px;
        color: rgba(0, 0, 0, 0.75);
        text-decoration: underline;
        max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.23s;
      }
      .meta-url:hover {
        cursor: pointer;
        color: #4facfe;
        transition: all 0.23s ease;
      }
      .meta-date {
        max-width: 300px;
        margin-bottom: 8px;
        .ad-date {
          display: flex;
          align-items: center;
          .date-label {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.85);
          }
        }
      }
      .meta-operation {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        .meta-contact {
          margin-bottom: 10px;
          .contact-label {
            margin-bottom: 8px;
            font-size: 15px;
            color: rgba(0, 0, 0, 0.85);
            display: flex;
            .name {
              color: rgba(0, 0, 0, 0.65);
              margin: 0 1px;
              background: #f2f4f5;
              padding: 0px 7px;
              border-radius: 3px;
              font-size: 0.9em;
              border: 1px solid #eee;
            }
            .name:hover {
              cursor: pointer;
            }
          }
          .contact {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.85);
            display: flex;
            .phone {
              color: rgba(0, 0, 0, 0.65);
              margin: 0 1px;
              background: #f2f4f5;
              padding: 0px 7px;
              border-radius: 3px;
              font-size: 0.9em;
              border: 1px solid #eee;
            }
            .phone:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.ad-item:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}
</style>
