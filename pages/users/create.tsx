import Redux from '../../components/middlewares/Redux';
import Login from '../../components/middlewares/Login';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Permissions from '../../components/Permissions';
import BoxTitle from '../../components/BoxTitle';
import ErrorMessage from '../../components/ErrorMessage';
import Icon from '../../components/Icon';
import Router from 'next/router';

import { UserPermission } from '../../core/authorization';
import { makeRoute } from '../../components/Navbar';
import { useState, useRef } from 'react';
import { Request } from '../../core/api';

const ResultModal = ({ response, onClose }) => {
  return (
    <div className={`modal ${response ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Credentials</p>
        </header>
        <section className="modal-card-body">
          <Input type="text" readOnly value={response?.username ?? ''} icon="fa-user" />
          <div className="field has-addons">
            <div className="control has-icons-left" style={{ width: '100%' }}>
              <input className="input" type="text" readOnly value={response?.password ?? ''} />
              <Icon icon="fa-lock" />
            </div>
            <p className="control">
              <a className="button is-info">
                Copy
              </a>
            </p>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={() => onClose()}>Continue</button>
        </footer>
      </div>
    </div>
  );
};

const Page = () => {
  const isMounted = useRef(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const defaultPermissions = {};
  Object.keys(UserPermission).forEach(k => defaultPermissions[k] = false);

  const [permissions, setPermissions] = useState(defaultPermissions);

  return (
    <Container
      breadcrumb={makeRoute(['administration', 'users', 'users/create'])}
      permissions={[UserPermission.MANAGE_USERS]}
      page="users"
    >
      <div className="columns" style={{ margin: 0 }}>
        <ResultModal response={response?.data} onClose={() => Router.push('/users')} />
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
                const { data: { user } } = await Request.create('put')
                  .authorize()
                  .data(
                    { 
                      username, 
                      email: email.length === 0 ? null : email, 
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
