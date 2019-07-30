<template>
  <div>
    <div class="app-list">
      <div class="app-list-img">
        <div class="list-img-hidden">
          <div class="list-info-img" :style="{ backgroundImage: 'url(' + dripItem.cover + ')' }"></div>
        </div>
      </div>
      <div class="app-list-content">
        <div class="content-top">
          <div class="content-name">{{ dripItem.title }}</div>
          <div class="content-txt">{{ dripItem.summary }}</div>
        </div>
        <div class="content-desc">
          <div class="tag-time">
            <a-tag color="geekblue">{{ dripItem.dateTime.substring(0, 16) }}</a-tag>
          </div>
          <div class="desc-views">
            <a-icon type="eye" theme="twoTone" />
            <span>{{ dripItem.views }}</span>
          </div>
        </div>
      </div>
      <div class="app-list-operation">
        <div class="operation-desc">
          <div class="operation-status">
            <span>状态 :</span>
            <a-badge :status="dripItem.status" :text="dripItem.statusTxt" />
          </div>
          <div class="operation-desc-txt">
            发送人群 :
            <span class="txt">{{ dripItem.pubType ? '条件推送' : '全部推送' }}</span>
          </div>
        </div>
        <div class="opertion-btn">
          <a-button-group>
            <a-button @click="() => handleEdit(dripItem.newsId)">编辑</a-button>
            <a-button type="danger" @click="() => showConfirm(dripItem.newsId)">删除</a-button>
          </a-button-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DripItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['dripItem'],
  // props: {
  //   dripItem: {
  //     type: JSON,
  //     default: () => {}
  //     // require: true // 必填
  //   }
  // },
  data () {
    return {
      // pubType: 0 全部推送; 1 条件推送
      newsData: this.dripItem
    }
  },
  methods: {
    handleEdit (newsId) {
      // 点击行进入edit页
      this.$emit('toEdit', newsId)
    },

    showConfirm (newsId) {
      const that = this
      this.$confirm({
        title: `你确定想要删除这条新闻吗? NewsID:${newsId}`,
        content: '当你点击确定按钮时，就会删除选中的这条新闻',
        okType: 'danger',
        onOk () {
          // 异步请求
          that.$emit('toDelete', newsId)
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
  width: 940px;
  overflow: hidden;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 12px 18px;
  display: flex;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  .app-list-img {
    padding-right: 20px;
    .list-img-hidden {
      overflow: hidden;
    }
    .list-info-img {
      width: 160px;
      height: 110px;
      min-height: 115px;
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
  .app-list-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .content-name {
      font-size: 16px;
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
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .content-desc {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 220px;
      .desc-views {
        margin-left: 8px;
      }
    }
    .content-desc > div > .anticon {
      font-size: 18px;
      vertical-align: middle;
    }
    .content-desc > div > span {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      vertical-align: middle;
      margin-left: 5px;
    }
  }
  .app-list-operation {
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
      .txt {
        color: rgba(0, 0, 0, 0.65);
        margin: 0 1px;
        background: #f2f4f5;
        padding: 2px 7px;
        border-radius: 3px;
        font-size: 0.9em;
        border: 1px solid #eee;
      }
    }
    .opertion-btn {
      padding: 10px 0;
    }
  }
}

.app-list:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
}
</style>
