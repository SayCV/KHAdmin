// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

// 去除按权限添加路由默认全局admin src/store/modules/permission
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '管理首页', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '日报分析', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      // basicdata 基础数据
      {
        path: '/basicdata',
        name: 'basicdata',
        redirect: '/basicdata/Customermanage',
        component: PageView,
        meta: { title: '基础数据', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/basicdata/Customermanage',
            name: 'Customermanage',
            component: () => import('@/views/basicdata/Index'),
            meta: { title: '客户管理', keepAlive: true, hideHeader: true, permission: ['table'] },
            redirect: '/basicdata/Customermanage/table',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/basicdata/Customermanage/table',
                name: 'CustomerTable',
                component: () => import('@/views/basicdata/customer/CustomerTable'),
                meta: { title: '客户信息表', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/basicdata/Customermanage/add',
                name: 'AddCustomer',
                component: () => import('@/views/basicdata/customer/AddCustomer'),
                meta: { title: '添加客户页', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/basicdata/Customermanage/create',
                name: 'CreateCustomer',
                component: () => import('@/views/basicdata/customer/CreateCustomer'),
                meta: { title: '创建客户', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/basicdata/Customermanage/info',
                name: 'CustomerInfo',
                component: () => import('@/views/basicdata/customer/CustomerInfo'),
                meta: { title: '客户详情页', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/basicdata/Customermanage/edit',
                name: 'CustomerEditInfo',
                component: () => import('@/views/basicdata/customer/EditCusInfo'),
                meta: { title: '客户编辑页', keepAlive: true, hidden: true, permission: ['table'] }
              }
            ]
          },
          {
            path: '/basicdata/Healthmanager',
            name: 'Healthmanager',
            component: () => import('@/views/basicdata/Index'),
            meta: { title: '健管师管理', keepAlive: true, permission: ['table'] },
            redirect: '/basicdata/Healthmanager/table',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/basicdata/Healthmanager/table',
                name: 'HealthmanagerTable',
                component: () => import('@/views/basicdata/khmanager/Healthmanager'),
                meta: { title: '健管师信息表', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/basicdata/Healthmanager/info',
                name: 'HealthmanagerInfo',
                component: () => import('@/views/basicdata/khmanager/khManagerinfo'),
                meta: { title: '健管师详情页', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/basicdata/Healthmanager/edit',
                name: 'HealthmanagerEdit',
                component: () => import('@/views/basicdata/khmanager/khManagerEdit'),
                meta: { title: '健管师编辑页', keepAlive: true, hidden: true, permission: ['table'] }
              }
            ]
          },
          {
            path: '/basicdata/Equipmentmanager',
            name: 'Equipmentmanager',
            component: () => import('@/views/basicdata/Index'),
            meta: { title: '设备管理', keepAlive: true, permission: ['table'] },
            redirect: '/basicdata/Equipmentmanager/table',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/basicdata/Equipmentmanager/table',
                name: 'EquipmentmanagerTable',
                component: () => import('@/views/basicdata/equipment/EquipmentTable'),
                meta: { title: '设备信息表', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/basicdata/Equipmentmanager/info',
                name: 'EquipmentmanagerInfo',
                component: () => import('@/views/basicdata/equipment/equipmentInfo'),
                meta: { title: '设备详情页', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/basicdata/Equipmentmanager/edit',
                name: 'EquipmentmanagerEdit',
                component: () => import('@/views/basicdata/equipment/equipmentEdit'),
                meta: { title: '设备编辑页', keepAlive: true, hidden: true, permission: ['table'] }
              }
            ]
          }
        ]
      },

      // 健康档案 healthrecord
      {
        path: '/record',
        name: 'record',
        component: PageView,
        redirect: '/record/HealthReport',
        meta: { title: '健康档案', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/record/livingData',
            name: 'LifeData',
            component: () => import('@/views/record/Index'),
            meta: { title: '生活数据', keepAlive: true, permission: ['table'] },
            hideChildrenInMenu: true,
            redirect: '/record/livingData/table',
            children: [
              {
                path: '/record/livingData/table',
                name: 'LivingTable',
                component: () => import('@/views/record/livingData/LivingTable'),
                meta: { title: '用户列表', keepAlive: true, hidden: true }
              },
              {
                path: '/record/livingData/person',
                name: 'PersonTable',
                component: () => import('@/views/record/livingData/SubIndex'),
                meta: { title: '用户列表', keepAlive: true, hidden: true },
                hideChildrenInMenu: true,
                redirect: '/record/livingData/person/list',
                children: [
                  {
                    path: '/record/livingData/person/list',
                    name: 'PersonList',
                    component: () => import('@/views/record/livingData/personData/PersonList'),
                    meta: { title: '成员列表', keepAlive: true, hidden: true }
                  },
                  {
                    path: '/record/livingData/person/data',
                    name: 'InfoData',
                    component: () => import('@/views/record/livingData/personData/InfoData'),
                    meta: { title: '成员生活数据', keepAlive: true, hidden: true }
                  }
                ]
              }
            ]
          },
          {
            path: '/record/HealthGoal',
            name: 'HealthGoal',
            component: () => import('@/views/record/Index'),
            meta: { title: '健康小目标', keepAlive: true, permission: ['table'] },
            hideChildrenInMenu: true,
            redirect: '/record/HealthGoal/table',
            children: [
              {
                path: '/record/HealthGoal/table',
                name: 'AimsTable',
                component: () => import('@/views/record/healthgoal/AimsTable'),
                meta: { title: '用户目标列表', keepAlive: true, hidden: true }
              }
            ]
          },
          {
            path: '/record/QuestionnaireScale',
            name: 'QuestionnaireScale',
            component: () => import('@/views/record/QuestionnaireScale'),
            meta: { title: '问卷结果', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/record/MedicalRecords',
            name: 'MedicalRecords',
            component: () => import('@/views/record/MedicalRecords'),
            meta: { title: '电子病历*', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/record/ExaminationData',
            name: 'SearchArticles',
            component: () => import('../views/record/ExaminationData'),
            meta: { title: '体检数据*', permission: ['table'] }
          },
          {
            path: '/record/HealthRecords',
            name: 'HealthRecords',
            component: () => import('../views/record/HealthRecords'),
            meta: { title: '社区健康记录*', permission: ['table'] }
          }
        ]
      },

      // 健康报告 healthreport
      {
        path: '/report',
        name: 'report',
        component: PageView,
        redirect: '/report/HealthReport',
        meta: { title: '健康报告', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/report/HealthReport',
            name: 'HealthReport',
            component: () => import('@/views/report/Index'),
            meta: { title: '多维健康报告', keepAlive: true, permission: ['table'] },
            redirect: '/report/HealthReport/table',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/report/HealthReport/table',
                name: 'HealthReportTable',
                component: () => import('@/views/report/HealthReport/HealthReport'),
                meta: { title: '健康报告表', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/report/HealthReport/edit',
                name: 'HealthReportEdit',
                component: () => import('@/views/report/HealthReport/HREdit'),
                meta: { title: '编辑健康报告', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/report/HealthReport/info',
                name: 'HealthReportInfo',
                component: () => import('@/views/report/HealthReport/HRInfo'),
                meta: { title: '健康报告详情', keepAlive: true, hidden: true, permission: ['table'] }
              }
            ]
          },
          {
            path: '/report/WeeklySummary',
            name: 'WeeklySummary',
            component: () => import('@/views/report/Index'),
            meta: { title: '每周小结', keepAlive: true, permission: ['table'] },
            redirect: '/report/WeeklySummary/table',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/report/WeeklySummary/table',
                name: 'WeeklySummaryTable',
                component: () => import('@/views/report/WeeklySummary/WeeklySummary'),
                meta: { title: '每周小结表', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/report/WeeklySummary/edit',
                name: 'WeeklySummaryEdit',
                component: () => import('@/views/report/WeeklySummary/WSEdit'),
                meta: { title: '编辑每周小结', keepAlive: true, hidden: true, permission: ['table'] }
              },
              {
                path: '/report/WeeklySummary/info',
                name: 'WeeklySummaryInfo',
                component: () => import('@/views/report/WeeklySummary/WSInfo'),
                meta: { title: '每周小结详情', keepAlive: true, hidden: true, permission: ['table'] }
              }
            ]
          }
        ]
      },

      // 干预管理 intervenemanager
      {
        path: '/intervenemanager',
        name: 'intervenemanager',
        component: PageView,
        redirect: '/intervenemanager/quantifGoal',
        meta: { title: '干预管理', icon: 'profile', permission: ['profile'] },
        children: [
          {
            path: '/intervenemanager/quantifGoal',
            name: 'GoalStrategy',
            component: () => import('@/views/intervenemanager/goalSet/Index'),
            meta: { title: '小目标设定策略', keepAlive: true, permission: ['profile'] },
            redirect: '/intervenemanager/quantifGoal/q',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/intervenemanager/quantifGoal/q',
                name: 'SetQuanGoal',
                component: () => import('@/views/intervenemanager/goalSet/TagIndex'),
                meta: { title: '指标类', keepAlive: true, permission: ['profile'] },
                redirect: '/intervenemanager/quantifGoal/list',
                hideChildrenInMenu: true,
                children: [
                  {
                    path: '/intervenemanager/quantifGoal/list',
                    name: 'QuantitativeGoal',
                    component: () => import('@/views/intervenemanager/goalSet/Quantized/QuantitativeGoal'),
                    meta: { title: '量化目标', keepAlive: true, hidden: true }
                  },
                  {
                    path: '/intervenemanager/quantifGoal/edit',
                    name: 'EditQuanGoal',
                    component: () => import('@/views/intervenemanager/goalSet/Quantized/EditQuanGoal'),
                    meta: { title: '编辑量化目标', keepAlive: true, hidden: true }
                  }
                  // {
                  //   path: '/intervenemanager/quantifGoal/add',
                  //   name: 'AddQuanGoal',
                  //   component: () => import('@/views/intervenemanager/goalSet/Quantized/AddQuanGoal'),
                  //   meta: { title: '添加目标', keepAlive: true, hidden: true }
                  // }
                ]
              },
              {
                path: '/intervenemanager/addGoal',
                name: 'AddGoal',
                component: () => import('@/views/intervenemanager/goalSet/AddGoal'),
                meta: { title: '添加目标', keepAlive: true, hidden: true }
              },
              {
                path: '/intervenemanager/unquantifGoal/uq',
                name: 'SetUnquanGoal',
                component: () => import('@/views/intervenemanager/goalSet/TagIndex'),
                meta: { title: '生活习惯类', keepAlive: true, permission: ['profile'] },
                redirect: '/intervenemanager/unquantifGoal/list',
                hideChildrenInMenu: true,
                children: [
                  {
                    path: '/intervenemanager/unquantifGoal/list',
                    name: 'UnquantitativeGoal',
                    component: () => import('@/views/intervenemanager/goalSet/Unquantized/UnquantitativeGoal'),
                    meta: { title: '非量化目标', keepAlive: true, hidden: true }
                  },
                  {
                    path: '/intervenemanager/unquantifGoal/edit',
                    name: 'EditUnquanGoal',
                    component: () => import('@/views/intervenemanager/goalSet/Unquantized/EditUnquanGoal'),
                    meta: { title: '编辑非量化目标', keepAlive: true, hidden: true }
                  }
                  // {
                  //   path: '/intervenemanager/unquantifGoal/add',
                  //   name: 'AddQuanGoal',
                  //   component: () => import('@/views/intervenemanager/goalSet/Quantized/AddQuanGoal'),
                  //   meta: { title: '添加目标', keepAlive: true, hidden: true }
                  // }
                ]
              }
            ]
          },
          {
            path: '/intervenemanager/Planandcourse',
            name: 'Planandcourse',
            component: () => import('@/views/intervenemanager/PlanAndCourse/PlanAndCourse'),
            meta: { title: '课程安排', keepAlive: true, permission: ['profile'] }
          },
          {
            path: '/intervenemanager/AppPush',
            name: 'AppPush',
            component: () => import('@/views/intervenemanager/AppPush/Index'),
            meta: { title: 'APP健康点滴', keepAlive: true, permission: ['profile'] },
            redirect: '/intervenemanager/AppPush/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/intervenemanager/AppPush/list',
                name: 'DripNews',
                component: () => import('@/views/intervenemanager/AppPush/DripNews'),
                meta: { title: '点滴内容', keepAlive: true, hidden: true, permission: ['profile'] }
              },
              {
                path: '/intervenemanager/AppPush/add',
                name: 'CreateDrip',
                component: () => import('@/views/intervenemanager/AppPush/CreateDrip'),
                meta: { title: '新建点滴', keepAlive: true, hidden: true, permission: ['profile'] }
              },
              {
                path: '/intervenemanager/AppPush/edit',
                name: 'EditDrip',
                component: () => import('@/views/intervenemanager/AppPush/EditDrip'),
                meta: { title: '编辑点滴', keepAlive: true, hidden: true, permission: ['profile'] }
              }
            ]
          },
          {
            path: '/intervenemanager/TopPush',
            name: 'TopPush',
            component: () => import('@/views/intervenemanager/TopPush/Index'),
            meta: { title: 'APP头条消息', keepAlive: true, permission: ['profile'] },
            redirect: '/intervenemanager/TopPush/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/intervenemanager/TopPush/list',
                name: 'TopNews',
                component: () => import('@/views/intervenemanager/TopPush/TopNews'),
                meta: { title: '头条内容', keepAlive: true, hidden: true, permission: ['profile'] }
              },
              {
                path: '/intervenemanager/TopPush/add',
                name: 'CreateTop',
                component: () => import('@/views/intervenemanager/TopPush/CreateTop'),
                meta: { title: '新建头条', keepAlive: true, hidden: true, permission: ['profile'] }
              },
              {
                path: '/intervenemanager/TopPush/edit',
                name: 'EditTop',
                component: () => import('@/views/intervenemanager/TopPush/EditTop'),
                meta: { title: '编辑头条', keepAlive: true, hidden: true, permission: ['profile'] }
              }
            ]
          },
          {
            path: '/intervenemanager/Videopush',
            name: 'Videopush',
            component: () => import('@/views/intervenemanager/videos/Index'),
            meta: { title: 'HD视频宣教', keepAlive: true, permission: ['profile'] },
            redirect: '/intervenemanager/videos/allvideos',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/intervenemanager/videos/videopush',
                name: 'VideoPush',
                component: () => import('@/views/intervenemanager/videos/VideoPush'),
                meta: { title: '上传视频', hidden: true, permission: ['profile'] }
              },
              {
                path: '/intervenemanager/videos/videoused',
                name: 'HDVideoOnPaid',
                component: () => import('@/views/intervenemanager/videos/HDVideoOnPaid'),
                meta: { title: '已用视频', hidden: true, keepAlive: true, permission: ['profile'] }
              },
              {
                path: '/intervenemanager/videos/allvideos',
                name: 'AllVideos',
                component: () => import('@/views/intervenemanager/videos/AllVideos'),
                meta: { title: '全部视频', hidden: true, keepAlive: true, permission: ['profile'] }
              },
              {
                path: '/intervenemanager/videos/videoedit',
                name: 'VideoEdit',
                component: () => import('@/views/intervenemanager/videos/VideoEdit'),
                meta: { title: '编辑视频', hidden: true, keepAlive: true, permission: ['profile'] }
              }
            ]
          }
        ]
      },
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
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500')
  }
]
