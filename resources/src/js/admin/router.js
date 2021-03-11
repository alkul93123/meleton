import VueRouter from 'vue-router';


import NotFound from './components/common/NotFound.vue';
import DefaultHeader from './components/common/Header.vue';
import DefaultFooter from './components/common/Footer.vue';
import DefaultAside from './components/common/Aside.vue';

import LoginAside from './components/pages/login/layout/Aside.vue';
import LoginHeader from './components/pages/login/layout/Header.vue';
import LoginFooter from './components/pages/login/layout/Footer.vue';
import Main from './components/pages/main/Index.vue';

import Users from './components/pages/users/Index.vue';
import UsersForm from './components/pages/users/Form.vue';
import Login from './components/pages/login/Index';

import DevelopmentStub from './components/pages/development-stub/Index.vue';
import AccessDenied from './components/pages/access-denied/Index.vue';



const routes = [
    {
      path: '*',
      components: {
        default: NotFound
      }
    },
    {
      path: '/',
      name: 'main',
      components: { aside: DefaultAside, header: DefaultHeader, default: Main, footer: DefaultFooter },
      meta: { requiresAuth: true, menuitem: '2' }
    },
    {
      path: '/users',
      name: 'users',
      components: { aside: DefaultAside, header: DefaultHeader, default: Users, footer: DefaultFooter   },
      meta: { requiresAuth: true, menuitem: '7' }
    },
    {
      path: '/users/:id/edit',
      name: 'users_edit',
      components: { aside: DefaultAside, header: DefaultHeader, default: UsersForm, footer: DefaultFooter },
      meta: { requiresAuth: true, menuitem: '7' }
    },
    {
      path: '/users/create',
      name: 'users_create',
      components: { aside: DefaultAside, header: DefaultHeader,   default: UsersForm, footer: DefaultFooter },
      meta: {   requiresAuth: true, menuitem: '7' }
    },
    {
      path: '/settings',
      name: 'settings',
      components: { aside: DefaultAside, header: DefaultHeader, default: DevelopmentStub, footer: DefaultFooter   },
      meta: { requiresAuth: true, menuitem: '9' }
    },
    {
      path: '/dev',
      name: 'dev',
      components: { aside: DefaultAside, header: DefaultHeader, default: DevelopmentStub, footer: DefaultFooter   },
      meta: { requiresAuth: true, menuitem: '111' }
    },
    {
      path: '/login',
      name: 'login',
      components: { aside: LoginAside, header: LoginHeader, default: Login, footer: LoginFooter }
    },
    {
      path: '/access-denied',
      name: 'access-denied',
      components: { aside: DefaultAside, header: DefaultHeader, default: AccessDenied, footer: DefaultFooter }
    },
];

let router = new VueRouter({
  base: '/panel',
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(window.$identity);
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!window.$identity.isGuest) {
        next()
        return;
    }

    next({
        path: '/login',
        query: { redirect: to.fullPath }
    });
  } else {
    next(); // всегда так или иначе нужно вызвать next()!
  }
});

export default router;
