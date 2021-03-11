let defaultSettings = {
  pagination: {
    page: 1,
    limit: 20,
  },
  sort: {
    field: 'id',
    type: false
  },
  filters: {
    id: '',
  }
}

export default {
  data() {
    return {
      settings: {},
      defaultSettings: JSON.parse(JSON.stringify(defaultSettings))
    }
  },
  methods: {
    sorting(field) {
      this.settings.sort.field = field
      this.settings.sort.type = !this.settings.sort.type

      this.getModels()
    },
    changeFilters(filters) {
      this.settings.filters = filters
      this.settings.pagination.page = 1

      this.getModels()
    },
    applyFilters() {
      this.filtersIsShow = false
      this.settings.pagination.page = 1

      this.getModels()
    },
    clearFilters() {
      this.settings.filters = JSON.parse(JSON.stringify(this.defaultSettings.filters))
      this.getModels()
    },
    currentChange(page) {
      this.settings.pagination.page = page
      this.getModels()
    },
    sizeChange(size) {
      this.settings.pagination.page = 1
      this.settings.pagination.limit = size
      this.getModels()
    },

    /** Немного грязновато, но все-же */
    selectRow(row) {
      this.settings.params.selectedRow = row
      this.setUserFilters(this.moduleName, this.settings)
    },

    attachColumn(col) {
      this.settings.params.attachedColumn = col
      this.setUserFilters(this.moduleName, this.settings)
    },
  }
}
