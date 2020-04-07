export const tabs = [
  { 
    label: 'general',
    list: [
      {
        href: '/',
        title: 'dashboard',
        icon: 'fa-columns',
      },
      {
        href: '/pages',
        title: 'pages',
        icon: 'fa-file-alt',
      },
      {
        href: '/news',
        title: 'news',
        icon: 'fa-newspaper',
      },
      {
        href: '/events',
        title: 'events',
        icon: 'fa-calendar-alt',
      },
    ]
  },

  { 
    label: 'administration',
    list: [
      {
        href: '/stats',
        title: 'statistics',
        icon: 'fa-chart-area',
      },
      {
        href: '/bots',
        title: 'bots',
        icon: 'fa-robot',
      },
      {
        href: '/users',
        title: 'users',
        icon: 'fa-users',
      },
      {
        href: '/settings',
        title: 'settings',
        icon: 'fa-cogs',
      },
    ],
  },
];

export const routes = {
  'general': { title: 'General', href: null },
  'dashboard': { title: 'Dashboard', href: '/' },
  'pages': { title: 'Pages', href: '/pages' },
  'news': { title: 'News', href: '/news' },
  'events': { title: 'Events', href: '/events' },

  'administration': { title: 'Administration', href: null },
  'statistics': { title: 'Statistics', href: '/stats' },
  'bots': { title: 'Bots', href: '/bots' },

  'users': { title: 'Users', href: '/users' },
  'users/create': { title: 'Create', href: '/users/create' },

  'settings': { title: 'Settings', href: '/settings' },

  'profile': { title: 'Profile', href: '/profile' },
};
