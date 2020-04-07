import Redux from '../components/middlewares/Redux';
import Login from '../components/middlewares/Login';
import { makeRoute } from '../components/Navbar';
import Container from '../components/Container';
import { UserPermission } from '../core/authorization';

const Home = () => {
  return (
    <Container
      permissions={[UserPermission.VIEW_LOGS]}
      breadcrumb={makeRoute(['general', 'dashboard'])}
      page="dashboard"
    >
      hello 2
    </Container>
  );
};

Home.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'sidemenu'],
  };
};

export default Redux(Login(Home));
