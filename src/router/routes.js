import store from '../store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

import InvoicesList from '../components/dashboard/InvoicesList.vue';
import AddInvoice from '../components/dashboard/AddInvoice.vue';

import AddressList from '../components/dashboard/AddressList.vue';

import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: Login,
    children: [
      {
        path: 'login',
        component: LoginForm,
      },
      {
        path: 'register',
        component: RegisterForm
      }
    ],
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/invoice',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) { next(); } else { next({ path: '/' }); }
    },
    children: [
      {
        path: 'invoice',
        component: InvoicesList
      },
      {
        path: 'invoice/add',
        component: AddInvoice
      },
      {
        path: 'address',
        component: AddressList
      }
    ]
  }
];
