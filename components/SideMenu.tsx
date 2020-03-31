import { InputHTMLAttributes } from 'react';
import Icon from './Icon';
import Translation, { TranslationProps } from '../components/middlewares/Translation';

export type SideMenuProps = InputHTMLAttributes<HTMLDivElement> & TranslationProps & {
  page?: string;
};

const content = [
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

export default Translation('sidemenu')((props: SideMenuProps) => {
  const { t, tReady, ...other } = props;

  const items = content.map((v) => {
    const listItems = v.list.map(v => <li><a href={v.href}>{t(v.title)}{v.icon && <Icon position="right" icon={v.icon} />}</a></li>);
    return (
      <>
        <p className="menu-label">{t(v.label)}</p>
        <ul className="menu-list">{listItems}</ul>
      </>
    )
  });

  return (
    <aside className="menu" {...other} style={{ padding: '0 0 0 0' }}>
      {items}
    </aside>
  );
});
