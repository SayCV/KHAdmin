<template>
  <div class="exception">
    <div class="container">
      <div class="content">
        <h1>{{ config[type].title }}</h1>
        <p class="desc">{{ config[type].desc }}</p>
        <div class="floating">
          <img class="img" :src="config[type].img" />
        </div>
        <div class="action">
          <div class="btn" type="primary" @click="handleToHome">返回首页</div>
        </div>
      </div>
    </div>
    <div class="earth">
      <div class="col">
        <img class="earth" :src="imgUrl" alt />
      </div>
    </div>
  </div>
</template>

<script>
import types from './type'

export default {
  name: 'Exception',
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data () {
    return {
      imgUrl: 'https://weareblend.la/wp-content/themes/blend-wp-theme/images/404/earth.png?d4c3eb&d4c3eb',
      config: types
    }
  },
  methods: {
    handleToHome () {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style lang="less" scoped>
.exception {
  position: relative;
  min-height: 500px;
  height: 80%;
  height: 100vh;
  display: flex;
  justify-content: center;

  background: #000;
  .container {
    .content {
      h1 {
        font-size: 145px;
        text-align: center;
        color: #fff;
        margin: 0;
        margin-top: 6vh;
      }
      .desc {
        text-align: center;
        color: #fff;
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 16px;
      }
      .floating {
        display: flex;
        justify-content: center;
        height: 240px;
        img {
          height: 180px;
          max-width: 180px;
          position: relative;
          animation: mymove 5s infinite alternate;
          animation-timing-function: ease-in-out;
        }
        @keyframes mymove {
          from {
            top: 0px;
          }
          to {
            top: 30px;
          }
        }
      }
      .action {
        display: flex;
        justify-content: center;
        .btn {
          text-align: center;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -moz-osx-font-smoothing: grayscale;
          -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
          -webkit-transition-property: color, background-color, border-color;
          transition-property: color, background-color, border-color;
          position: relative;
          height: 45px;
          width: 170px;
          font-size: 16px;
          font-weight: 600;
          line-height: 45px;
          color: #fff;
          border: 1px solid #fff;
        }
        .btn:hover {
          cursor: pointer;
          text-align: center;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -moz-osx-font-smoothing: grayscale;
          -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
          -webkit-transition-property: color, background-color, border-color;
          transition-property: color, background-color, border-color;
          position: relative;
          height: 45px;
          width: 170px;
          line-height: 45px;
          color: #000;
          background: #fff;
          border: 1px solid rgba(255,255,255,0.9);
        }
      }
    }
  }
  .earth {
    height: 25%;
    width: 100%;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 0;
  }
}

.mobile {
  .exception {
    margin-top: 30px;
    .floating {
      padding-right: unset;

      img {
        height: 40%;
        max-width: 80%;
      }
    }
  }
}
</style>
