export default {
  url: "",
  name: "Home",
  children: [{
      name: 'Dashboard',
      url: '/',
      icon: 'icon-speedometer'
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-user',
      children: [{
        url: "/users",
        name: "List",
      },{
        url: "/users/add",
        name: "Add",
      }, {
        url: "/users/:slug",
        name: "Review",
        attributes: { hidden: true },
      }]
    }
  ]
}
