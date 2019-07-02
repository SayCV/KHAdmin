import Mock from 'mockjs'
import {
  builder
} from '../util'

// HD宣教Videos
const HDVideos = () => {
  return builder({
    'videos': [{
      videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      totalTime: '02:23',
      key: '1',
      cover: 'https://picsum.photos/300/200',
      title: 'bilibili',
      content: 'B站邀请我制作一期UP学园公开课，和大家分享一下Vlog的拍摄技巧',
      createdTime: '2019-5-23'
    }, {
      videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
      totalTime: '04:23',
      key: '2',
      cover: 'https://picsum.photos/300/199',
      title: 'baidu',
      content: '今天就来和大家讲讲我的一些经验。 包括如何掌握故事核心、拍好讲话部分Aroll',
      createdTime: '2019-4-12'
    }, {
      videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      totalTime: '07:23',
      key: '3',
      cover: 'https://picsum.photos/300/198',
      title: 'google',
      content: '构图与曝光让画面看上去最舒服，插入怎样的Broll能更让大家更好理解Vlog。',
      createdTime: '2019-1-2'
    }, {
      videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      totalTime: '01:23',
      key: '4',
      cover: 'https://picsum.photos/300/197',
      title: 'tengxun',
      content: 'lishuandan',
      createdTime: '2019-4-12'
    }, {
      videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
      totalTime: '08:23',
      key: '5',
      cover: 'https://picsum.photos/300/196',
      title: 'alibaba',
      content: 'wanghuahua',
      createdTime: '2019-3-1'
    }, {
      videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
      totalTime: '04:23',
      key: '6',
      cover: 'https://picsum.photos/300/199',
      title: 'baidu',
      content: '今天就来和大家讲讲我的一些经验。 包括如何掌握故事核心、拍好讲话部分Aroll',
      createdTime: '2019-4-12'
    }, {
      videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
      totalTime: '04:23',
      key: '7',
      cover: 'https://picsum.photos/300/199',
      title: 'baidu',
      content: '今天就来和大家讲讲我的一些经验。 包括如何掌握故事核心、拍好讲话部分Aroll',
      createdTime: '2019-4-12'
    }, {
      videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
      totalTime: '04:23',
      key: '8',
      cover: 'https://picsum.photos/300/199',
      title: 'baidu',
      content: '今天就来和大家讲讲我的一些经验。 包括如何掌握故事核心、拍好讲话部分Aroll',
      createdTime: '2019-4-12'
    }, {
      videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
      totalTime: '04:23',
      key: '9',
      cover: 'https://picsum.photos/300/199',
      title: 'baidu',
      content: '今天就来和大家讲讲我的一些经验。 包括如何掌握故事核心、拍好讲话部分Aroll',
      createdTime: '2019-4-12'
    }],
    'pageSize': 8,
    'pageNo': 1,
    'totalPage': 8,
    'totalCount': 57
  })
}

// const HDVideos = () => {
//   return builder({
//     'videos': [],
//     'pageSize': 8,
//     'pageNo': 1,
//     'totalPage': 8,
//     'totalCount': 57
//   })
// }

// 正在使用的videos
// HD宣教Videos
const HDVideoUseds = () => {
  return builder({
    'videos': [{
      videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      totalTime: '02:23',
      key: '1',
      cover: '/imgs/513.jpg',
      title: 'B站邀请我制作一期UP学',
      content: 'B站邀请我制作一期UP学园公开课，和大家分享一下Vlog的拍摄技巧',
      createdTime: '2019-5-23'
    }, {
      videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
      totalTime: '04:23',
      key: '2',
      cover: '/imgs/497.jpg',
      title: '今天就来和大家讲',
      content: '今天就来和大家讲讲我的一些经验。 包括如何掌握故事核心、拍好讲话部分Aroll',
      createdTime: '2019-4-12'
    }, {
      videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      totalTime: '07:23',
      key: '3',
      cover: '/imgs/103.jpg',
      title: '构图与曝光让画面',
      content: '构图与曝光让画面看上去最舒服，插入怎样的Broll能更让大家更好理解Vlog。',
      createdTime: '2019-1-2'
    }]
  })
}
Mock.mock(/\/api\/intervene\/videos/, 'get', HDVideos)
Mock.mock(/\/api\/intervene\/videoused/, 'get', HDVideoUseds)
