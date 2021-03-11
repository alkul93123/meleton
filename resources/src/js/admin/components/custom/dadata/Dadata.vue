<template>
  <el-select
    style="width: 100%;"
    v-model="model"
    remote
    :remote-method="getCities"
    filterable
    >
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
  export default {
    data() {
      return {
        action: '/api/v1/static-data/dadata-cities',
        list: [],
      }
    },
    props: {
      model: {
        type: String,
        required: true
      }
    },
    model: {
      prop: 'model',
      event: 'blur'
    },
    methods: {
      async getCities(query) {
        try {
          let response = await this.$http.get(this.action, { params: {query: query} })


        } catch (e) {

        } finally {

        }
      }
    }
  }
</script>
