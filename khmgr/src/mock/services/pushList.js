import Mock from 'mockjs'
import { builder } from '../util'

// 点滴
const pushList = () => {
  return builder({
    pushLists: [
      {
        newsId: -19324687.22749032,
        title: 'tempor aliquip offici olore',
        content:
          'nisipariatur veniamestea Duisincididuntdo exercitation sed quisoccaecatUt Duis laboredeserunt utmollit consectetur cupidatat proidentdolore culpa dolor laborisreprehenderit exLorem minim fugiatlabore ametenim culpaqui laborum deserunt mollitconsequat laborum pariatur utsed dolorvelit consequat mollit aliquipad reprehenderit sitid minimdeserunt velit quis etid dolore ullamco voluptate consectetureiusmodqui Ut idreprehenderit culpa ea nonpariatur mollit velitex consectetur et Loremcupidatatetdeserunt sit aliqua cupidatatdeseruntnon amet incididuntLorem tempor anim laborein occaecat estelit Lorem laborum utofficia veniam fugiatofficia consequat enimquis idlabore veniamdo elitanim veniamaliquip dolor id aliquadolor sed commodo irureullamco fugiat inesse sed deseruntanim inut quis doloresint sitlaboris aliqua Utqui laborisadipisicing ea aliquipnulla veniam ut sintetvoluptate in utincididunt sint elit velitaliqua adipisicingut tempor mollit Loremin Excepteur sint voluptateproident ullamco in fugiat',
        listIcon: 'https://i1.hdslb.com/bfs/archive/eef3ed64d07a4b535c6409e91bc58525a3d96c0b.png@960w_600h.webp',
        createTime: '2019-6-27 19:23',
        views: 74547979,
        status: 'default'
      },
      {
        newsId: 22378072.968836978,
        title: 'Duis dolore aliquip nisireprehenderit inproident minim occaecat sedc riatur in reprehenderit',
        content:
          'enim in sunt ut ipsumpro tdeserunt nisi labor Excepteur adipisicingad v tempor aliqua commodo irure velitin tempor enim anim elitvelit sitex in estin eu sitconsequat Excepteur officia eiusmoddoloreincididunt ametofficia et quis cupidatatin consectetur ut Utametexercitation essenulla pariatur exercitation exnulla velit dolore laborissit Excepteur consectetur doloreeu laboris utdolore dolor ipsum dolor nostrudlaboris autelaborum dolor nullareprehenderit cillum dolorut esse veniam nisielitet consequatullamco officia in non cupidatatnostrudelit euut inin sint dolor laborisfugiat irure magna proident aliquipvelit mollitadipisicing sit magna laborum minimirure voluptate quiveniam ad consequat labore voluptatenon sint labore fugiat ametUt dolor dolore voluptate nisiaute veniam esseproident magna ipsum cupidatatdolor aliqua minim culpado sit magna occaecatconsectetur voluptate fugiat Ut',
        listIcon: 'https://picsum.photos/200/201',
        createTime: '2019-6-27 19:23',
        views: -40253475,
        status: 'processing'
      },
      {
        newsId: -42593184.68827491,
        title: 'commodo ut doloreculpaullamco estUt veliteuut ipsum proiden ',
        content:
          'occaecat UtLo imincididunt do inadipisicing inc labore consecteturin sed aute quisUtlabore ad Ut ea Excepteurculpa consequat elitincididunt ea officia domollit eumollit enim sit proidentnulla veniam dolor exestnostrud in aliquaaute elitest dolor etsed cupidatat minimculpaetlaborum esse quis minimtempor aliquip aute officiaipsum est elit incididuntcillum pariatur dolorcommodo doloreiusmod do idofficia occaecat veniamanim voluptate culpa eaex culpamagna cillum sint Utin elit laboris minim consequatlabore ipsummollit nisi ut irurecupidatat voluptate exconsectetur aliqua ut temporveniam ad dolorin labore magnaconsequat voluptate minimnostrudsed ut incididuntconsequat quisex occaecatlaborealiquip in ullamcoeu magnautveniam adipisicingdeserunt fugiat sunt enim consequatvelitdeserunt laborum exercitation inlaborum doloresedquiin non fugiatcupidatat Duisin laboris eulaboris Excepteur nisi mollit Duisquis dolore enimproident ad eiusmod veniam',
        listIcon: 'https://picsum.photos/200/200',
        createTime: '2019-6-27 19:23',
        views: 3686251,
        status: 'default'
      }
    ],
    pageSize: 8,
    pageNo: 1,
    totalPage: 8,
    totalCount: 57
  })
}

// 官方目标
const aims = () => {
  return builder({
    list: [
      {
        aimId: 3,
        title: '早起早睡',
        desc: 'yahaha',
        icon: 'http://172.31.214.104/khmsrv/api/resources/4b574ef2cb914693a35cd3873fb7142c',
        reminderTime: '19:23',
        value: '7',
        imgUrl: 'https://picsum.photos/120/122',
        arr: [{ week: 0 }, { week: 1 }, { week: 2 }, { week: 3 }, { week: 4 }, { week: 5 }]
      },
      {
        aimId: 1,
        title: 'tempor aliquip offici olore',
        desc:
          'nis t Duis lab roidentdolor rum deserunt mollitconsequat laborum pariatur utsed dolorvelit consequat mollit aliquipad reprehenderit sitid minimdeserunt velit quis etid dolore ullamco voluptate consectetureiusmodqui Ut idreprehenderit culpa ea nonpariatur mollit velitex consectetur et Loremcupidatatetdeserunt sit aliqua cupidatatdeseruntnon amet incididuntLorem tempor anim laborein occaecat estelit Lorem laborum utofficia veniam fugiatofficia consequat enimquis idlabore veniamdo elitanim veniamaliquip dolor id aliquadolor sed commodo irureullamco fugiat inesse sed deseruntanim inut quis doloresint sitlaboris aliqua Utqui laborisadipisicing ea aliquipnulla veniam ut sintetvoluptate in utincididunt sint elit velitaliqua adipisicingut tempor mollit Loremin Excepteur sint voluptateproident ullamco in fugiat',
        icon: 'http://172.31.214.104/khmsrv/api/resources/4b574ef2cb914693a35cd3873fb7142c',
        reminderTime: '19:23',
        imgUrl: 'https://picsum.photos/120/120',
        arr: [{ week: 0 }, { week: 1 }, { week: 2 }, { week: 3 }, { week: 4 }, { week: 5 }]
      },
      {
        aimId: 2,
        title: '早起早睡',
        desc: 'yahaha',
        icon: 'http://172.31.214.104/khmsrv/api/resources/4b574ef2cb914693a35cd3873fb7142c',
        reminderTime: '19:23',
        imgUrl: 'https://picsum.photos/120/121',
        arr: [{ week: 0 }, { week: 1 }, { week: 2 }, { week: 3 }, { week: 4 }, { week: 5 }]
      },
      {
        aimId: 4,
        title: '减脂',
        desc: '体脂率要在三个月控制到17.5%',
        icon: 'http://172.31.214.104/khmsrv/api/resources/4b574ef2cb914693a35cd3873fb7142c',
        reminderTime: '9:00',
        imgUrl: 'https://picsum.photos/121/121',
        arr: [{ week: 0 }, { week: 1 }, { week: 2 }, { week: 3 }, { week: 4 }, { week: 5 }]
      }
    ]
  })
}

Mock.mock(/\/api\/intervene\/pushLists/, 'get', pushList)
Mock.mock(/\/api\/intervene\/aims/, 'get', aims)
