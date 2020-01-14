<template>
  <div class="root-header-menu-wrapper">
    <a-popover placement="bottom">
      <template slot="content">
        <span>应用搜索</span>
      </template>
      <span
        class="action"
        @click="() => appSearchVisible = true"
      >
        <a-icon type="search" />
      </span>
    </a-popover>
    <a-popover placement="bottom">
      <template slot="content">
        <span>应用管理</span>
      </template>
      <span
        class="action"
        @click="() => appVisible = true"
      >
        <a-icon type="appstore" />
      </span>
    </a-popover>
    <notice-icon class="action" />
    <!-- select lang component -->
    <lang-select />
    <a-popover placement="bottom">
      <template slot="content">
        <span>退出</span>
      </template>
      <span
        class="action"
        @click="handleLogout"
      >
        <a-icon type="logout" />
      </span>
    </a-popover>
    <!-- user menu -->
    <a-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <a-avatar
          class="avatar"
          size="small"
          :src="avatar()"
        />
        <span class="nickname">{{ nickname() }}</span>
      </span>
      <a-menu
        slot="overlay"
        class="user-dropdown-menu-wrapper"
      >
        <a-menu-item key="0">
          <router-link :to="{ name: 'center' }">
            <a-icon type="user" />
            <!-- <span>个人中心</span> -->
            <span>{{ $t('header.HeadMenu.center') }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link :to="{ name: 'settings' }">
            <a-icon type="setting" />
            <!-- <span>账户设置</span> -->
            <span>{{ $t('header.HeadMenu.settings') }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item
          key="2"
          disabled
        >
          <a-icon type="setting" />
          <!-- <span>测试</span> -->
          <span>{{ $t('header.HeadMenu.test') }}</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <a
            href="javascript:;"
            @click="handleLogout"
          >
            <a-icon type="logout" />
            <!-- <span>退出登录</span> -->
            <span>{{ $t('header.HeadMenu.logout') }}</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <AppSwiper
      :visible="appVisible"
      @onClose="() => appVisible = false"
    />
    <AppSearch
      :visible="appSearchVisible"
      @onClose="() => appSearchVisible = false"
    />
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import LangSelect from '@/components/tools/LangSelect'
import AppSwiper from '@/views/rootHomePage/functionList'
import AppSearch from '@/views/rootHomePage/appSearch'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RootHeadMenu',
  components: {
    NoticeIcon,
    LangSelect,
    AppSwiper,
    AppSearch
  },
  data () {
    return {
      userinfo: {},
      appVisible: false,
      appSearchVisible: false
    }
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    handleLogout () {
      const that = this
      this.$confirm({
        centered: true,
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that
            .Logout({})
            .then(() => {
              // window.location.reload()
              that.$router.push({ path: '/user' })
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel () { }
      })
    }
  }
}
</script>

<style lang="less" >
.root-header-menu-wrapper {
  color: white;
  .action {
    cursor: pointer;
    padding: 0 12px;
    display: inline-block;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    height: 100%;
    color: white;
    &:hover {
      background: rgba(0, 0, 0, 0.25);
    }
    .avatar {
      color: white;
      margin: 20px 8px 20px 0;
      color: #1890ff;
      background: hsla(0, 0%, 100%, 0.85);
      vertical-align: middle;
    }
    .icon {
      color: white;
      font-size: 16px;
      padding: 4px;
    }
  }
}
</style>
