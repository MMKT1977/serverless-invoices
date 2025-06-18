import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store';
import i18n from '@/config/i18n.config';
import config from '@/config/app.config';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    redirect: 'invoices',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    beforeEnter: async (to, from, next) => {
      await store.dispatch('teams/init');
      next();
    },
    children: [
      {
        path: '/invoices',
        name: 'invoices',
        component: () => import('@/views/dashboard/Invoices.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/invoice/:id',
        name: 'invoice',
        component: () => import('@/views/dashboard/Invoice.vue'),
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/invoices/:id/print',
    name: 'invoice-print',
    component: () => import('@/views/InvoicePrint.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new Router({
  mode: 'history',
  base: config.base_url,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // Set language from query parameter
  if (!to.query.lang) {
    i18n.initialized.then(() => {
      to.query.lang = i18n.i18next.language;
      next(to);
    });
  } else {
    next();
  }
});

export default router;