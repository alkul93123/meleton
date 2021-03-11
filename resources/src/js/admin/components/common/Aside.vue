<template>

  <el-aside class="hidden-sm-and-down" style="background-color: rgb(60, 50, 71);" :style="{ 'width': collapsed ? '64px' : '300px' }">
    <el-row>
      <el-col class="aside-user-info" :class="{ collapsed: collapsed }">
        <span v-if="!collapsed">{{ $identity.user.name }}</span>
        <span v-if="collapsed">
          <el-tooltip class="item" effect="dark" :content="$identity.user.name" placement="bottom">
            <i class="el-icon-s-custom"></i>
          </el-tooltip>
        </span>
      </el-col>
      <el-col>
        <el-menu :default-active="$route.meta.menuitem"
                 class="el-menu-vertical-demo"
                 :collapse="collapsed"
                 background-color="#3c3247"
                 text-color="#957b84"
                 active-text-color="#ffffff">
          <el-menu-item index="2" @click="toRoute('main')">
            <i class="el-icon-s-platform"></i>
            <span slot="title">Главная</span>
          </el-menu-item>
          <el-menu-item index="7" @click="toRoute('users')">
            <i class="el-icon-user-solid"></i>
            <span slot="title">Пользователи</span>
          </el-menu-item>
          <!-- <el-submenu index="3" v-if="$identity.can('policies')">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>Полисы</span>
            </template>
            <el-menu-item index="3-1" @click="toRoute('policies')" v-if="$identity.can('policies.policies')">
              <i class="el-icon-document-checked"></i>
              <span slot="title">Полисы</span>
            </el-menu-item>
            <el-menu-item index="3-2" @click="toRoute('drafts')" v-if="$identity.can('policies.drafts')">
              <i class="el-icon-document-remove"></i>
              <span slot="title">Черновики</span>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>

</template>

<script>
import UserFiltersMixin from '@admin-mixins/UserFiltersMixin.js'
  export default {
    data() {
      return {
        collapsed: true,
      }
    },
    mixins: [UserFiltersMixin],
    async created() {
      // this.clearUserFilters('aside')
      let filters = await this.getUserFilters('aside')

      this.collapsed = filters.collapsed

      this.$root.$on('collapse-toggle', () => {
        this.collapsed = !this.collapsed
        this.setUserFilters('aside', { collapsed: this.collapsed })
      })
    },
    methods: {
      handleOpen() {
        this.isCollapse = false
      },

      handleClose() {
        this.isCollapse = true
      },
      toRoute(alias) {
        this.$router.push({ name: alias })
      }
    }
  }

</script>
<style lang="css" scoped>
  .collapsed {
    width: 64px;
  }
</style>
