<template>
  <div>
    <div class="app-list">
      <div class="app-list-img">
        <div class="list-img-hidden">
          <div class="list-info-img" :style="{ backgroundImage: 'url(' + topItem.cover + ')' }"></div>
        </div>
      </div>
      <div class="app-list-content">
        <div class="content-top">
          <div class="content-name">{{ topItem.title }}</div>
          <div class="content-txt">{{ topItem.summary }}</div>
        </div>
        <div class="content-desc">
          <div class="tag-time">
            <a-tag color="geekblue">{{ topItem.dateTime.substring(0, 16) }}</a-tag>
          </div>
          <div class="desc-views">
            <a-icon class="view-icon" type="eye" theme="twoTone" />
            <span class="view-num">{{ topItem.views }}</span>
          </div>
        </div>
      </div>
      <div class="app-list-operation">
        <div class="operation-desc">
          <div class="operation-status">
            <span>状态 :</span>
            <a-badge :status="topItem.status" :text="topItem.statusTxt" />
          </div>
          <div class="operation-desc-txt">
            <div>
              消息类型 :
              <span>{{ topItem.msgcategory }}</span>
            </div>
            <div>
              发送人群 :
              <span>{{ topItem.msgRq }}</span>
            </div>
          </div>
        </div>
        <div class="opertion-btn">
          <a-button-group>
            <a-button @click="() => handleEdit(topItem.newsId)">查看</a-button>
            <a-button
              type="danger"
              @click="() => showConfirm(topItem.newsId)"
            >删除{{ topItem.newsId }}</a-button>
          </a-button-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'TopItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['topItem'],
  // props: {
  //   topItem: {
  //     type: JSON,
  //     default: () => {}
  //     // require: true // 必填
  //   }
  // },
  data () {
    return {
      newsData: this.topItem
    }
  },
  methods: {
    handleEdit (newsId) {
      // 点击行进入edit页
      this.$router.push({
        path: '/intervenemanager/TopPush/edit',
        query: {
          newsId: newsId,
          data: this.topItem
        }
      })
    },
    handleDelete (newsId) {
      return Axios({
        url: `/api/admin/news/${newsId}`,
        method: 'delete'
      })
    },
    showConfirm (newsId) {
      const that = this
      this.$confirm({
        title: `你确定想要删除这条新闻吗? NewsID:${newsId}`,
        content: '当你点击确定按钮时，就会删除选中的这条新闻',
        okType: 'danger',
        onOk () {
          // 异步请求
          that.handleDelete(newsId)
            .then(res => {
              // refresh data
              that.$emit('update-topList', res)
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
.app-list {
  width: 100%;
  overflow: hidden;
  // border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.app-list:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
}
.app-list .app-list-img {
  padding-right: 20px;
  .list-img-hidden {
    overflow: hidden;
  }
  .list-info-img {
    width: 200px;
    min-height: 180px;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    background-position: center center;
    background-size: cover;
    transition: all 0.3s ease-in-out;
  }
  .list-info-img:hover {
    cursor: pointer;
    // transform: scale(1.075);
    // transition: all 0.4s ease;
  }
}
.app-list .app-list-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content-name {
    font-size: 18px;
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 0.85);
    padding-right: 30px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content-txt {
    font-size: 14px;
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 0.65);
    padding-right: 30px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content-desc {
    display: flex;
    align-items: center;
    width: 220px;
    padding: 10px 0;
    .desc-views {
      margin-left: 8px;
      .view-icon {
        font-size: 18px;
        vertical-align: middle;
      }
      .view-num {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
}
.app-list .app-list-operation {
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .operation-status {
    height: 27px;

    vertical-align: middle;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
  }
  .operation-status > span {
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    margin-right: 16px;
  }
  .operation-desc-txt {
    color: rgba(0, 0, 0, 0.85);
  }
  .operation-desc-txt > div {
    margin-bottom: 5px;
  }
  .operation-desc-txt > div > span {
    margin: 0 1px;
    background: #f2f4f5;
    padding: 0px 7px;
    border-radius: 3px;
    font-size: 0.9em;
    border: 1px solid #eee;
  }
  .opertion-btn {
    padding: 10px 0;
  }
}
</style>
