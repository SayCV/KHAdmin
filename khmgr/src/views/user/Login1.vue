<template>
  <div class="main">
    <div id="login">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
            placeholder="Username"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]">Remember me</a-checkbox>
          <a
            class="login-form-forgot"
            href
          >Forgot password</a>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
          >Log in</a-button>Or
          <a href>register now!</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'

export default {
  name: 'login',
  data() {
    return {}
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  // 组件内的守卫
  beforeRouteEnter: (to, from, next) => {
    // this.$store.dispatch("setUser",null)
    next(vm => {
      vm.$store.dispatch('setUser', null)
      vm.$store.dispatch('setLogin', false)
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.Login(values)
        }
      })
    },
    Login(formValue) {
      let param = {
        password: formValue.password,
        remember: formValue.remember,
        userName: formValue.userName
      }
      axios({
        method: 'post',
        url: 'http://yapi.sagaii.cn/mock/11/api/auth/login',
        data: param
      }).then(res => {
        console.log('login success', res.data.result)

        if (res.data.result.status === 0) {
          //设置Vuex状态
          this.$store.dispatch('setUser', res.data.result.username)
          this.$store.dispatch('setLogin', true)
          //登录成功
          this.loginSuccess(res.data.result)
        } else {
          //err
          this.$store.dispatch('setUser', null)
          this.$store.dispatch('setLogin', false)
          this.requestFailed(res.data.result)
        }
      })
    },
    loginSuccess(res) {
      this.$router.push({ name: 'dashboard' })
      // window.reload();

      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${res.username}，欢迎回来`
        })
      }, 1000)
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
}
#login {
  width: 350px;
  max-width: 300px;
  /* height: 300px; */
  padding: 25px;
  border-radius: 0.45rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>