<template>
  <a-layout>
    <div class="g-header">
      <global-header></global-header>
    </div>
    <a-layout-content>
      <div class="grid-container">
        <div class="grid-style-container">
          <grid-layout
            :layout="layoutLeft"
            :col-num="4"
            :colWidth="BASE_LEN"
            :row-height="BASE_LEN"
            :is-draggable="true"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[0, 0]"
            :use-css-transforms="true"
          >
            <grid-item
              v-for="item in layoutLeft"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
            >
              <div class="container">
                <MetroTile
                  :width="item.width"
                  :height="item.height"
                  :length="item.length"
                  :rotateX="item.rotateX"
                  :faceStyle="item.faceStyle || defaultFaceStyle"
                  @click="toRedirectPage(item.link)"
                >
                  <template v-if="item.i === '0'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.CustomerManage`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '1'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.EquipmentManager`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '2'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.healthGoal`) }}
                      </div>
                    </div>
                  </template>

                  <template v-else-if="item.i === '3'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.livingData`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '4'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.MedicalRecords`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '5'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.ExaminationData`) }}
                      </div>
                    </div>
                  </template>
                </MetroTile>
              </div>
            </grid-item>
          </grid-layout>
        </div>
        <div class="grid-style-container">
          <grid-layout
            :layout="layoutMiddle"
            :col-num="4"
            :colWidth="BASE_LEN"
            :row-height="BASE_LEN"
            :is-draggable="true"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[0, 0]"
            :use-css-transforms="true"
          >
            <grid-item
              v-for="item in layoutMiddle"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
            >
              <div class="container">
                <MetroTile
                  :width="item.width"
                  :height="item.height"
                  :length="item.length"
                  :rotateX="item.rotateX"
                  :faceStyle="item.faceStyle"
                  :frontStyle="item.frontStyle"
                  :topStyle="item.topStyle"
                  :backStyle="item.backStyle"
                  :bottomStyle="item.bottomStyle"
                  :perspective="item.perspective"
                  @click="toRedirectPage(item.link)"
                >
                  <template v-if="item.i === '0'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.dashboard`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '1'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.callCenter`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '2'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.workplace`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '3'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.weeklySummary`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '4'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.yearlySummary`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '5'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.groupSummary`) }}
                      </div>
                    </div>
                  </template>
                </MetroTile>
              </div>
            </grid-item>
          </grid-layout>
        </div>
        <div class="grid-style-container">
          <grid-layout
            :layout="layoutRight"
            :col-num="4"
            :colWidth="BASE_LEN"
            :row-height="BASE_LEN"
            :is-draggable="true"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[0, 0]"
            :use-css-transforms="true"
          >
            <grid-item
              v-for="item in layoutRight"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
            >
              <div class="container">
                <MetroTile
                  :width="item.width"
                  :height="item.height"
                  :length="item.length"
                  :rotateX="item.rotateX"
                  :faceStyle="item.faceStyle"
                  @click="toRedirectPage(item.link)"
                >
                  <template v-if="item.i === '0'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.healthCourse`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '1'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.healthAlert`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '2'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.healthPlan`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '3'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.goalStrategy`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '4'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.AppPush`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '5'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.TopPush`) }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '6'">
                    <div slot="front">
                      <div class="tile-label">
                        {{ $t(`${HOMR_PAGE}.VideoPush`) }}
                      </div>
                    </div>
                  </template>
                </MetroTile>
              </div>
            </grid-item>
          </grid-layout>
        </div>
        <div class="grid-style-container">
          <grid-layout
            :layout="infoLayoutMap"
            :col-num="4"
            :colWidth="BASE_LEN"
            :row-height="BASE_LEN"
            :is-draggable="true"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[0, 0]"
            :use-css-transforms="true"
          >
            <grid-item
              v-for="item in infoLayoutMap"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
            >
              <div class="container">
                <MetroTile
                  :width="item.width"
                  :height="item.height"
                  :length="item.length"
                  :rotateX="item.rotateX"
                  :faceStyle="item.faceStyle"
                  :frontStyle="item.frontStyle"
                  :topStyle="item.topStyle"
                  :backStyle="item.backStyle"
                  :bottomStyle="item.bottomStyle"
                  :perspective="item.perspective"
                >
                  <template v-if="item.i === '0'">
                    <div slot="front">
                      <div class="calendar">
                        <div class="calendar-week-day">
                          {{ weekDay }}
                        </div>
                        <div class="calendar-month-day">
                          {{ monthDay }}
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.i === '1'">
                    <div slot="front">
                      <div class="tile-label">
                        Microsoft Store
                      </div>
                      <img
                        src="https://user-images.githubusercontent.com/6414178/45696034-3fd14280-bb95-11e8-8c45-cd2020fabefc.png"
                        class="store-cover-img"
                      />
                      <div class="store-title">
                        Cyberpunk 2077
                      </div>
                      <div class="store-subtitle">
                        Free&#8314;
                      </div>
                    </div>
                    <div slot="top">
                      <div class="tile-label">
                        Microsoft Store
                      </div>
                      <img
                        src="https://user-images.githubusercontent.com/6414178/45696084-56779980-bb95-11e8-87ac-817bf448cd4f.png"
                        class="store-cover-img"
                      />
                      <div class="store-title">
                        Half-Life 3: Episode 1
                      </div>
                      <div class="store-subtitle">
                        Free&#8314;
                      </div>
                    </div>
                    <div slot="bottom">
                      <div class="tile-label">
                        Microsoft Store
                      </div>
                      <img
                        src="https://user-images.githubusercontent.com/6414178/45696072-4eb7f500-bb95-11e8-8e7c-ccb0099e5161.png"
                        class="store-cover-img"
                      />
                      <div class="store-title">
                        Grand Theft Auto VI
                      </div>
                      <div class="store-subtitle">
                        Free&#8314;
                      </div>
                    </div>
                  </template>
                  <template v-if="item.i === '2'">
                    <div slot="front">
                      <div class="weather">
                        <WeatherCard />
                      </div>
                    </div>
                  </template>
                </MetroTile>
              </div>
            </grid-item>
          </grid-layout>
        </div>
      </div>
    </a-layout-content>
    <global-footer></global-footer>
  </a-layout>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import GlobalHeader from '@/views/rootHomePage/rootHomeHeader'
