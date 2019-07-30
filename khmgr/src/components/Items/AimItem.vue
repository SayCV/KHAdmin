<template>
  <!-- 目标组件 -->
  <div class="aim-item">
    <div class="aim-inner">
      <div class="aim-top">
        <div class="img">
          <img :src="aimItem.imgUrl" alt="img" />
        </div>
        <div class="aim-info">
          <div class="label">
            <div class="title">{{ aimItem.title }}</div>
            <div class="aim-btns">
              <a-button-group>
                <a-button @click="() => handleToEditAD(aimItem)">编辑</a-button>
                <a-button type="danger" @click="() => deleteConfirm(aimItem)">删除</a-button>
              </a-button-group>
            </div>
          </div>
          <div class="remind">
            <div class="icon">
              <!-- <a-icon type="github" /> -->
              <img :src="aimItem.icon" alt="img" />
            </div>
            <div class="label" v-if="aimItem.value">
              目标值&nbsp;:
              <a-tag>{{ aimItem.value }}</a-tag>
            </div>
            <div class="label">
              提醒时间&nbsp;:
              <a-tag>{{ aimItem.reminderTime }}</a-tag>
            </div>
          </div>
          <div class="desc">{{ aimItem.desc }}</div>
        </div>
      </div>
      <div class="aim-content">
        <div>
          <div class="repeat-time">
            <div class="label">
              <div class="txt">重复时间&nbsp;:</div>
            </div>
            <div class="container">
              <div class="week" v-for="item in weeks" :key="item.week">
                <a-tag color="blue">{{ translateWeek(item.week) }}</a-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 目标组件 -->
</template>

<script>

import moment from 'moment'
// import { imgFalse } from '@/core/icons'

export default {
  name: 'AimItem',
  // eslint-disable-next-line vue/require-prop-types
  // props: ['aimItem'],
  props: {
    aimItem: {
      type: Object,
      default: () => { }
      // require: true // 必填
    }
  },
  data () {
    return {
      icon: 'http://172.31.214.104/khmsrv/api/resources/4b574ef2cb914693a35cd3873fb7142c',
      weeks: this.aimItem.arr
    }
  },
  methods: {
    moment,
    translateWeek (key) {
      switch (key) {
        case 0: return '星期一'
        case 1: return '星期二'
        case 2: return '星期三'
        case 3: return '星期四'
        case 4: return '星期五'
        case 5: return '星期六'
        case 6: return '星期日'
        default: return '未知'
      }
    },
    handleToEditAD (aimItem) {
      // 点击行进入edit页
      this.$emit('toEdit', aimItem.aimId)
    },

    deleteConfirm (aimItem) {
      const that = this
      this.$confirm({
        title: `你确定想要删除这个目标吗? aimId:${aimItem.aimId}`,
        content: '当你点击确定按钮时，就会删除选中的这个目标',
        okType: 'danger',
        onOk () {
          // 异步请求
          that.$emit('toDelete', aimItem.aimId)
        },
        onCancel () {
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.aim-item {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  max-width: 575px;
  min-width: 475px;
  padding: 10px;
  margin-right: 8px;
  margin-bottom: 8px;
  .aim-inner {
    overflow: hidden;
    .aim-top {
      display: flex;
      .img {
        overflow: hidden;
        img {
          width: 140px;
          height: 110px;
        }
      }
      .aim-info {
        flex: 1;
        padding-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .label {
          display: flex;
          justify-content: space-between;
          .title {
            max-width: 150px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.85);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .remind {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 8px;

            img {
              width: 18px;
              height: 18px;
            }
          }
          .label {
            color: rgba(0, 0, 0, 0.75);
            margin-right: 8px;
            .ant-tag {
              margin-left: 8px;
            }
          }
        }
        .desc {
          min-height: 30px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-bottom: 8px;
        }
      }
    }
    .aim-content {
      margin-top: 10px;
      display: flex;

      .repeat-time {
        flex: 1;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        background-color: #fafafa;
        padding: 10px;
        padding-bottom: 0px;
        display: flex;
        .label {
          display: inline-block;
          margin-right: 8px;
          color: rgba(0, 0, 0, 0.85);
        }
        .container {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .week {
            margin-bottom: 8px;
          }
        }
      }
    }
  }
}
</style>
