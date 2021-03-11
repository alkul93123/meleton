<template id="">
  <el-form-item :label="item.name" :class="{ 'additional-color': item.isAdditional }" :error="errors[item.alias.split('.').shift()][item.alias.split('.')[1]][item.alias.split('.')[2]]">
    <el-input v-model="model[item.alias.split('.').shift()][item.alias.split('.')[1]][item.alias.split('.')[2]]" v-if="item.fieldType == 'input' || !item.fieldType" :placeholder="item.placeholder"></el-input>

    <el-select v-model="model[item.alias.split('.').shift()][item.alias.split('.')[1]][item.alias.split('.')[2]]" :placeholder="item.placeholder" v-if="item.fieldType == 'simple-select'" filterable>
      <el-option v-for="item in item.listItems"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>

    <el-radio-group v-model="model[item.alias.split('.').shift()][item.alias.split('.')[1]][item.alias.split('.')[2]]" v-if="item.fieldType == 'radio-group'">
      <el-radio :label="checkbox.id" v-for="checkbox, index in item.listItems" :key="index">{{ checkbox.name }}</el-radio>
    </el-radio-group>

    <el-checkbox v-model="model[item.alias.split('.').shift()][item.alias.split('.')[1]][item.alias.split('.')[2]]" v-if="item.fieldType == 'checkbox' || item.fieldType == 'boolean'"></el-checkbox>

    <el-date-picker v-model="model[item.alias.split('.').shift()][item.alias.split('.')[1]][item.alias.split('.')[2]]"
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
