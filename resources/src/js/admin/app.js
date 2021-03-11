import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from 'axios'
import axios from './components/classes/AxiosWrapper.js'
import Identity from './components/classes/identity/Identity.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

import router from './router';
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'

import VueMce from 'vue-mce';

Vue.use(VueMce);


locale.use(lang)

Vue.use(VueRouter);
Vue.use(ElementUI);


// FIXME: Костыль
async function init() {

    let user = {};
    try {
      let response = await axios.get('/api/admin/user', {})
      window.$identity = Vue.prototype.$identity = new Identity(response.data.data)

    } catch (e) {
      console.log(e);
        if (!e.response) {
            throw e
        }

        window.$identity = Vue.prototype.$identity = new Identity

    } finally {
    }

    Vue.prototype.$http = axios;
    Vue.prototype.$http2 = axios;

    const app = new Vue({
        router,
    }).$mount('#app');

    // TODO: Ну такое себе, переделать на vue bus
    Vue.prototype.$http.$vm = app;
}

init()
