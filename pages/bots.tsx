import Redux from '../components/middlewares/Redux';
import Login from '../components/middlewares/Login';
import Container from '../components/Container';

import { makeRoute } from '../components/Navbar';
import { UserPermission } from '../core/authorization';

const Page = () => {
  return (
    <Container
      breadcrumb={makeRoute(['administration', 'bots'])}
      permissions={[]}
      page="bots"
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
