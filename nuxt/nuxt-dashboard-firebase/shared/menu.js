export default {
  url: "",
  name: "Home",
  children: [{
      name: 'Dashboard',
      url: '/',
      icon: 'icon-speedometer'
    },
    {
      name: 'Customers',
      url: '/customers',
      icon: 'icon-user',
      children: [{
        url: "/customers",
        name: "List",
      },{
        url: "/customers/add",
        name: "Add",
      }, {
        url: "/customers/:slug",
        name: "Review",
        attributes: { hidden: true },
      }]
    }
  ]
}
