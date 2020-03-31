import Redux from '../../components/middlewares/Redux';
import Login from '../../components/middlewares/Login';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Permissions from '../../components/Permissions';
import BoxTitle from '../../components/BoxTitle';

import { UserPermission } from '../../core/authorization';
import { makeRoute } from '../../components/Navbar';

const Page = () => {
  const permissions = {};
  Object.keys(UserPermission).forEach(k => permissions[k] = false);
  return (
    <Container
      breadcrumb={makeRoute(['administration', 'users', 'users/create'])}
    >
      <div className="columns" style={{ margin: 0 }}>
        <div className="column">
          <div className="box">
            <BoxTitle>Account Details</BoxTitle>
            <Input type="text" placeholder="Username" icon="fa-user" />
            <Input type="email" placeholder="Email" icon="fa-envelope" />
            <Input className="has-tooltip-bottom" type="password" disabled data-tooltip="First password always generates randomly." placeholder="Password" icon="fa-lock" />
          </div>
          <button className="button is-info is-fullwidth">Create</button>
        </div>
        <div className="column">
          <div className="box">
            <BoxTitle>Account Permissions</BoxTitle>
            <Permissions permissions={Object.keys(permissions)} />
          </div>
        </div>
      </div>
    </Container>
  );
};

Page.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'sidemenu', 'permissions'],
  };
};

export default Redux(Login(Page));