import GlobalFooter from '@/views/rootHomePage/rootHomeFooter'
import MetroTile from 'vue-metro-tile'
import moment from 'moment'
import WeatherCard from '@/components/weatherCard/weatherCard'
// let _ = require('lodash')
const BASE_LEN = 65
const MARGIN = 3

export default {
  name: 'RootHomePage',
  components: {
    VueGridLayout,
    GlobalHeader,
    GlobalFooter,
    MetroTile,
    WeatherCard
  },
  data: () => ({
    HOMR_PAGE: 'rootHomePage',
    BASE_LEN,
    defaultFaceStyle: { 'background-color': '#1E90FF' },
    layoutLeft: [
      {
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        i: '0',
        link: '/customerManager',
        width: BASE_LEN * 4 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#3cb371'
        }
      },
      {
        x: 0,
        y: 2,
        w: 2,
        h: 2,
        i: '1',
        link: '/equipmentManager',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': 'blue'
        }
      },
      {
        x: 2,
        y: 4,
        w: 2,
        h: 2,
        i: '2',
        link: '/healthGoals',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#8a2be2'
        }
      },
      {
        x: 0,
        y: 6,
        w: 4,
        h: 2,
        i: '3',
        link: '/livingData',
        width: BASE_LEN * 4 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#4169e1'
        }
      },
      {
        x: 0,
        y: 8,
        w: 2,
        h: 2,
        i: '4',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#4100e1'
        }
      },
      {
        x: 2,
        y: 8,
        w: 2,
        h: 2,
        i: '5',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#0169e1'
        }
      }
    ],
    layoutMiddle: [
      {
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        i: '0',
        link: '/dashboard',
        width: BASE_LEN * 4 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#3cb371'
        }
      },
      {
        x: 0,
        y: 2,
        w: 2,
        h: 2,
        i: '1',
        link: '/callCenter',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#000'
        }
      },
      {
        x: 2,
        y: 2,
        w: 2,
        h: 2,
        i: '2',
        link: '/workplace',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        frontStyle: {
          'background-color': '#8a2be2'
        }
      },
      {
        x: 0,
        y: 4,
        w: 4,
        h: 2,
        i: '3',
        link: '/weeklySummary',
        width: BASE_LEN * 4 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#4169e1'
        }
      },
      {
        x: 0,
        y: 6,
        w: 2,
        h: 2,
        i: '4',
        link: '/yearlySummary',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#cd5c5c'
        }
      },
      {
        x: 2,
        y: 6,
        w: 2,
        h: 2,
        i: '5',
        link: '/groupSummary',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#cd5c5c'
        }
      }
    ],
    layoutRight: [
      {
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        i: '0',
        link: '/healthCourse',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#3cb371'
        }
      },
      {
        x: 2,
        y: 0,
        w: 2,
        h: 2,
        i: '1',
        link: '/healthAlert',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#000'
        }
      },
      {
        x: 0,
        y: 2,
        w: 2,
        h: 2,
        i: '2',
        link: '/healthPlan',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        frontStyle: {
          'background-color': '#8a2be2'
        }
      },
      {
        x: 2,
        y: 2,
        w: 2,
        h: 2,
        i: '3',
        link: '/goalStrategy',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#4169e1'
        }
      },
      {
        x: 0,
        y: 6,
        w: 2,
        h: 2,
        i: '4',
        link: '/AppPush',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#4169e1'
        }
      },
      {
        x: 2,
        y: 6,
        w: 2,
        h: 2,
        i: '5',
        link: '/TopPush',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#cd5c5c'
        }
      },
      {
        x: 0,
        y: 8,
        w: 2,
        h: 2,
        i: '6',
        link: '/VideoPush',
        width: BASE_LEN * 2 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#cd5c5c'
        }
      }
    ],
    infoLayoutMap: [
      {
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        i: '0',
        width: BASE_LEN * 4 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#1E90FF'
        }
      },
      {
        x: 0,
        y: 2,
        w: 2,
        h: 2,
        i: '1',
        width: BASE_LEN * 4 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#9400d3'
        }
      },
      {
        x: 0,
        y: 4,
        w: 4,
        h: 2,
        i: '2',
        width: BASE_LEN * 4 - MARGIN * 2,
        height: BASE_LEN * 2 - MARGIN * 2,
        rotateX: 0,
        faceStyle: {
          'background-color': '#4169e1'
        }
      }
    ],
    weekDay: (() => {
      const weekDayMap = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
      }
      return weekDayMap[new Date().getDay()]
    })(),
    monthDay: (() => {
      const date = moment().format('YYYY-MM-DD')
      return date.toString()
    })(),
    rotateInfoIndex: 0,
    rotateInfoArray: [-90, 90, 90, -90]
  }),
  methods: {
    setRotateX (layoutItem, rotateIndexName, rotateArray) {
      layoutItem.rotateX += rotateArray[this[rotateIndexName] % rotateArray.length]
      this[rotateIndexName] += 1
    },
    redirect () {
      window.open('https://www.baidu.com', '_blank')
      // window.location.href = REPO_URL;
    },
    toRedirectPage (route) {
      this.$router.push({
        path: route
      })
    }
  },
  mounted () {
    this.infoInterval = setInterval(() => {
      this.setRotateX(this.infoLayoutMap[1], 'rotateInfoIndex', this.rotateInfoArray)
    }, 3500)
  },
  beforeDestroy () {
    clearInterval(this.infoInterval)
  }
}
</script>

