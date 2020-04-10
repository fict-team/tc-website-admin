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
import Modal from '../../components/Modal';

const ResultModal = ({ response, onClose }) => {
  return (
    <Modal active={!!response} title="Credentials">
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <button className="button is-fullwidth" onClick={() => onClose()}>Continue</button>
      </Modal.Footer>
    </Modal>
  );
};

const Page = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const defaultPermissions = {};
  Object.keys(UserPermission).forEach(k => defaultPermissions[UserPermission[k]] = false);

  const [permissions, setPermissions] = useState(defaultPermissions);

  const { data, error, loading, exec, reset } = Request.create('put')
    .authorize()
    .data({
      username, 
      email: email.length === 0 ? null : email, 
      permissions: Object.keys(permissions).filter(p => permissions[p]),
    })
    .hook('/users');

  return (
    <Container
      breadcrumb={makeRoute(['administration', 'users', 'users/create'])}
      permissions={[UserPermission.MANAGE_USERS]}
      page="users"
    >
      <div className="columns" style={{ margin: 0 }}>
        <ResultModal response={data?.user} onClose={() => Router.push('/users')} />
        <div className="column">
          <div className="box">
            <BoxTitle>Account Details</BoxTitle>
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} icon="fa-user" />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} icon="fa-envelope" />
            <Input className="has-tooltip-bottom" type="password" disabled data-tooltip="First password always generates randomly." placeholder="Password" icon="fa-lock" />
          </div>
          {
            error &&
            <ErrorMessage error={error} onClose={() => reset()} />
          }
          <button 
            disabled={loading} 
            className={`button is-info is-fullwidth ${loading ? 'is-loading' : ''}`}
            onClick={() => exec()}
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
