<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="login.png">
      </div>
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit"
              class="login_form">
        <a-form-item label="用户">
          <a-input
              v-decorator="['name', { rules: [{ required: true, message: '请输入用户名!' }] }]"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
              v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]" type="password"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
          <a-button type="primary" html-type="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {name: 'coordinated'}),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          fetch('http://local.pandakill/api/users', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then((response) => {
            response.json().then((result) => {
              if (response.ok && result.data) {
                this.$message.success('登录成功')
                window.sessionStorage.setItem("token", result.data.access_token)
                window.sessionStorage.setItem("manage", result.data.manage)
                this.$router.replace({path: '/welcome'})
              } else {
                this.$message.error('用户名或密码错误');
              }
            })
          })
        }
      });
    },
  },
}
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>