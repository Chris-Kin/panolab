import Vue from 'vue';
import Router from 'vue-router';
import autoRoute from 'spa-auto-route';

import NotFound from '@/view/Exception/404';
import Forbidden from '@/view/Exception/403';

Vue.use(Router);
const routes = autoRoute(require.context('@/view', true, /index\.vue$/), /Exception|\/component\//);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/403',
      name: 'Forbidden',
      component: Forbidden,
    },
    {
      path: '/',
      redirect: '/u/login',
      // redirect: '/u/space',
    },
    ...routes,
  ],
});
