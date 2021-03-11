<template>
  <el-card>
    <el-row>
      <el-col>
        <el-row class="header">
          <el-col :span="6">
            <h3 class="header--title">
              Пользователи
              &nbsp;
              <el-tooltip class="item" effect="dark" content="Добавить пользователя" placement="top">
                <el-button type="success" size="mini" icon="el-icon-plus" circle plain @click="$router.push({ name: 'users_create' })"></el-button>
              </el-tooltip>
            </h3>
          </el-col>

          <el-col :span="16" class="header--additional" v-if="models.length">
            <el-pagination
              background
              :current-page="settings.pagination.page"
              :page-size="settings.pagination.limit"
              :pager-count="5"
              layout="sizes, prev, pager, next, jumper"
              @current-change="currentChange"
              @size-change="sizeChange"
              :total="totalItems">
            </el-pagination>
          </el-col>
          <el-col :span="2" class="header--additional" v-if="models.length">
<!--            <el-tooltip class="item" effect="dark" content="Очистить фильтры" placement="top">-->
<!--              <el-button type="warning" size="mini" icon="el-icon-brush" circle plain></el-button>-->
<!--            </el-tooltip>-->
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-divider></el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <a-table  :models="models"
                      :headerItems="structure"
                      :showFilters="false"
                      :loading="loading"
                      :sort="settings.sort"
                      :incomeFilters="settings.filters"
                      v-on:sorting="sorting"
                      v-on:change-filters="changeFilters">

              <template v-slot:rightClickMenu="{ row, context }">
<!--                <li class="el-dropdown-menu__item" @click="$router.push({name: 'users_edit', params: { id: row.id }})">-->
<!--                    <i class="el-icon-edit" ></i> Редактировать-->
<!--                </li>-->
<!--                <li class="el-dropdown-menu__item" v-if="$identity.can('users.administrators.pages.edit')">-->
<!--                  <el-divider></el-divider>-->
<!--                </li>-->
<!--                <li class="el-dropdown-menu__item"  style="color: red;" @click="remove(row.id)">-->
<!--                    <i class="el-icon-lock" ></i> Заблокировать-->
<!--                </li>-->
                <!-- <li class="el-dropdown-menu__item"  style="color: green;">
                    <i class="el-icon-unlock" ></i> Разблокировать
                </li> -->
              </template>
            </a-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-divider></el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="footer--additional">
            <el-pagination
              v-if="models.length"
              background
              :current-page="settings.pagination.page"
              :page-size="settings.pagination.limit"
              :pager-count="5"
              layout="sizes, prev, pager, next, jumper"
              @current-change="currentChange"
              @size-change="sizeChange"
              :total="totalItems">
            </el-pagination>
          </el-col>
        </el-row>

      </el-col>
    </el-row>
  </el-card>
</template>
<script>

import ATable from '@admin-custom/table/FlexTable.vue'
import UserFiltersMixin from '@admin-mixins/UserFiltersMixin.js'
import DefaultSettings from './DefaultSettings.js'


  export default {
    data() {
      return {
        actions: {
          curators: '/api/admin/users',
          rest: '/api/admin/users'
        },
        models: [],
        moduleName: 'users',
        settings: JSON.parse(JSON.stringify(DefaultSettings)),
        totalItems: 0,
        loading: false,
        structure: [
          { name: 'ФИО', alias: 'name' },
          { name: 'email', alias: 'email' },
          { name: 'Телефон', alias: 'phone' },
          // { name: 'Дата создания', alias: 'created' },
        ],
      }
    },
    mixins: [UserFiltersMixin],
    components: { ATable },
    async created() {
      // if (!this.$identity.can('users.administrators.pages.index')) {
      //   return this.$router.push('access-denied')
      // }

      this.loading = true

      let settings = await this.getUserFilters(this.moduleName)

      this.settings = settings.pagination ? settings : JSON.parse(JSON.stringify(DefaultSettings))

      this.getModels()
    },
    methods: {
      async getModels() {
        await this.setUserFilters(this.moduleName, this.settings)

        this.loading = true
        try {
          let response = await this.$http.get(this.actions.curators, { params: { filters: this.settings } })

          this.models = response.data.data
          this.totalItems = response.data.total
        } catch (e) {
          throw e
        } finally {
          this.loading = false
        }
      },
      edit(item) {
        this.$router.push({ name: 'admins_edit', params: { id: item.id } })
      },

      sorting(field) {
        this.settings.sort.field = field
        this.settings.sort.type = !this.settings.sort.type

        this.getModels()
      },
      changeFilters(filters) {
        this.settings.filters = filters

        this.getModels()
      },
      currentChange(page) {
        this.settings.pagination.page = page
        this.getModels()
      },
      sizeChange(size) {
        this.settings.pagination.page = 1
        this.settings.pagination.limit = size
        this.getModels()
      },
      accessInNextVersion() {
        this.$message.error('Метод будет доступен в следующих версиях.')
      },
      async remove(id) {
        try {
          let response = await this.$http.delete(`${this.actions.rest}/${id}`)

          this.getModels();
        } catch (e) {
          throw e
        } finally {

        }
      }
    }
  }
</script>
