import Mock from 'mockjs'
import { builder } from '../util'

// 基础数据-客户管理
const customerInfoTable = () => {
  return builder({
    data: [
      {
        accountId: '1001',
        userId: '10049',
        no: '12',
        key: 1,
        name: '李黑帅',
        age: '12',
        sex: '男',
        group: '普通用户',
        workplace: '阿里巴巴',
        healthRate: 'A',
        report: 'eu sit',
        status: 0,
        createdTime: '2019-4-12',
        birthday: '1990-12-9'
      },
      {
        accountId: '1002',
        userId: '10032',
        no: '7',
        key: 1,
        name: '强啊强',
        age: '12',
        sex: '女',
        group: '一星用户',
        workplace: '阿里巴巴',
        healthRate: 'D',
        report: 'do dolor ipsum',
        status: 0,
        createdTime: '2019-3-15',
        birthday: '1990-12-9'
      },
      {
        accountId: '1003',
        userId: '10077',
        no: '8',
        key: 1,
        name: '强啊强',
        age: '65',
        sex: '女',
        group: '普通用户',
        workplace: '阿里巴巴',
        healthRate: 'A',
        report: 'labore sit esse dolor proident',
        status: 0,
        createdTime: '2019-3-15',
        birthday: '1990-12-9'
      },
      {
        accountId: '1004',
        userId: '10032',
        no: '8',
        key: 1,
        name: '强啊强',
        age: '65',
        sex: '男',
        group: '普通用户',
        workplace: '海康威视',
        healthRate: 'A',
        report: 'Lorem laborum',
        status: 0,
        createdTime: '2019-1-12',
        birthday: '1990-12-9'
      }
    ],
    pageSize: 10,
    pageNo: 1,
    totalCount: 66,
    totalPage: 10
  })
}

// 基础数据-健康管理师
const khmanagerInfoTable = () => {
  return builder({
    data: [
      {
        accountId: '1001',
        username: '137*******',
        secondOrganizaton: '杭州西湖区',
        key: 1,
        name: '李黑帅',
        grade: '一级',
        createdTime: '2019-4-12'
      },
      {
        accountId: '1002',
        username: '137*******',
        secondOrganizaton: '杭州西湖区',
        key: 2,
        name: '王花花',
        grade: '一级',
        createdTime: '2019-4-12'
      },
      {
        accountId: '1003',
        username: '133*******',
        secondOrganizaton: '杭州西湖区',
        key: 3,
        name: '强啊强',
        grade: '一级',
        createdTime: '2019-4-12'
      }
    ],
    pageSize: 10,
    pageNo: 1,
    totalCount: 23,
    totalPage: 10
  })
}

