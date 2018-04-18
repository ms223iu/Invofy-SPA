import store from '../store';
import Home from '../views/Home';
import Auth from '../views/Auth';
import Dashboard from '../views/Dashboard';

import InvoicesList from '../views/dashboard/InvoicesList';
import InvoiceAdd from '../views/dashboard/InvoiceAdd';

import AddressList from '../views/dashboard/AddressList';
import AddressAdd from '../views/dashboard/AddressAdd';

import MyCompany from '../views/dashboard/MyCompany';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: Auth,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) { next({ path: '/dashboard' }); } else { next(); }
    },
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register
      }
    ],
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/invoice',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) { next(); } else { next({ path: '/auth/login' }); }
    },
    children: [
      {
        path: 'invoice',
        component: InvoicesList
      },
      {
        path: 'invoice/add',
        component: InvoiceAdd
      },
      {
        path: 'address',
        component: AddressList
      },
      {
        path: 'address/add',
        component: AddressAdd
      },
      {
        path: 'settings/company',
        component: MyCompany
      }
    ]
  }
];
