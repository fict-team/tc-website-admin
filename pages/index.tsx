import Redux from '../components/middlewares/Redux';
import Login from '../components/middlewares/Login';
import SideMenu from '../components/SideMenu';
import Navbar from '../components/Navbar';
import Container from '../components/Container';

const Home = () => {
  return (
    <Container>
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
