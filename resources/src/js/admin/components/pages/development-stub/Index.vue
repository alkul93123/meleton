<template>
  <el-row>
    <el-col>
      <el-card class="development">
        <div class="span"> <i class="el-icon-s-opportunity"></i> Раздел в разработке</div>
        <div class="comment"> Как только он будет готов, мы вас уведомим</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

  export default {
    data() {
      return {
        actions: {
          rest: '/api/v1/insurances'
        },
        insurances: []
      }
    },
    created() {
      this.getInsurances()
    },
    methods: {
      async getInsurances() {
        try {
          let response = await this.$http.get(this.actions.rest)

          this.insurances = response.data.data
        } catch (e) {
          throw e
        } finally {
        }
      },

      async save(insurance) {
        try {
          let response = await this.$http.put(`${this.actions.rest}/${insurance.id}`, insurance)

          this.$message.success(response.data.message)
        } catch (e) {
          throw e
        } finally {
        }
      }
    }
  }

</script>
<style lang="css" scope>
  .development {
    min-height: 75vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .development .span {
    font-size: 72px;
    font-weight: lighter;
    margin-bottom: 5%;
  }

  .development .comment {
    font-size: 14px;
  }
</style>
