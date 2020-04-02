import Redux from '../../components/middlewares/Redux';
import Login from '../../components/middlewares/Login';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Permissions from '../../components/Permissions';
import BoxTitle from '../../components/BoxTitle';

import { UserPermission } from '../../core/authorization';
import { makeRoute } from '../../components/Navbar';
import { useState, useRef } from 'react';
import { Request } from '../../core/api';
import ErrorMessage from '../../components/ErrorMessage';

const Page = () => {
  const isMounted = useRef(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const defaultPermissions = {};
  Object.keys(UserPermission).forEach(k => defaultPermissions[k] = false);

  const [permissions, setPermissions] = useState(defaultPermissions);

  console.log(permissions);

  return (
    <Container
      breadcrumb={makeRoute(['administration', 'users', 'users/create'])}
    >
      <div className="columns" style={{ margin: 0 }}>
        <div className="column">
          <div className="box">
            <BoxTitle>Account Details</BoxTitle>
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} icon="fa-user" />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} icon="fa-envelope" />
            <Input className="has-tooltip-bottom" type="password" disabled data-tooltip="First password always generates randomly." placeholder="Password" icon="fa-lock" />
          </div>
          {
            response?.error &&
            <ErrorMessage error={response.error} onClose={() => setResponse(null)} />
          }
          <button 
            disabled={loading} 
            className={`button is-info is-fullwidth ${loading ? 'is-loading' : ''}`}
            onClick={async () => {
              setLoading(true);
              
              let response;
              try {
                const user = await Request.create('put')
                  .authorize()
                  .data(
                    { 
                      username, 
                      email, 
                      permissions: Object.keys(permissions).filter(p => permissions[p]),
                    }
                  )
                  .exec('/users');

                response = { data: user };
              } catch (error) {
                response = { error };
              }

              if (isMounted) {
                setResponse(response);
                setLoading(false);
              }
            }}
          >
            Create
          </button>
        </div>
        <div className="column">
          <div className="box">
            <BoxTitle>Account Permissions</BoxTitle>
            <Permissions permissions={Object.keys(permissions)} onValueChange={(k, v) => setPermissions({ ...permissions, [k]: v })} />
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
