import Redux from '../components/middlewares/Redux';
import Login from '../components/middlewares/Login';
import SideMenu from '../components/SideMenu';
import Navbar from '../components/Navbar';
import Container from '../components/Container';
import { UserPermission } from '../core/authorization';

const Home = () => {
  return (
    <Container
      permissions={[UserPermission.VIEW_LOGS]}
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
