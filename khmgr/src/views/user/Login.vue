<template>
  <div class="main">
    <div class="top">
      <div class="header">
        <a href="/" style>
          <span class="title">欢迎使用健康护航管理控制台</span>
        </a>
      </div>
      <div class="desc">Keep Health,Keep Timing!</div>
    </div>
    <div class="login-pic">
      <div class="login-pic-child">
        <img src="./../../assets/login_pic.png" alt />
      </div>
    </div>
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录" class="input-part">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="帐户名或邮箱地址 / admin"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码 / admin"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="手机号"
              v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
            >
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="验证码"
                  v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
                >
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item style="margin-top: 0px; margin-bottom: 6px;">
        <a-button
          size="large"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>

      <a-form-item class="label-row" style="margin-bottom: 6px;">
        <!-- <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox> -->
        <router-link
          :to="{ name: 'login' }"
          class="forge-password"
          style="text-decoration:none;"
        >忘记密码</router-link>
        <!-- <router-link
          class="register"
          :to="{ name: 'register' }"
        >注册账户</router-link>
        <span style="float: right; margin-right:0.5rem;">还没有账号?</span>-->
      </a-form-item>

      <div class="user-login-other">
        <div class="first-child"></div>
        <div class="middle-child">
          <div class="middle-a">
            <a>
              <a-icon class="item-icon" type="alipay-circle" style="margin-right:0.5rem;"></a-icon>
            </a>
            <a>
              <a-icon class="item-icon" type="wechat"></a-icon>
            </a>
          </div>
        </div>
        <div class="last-child"></div>
      </div>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
// import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getSmsCaptcha } from '@/api/login'

export default {
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  // created() {  //两部验证
  //   get2step({})
  //     .then(res => {
  //       this.requiredTwoStepCaptcha = res.result.stepCode
  //     })
  //     .catch(() => {
  //       this.requiredTwoStepCaptcha = false
  //     })
  //   // this.requiredTwoStepCaptcha = true
  // },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          // loginParams[!state.loginType ? 'email' : 'username'] = values.username
          loginParams.loginName = values.username
          // loginParams.password = md5(values.password)
          loginParams.password = values.password
          // console.log('username-passwd', res)
          // if (!res.username === loginParams.username || !res.password === loginParams.password) {
          //   this.loginSuccess(res)
          // }

          // mock loging
          this.loginSuccess()

          // 正确登录逻辑
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          getSmsCaptcha({ mobile: values.mobile })
            .then(res => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      this.$router.push({ name: 'rootHomePage' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },

    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  border-radius: 5px;
  padding: 5%;
  height: 600px;
  background-color: #fff;
  position: relative;
}

.forge-password {
  float: left;
  text-decoration: none;
}
.register {
  float: right;
  text-decoration: none;
}

//Logo and Title CSS
.top {
  text-align: center;

  .header {
    height: 44px;
    line-height: 44px;

    .badge {
      position: absolute;
      display: inline-block;
      line-height: 1;
      vertical-align: middle;
      margin-left: -12px;
      margin-top: -10px;
      opacity: 0.8;
    }

    .logo {
      height: 44px;
      vertical-align: top;
      margin-right: 16px;
      border-style: none;
    }

    .title {
      font-size: 30px;
      color: rgba(0, 0, 0, 0.85);
      font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
      font-weight: 525;
      position: relative;
      top: 2px;
    }
  }
  .desc {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 12px;
    margin-bottom: 30px;
    text-align: center;
  }
}

.main .login-pic {
  display: inline-block;
  width: 50%;
  height: 342px;
}
.login-pic-child {
  width: 70%;
  height: 60%;
  margin-top: 45px;
  margin-left: 0%;
}
.login-pic div img {
  width: 100%;
  height: 100%;
}
//login
.user-layout-login {
  float: right;
  width: 50%;

  label {
    font-size: 14px;
  }

  .getCaptcha {
    //验证码按钮
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%; //登录按钮
    background-color: #099cec;
    border-color: #099cec;
    color: #fff;
  }

  .user-login-other {
    margin-top: 6px;
  }

  .user-login-other div {
    display: inline-block;
  }
  .first-child {
    width: 30%;
    height: 1px;
    border-bottom: 1.25px solid rgba(191, 191, 191);
  }
  .middle-child {
    width: 40%;
    position: relative;
  }
  .last-child {
    width: 30%;
    height: 1px;
    border-bottom: 1.25px solid rgba(191, 191, 191);
  }
  .middle-child div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .item-icon {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.2);
    vertical-align: middle;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
