export default {
  data() {
    return {
      settings: {}
    }
  },
  methods: {
    accessInNextVersion() {
      this.$message.error('Метод будет доступен в следующих версиях.')
    },
    toRoute(route) {
      if (typeof route == 'string') {
        this.$router.push({ name: route })
      }

      this.$router.push(route)
    },
    download(filePath) {
      let link=document.createElement('a');
      link.href = filePath;
      link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
      link.click();
    },
    link(path) {
      let link=document.createElement('a');
      link.href = path;
      link.click();
    }
  }
}
