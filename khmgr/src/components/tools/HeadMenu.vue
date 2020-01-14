<template>
  <div class="global-header-wrapper">
    <a
      href="https://www.keephealthing.cn/docs/getting-started"
      target="_blank"
    >
      <span class="action">
        <a-icon type="question-circle-o"></a-icon>
      </span>
    </a>
    <notice-icon class="action" />
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
    <!-- select lang component -->
    <lang-select />
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import LangSelect from '@/components/tools/LangSelect'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HeadMenu',
  components: {
    NoticeIcon, LangSelect
  },
  data () {
    return {
      userinfo: {}
    }
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),

    handleLogout () {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that
            .Logout({})
            .then(() => {
              window.location.reload()
              that.$router.push({ name: 'login' })
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

<style lang="less" scoped>
.global-header-wrapper {
  .action {
    cursor: pointer;
    padding: 0 12px;
    display: inline-block;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    height: 100%;
    color: rgba(0, 0, 0, 0.65);
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    .avatar {
      margin: 20px 8px 20px 0;
      color: #1890ff;
      background: hsla(0, 0%, 100%, 0.85);
      vertical-align: middle;
    }
    .icon {
      font-size: 16px;
      padding: 4px;
    }
  }
}
</style>
