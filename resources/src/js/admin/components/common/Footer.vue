<template>
    <el-row>
        <el-col>
            <el-menu
                :default-active="'1'"
                class="el-menu-demo hidden-md-and-up"
                mode="horizontal"
                background-color="#3c3247"
                text-color="#957b84"
                active-text-color="#ffffff"
                >
              <el-menu-item index="1">
                  <i class="el-icon-s-platform"></i>
              </el-menu-item>
              <el-menu-item index="2">
                  <i class="el-icon-finished"></i>
              </el-menu-item>
              <el-menu-item index="3">
                  <i class="el-icon-setting"></i>
              </el-menu-item>
            </el-menu>

            <el-menu class="el-menu-demo hidden-sm-and-down" mode="horizontal" >
              <el-menu-item class="li-header-logo">Simpatio {{ date }}. All right reserved.</el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
  export default {
    computed: {
      date: {
        get() {
          let date = new Date()
          return date.getFullYear()
        }
      }
    }
  }
</script>

<style lang="css">
    .el-footer {
        padding: 0px;
    }
</style>
