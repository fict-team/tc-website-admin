import Redux from '../components/middlewares/Redux';
import Login from '../components/middlewares/Login';
import Container from '../components/Container';

import { makeRoute } from '../components/Navbar';

const Page = () => {
  return (
    <Container
      breadcrumb={makeRoute(['administration', 'bots'])}
    >
    </Container>
  );
};

Page.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'sidemenu'],
  };
};

export default Redux(Login(Page));