// 基础数据-设备管理
const devicesTable = () => {
  return builder({
    data: [
      {
        equipmentId: '10001',
        category: '马桶盖',
        bindAccountId: '1001',
        key: 1,
        status: '在线',
        createdTime: '2019-4-12'
      },
      {
        equipmentId: '10002',
        category: '马桶盖',
        bindAccountId: '1001',
        key: 2,
        status: '在线',
        createdTime: '2019-4-12'
      },
      {
        equipmentId: '10003',
        category: '智能手环',
        bindAccountId: '1001',
        key: 3,
        status: '在线',
        createdTime: '2019-4-12'
      },
      {
        equipmentId: '10004',
        category: '心率检测仪',
        bindAccountId: '1001',
        key: 4,
        status: '在线',
        createdTime: '2019-4-12'
      }
    ],
    pageSize: 10,
    pageNo: 1,
    totalCount: 23,
    totalPage: 10
  })
}
// 基础数据-客户管理-详细信息
const accountInfo = () => {
  return builder({
    data: {
      avatar: 'https://picsum.photos/id/964/200/200',
      identityId: '51012xxxxxxxx',
      nation: '汉族',
      phone: '133******',
      email: 'amin@admin.com',
      username: '李黑帅',
      usergroup: 'vip',
      maritalstatus: '未婚',
      education: '本科',
      address: '浙江省杭州市余杭区仓前小镇海曙路2318号杭州师范大学',
      accountId: '1001',
      userId: '1001',
      no: '001',
      key: 66666,
      name: '李栓蛋',
      age: '22',
      sex: '男',
      workplace: '阿里巴巴',
      healthRate: 'A',
      report: '无',
      status: 200,
      createdTime: '2018-3-14',
      birthday: '1999-6-23'
    }
  })
}
// 基础数据-健康管理-详细信息
const khmanagerInfo = () => {
  return builder({
    data: {
      organization: '杭州西湖',
      username: '137**********',
      AccountId: '1001',
      name: '张**',
      grade: '一级',
      createdTime: '2018-3-14',
      address: '浙江省杭州市余杭区仓前小镇海曙路2318号杭州师范大学',
      email: 'admin@admin.com',
      producer: '杭州中芯电子有限公司',
      phone: '133*********'
    }
  })
}
// 基础数据-设备管理-详细信息
const equipmentInfo = () => {
  return builder({
    data: {
      equipmentId: '51012xxxxxxxx',
      category: '马桶盖',
      bindAccountId: '1001',
      status: '在线',
      untiType: 'TCR12110-1',
      createdTime: '2018-3-14',
      IP: '192.168.1.1',
      address: '浙江省杭州市余杭区仓前小镇海曙路2318号杭州师范大学',
      countTime: '150h',
      producer: '杭州中芯电子有限公司',
      phone: '133*********'
    }
  })
}
// 健康档案-健康报告
const healthReportTable = () => {
  return builder({
    data: [
      {
        accountId: '1001',
        name: '李栓蛋',
        sex: '女',
        healthRate: 'A',
        record: '有'
      },
      {
        accountId: '1002',
        name: '王花花',
        sex: '女',
        healthRate: 'B',
        record: '有'
      },
      {
        accountId: '1003',
        name: '王花花',
        sex: '女',
        healthRate: 'B',
        record: '有'
      },
      {
        accountId: '1004',
        name: '王花花',
        sex: '女',
        healthRate: 'C',
        record: '有'
      },
      {
        accountId: '1005',
        name: '王花花',
        sex: '女',
        healthRate: 'B',
        record: '有'
      },
      {
        accountId: '1006',
        name: '王花花',
        sex: '女',
        healthRate: 'B',
        record: '有'
      }
    ],
    pageSize: 10,
    pageNo: 1,
    totalPage: 6,
    totalCount: 57
  })
}
// 生活数据
const livingDataTable = () => {
  return builder({
    data: [
      {
        userId: '1001',
        personId: '1',
        name: '李栓蛋',
        sex: '女',
        age: '22',
        lastTime: '2019-7-11 15:25',
        lastEquipmentId: '10000001'
      },
      {
        userId: '1002',
        personId: '2',
        name: '王花花',
        sex: '女',
        age: '22',
        lastTime: '2019-7-11 15:25',
        lastEquipmentId: '10000001'
      },
      {
        userId: '1003',
        personId: '3',
        name: '强啊强',
        sex: '女',
        age: '22',
        lastTime: '2019-7-11 15:25',
        lastEquipmentId: '10000001'
      },
      {
        userId: '1004',
        personId: '4',
        name: '豪啊豪',
        sex: '女',
        age: '22',
        lastTime: '2019-7-11 15:25',
        lastEquipmentId: '10000001'
      },
      {
        userId: '1005',
        personId: '5',
        name: '悦啊悦',
        sex: '女',
        age: '22',
        lastTime: '2019-7-11 15:25',
        lastEquipmentId: '10000001'
      },
      {
        userId: '1006',
        personId: '6',
        name: '雨啊雨',
        sex: '女',
        age: '22',
        lastTime: '2019-7-11 15:25',
        lastEquipmentId: '10000001'
      }
    ],
    pageSize: 10,
    pageNo: 1,
    totalPage: 6,
    totalCount: 57
  })
}

// 生活数据详情
const livingDataInfo = () => {
  return builder({
    data: [
      {
        label: '体重',
        value: '55',
        reference: '60',
        unit: 'KG'
      },
      {
        label: '心率',
        value: '55',
        reference: '786',
        unit: 'qq'
      },
      {
        label: '阻抗',
        value: '55',
        reference: '60',
        unit: 'rwr'
      },
      {
        label: '脂肪率',
        value: '55',
        reference: '60',
        unit: 'qwr'
      },
      {
        label: '水分率',
        value: '25',
        reference: '14',
        unit: 'sdf'
      },
      {
        label: '基础代谢值',
        value: '85',
        reference: '41',
        unit: 'aa'
      },
      {
        label: '内脏脂肪等级',
        value: '55',
        reference: '60',
        unit: 'KwwG'
      },
      {
        label: '肌肉量',
        value: '58',
        reference: '7',
        unit: 'KG'
      },
      {
        label: '骨密度',
        value: '37',
        reference: '60',
        unit: 'aa'
      },
      {
        label: '蛋白质',
        value: '786',
        reference: '77',
        unit: 'KG'
      },
      {
        label: 'BMI',
        value: '73',
        reference: '60',
        unit: 'ww'
      },
      {
        label: '如厕时间',
        value: '77',
        reference: '873',
        unit: 'KG'
      },
      {
        label: '步数',
        value: '8',
        reference: '60',
        unit: 'mm'
      }
    ]
  })
}

Mock.mock(/\/api\/basedata\/userlist/, 'get', customerInfoTable)
Mock.mock(/\/api\/account\/userlist\/info/, 'get', accountInfo)
Mock.mock(/\/api\/basedata\/managerlist/, 'get', khmanagerInfoTable)
Mock.mock(/\/api\/basedata\/healthreport\/info/, 'get', khmanagerInfo)
Mock.mock(/\/api\/basedata\/equipmentlist/, 'get', devicesTable)
Mock.mock(/\/api\/equipmentlistItem\/item/, 'get', equipmentInfo)
Mock.mock(/\/api\/record\/healthreport/, 'get', healthReportTable)
Mock.mock(/\/api\/record\/livingdata\/table/, 'get', livingDataTable)
Mock.mock(/\/api\/record\/livingdata\/info/, 'get', livingDataInfo)
