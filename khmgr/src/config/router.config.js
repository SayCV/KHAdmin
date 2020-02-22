// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

// 去除按权限添加路由默认全局admin src/store/modules/permission
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'sideMenu.homePage' },
    // redirect: '/dashboard/workplace',
    children: [
      // 基础数据
      {
        path: '/customerManager',
        name: 'CustomerManager', // 我的客户
        component: RouteView,
        meta: { title: 'sideMenu.myCustomer.name', keepAlive: true, icon: 'table', permission: ['table'] },
        redirect: '/customerManager/table',
        children: [
          {
            path: '/customerManager/table',
            name: 'CustomerTable',
            component: () => import('@/views/basicdata/customer/CustomerTable'),
            meta: { title: 'sideMenu.myCustomer.table', keepAlive: true, hidden: true, permission: ['table'] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/customerManager/table/info',
                name: 'CustomerInfo',
                component: () => import('@/views/basicdata/customer/CustomerInfo'),
                hidden: true,
                meta: { title: 'sideMenu.myCustomer.info', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/customerManager/table/edit',
                name: 'CustomerEditInfo',
                component: () => import('@/views/basicdata/customer/EditCusInfo'),
                hidden: true,
                meta: { title: 'sideMenu.myCustomer.edit', keepAlive: true, hidden: true, permission: ['table'] }
              }
            ]
          },
          {
            path: '/customerManager/add',
            name: 'AddCustomer',
            component: () => import('@/views/basicdata/customer/AddCustomer'),
            meta: { title: 'sideMenu.myCustomer.add', keepAlive: true, hidden: true, permission: ['table'] }
          },
          {
            path: '/customerManager/create',
            name: 'CreateCustomer',
            component: () => import('@/views/basicdata/customer/CreateCustomer'),
            meta: { title: 'sideMenu.myCustomer.create', keepAlive: true, hidden: true, permission: ['table'] }
          }
        ]
      },
      {
        path: '/equipmentManager',
        name: 'EquipmentManager', // 设备管理
        component: RouteView,
        meta: { title: 'sideMenu.equipment.name', keepAlive: true, icon: 'table', permission: ['table'] },
        redirect: '/equipmentManager/table',
        children: [
          {
            path: '/equipmentManager/table',
            name: 'EquipmentTable',
            component: () => import('@/views/basicdata/equipment/EquipmentTable'),
            meta: { title: 'sideMenu.equipment.table', keepAlive: true, hidden: true, permission: ['table'] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/equipmentManager/table/info',
                name: 'EquipmentmanagerInfo',
                component: () => import('@/views/basicdata/equipment/equipmentInfo'),
                meta: { title: 'sideMenu.equipment.info', keepAlive: true, hidden: true, permission: ['table'] },
                hidden: true
              },
              {
                path: '/equipmentManager/table/edit',
                name: 'EquipmentmanagerEdit',
                component: () => import('@/views/basicdata/equipment/equipmentEdit'),
                meta: { title: 'sideMenu.equipment.edit', keepAlive: true, hidden: true, permission: ['table'] },
                hidden: true
              }
            ]
          }
        ]
      },
      {
        path: '/healthGoals',
        name: 'healthGoals', // 健康小目标
        component: RouteView,
        meta: { title: 'sideMenu.healthGoal.name', keepAlive: true, icon: 'table', permission: ['table'] },
        redirect: '/healthGoals/table',
        children: [
          {
            path: '/healthGoals/table',
            name: 'HealthGoalsTable',
            component: () => import('@/views/basicdata/healthgoal/healthGoalsTable'),
            meta: { title: 'sideMenu.healthGoal.table', keepAlive: true, hidden: true, permission: ['table'] },
            // hideChildrenInMenu: true,
            children: [
              {
                path: '/healthGoals/table/info',
                name: 'HealthGoalsInfo',
                component: () => import('@/views/basicdata/healthgoal/healthGoalsInfo'),
                // hidden: true,
                meta: { title: 'sideMenu.healthGoal.info', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/healthGoals/table/edit',
                name: 'HealthGoalsEdit',
                component: () => import('@/views/basicdata/healthgoal/healthGoalsEdit'),
                // hidden: true,
                meta: { title: 'sideMenu.healthGoal.edit', keepAlive: true, hidden: true, permission: ['table'] }
              }
            ]
          }
        ]
      },
      {
        path: '/livingData',
        name: 'LivingData',
        component: RouteView,
        meta: { title: 'sideMenu.livingData.name', keepAlive: true, icon: 'table', permission: ['table'] },
        redirect: '/livingData/userTable',
        children: [
          {
            path: '/livingData/userTable',
            name: 'LivingUserTable',
            component: () => import('@/views/basicdata/livingData/LivingTable'),
            meta: { title: 'sideMenu.livingData.table', keepAlive: true, hidden: false },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/livingData/userTable/person/list',
                name: 'PersonList',
                component: () => import('@/views/basicdata/livingData/personData/PersonList'),
                meta: { title: 'sideMenu.livingData.person', keepAlive: true, hidden: true }
              },
              {
                path: '/livingData/userTable/person/data',
                name: 'PersonInfoData',
                component: () => import('@/views/basicdata/livingData/personData/InfoData'),
                meta: { title: 'sideMenu.livingData.personData', keepAlive: true, hidden: true }
              }
            ]
          }
        ]
      },
      {
        path: '/EMR',
        name: 'EMR', // EMR electronic medical record 电子病历
        component: () => import('@/views/basicdata/EMR'),
        meta: { title: 'sideMenu.EMR.name', keepAlive: true, permission: ['table'] }
      },
      {
        path: '/PED',
        name: 'PED', // PED physical examination data 体检数据
        component: () => import('../views/basicdata/PED'),
        meta: { title: 'sideMenu.PED.name', permission: ['table'] }
      },
      // 健康监测
      {
        path: '/dashboard',
        name: 'dashboard', // 仪表盘
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: 'sideMenu.dashboard.name', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis', // 日报分析
            component: () => import('@/views/monitoring/dashboard/Analysis'),
            meta: { title: 'sideMenu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/callCenter',
        name: 'callCenter', // 呼叫中心
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: 'sideMenu.callCenter.name', keepAlive: true, icon: 'table', permission: ['dashboard'] }
      },
      {
        path: '/workplace',
        name: 'Workplace', // 工作台
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: 'sideMenu.workplace.name', keepAlive: true, icon: 'table', permission: ['dashboard'] }
      },
      {
        path: '/weeklySummary',
        name: 'WeeklySummary', // 每周个人健康小结
        component: RouteView,
        meta: { title: 'sideMenu.weeklySummary.name', keepAlive: true, icon: 'table', permission: ['table'] },
        redirect: '/weeklySummary/table',
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/weeklySummary/table',
            name: 'WeeklySummaryTable',
            component: () => import('@/views/intervenemanager/WeeklySummary/WeeklySummary'),
            meta: { title: 'sideMenu.weeklySummary.table', keepAlive: true, hidden: true, permission: ['table'] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/weeklySummary/info',
                name: 'WeeklySummaryInfo',
                component: () => import('@/views/intervenemanager/WeeklySummary/WSInfo'),
                meta: { title: 'sideMenu.weeklySummary.info', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/weeklySummary/edit',
                name: 'WeeklySummaryEdit',
                component: () => import('@/views/intervenemanager/WeeklySummary/WSEdit'),
                meta: { title: 'sideMenu.weeklySummary.edit', keepAlive: true, hidden: true, permission: ['table'] }
              }
            ]
          }
        ]
      },
      {
        path: '/yearlySummary',
        name: 'HealthReport', // 多维健康报告
        component: RouteView,
        meta: { title: 'sideMenu.yearlySummary.name', keepAlive: true, icon: 'table', permission: ['table'] },
        redirect: '/report/HealthReport/table',
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/report/HealthReport/table',
            name: 'HealthReportTable',
            component: () => import('@/views/report/HealthReport/HealthReport'),
            meta: { title: 'sideMenu.yearlySummary.table', keepAlive: true, hidden: true, permission: ['table'] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/report/HealthReport/info',
                name: 'HealthReportInfo',
                component: () => import('@/views/report/HealthReport/HRInfo'),
                meta: { title: 'sideMenu.yearlySummary.info', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/report/HealthReport/edit',
                name: 'HealthReportEdit',
                component: () => import('@/views/report/HealthReport/HREdit'),
                meta: { title: 'sideMenu.yearlySummary.edit', keepAlive: true, hidden: true, permission: ['table'] }
              }
            ]
          }
        ]
      },
      // 团体健康报告
      // 干预管理
      {
        path: '/healthCourse',
        name: 'HealthCourse', // 健康课程
        component: RouteView,
        meta: { title: '健康课程', keepAlive: true, icon: 'table' },
        redirect: '/healthCourse/table',
        children: [
          {
            path: '/healthCourse/table',
            name: 'CourseTable',
            component: () => import('@/views/intervention/healthCourse/courseTable'),
            meta: { title: '课程列表', keepAlive: true, hidden: true, permission: ['table'] }
          }
        ]
      },
      {
        path: '/healthAlert',
        name: 'HealthAlert', // 健康预警
        component: RouteView,
        meta: { title: '健康预警', keepAlive: true, icon: 'table' },
        redirect: '/healthAlert/table',
        children: [
          {
            path: '/healthAlert/table',
            name: 'AlertTable',
            component: () => import('@/views/intervention/healthAlert/alertTable'),
            meta: { title: '预警列表', keepAlive: true, hidden: true, permission: ['table'] }
          }
        ]
      },
      {
        path: '/healthPlan',
        name: 'HealthPlan', // 健康计划
        component: RouteView,
        meta: { title: '健康计划', keepAlive: true, icon: 'table' },
        redirect: '/healthPlan/table',
        children: [
          {
            path: '/healthPlan/table',
            name: 'PlanTable',
            component: () => import('@/views/intervention/healthPlan/planTable'),
            meta: { title: '计划列表', keepAlive: true, hidden: true, permission: ['table'] }
          }
        ]
      },
      {
        path: '/goalSet',
        name: 'GoalSet', // 小目标设定与策略
        component: RouteView,
        meta: { title: '小目标设定策略', keepAlive: true, icon: 'table', permission: ['profile'] },
        redirect: '/goalSet/quantifGoal/q',
        children: [
          {
            path: '/goalSet/quantifGoal/q',
            name: 'SetQuanGoal',
            component: () => import('@/views/intervention/goalSet/TagIndex'),
            meta: { title: '指标类', keepAlive: true, permission: ['profile'] },
            redirect: '/goalSet/quantifGoal/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/goalSet/quantifGoal/list',
                name: 'QuantitativeGoal',
                component: () => import('@/views/intervention/goalSet/Quantized/QuantitativeGoal'),
                meta: { title: '量化目标', keepAlive: true }
              },
              {
                path: '/goalSet/quantifGoal/edit',
                name: 'EditQuanGoal',
                component: () => import('@/views/intervention/goalSet/Quantized/EditQuanGoal'),
                meta: { title: '编辑量化目标', keepAlive: true }
              }
            ]
          },
          {
            path: '/goalSet/addGoal',
            name: 'AddGoal',
            component: () => import('@/views/intervention/goalSet/AddGoal'),
            meta: { title: '添加目标', keepAlive: true }
          },
          {
            path: '/goalSet/unquantifGoal/uq',
            name: 'SetUnquanGoal',
            component: () => import('@/views/intervention/goalSet/TagIndex'),
            meta: { title: '生活习惯类', keepAlive: true, permission: ['profile'] },
            redirect: '/goalSet/unquantifGoal/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/goalSet/unquantifGoal/list',
                name: 'UnquantitativeGoal',
                component: () => import('@/views/intervention/goalSet/Unquantized/UnquantitativeGoal'),
                meta: { title: '非量化目标', keepAlive: true }
              },
              {
                path: '/goalSet/unquantifGoal/edit',
                name: 'EditUnquanGoal',
                component: () => import('@/views/intervention/goalSet/Unquantized/EditUnquanGoal'),
                meta: { title: '编辑非量化目标', keepAlive: true }
              }
            ]
          }
        ]
      },
      {
        path: '/healthBit',
        name: 'HealthBit', // APP健康点滴
        component: RouteView,
        meta: { title: 'APP健康点滴', keepAlive: true, icon: 'table', permission: ['profile'] },
        redirect: '/healthBit/list',
        children: [
          {
            path: '/healthBit/list',
            name: 'HealthBits',
            component: () => import('@/views/intervention/healthBit/healthBits'),
            meta: { title: '点滴内容', keepAlive: true, permission: ['profile'] }
          },
          {
            path: '/healthBit/add',
            name: 'CreateBit',
            component: () => import('@/views/intervention/healthBit/createBit'),
            meta: { title: '新建点滴', keepAlive: true, permission: ['profile'] }
          },
          {
            path: '/healthBit/edit',
            name: 'EditBit',
            component: () => import('@/views/intervention/healthBit/editBit'),
            meta: { title: '编辑点滴', keepAlive: true, permission: ['profile'] }
          }
        ]
      },
      {
        path: '/headline',
        name: 'Headline', // APP头条消息
        component: RouteView,
        meta: { title: 'APP头条消息', keepAlive: true, icon: 'table', permission: ['profile'] },
        redirect: '/headline/list',
        children: [
          {
            path: '/headline/list',
            name: 'Headlines',
            component: () => import('@/views/intervention/headline/headlines'),
            meta: { title: '头条内容', keepAlive: true, permission: ['profile'] }
          },
          {
            path: '/headline/add',
            name: 'CreateHeadline',
            component: () => import('@/views/intervention/headline/createHeadline'),
            meta: { title: '新建头条', keepAlive: true, permission: ['profile'] }
          },
          {
            path: '/headline/edit',
            name: 'EditHeadline',
            component: () => import('@/views/intervention/headline/editHeadline'),
            meta: { title: '编辑头条', keepAlive: true, permission: ['profile'] }
          }
        ]
      },
      {
        path: '/videos',
        name: 'Videos', // HD视频宣教
        component: RouteView,
        meta: { title: 'HD视频宣教', keepAlive: true, icon: 'table', permission: ['profile'] },
        redirect: '/videos/allvideos',
        children: [
          {
            path: '/videos/allvideos',
            name: 'AllVideos',
            component: () => import('@/views/intervention/videos/AllVideos'),
            meta: { title: '全部视频', keepAlive: true, permission: ['profile'] }
          },
          {
            path: '/videos/videopush',
            name: 'VideoPush',
            component: () => import('@/views/intervention/videos/VideoPush'),
            meta: { title: '上传视频', permission: ['profile'] }
          },
          {
            path: '/videos/videoused',
            name: 'HDVideoOnPaid',
            component: () => import('@/views/intervention/videos/HDVideoOnPaid'),
            meta: { title: '已用视频', keepAlive: true, permission: ['profile'] }
          },
          {
            path: '/videos/videoedit',
            name: 'VideoEdit',
            component: () => import('@/views/intervention/videos/VideoEdit'),
            meta: { title: '编辑视频', keepAlive: true, permission: ['profile'] }
          }
        ]
      },
      // 新路由树
      // basicdata 基础数据
      // {
      //   path: '/basicdata',
      //   name: 'basicdata',
      //   redirect: '/basicdata/Customermanage',
      //   component: PageView,
      //   meta: { title: '基础数据', icon: 'table', permission: ['table'] },
      //   children: [
      //     {
      //       path: '/basicdata/Customermanage',
      //       name: 'Customermanage',
      //       component: () => import('@/views/basicdata/Index'),
      //       meta: { title: '客户管理', keepAlive: true, hideHeader: true, permission: ['table'] },
      //       redirect: '/basicdata/Customermanage/table',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/basicdata/Customermanage/table',
      //           name: 'CustomerTable',
      //           component: () => import('@/views/basicdata/customer/CustomerTable'),
      //           meta: { title: '客户信息表', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/basicdata/Customermanage/add',
      //           name: 'AddCustomer',
      //           component: () => import('@/views/basicdata/customer/AddCustomer'),
      //           meta: { title: '添加客户页', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/basicdata/Customermanage/create',
      //           name: 'CreateCustomer',
      //           component: () => import('@/views/basicdata/customer/CreateCustomer'),
      //           meta: { title: '创建客户', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/basicdata/Customermanage/info',
      //           name: 'CustomerInfo',
      //           component: () => import('@/views/basicdata/customer/CustomerInfo'),
      //           meta: { title: '客户详情页', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/basicdata/Customermanage/edit',
      //           name: 'CustomerEditInfo',
      //           component: () => import('@/views/basicdata/customer/EditCusInfo'),
      //           meta: { title: '客户编辑页', keepAlive: true, hidden: true, permission: ['table'] }
      //         }
      //       ]
      //     },
      //     {
      //       path: '/basicdata/Healthmanager',
      //       name: 'Healthmanager',
      //       component: () => import('@/views/basicdata/Index'),
      //       meta: { title: '健管师管理', keepAlive: true, permission: ['table'] },
      //       redirect: '/basicdata/Healthmanager/table',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/basicdata/Healthmanager/table',
      //           name: 'HealthmanagerTable',
      //           component: () => import('@/views/basicdata/khmanager/Healthmanager'),
      //           meta: { title: '健管师信息表', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/basicdata/Healthmanager/info',
      //           name: 'HealthmanagerInfo',
      //           component: () => import('@/views/basicdata/khmanager/khManagerinfo'),
      //           meta: { title: '健管师详情页', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/basicdata/Healthmanager/edit',
      //           name: 'HealthmanagerEdit',
      //           component: () => import('@/views/basicdata/khmanager/khManagerEdit'),
      //           meta: { title: '健管师编辑页', keepAlive: true, hidden: true, permission: ['table'] }
      //         }
      //       ]
      //     },
      //     {
      //       path: '/basicdata/Equipmentmanager',
      //       name: 'Equipmentmanager',
      //       component: () => import('@/views/basicdata/Index'),
      //       meta: { title: '设备管理', keepAlive: true, permission: ['table'] },
      //       redirect: '/basicdata/Equipmentmanager/table',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/basicdata/Equipmentmanager/table',
      //           name: 'EquipmentmanagerTable',
      //           component: () => import('@/views/basicdata/equipment/EquipmentTable'),
      //           meta: { title: '设备信息表', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/basicdata/Equipmentmanager/info',
      //           name: 'EquipmentmanagerInfo',
      //           component: () => import('@/views/basicdata/equipment/equipmentInfo'),
      //           meta: { title: '设备详情页', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/basicdata/Equipmentmanager/edit',
      //           name: 'EquipmentmanagerEdit',
      //           component: () => import('@/views/basicdata/equipment/equipmentEdit'),
      //           meta: { title: '设备编辑页', keepAlive: true, hidden: true, permission: ['table'] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // 健康档案 healthrecord
      // {
      //   path: '/record',
      //   name: 'record',
      //   component: PageView,
      //   // redirect: '/record/HealthReport',
      //   meta: { title: '健康档案', icon: 'table', permission: ['table'] },
      //   children: [
      //     {
      //       path: '/record/livingData',
      //       name: 'LifeData',
      //       component: () => import('@/views/record/Index'),
      //       meta: { title: '生活数据', keepAlive: true, permission: ['table'] },
      //       hideChildrenInMenu: true,
      //       redirect: '/record/livingData/table',
      //       children: [
      //         {
      //           path: '/record/livingData/table',
      //           name: 'LivingTable',
      //           component: () => import('@/views/record/livingData/LivingTable'),
      //           meta: { title: '用户列表', keepAlive: true, hidden: true }
      //         },
      //         {
      //           path: '/record/livingData/person',
      //           name: 'PersonTable',
      //           component: () => import('@/views/record/livingData/SubIndex'),
      //           meta: { title: '用户列表', keepAlive: true, hidden: true },
      //           hideChildrenInMenu: true,
      //           redirect: '/record/livingData/person/list',
      //           children: [
      //             {
      //               path: '/record/livingData/person/list',
      //               name: 'PersonList',
      //               component: () => import('@/views/record/livingData/personData/PersonList'),
      //               meta: { title: '成员列表', keepAlive: true, hidden: true }
      //             },
      //             {
      //               path: '/record/livingData/person/data',
      //               name: 'InfoData',
      //               component: () => import('@/views/record/livingData/personData/InfoData'),
      //               meta: { title: '成员生活数据', keepAlive: true, hidden: true }
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       path: '/record/HealthGoal',
      //       name: 'HealthGoal',
      //       component: () => import('@/views/record/Index'),
      //       meta: { title: '健康小目标', keepAlive: true, permission: ['table'] },
      //       hideChildrenInMenu: true,
      //       redirect: '/record/HealthGoal/table',
      //       children: [
      //         {
      //           path: '/record/HealthGoal/table',
      //           name: 'AimsTable',
      //           component: () => import('@/views/record/healthgoal/AimsTable'),
      //           meta: { title: '用户目标列表', keepAlive: true, hidden: true }
      //         }
      //       ]
      //     },
      //     {
      //       path: '/record/QuestionnaireScale',
      //       name: 'QuestionnaireScale',
      //       component: () => import('@/views/record/QuestionnaireScale'),
      //       meta: { title: '问卷结果', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/record/MedicalRecords',
      //       name: 'MedicalRecords',
      //       component: () => import('@/views/record/MedicalRecords'),
      //       meta: { title: '电子病历*', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/record/ExaminationData',
      //       name: 'SearchArticles',
      //       component: () => import('../views/record/ExaminationData'),
      //       meta: { title: '体检数据*', permission: ['table'] }
      //     },
      //     {
      //       path: '/record/HealthRecords',
      //       name: 'HealthRecords',
      //       component: () => import('../views/record/HealthRecords'),
      //       meta: { title: '社区健康记录*', permission: ['table'] }
      //     }
      //   ]
      // },

      // 健康报告 healthreport
      // {
      //   path: '/report',
      //   name: 'report',
      //   component: PageView,
      //   redirect: '/report/HealthReport',
      //   meta: { title: '健康报告', icon: 'table', permission: ['table'] },
      //   children: [
      //     {
      //       path: '/report/HealthReport',
      //       name: 'HealthReport',
      //       component: () => import('@/views/report/Index'),
      //       meta: { title: '多维健康报告', keepAlive: true, permission: ['table'] },
      //       redirect: '/report/HealthReport/table',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/report/HealthReport/table',
      //           name: 'HealthReportTable',
      //           component: () => import('@/views/report/HealthReport/HealthReport'),
      //           meta: { title: '健康报告表', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/report/HealthReport/edit',
      //           name: 'HealthReportEdit',
      //           component: () => import('@/views/report/HealthReport/HREdit'),
      //           meta: { title: '编辑健康报告', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/report/HealthReport/info',
      //           name: 'HealthReportInfo',
      //           component: () => import('@/views/report/HealthReport/HRInfo'),
      //           meta: { title: '健康报告详情', keepAlive: true, hidden: true, permission: ['table'] }
      //         }
      //       ]
      //     },
      //     {
      //       path: '/report/WeeklySummary',
      //       name: 'WeeklySummary',
      //       component: () => import('@/views/report/Index'),
      //       meta: { title: '每周小结', keepAlive: true, permission: ['table'] },
      //       redirect: '/report/WeeklySummary/table',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/report/WeeklySummary/table',
      //           name: 'WeeklySummaryTable',
      //           component: () => import('@/views/report/WeeklySummary/WeeklySummary'),
      //           meta: { title: '每周小结表', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/report/WeeklySummary/edit',
      //           name: 'WeeklySummaryEdit',
      //           component: () => import('@/views/report/WeeklySummary/WSEdit'),
      //           meta: { title: '编辑每周小结', keepAlive: true, hidden: true, permission: ['table'] }
      //         },
      //         {
      //           path: '/report/WeeklySummary/info',
      //           name: 'WeeklySummaryInfo',
      //           component: () => import('@/views/report/WeeklySummary/WSInfo'),
      //           meta: { title: '每周小结详情', keepAlive: true, hidden: true, permission: ['table'] }
      //         }
      //       ]
      //     }
      //   ]
      // },
      // 干预管理 intervenemanager
      // {
      //   path: '/intervenemanager',
      //   name: 'intervenemanager',
      //   component: PageView,
      //   redirect: '/intervenemanager/quantifGoal',
      //   meta: { title: '干预管理', icon: 'profile', permission: ['profile'] },
      //   children: [
      //     {
      //       path: '/intervenemanager/quantifGoal',
      //       name: 'GoalStrategy',
      //       component: () => import('@/views/intervenemanager/goalSet/Index'),
      //       meta: { title: '小目标设定策略', keepAlive: true, permission: ['profile'] },
      //       redirect: '/intervenemanager/quantifGoal/q',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/intervenemanager/quantifGoal/q',
      //           name: 'SetQuanGoal',
      //           component: () => import('@/views/intervenemanager/goalSet/TagIndex'),
      //           meta: { title: '指标类', keepAlive: true, permission: ['profile'] },
      //           redirect: '/intervenemanager/quantifGoal/list',
      //           hideChildrenInMenu: true,
      //           children: [
      //             {
      //               path: '/intervenemanager/quantifGoal/list',
      //               name: 'QuantitativeGoal',
      //               component: () => import('@/views/intervenemanager/goalSet/Quantized/QuantitativeGoal'),
      //               meta: { title: '量化目标', keepAlive: true, hidden: true }
      //             },
      //             {
      //               path: '/intervenemanager/quantifGoal/edit',
      //               name: 'EditQuanGoal',
      //               component: () => import('@/views/intervenemanager/goalSet/Quantized/EditQuanGoal'),
      //               meta: { title: '编辑量化目标', keepAlive: true, hidden: true }
      //             }
      //           ]
      //         },
      //         {
      //           path: '/intervenemanager/addGoal',
      //           name: 'AddGoal',
      //           component: () => import('@/views/intervenemanager/goalSet/AddGoal'),
      //           meta: { title: '添加目标', keepAlive: true, hidden: true }
      //         },
      //         {
      //           path: '/intervenemanager/unquantifGoal/uq',
      //           name: 'SetUnquanGoal',
      //           component: () => import('@/views/intervenemanager/goalSet/TagIndex'),
      //           meta: { title: '生活习惯类', keepAlive: true, permission: ['profile'] },
      //           redirect: '/intervenemanager/unquantifGoal/list',
      //           hideChildrenInMenu: true,
      //           children: [
      //             {
      //               path: '/intervenemanager/unquantifGoal/list',
      //               name: 'UnquantitativeGoal',
      //               component: () => import('@/views/intervenemanager/goalSet/Unquantized/UnquantitativeGoal'),
      //               meta: { title: '非量化目标', keepAlive: true, hidden: true }
      //             },
      //             {
      //               path: '/intervenemanager/unquantifGoal/edit',
      //               name: 'EditUnquanGoal',
      //               component: () => import('@/views/intervenemanager/goalSet/Unquantized/EditUnquanGoal'),
      //               meta: { title: '编辑非量化目标', keepAlive: true, hidden: true }
      //             }
      //             // {
      //             //   path: '/intervenemanager/unquantifGoal/add',
      //             //   name: 'AddQuanGoal',
      //             //   component: () => import('@/views/intervenemanager/goalSet/Quantized/AddQuanGoal'),
      //             //   meta: { title: '添加目标', keepAlive: true, hidden: true }
      //             // }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       path: '/intervenemanager/Planandcourse',
      //       name: 'Planandcourse',
      //       component: () => import('@/views/intervenemanager/PlanAndCourse/PlanAndCourse'),
      //       meta: { title: '课程安排', keepAlive: true, permission: ['profile'] }
      //     },
      //     {
      //       path: '/intervenemanager/healthBit',
      //       name: 'healthBit',
      //       component: () => import('@/views/intervenemanager/healthBit/Index'),
      //       meta: { title: 'APP健康点滴', keepAlive: true, permission: ['profile'] },
      //       redirect: '/intervenemanager/healthBit/list',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/intervenemanager/healthBit/list',
      //           name: 'DripNews',
      //           component: () => import('@/views/intervenemanager/healthBit/DripNews'),
      //           meta: { title: '点滴内容', keepAlive: true, hidden: true, permission: ['profile'] }
      //         },
      //         {
      //           path: '/intervenemanager/healthBit/add',
      //           name: 'CreateDrip',
      //           component: () => import('@/views/intervenemanager/healthBit/CreateDrip'),
      //           meta: { title: '新建点滴', keepAlive: true, hidden: true, permission: ['profile'] }
      //         },
      //         {
      //           path: '/intervenemanager/healthBit/edit',
      //           name: 'EditDrip',
      //           component: () => import('@/views/intervenemanager/healthBit/EditDrip'),
      //           meta: { title: '编辑点滴', keepAlive: true, hidden: true, permission: ['profile'] }
      //         }
      //       ]
      //     },
      //     {
      //       path: '/intervenemanager/TopPush',
      //       name: 'TopPush',
      //       component: () => import('@/views/intervenemanager/TopPush/Index'),
      //       meta: { title: 'APP头条消息', keepAlive: true, permission: ['profile'] },
      //       redirect: '/intervenemanager/TopPush/list',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/intervenemanager/TopPush/list',
      //           name: 'TopNews',
      //           component: () => import('@/views/intervenemanager/TopPush/TopNews'),
      //           meta: { title: '头条内容', keepAlive: true, hidden: true, permission: ['profile'] }
      //         },
      //         {
      //           path: '/intervenemanager/TopPush/add',
      //           name: 'CreateTop',
      //           component: () => import('@/views/intervenemanager/TopPush/CreateTop'),
      //           meta: { title: '新建头条', keepAlive: true, hidden: true, permission: ['profile'] }
      //         },
      //         {
      //           path: '/intervenemanager/TopPush/edit',
      //           name: 'EditTop',
      //           component: () => import('@/views/intervenemanager/TopPush/EditTop'),
      //           meta: { title: '编辑头条', keepAlive: true, hidden: true, permission: ['profile'] }
      //         }
      //       ]
      //     },
      //     {
      //       path: '/intervenemanager/Videopush',
      //       name: 'Videopush',
      //       component: () => import('@/views/intervenemanager/videos/Index'),
      //       meta: { title: 'HD视频宣教', keepAlive: true, permission: ['profile'] },
      //       redirect: '/intervenemanager/videos/allvideos',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/intervenemanager/videos/videopush',
      //           name: 'VideoPush',
      //           component: () => import('@/views/intervenemanager/videos/VideoPush'),
      //           meta: { title: '上传视频', hidden: true, permission: ['profile'] }
      //         },
      //         {
      //           path: '/intervenemanager/videos/videoused',
      //           name: 'HDVideoOnPaid',
      //           component: () => import('@/views/intervenemanager/videos/HDVideoOnPaid'),
      //           meta: { title: '已用视频', hidden: true, keepAlive: true, permission: ['profile'] }
      //         },
      //         {
      //           path: '/intervenemanager/videos/allvideos',
      //           name: 'AllVideos',
      //           component: () => import('@/views/intervenemanager/videos/AllVideos'),
      //           meta: { title: '全部视频', hidden: true, keepAlive: true, permission: ['profile'] }
      //         },
      //         {
      //           path: '/intervenemanager/videos/videoedit',
      //           name: 'VideoEdit',
      //           component: () => import('@/views/intervenemanager/videos/VideoEdit'),
      //           meta: { title: '编辑视频', hidden: true, keepAlive: true, permission: ['profile'] }
      //         }
      //       ]
      //     }
      //   ]
      // },
      // 商城业务business
      {
        path: '/business',
        name: 'business',
        component: PageView,
        redirect: '/business/IntegralManage',
        meta: { title: '商城业务', icon: 'check-circle-o', permission: ['profile'] },
        children: [
          {
            path: '/business/IntegralManage',
            name: 'IntegralManage',
            component: () => import('@/views/business/IntegralManage'),
            meta: { title: '健康积分管理', keepAlive: true, permission: ['profile'] }
          },
          {
            path: '/businsss/BarAD',
            name: 'allAD',
            component: () => import('@/views/business/BarAD/Index'),
            meta: { title: 'Bar宣传广告', hideHeader: true, hidden: true },
            redirect: '/business/BarAD/usedAD',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/business/BarAD/usedAD',
                name: 'UsedAD',
                component: () => import('@/views/business/BarAD/AllAD/TagIndex'),
                meta: { title: '全部广告', hidden: true, permission: ['profile'] },
                redirect: '/business/BarAD/usedAD/list',
                hideChildrenInMenu: true,
                children: [
                  {
                    path: '/business/BarAD/usedAD/list',
                    name: 'UsedADList',
                    component: () => import('@/views/business/BarAD/AllAD/UsedAD'),
                    meta: { title: '已使用广告', hidden: true, permission: ['profile'] }
                  }
                ]
              },
              {
                path: '/business/BarAD/addAD',
                name: 'addAD',
                component: () => import('@/views/business/BarAD/AllAD/AddAD'),
                meta: { title: '新建广告', keepAlive: true, hidden: true }
              },
              {
                path: '/business/BarAD/editAD',
                name: 'editAD',
                component: () => import('@/views/business/BarAD/AllAD/EditAD'),
                meta: { title: '编辑广告', keepAlive: true, hidden: true },
                hidden: true
              },
              {
                path: '/business/BarAD/UnusedAD',
                name: 'UnusedAD',
                component: () => import('@/views/business/BarAD/AllAD/TagIndex'),
                meta: { title: '全部广告', hidden: true, permission: ['profile'] },
                redirect: '/business/BarAD/UnusedAD/list',
                hideChildrenInMenu: true,
                children: [
                  {
                    path: '/business/BarAD/UnusedAD/list',
                    name: 'UnusedADList',
                    component: () => import('@/views/business/BarAD/AllAD/UnusedAD'),
                    meta: { title: '未使用广告', hidden: true, permission: ['profile'] }
                  }
                  // {
                  //   path: '/business/BarAD/UnusedAD/edit',
                  //   name: 'editUnusedAD',
                  //   component: () => import('@/views/business/BarAD/AllAD/EditAD'),
                  //   meta: { title: '编辑广告', keepAlive: true, hidden: true },
                  //   hidden: true
                  // }
                ]
              }
            ]
          }
        ]
      },

      // 数据报表 datareport
      {
        path: '/datareport',
        name: 'datareport',
        component: PageView,
        redirect: '/datareport/Onlineanalyze',
        meta: { title: '数据报表', icon: 'check-circle-o', permission: ['result'] },
        children: [
          {
            path: '/datareport/Onlineanalyze',
            name: 'Onlineanalyze',
            component: () => import(/* webpackChunkName: "result" */ '@/views/datareport/Onlineanalyze'),
            meta: {
              title: '在线情况分析',
              keepAlive: true,
              hiddenHeaderContent: false,
              permission: ['result']
            }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人中心', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人信息', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      },
      // 系统设置
      {
        path: '/system',
        name: 'system',
        component: PageView,
        redirect: '/system/businesslog',
        meta: { title: '系统设置', icon: 'check-circle-o', permission: ['user'] },
        children: [
          {
            path: '/system/businesslog',
            name: 'businesslog',
            component: () => import(/* webpackChunkName: "result" */ '@/views/system/businesslog'),
            meta: { title: '业务日志', keepAlive: true, hiddenHeaderContent: false, permission: ['user'] }
          },
          {
            path: '/system/systemsetting',
            name: 'systemsetting',
            component: () => import('@/views/system/systemsetting'),
            meta: { title: '系统设置', keepAlive: true, hideHeader: true, permission: ['user'] },
            hideChildrenInMenu: true
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'rootHomePage',
    component: () => import('@/views/rootHomePage/homePage')
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  }
  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // },
  // {
  //   path: '/500',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500')
  // }
]
