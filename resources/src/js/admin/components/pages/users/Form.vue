<template>
    <el-row :gutter="30" v-loading="loading" element-loading-text="Получение информации о администраторе">
      <el-col :xl="18" :lg="16" :md="24">
        <el-card>
          <el-row>
            <el-col>
              <h3 v-if="this.$route.params.id">Редактирование пользователя {{ oldModel.name }} {{ oldModel.last_name }}</h3>
              <h3 v-else>Создание пользователя</h3>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <a-form-block
                :structure="structure"
                :model="model"
                :errors="errors"
                :collapsed="false"
                :withHeader="false"
              >
                <template v-slot:form_change_pass="{ item }">
                  <el-form-item label="" v-if="model.id">
                    <el-checkbox v-model="model.change_pass">Сменить пароль</el-checkbox>
                  </el-form-item>
                </template>
                <template v-slot:form_password="{ item }">
                  <el-form-item :label="model.id ? 'Новый пароль' : 'Пароль'" v-if="showPasswordsFields" :error="errors.password" :show-message="!!errors.password">
                    <el-input v-model="model.password" type="password"></el-input>
                  </el-form-item>
                </template>
                <template v-slot:form_password_confirmation="{ item }">
                  <el-form-item label="Подтверждение пароля" v-if="showPasswordsFields">
                    <el-input v-model="model.password_confirmation" type="password"></el-input>
                  </el-form-item>
                </template>
              </a-form-block>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xl="6" :lg="8" :md="24">
        <el-card>
          <el-row>
            <el-col>
              <h3>Действия</h3>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-row class="additional_actions--row">
            <el-col>
              <el-button type="success" :disabled="disableControlButtons" @click="save()"> <i class="el-icon-check"></i> Сохранить</el-button>
            </el-col>
          </el-row>
          <!-- <el-row class="additional_actions--row">
            <el-col>
              <el-button type="success" :disabled="disableControlButtons" @click="save(true)"> <i class="el-icon-check"></i> Сохранить и заполнить следующую</el-button>
            </el-col>
          </el-row> -->
          <el-row class="additional_actions--row" v-if="this.$route.params.id">
            <el-col>
              <el-button :disabled="disableControlButtons" @click="rollback()"> <i class="el-icon-refresh-left"></i> Отменить изменения</el-button>
            </el-col>
          </el-row>
          <el-row class="additional_actions--row">
            <el-col>
              <el-button @click="back()"> <i class="el-icon-back"></i> К списку пользователей</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <!-- <el-row class="additional_actions--row">
            <el-col>
              <el-button type="danger"> <i class="el-icon-lock"></i> Заблокировать</el-button>
            </el-col>
          </el-row> -->

        </el-card>
      </el-col>
    </el-row>
</template>
<script>
import StaticMixin from '@admin-mixins/StaticMixin.js'
import AInput from '@admin-custom/input/Input.vue'
import AFormBlock from '@admin-custom/aform/AFormBlock.vue'

  export default {
    data() {
      return {
        actions: {
          rest: '/api/admin/users',
        },
        loading: false,
        model: {
          images: []
        },
        errors: {},
        oldModel: {},
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    mixins: [StaticMixin],
    async created() {
      // if (!this.$identity.can('users.administrators.pages.edit')) {
      //   this.$router.push('access-denied')
      // }

      // this.getProductsList()

      // noinspection ES6MissingAwait
      // await this.getRoleList()

      if (this.$route.params.id) {
        await this.getModel(this.$route.params.id)
      }
    },
    async beforeRouteUpdate (to, from, next) {
      if (to.params.id) {
        await this.getModel(this.$route.params.id)
      } else {
        this.model = { images: []}
      }

      next()
    },
    components: {
      AInput,
      AFormBlock
    },
    computed: {
      disableControlButtons: {
        get() {
          return JSON.stringify(this.model) === JSON.stringify(this.oldModel)
        }
      },
      structure: {
        get() {
          return [
            { name: 'ФИО', alias: 'name' },
            { name: 'Е-mail', alias: 'email' },
            { name: 'Телефон', alias: 'phone' },
            { name: '', alias: 'change_pass', isShow: this.model.id },
            { name: 'Пароль', alias: 'password', isShow: this.showPasswordsFields },
            { name: 'Пароль', alias: 'password_confirmation', isShow: this.showPasswordsFields },
          ];
        }
      },
      showPasswordsFields: {
        get() {
          return this.model.change_pass || !this.model.id
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.model.images = this.model.images.filter(item => item.uid !== file.uid)
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      handleSuccess(response, file, fileList) {
        this.model.images.push(response)
      },

      async getModel(id) {
        this.loading = true
        try {
          let response = await this.$http.get(`${this.actions.rest}/${id}`)

          this.model = response.data
          this.oldModel = JSON.parse(JSON.stringify(response.data))
        } catch (e) {
          throw e
        } finally {
          this.loading = false
        }
      },
      async save(next = false) {
        this.loading = true
        try {
          let response = {}

          if (this.model.id) {
            response = await this.$http.put(`${this.actions.rest}/${this.model.id}`, this.model)
          } else {
            response = await this.$http.post(`${this.actions.rest}`, this.model)
          }

          this.$message.success(response.data.message)
          this.$router.push({ name: next ? 'users_create' : 'users' })
        } catch (e) {
          if (e.response) {
            switch (e.response.status) {
              case 422:
                this.errors = e.response.data
                break;
              default:
                this.$message.error(e.response.data.message)
            }

            return
          }
          throw e
        } finally {
          this.loading = false
        }
      },
      rollback() {
        this.model = JSON.parse(JSON.stringify(this.oldModel))
      },
      back() {
        this.$router.push({ name: 'users' })
      }
    }
  }
</script>
