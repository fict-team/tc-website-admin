import { useSelector, useDispatch } from "react-redux";
import IState from "../core/store";
import { IUser } from "../core/authorization";
import Icon from "./Icon";
import { setAuthorization } from "../core/api";
import { useState } from "react";
import { tabs, routes } from '../routes';
import Link from 'next/link';
import Translation, { TranslationProps } from './middlewares/Translation';

export type BreadcrumbItem = {
  href?: string;
  title: string;
  active?: boolean;
}

export type NavbarProps = TranslationProps & {
  breadcrumb?: BreadcrumbItem[];
};

export const makeRoute = (path: string[]): BreadcrumbItem[] => path.map((p, i) => {
  const data = routes[p];
  if (!data) { return { title: p, href: 'null', active: true }; }
  return {
    ...data,
    active: i === (path.length - 1),
  };
});

export default Translation('common')((props: NavbarProps) => {
  const { breadcrumb = [], t } = props;
  const dispatch = useDispatch();
  const user = useSelector<IState>(state => state.user) as IUser;
  const [navbarActive, setNavbarActive] = useState(false);

  const items = tabs.map((v) => {
    const listItems = v.list.map(v => <Link key={v.title} href={v.href}><a className="navbar-item">{t(v.title)}</a></Link>);
    return (
      <div className="navbar-item has-dropdown" key={v.label}>
        <a className="navbar-link">{t(v.label)}</a>
        <div className="navbar-dropdown">
          {listItems}
        </div>
      </div>
    )
  });

  return (
    <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <nav className="breadcrumb" aria-label="breadcrumbs" style={{ margin: 'auto 0 auto 15px' }}>
          <ul>
            <li key="home"><Icon style={{ display: 'inline' }} icon="fa-home"></Icon> </li>
            {breadcrumb.map(i => <li key={i.title} className={i.active ? 'is-active' : ''}><a href={i.href}>{t(i.title)}</a></li>)}
          </ul>
        </nav>

        <a role="button" className={`navbar-burger burger ${navbarActive ? 'is-active' : ''}`} onClick={() => setNavbarActive(!navbarActive)}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" className={`navbar-menu ${navbarActive ? 'is-active' : ''}`}>
        <div className="navbar-start is-hidden-desktop">{items}</div>
        <div className="navbar-end">
          <div className="navbar-end">

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                {user.username}
              </a>

              <div className="navbar-dropdown">
                <Link href="/profile">
                  <a className="navbar-item">
                    <Icon icon="fa-cog" style={{ marginRight: '6px' }} />
                    Settings
                  </a>
                </Link>
                <hr className="navbar-divider" />
                <a 
                  className="navbar-item" 
                  onClick={() => {
                    setAuthorization(null, null);
                    dispatch({
                      type: 'authorize',
                      logout: true,
                    });
                  }}
                >
                  <Icon icon="fa-sign-out-alt" style={{ marginRight: '6px' }} />
                  Logout
                </a>
              </div>
            </div>

            <figure className="image is-32x32 is-hidden-touch" style={{ margin: 'auto 15px auto 0' }}>
              <img className="is-rounded is-32x32" src="https://bulma.io/images/placeholders/256x256.png" />
            </figure>
          </div>
        </div>
      </div>
    </nav>
  );
});
