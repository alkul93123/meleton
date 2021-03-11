<template>
  <el-row>
    <el-col>
      <el-row v-if="withHeader" class="header--row" @click="toggleCollapse">
        <el-col :span="20" syle="flex: 1">
          <span class="header--title" @click="toggleCollapse">{{ header }}</span>
        </el-col>
        <el-col :span="4" syle="flex: 1">
          <i class="el-icon-arrow-down pull-right" v-if="collapsed" @click="toggleCollapse"></i>
          <i class="el-icon-arrow-up pull-right" v-if="!collapsed" @click="toggleCollapse"></i>
        </el-col>
      </el-row>
      <el-row  v-if="withHeader" :class="{'is-collapsed': collapsed}">
        <el-col>
          <el-divider></el-divider>
        </el-col>
      </el-row>
      <el-row :class="{'is-collapsed': collapsed}" class="item--row">
        <el-col>
          <el-form :model="model">
            <el-row v-for="item, index in structure" :key="index" >
                <slot :name="`form_${item.alias}`" v-bind:item="model" >
                  <one-nesting-item v-if="item.alias.split('.').length == 1" :model="model" :item="item" :errors="errors"> </one-nesting-item>
                  <two-nesting-item v-if="item.alias.split('.').length == 2" :model="model" :item="item" :errors="errors"> </two-nesting-item>
                  <three-nesting-item v-if="item.alias.split('.').length == 3" :model="model" :item="item" :errors="errors"> </three-nesting-item>
                </slot>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import OneNestingItem from './components/OneNestingItem.vue'
import TwoNestingItem from './components/TwoNestingItem.vue'
import ThreeNestingItem from './components/ThreeNestingItem.vue'

  export default {
    components: {
      OneNestingItem,
      TwoNestingItem,
      ThreeNestingItem,
    },
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
      structure: {
        type: Array,
        required: true
      },
      model: {
        type: Object,
        required: true
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
      headerPadding: {
        type: Number,
        required: false,
        default: 0
      },
      errors: {
        type: Object,
        required: false,
        default: () => { return {} }
      }
    },
    methods: {
      toggleCollapse() {
        if (!this.canToggleCollapse) {
          return
        }

        this.$emit('toggle-collapse')
      },
    }
  }
</script>
