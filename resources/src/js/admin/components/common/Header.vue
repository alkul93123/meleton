<template>

  <el-row>
    <el-col>
      <el-menu :default-active="activeIndex" class="el-menu-demo hidden-sm-and-down" mode="horizontal" @select="handleSelect">
        <!-- <el-menu-item>R-logger</el-menu-item> -->
        <!-- <el-menu-item index="2" style="float: right">Processing Center</el-menu-item> -->
        <el-menu-item index="3" style="float: right" @click="exit()">
          <!-- <i class="el-icon-s-platform"></i> -->
          <span slot="title" style="color: red">Выход</span>
        </el-menu-item>

        <el-menu-item @click="toggleCollapse()">
          <i class="el-icon-s-fold"></i>
        </el-menu-item>
      </el-menu>
      <el-menu class="el-menu-demo hidden-md-and-up" mode="horizontal">
        <el-menu-item class="li-header-logo">СТМП</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>

</template>

<script>

  import CommonMethodsMixin from '@admin-mixins/CommonMethodsMixin.js'

  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    mixin: [CommonMethodsMixin],
    methods: {
      handleSelect(key, keyPath) {},

      toggleCollapse() { this.$root.$emit('collapse-toggle', {}) },

      toAgentInterface() {
        let link=document.createElement('a');
        link.href = '/';
        link.target = '_blank';
        link.click();
      },

      exit() {
        localStorage.setItem('access_token', '')
        this.$identity.deauth()
        window.$identity.deauth()
        this.$router.push({ name: 'login' })
      }
    }
  }

</script>

<style lang="css">

  .el-header {
    padding: 0px;
  }

</style>
