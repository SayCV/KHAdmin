<template>
  <div class="weather-card">
    <div class="top">
      <div class="city">
        <span class="name">
          <a-icon type="environment" /></span>
        <span class="val">{{ weather.city||'--' }}</span>
      </div>
      <div class="container">
        <div class="air">
          <span class="name">当前温度:</span>
          <span class="val">
            <a-tag color="blue">{{ `${weather.tem||'--'} ℃` }}</a-tag>
          </span>
        </div>
        <div class="air">
          <span class="name">空气质量:</span>
          <span class="val">
            <a-tag color="blue">{{ weather.air_level || '--' }}</a-tag>
          </span>
        </div>
      </div>
    </div>
    <div class="text">
      {{ weather.air_tips }}
    </div>
  </div>
</template>

<script>
import { getWeather } from '@/api/rootHomePage'
export default {
  name: 'WeatherCard',
  data: () => ({
    weather: {}
  }),
  mounted () {
    this.initWeather()
  },
  methods: {
    initWeather () {
      getWeather().then(({ data }) => {
        this.weather = data || {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.weather-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 124px;
  height: 100%;
  padding: 12px 12px 0 12px;
  color: #fff;
  overflow: hidden;
  .top {
    display: flex;
    justify-content: space-around;
    .city {
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      line-height: 50px;
      margin-right: 10px;
      .name {
        margin-right: 8px;
        line-height: 50px;
        font-size: 24px;
      }
      .val {
        font-size: 24px;
        font-weight: 500;
        line-height: 50px;
      }
    }
    .container {
      .air {
        margin-bottom: 4px;
        .name {
          margin-right: 8px;
        }
      }
    }
  }
  .text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 6px;
  }
}
</style>
