import store from '../store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

import InvoicesList from '../components/dashboard/InvoicesList.vue';
import AddInvoice from '../components/dashboard/AddInvoice.vue';

import AddressList from '../components/dashboard/AddressList.vue';
import AddAddress from '../components/dashboard/AddAddress.vue';


export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login,
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
