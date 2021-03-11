let mixin = {
  data() {
    return {
      actions: {
          getRoleList: '/api/manuals/role/list',
      },
      roleList: [],
    }
  },
  methods: {

    async getRoleList() {
      try {
        let response = await this.$http.get(this.actions.getRoleList)

        this.roleList = response.data
      } catch (e) {
        throw e
      } finally {}
    }
  }
}

export default mixin
