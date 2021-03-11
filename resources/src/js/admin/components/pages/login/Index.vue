<template>

  <el-row>
    <el-col class="login-form">
      <el-card class="box-card">
        <el-row>
          <el-col class="logo-block--img">
            <img src="/images/logo.svg" alt="">
          </el-col>
        </el-row>
        <el-row>
          <el-col class="logo-block--name">
            <h3>Helastel v1.0</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-divider></el-divider>
          </el-col>
        </el-row>
        <el-row v-loading="loading">
          <el-col>
            <el-row class="form-block--row">
              <el-col>
                <label for="" class="form-block--label">Логин/E-mail</label>
              </el-col>
              <el-col>
                <el-input name="login" placeholder="Login or email" v-model="model.login"></el-input>
              </el-col>
            </el-row>
            <el-row class="form-block--row">
              <el-col>
                <label for="" class="form-block--label">Пароль</label>
              </el-col>
              <el-col>
                <el-input type="password" name="password" placeholder="password" v-model="model.password"></el-input>
              </el-col>
            </el-row>
            <el-row class="form-block--row">
              <el-col class="form-block--control">
                <el-button type="default" plain @click="auth()">Авторизоваться</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

</template>
<script>
import Identity from '@admin/components/classes/identity/Identity.js'

  export default {
    data() {
      return {
        actions: {
          auth: '/api/admin/auth'
        },
        model: {
          login: '',
          password: ''
        },
        loading: false
      }
    },
    created() {
      if (!this.$identity.isGuest) {
        this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/')
      }
    },
    methods: {
      async auth() {
        try {
          this.loading = true
          let response = await this.$http.post(this.actions.auth, this.model)

          localStorage.setItem('access_token', response.data.access_token)

          let redirect = this.$route.query.redirect ? this.$route.query.redirect : '/'

          let user = await this.$http.get('/api/admin/user', {})
            console.log(user)
          window.$identity = new Identity(user.data.data)
          this.$identity.setUser(user.data.data)

          this.$router.push(redirect)
          this.$message.success(response.data.message)
        } catch (e) {
          if (!e.response) {
            throw e
          }

          switch (e.response.status) {
            case 422:
              this.$message.error(e.response.data.message)
              break
            default:
              this.$message.error(e.response.data.message)
          }
        } finally {
          this.loading = false
        }
      }
    }
  }

</script>
<style lang="css" scoped>

  .box-card {
    width: 100%;
    max-width: 480px;
  }

  .logo-block--img {
    min-height: 10vh;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 5%;
  }

  .logo-block--name {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .login-form {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: calc(100vh - 122px);
  }

  .form-block--label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 600;
  }

  .form-block--row {
    margin: 5% 0;
  }

  .form-block--control {
    text-align: right;
  }

</style>
