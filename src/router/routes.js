import store from '../store';
import Home from '../views/Home';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';

import InvoicesList from '../components/dashboard/InvoicesList';
import AddInvoice from '../components/dashboard/AddInvoice';

import AddressList from '../components/dashboard/AddressList';
import AddAddress from '../components/dashboard/AddAddress';

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
      },
      {
        path: 'address/add',
        component: AddAddress
      }
    ]
  }
];
