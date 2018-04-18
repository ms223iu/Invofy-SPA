import store from '../store';
import Home from '../views/Home';
import Auth from '../views/Auth';
import Dashboard from '../views/Dashboard';

import InvoicesList from '../components/dashboard/InvoicesList';
import AddInvoice from '../components/dashboard/AddInvoice';

import AddressList from '../components/dashboard/AddressList';
import AddAddress from '../components/dashboard/AddAddress';

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
      },
      {
        path: 'address/add',
        component: AddAddress
      },
      {
        path: 'settings/company',
        component: MyCompany
      }
    ]
  }
];
