export default {
  items: [
    {
      name: 'Dashboard',
      url: '/planning/unit',
      icon: 'icon-home2',
    },
    {
      title: true,
      name: 'Transaction',
      wrapper: {            
        element: '',        
        attributes: {}        
      },
      class: ''
    },
    {
      name: 'Menu 1',
      url: '#',
      icon: 'icon-star-empty3',
    },
    {
      name: 'Menu 2',
      url: '#',
      icon: 'icon-alarm',
    },
    {
      title: true,
      name: 'Report',
      wrapper: {            
        element: '',        
        attributes: {}        
      },
      class: ''
    },
    {
      name: 'Menu 3',
      url: '#',
      icon: 'icon-cube3',
    },
    {
      title: true,
      name: 'Administration',
      wrapper: {            
        element: '',        
        attributes: {}        
      },
      class: ''
    },
    {
      name: 'Menu 4',
      url: '#',
      icon: 'icon-users',
    },
    {
      name: 'Master Data',
      url: '#',
      icon: 'icon-stack',
      children: [
        {
          name: 'Menu 5',
          url: '#',
          icon: 'icon-users2',
        },
        {
          name: 'Menu 6',
          url: '#',
          icon: 'icon-stack',
        },
      ]
    },
    {
      name: 'Menu 7',
      url: '#',
      icon: 'icon-accessibility',
    },
  ],
};
