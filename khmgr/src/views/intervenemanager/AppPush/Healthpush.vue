<template>
  <a-card :bordered="false">
    <div
      class="no-pushLists"
      v-if="NoPushLists"
    >
      <div class="null-svg"></div>
      <div class="null-txt">
        <h2>还没有上传过视频yo</h2>
      </div>
    </div>
    <div class="app-container" v-else>
      <div class="app-top">
        <a-button class="refresh" @click="() => handleRefresh()">刷新</a-button>
        <a-button type="primary" @click="() => handleAdd()">
          <a-icon type="plus" />新建点滴
        </a-button>
      </div>
      <div class="app-main">
        <div class="app-list" v-for="pushList in pushLists" :key="pushList.newsId">
          <div class="app-list-img">
            <div class="list-img-hidden">
              <div class="list-info-img" :style="{ backgroundImage: 'url(' + pushList.cover + ')' }"></div>
            </div>
          </div>
          <div class="app-list-content">
            <div class="content-top">
              <div class="content-name">{{ pushList.title }}</div>
              <div class="content-txt">{{ pushList.summary }}</div>
            </div>
            <div class="content-desc">
              <div class="tag-time">
                <a-tag color="geekblue">{{ pushList.dateTime.substring(0, 16) }}</a-tag>
              </div>
              <div class="desc-views">
                <a-icon type="eye" theme="twoTone" />
                <span>{{ pushList.views }}</span>
              </div>
            </div>
          </div>
          <div class="app-list-operation">
            <div class="operation-desc">
              <div class="operation-status">
                <span>状态 :</span>
                <a-badge :status="pushList.status" :text="pushList.statusTxt" />
              </div>
              <div class="operation-desc-txt">
                <div>消息类型 : <span>{{ pushList.msgcategory }}</span> </div>
                <div>发送人群 : <span>{{ pushList.msgRq }}</span> </div>
                <div>发送成功 : <span>{{ pushList.msgSuccess }}</span> </div>
                <div>发送失败 : <span>{{ pushList.msgFalse }}</span> </div>
              </div>
            </div>
            <div class="opertion-btn">
              <a-button-group>
                <a-button @click="() => handleEdit(pushList.newsId)">编辑</a-button>
                <a-button type="danger">删除</a-button>
              </a-button-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'Healthpush',
  data () {
    return {
      NoPushLists: false,
      pushLists: [],
      totalCount: null,
      current: 1,
      pageSize: 8
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    // 获取数据
    fetch (params = {}) {
      console.log('params:', params)
      Axios({
        // url: `/api/intervene/pushLists/?pageSize=${this.pageSize}&currentPage=${this.current}`,
        // url: '/api/intervene/pushLists/', // 本地mock数据
        url: '/api/admin/news', // 后台数据
        method: 'get',
        params: {
          ...params
        }
      }).then(res => {
        console.log('获取健康点滴列表', res)
        // 后台数据
        // this.totalCount = res.data.result.totalCount
        if (res.data.length === 0) {
          this.NoPushLists = true
          this.pushLists = []
        } else {
          this.NoPushLists = false
          this.pushLists = res.data
        }
      })
    },
    handleEdit (newsId) {
      // 点击行进入edit页
      this.$router.push({
        path: '/intervenemanager/Healthpush/edit',
        query: {
          newsId: newsId
        }
      })
    },
    handleAdd () {
      // 点击行进入add页
      this.$router.push({
        path: '/intervenemanager/Healthpush/add'
      })
    },
    handleRefresh () {
      // news列表刷新
      this.fetch()
    }
  }
}
</script>

<style lang="less" scoped>

.app-top {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .refresh {
    margin-right: 16px;
  }
}
.app-main {
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  border-top-left-radius: 0;
  display: block;
  padding: 20px;
  // padding: 20px 0;
}
.app-main > .app-list:last-child {
  margin-bottom: 0;
}
.app-main::before {
  content: '点滴内容';
  position: absolute;
  left: -1px;
  top: -36px;
  font-size: 16px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  padding: 0 16px;
  border: 1px solid #d9d9d9;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  color: #2f54eb;
  background: #f0f5ff;
  border-color: #adc6ff;
}
.app-main .app-list {
  width: 100%;
  overflow: hidden;
  // border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.app-main .app-list:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
}
.app-main .app-list-img {
  padding-right: 20px;
  .list-img-hidden {
    overflow: hidden;
  }
  .list-info-img {
    width: 200px;
    min-height: 200px;
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
.app-main .app-list-content {
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
    flex-direction: row;
    // justify-content: space-around;
    align-items: center;
    width: 220px;
    padding: 10px 0;
    .desc-views {
      margin-left:8px;
    }
  }
  .content-desc > div > .anticon {
    font-size:18px;
    vertical-align: middle;
  }
  .content-desc > div > span {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    vertical-align: middle;
    margin-left: 5px;
  }
}
.app-main .app-list-operation {
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
