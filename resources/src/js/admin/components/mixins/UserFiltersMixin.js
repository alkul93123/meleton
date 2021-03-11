export default {
    data() {
        return {
            actions: {
                setUserData: '/api/v1/user/filters/set',
                getUserData: '/api/v1/user/filters/get',
                clearFilters: '/api/v1/user/filters/clear-filters',
            },
        }
    },
    methods: {
        async setUserFilters(module, filters) {
            try {
                let params = {
                    filters: filters,
                }

                let response = await this.$http.post(`${this.actions.setUserData}/${module}`, params);

                return response.data
            } catch (e) {
              throw e
            } finally {

            }
        },

        async getUserFilters(module) {
            try {
                let response = await this.$http.get(`${this.actions.getUserData}/${module}`, {})

                return response.data
            } catch (e) {
                throw e
            } finally {

            }
        },

        async clearUserFilters(module) {
            try {
                let response = await this.$http.get(`${this.actions.clearFilters}/${module}`, {})

                this.$message.success(response.data.message)

                return response.data
            } catch (e) {
              throw e
            } finally {

            }
        }
    }
}
