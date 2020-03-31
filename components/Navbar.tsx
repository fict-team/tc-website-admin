import { useSelector, useDispatch } from "react-redux";
import IState from "../core/store";
import { IUser } from "../core/authorization";
import Icon from "./Icon";
import { setAuthorization } from "../core/api";

export type BreadcrumbItem = {
  href?: string;
  title: string;
  active?: boolean;
}

export type NavbarProps = {
  breadcrumb?: BreadcrumbItem[];
};

const routes = {
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
};

export const makeRoute = (path: string[]): BreadcrumbItem[] => path.map((p, i) => {
  const data = routes[p];
  if (!data) { return { title: p, href: 'null', active: true }; }
  return {
    ...data,
    active: i === (path.length - 1),
  };
});

export default (props: NavbarProps) => {
  const { breadcrumb = [] } = props;
  const dispatch = useDispatch();
  const user = useSelector<IState>(state => state.user) as IUser;

  return (
    <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" className="navbar-menu">
        <div className="navbar-start">
          <nav className="breadcrumb" aria-label="breadcrumbs" style={{ margin: 'auto 0 auto 15px' }}>
            <ul>
              <li key="home"><Icon style={{ display: 'inline' }} icon="fa-home"></Icon> </li>
              {breadcrumb.map(i => <li key={i.title} className={i.active ? 'is-active' : ''}><a href={i.href}>{i.title}</a></li>)}
            </ul>
          </nav>
        </div>
        <div className="navbar-end">
          <div className="navbar-end">

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                {user.username}
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  <Icon icon="fa-cog" style={{ marginRight: '6px' }} />
                  Settings
                </a>
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

            <figure className="image is-32x32" style={{ margin: 'auto 15px auto 0' }}>
              <img className="is-rounded is-32x32" src="https://bulma.io/images/placeholders/256x256.png" />
            </figure>
          </div>
        </div>
      </div>
    </nav>
  );
};
