<template id="">
  <el-row>
    <el-col>
      <el-row v-if="withHeader" class="header--row">
        <el-col :span="20">
          <h4 @click="toggleCollapse">{{ header }}</h4>
        </el-col>
        <el-col :span="4">
          <i class="el-icon-arrow-down pull-right" v-if="collapsed"></i>
          <i class="el-icon-arrow-up pull-right" v-if="!collapsed"></i>
        </el-col>
      </el-row>
      <el-row :class="{'is-collapsed': collapsed}">
        <el-col>
          <el-divider></el-divider>
        </el-col>
      </el-row>
      <el-row :class="{'is-collapsed': collapsed}">
        <el-col>
          <slot name="body"></slot>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    props: {
      header: {
        type: String,
        required: false,
        default: ''
      },
      withHeader: {
        type: Boolean,
        required: false,
        default: true
      },
      collapsed: {
        type: Boolean,
        required: false,
        default: false,
      },
      canToggleCollapse: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
    methods: {
      toggleCollapse() {
        if (!this.canToggleCollapse) {
          return
        }

        this.$emit('toggle-collapse')
      }
    }
  }
</script>
<style lang="css" scoped>
  .item--row {
    font-size: 12px;
    border-bottom: 1px solid #eee;
    padding: 7px 0;
  }
  .header--row {
    cursor: pointer;
  }
  .is-collapsed {
    display: none;
  }
  .pull-right {
    float: right;
  }
</style>
