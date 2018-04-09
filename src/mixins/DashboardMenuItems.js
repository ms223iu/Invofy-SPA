export var DashboardMenuItems = {
  data() {
    return {
      menuItems: [
        {
          category: 'Fakturor',
          items: [
            {
              name: 'Mina fakturor',
              to: '/dashboard/invoice'
            },
            {
              name: 'Skapa en faktura',
              to: '/dashboard/invoice/add'
            }
          ]
        },
        {
          category: 'Mottagare',
          items: [
            {
              name: 'Mina mottagare',
              to: '/dashboard/address'
            },
            {
              name: 'Lägg till en mottagare',
              to: '/dashboard/address/add'
            }
          ]
        }
      ]
    };
  }
};