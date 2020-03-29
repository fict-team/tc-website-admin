import { useSelector } from "react-redux";
import IState from "../core/store";
import { IUser } from "../core/authorization";
import Icon from "./Icon";

export type NavbarProps = {};

export default (props: NavbarProps) => {
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
              <li><a href="#">Bulma</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Components</a></li>
              <li className="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
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
                <a className="navbar-item">
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
