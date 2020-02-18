<template>
  <div class="user-wrapper">
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
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
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
<style lang="less" scoped>
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
</style>
