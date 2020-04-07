import { InputHTMLAttributes } from 'react';
import Icon from './Icon';
import Translation, { TranslationProps } from '../components/middlewares/Translation';
import Link from 'next/link';
import { tabs } from '../routes';

export type SideMenuProps = InputHTMLAttributes<HTMLDivElement> & TranslationProps & {
  page?: string;
};

export default Translation('common')((props: SideMenuProps) => {
  const { t, page, tReady, ...other } = props;

  const items = tabs.map((v) => {
    const listItems = v.list.map(v => (
      <li key={v.title}>
        <Link href={v.href}>
          <a className={page === v.title ? 'is-active' : ''}>
          {t(v.title)}
          {v.icon && <Icon position="right" icon={v.icon} />}
          </a>
        </Link>
      </li>
    ));
    return (
      <div key={v.label}>
        <p className="menu-label">{t(v.label)}</p>
        <ul className="menu-list">{listItems}</ul>
      </div>
    )
  });

  return (
    <aside className="menu" {...other} style={{ padding: '0 0 0 0' }}>
      {items}
    </aside>
  );
});
