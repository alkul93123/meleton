<template id="">
  <el-form-item
    :label="item.name"
    :class="{ 'additional-color': item.isAdditional, 'has-error': !!errors[item.alias] }"
    :error="errors[item.alias]"
    :show-message="true"
    v-if="item.isShow || !item.hasOwnProperty('isShow')"
    >
    <el-input v-model="model[item.alias]" v-if="item.fieldType == 'input' || !item.fieldType" :placeholder="item.placeholder"></el-input>

    <el-input type="textarea" v-model="model[item.alias]" v-if="item.fieldType == 'input-textarea'" :placeholder="item.placeholder"></el-input>

    <br v-if="item.fieldType == 'input-number'">
    <el-input-number
        v-model="model[item.alias]"
        v-if="item.fieldType == 'input-number'"
        :placeholder="item.placeholder"
        :step="item.step || 1"
        :precision="item.precision || 0"
    >

    </el-input-number>

    <el-input v-model="model[item.alias]" v-if="item.fieldType == 'input-with-prefix'" :placeholder="item.placeholder">
      <template #prepend>{{ item.prefix }}</template>
    </el-input>

    <el-select v-model="model[item.alias]" :placeholder="item.placeholder" v-if="item.fieldType == 'simple-select'" :multiple="item.multiple || false" :filterable="item.filterable || false" style="width: 100%">
      <el-option v-for="item in item.listItems"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>

    <el-radio-group v-model="model[item.alias]" v-if="item.fieldType == 'radio-group'">
      <el-radio :label="checkbox.id" v-for="checkbox, index in item.listItems" :key="index">{{ checkbox.name }}</el-radio>
    </el-radio-group>

    <el-checkbox v-model="model[item.alias]" v-if="item.fieldType == 'checkbox' || item.fieldType == 'boolean'"></el-checkbox>

    <el-date-picker v-model="model[item.alias]"
                    placeholder="Выберите дату"
                    format="dd.MM.yyyy"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    v-if="item.fieldType == 'date'"
                    style="width: 100%"
                    >
    </el-date-picker>
  </el-form-item>
</template>
<script>
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [
            {
              text: 'Сегодня',
              onClick(picker) {
                picker.$emit('pick', new Date())
              }
            },
            {
              text: 'Вчера',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            }
          ]
        }
      }
    },
    props: {
      model: {
        type: Object,
        required: true
      },
      item: {
        type: Object,
        required: true
      },
      errors: {
        type: Object,
        required: false,
        default: () => { return {} }
      }
    }
  }
</script>
<style lang="css" scoped>
  .has-error {
    margin-bottom: 18px !important;
  }
</style>