<style lang="less" scoped>
.ant-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url(~@/assets/loginbk.png);
  background-repeat: no-repeat;
  background-size: cover;

  .ant-layout-content {
    flex: auto;
    padding: 50px;
    .grid-container {
      // display: flex;
      display: grid;
      grid-template-columns: 260px 260px 260px 260px;
      grid-column-gap: 16px;
      .grid-style-container {
        display: inline-block;
        width: 260px;
        height: 100%;
      }
      .container {
        margin: 3px;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        transition: all 0.05s;
        &:hover {
          outline: #eee solid 2px;
          transition: all 0.05s;
        }
      }
    }
  }
  .tile-label {
    font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    position: absolute;
    left: 8px;
    bottom: 5px;
  }
}
.icon {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.image {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.store-icon-right {
  position: absolute;
  right: 5px;
  bottom: 5px;
  margin: auto;
}
.store-cover-img {
  position: absolute;
  left: 8px;
  top: 10px;
  height: 50px;
  width: 50px;
}
.store-title {
  font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
  font-size: 17px;
  font-weight: 400;
  color: #fff;
  position: absolute;
  top: 10px;
  left: 65px;
}
.store-subtitle {
  font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 35px;
  left: 65px;
}
.tile-label {
  font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  position: absolute;
  left: 8px;
  bottom: 5px;
}
.vue-grid-item.vue-grid-placeholder {
  background-color: transparent !important;
}
.calendar {
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
  font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
  color: #fff;
}
.calendar .calendar-week-day {
  margin-top: 20px;
  font-size: 14px;
  font-weight: 500;
}
.calendar .calendar-month-day {
  margin-top: 15px;
  font-size: 22px;
  transform: scale(1.75);
}
</style>
