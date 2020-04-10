import Redux from '../components/middlewares/Redux';
import Login from '../components/middlewares/Login';
import { makeRoute } from '../components/Navbar';
import Container from '../components/Container';
import { UserPermission, IUser } from '../core/authorization';
import BoxTitle from '../components/BoxTitle';
import { useSelector, useDispatch } from 'react-redux';
import IState from '../core/store';
import Permissions from '../components/Permissions';
import Icon from '../components/Icon';
import { Request, setAuthorization } from '../core/api';
import useSWR from 'swr';
import moment from 'moment';
import { useRef, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Input from '../components/Input';
import Modal from '../components/Modal';

const formatIp = (ip: string) => ip.substr(0, 7) == '::ffff:' ? ip.substr(7) : ip;

const SessionRow = ({ session, onDelete }) => {
  const { fingerprint: fp, createdAt, current } = session;
  const date = moment(createdAt).format('HH:mm:ss · DD.MM.YYYY')
  return (
    <div className="box">
      <p>
        <b>{fp.id.substr(0, 16)}</b>
        {
          current 
           ? <b className="has-text-success" style={{ float: 'right' }}>Active</b>
           : 
            <a className="has-text-danger" onClick={() => onDelete()} style={{ float: 'right' }}>
              <Icon icon="fa-times" size='small' />
            </a>
        }
      </p>
      <p className="has-text-grey">{fp.browser} ({fp.os})</p>
      <p className="has-text-grey-light">
        {formatIp(fp.ip)}
        <span className="has-text-grey" style={{ float: 'right' }}>{date}</span>
      </p>
    </div>
  );
};

const PasswordChangeModal = ({ active, onClose }) => {
  const isMounted = useRef(true);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const { loading, error, exec } = Request.create('patch').authorize().data({ old_password: oldPassword, password }).hook('/passwords');

  return (
    <Modal active={active} title="Password Change" onClose={() => onClose()}>
      <Modal.Body>
        <Input type="password" icon="fa-lock" placeholder="Current password" value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
        <Input type="password" icon="fa-lock" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)}/>
        {
          error &&
          <ErrorMessage error={error} />
        }
      </Modal.Body>
      <Modal.Footer>
        <button 
          className={`button is-info is-fullwidth ${loading ? 'is-loading' : ''}`} 
          disabled={loading} 
          onClick={async () => {
            const data = await exec();
            if (data) {
              console.log(data);

              const { access_token: accessToken, refresh_token: refreshToken } = data;
              setAuthorization(accessToken, refreshToken);

              if (isMounted) {
                onClose();

                dispatch({
                  type: 'authorize',
                  accessToken,
                  refreshToken,
                });
              }
            }
          }}
        >
          Change
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const Page = () => {
  const isMounted = useRef(true);
  const user = useSelector<IState>(state => state.user) as IUser;
  const { username, email, permissions } = user;

  const [changingPassword, setPasswordChanging] = useState(false);
  const [passwordChangeResult, setPasswordChangeResult] = useState(null);
  const [awaitingSessions, setAwaitingSessions] = useState(false);
  const { data, isValidating, revalidate, error } = useSWR('/token/sessions', Request.fetcher(true));

  return (
    <Container
      breadcrumb={makeRoute(['profile'])}
      page="profile"
    >
      <PasswordChangeModal active={changingPassword} onClose={() => setPasswordChanging(false)}/>
      <div className="columns" style={{ margin: 0 }}>
        <div className="column">
          <div className="box">
            <div className="columns">
              <div className="column is-2">
                <figure className="image is-inline-block" style={{ width: '100%', maxWidth: '128px', maxHeight: '128px', height: 'auto' }}>
                  <img src="https://bulma.io/images/placeholders/128x128.png" />
                </figure>
              </div>
              <div className="column">
                <b>{username}</b>
                <p style={{ marginBottom: '12px' }}>{email ? email : <span className="has-text-grey">no email</span>}</p>
              </div>
            </div>
            <hr style={{ marginTop: '-12px' }} />
            <Permissions value={true} permissions={permissions} />
            <hr />
            <div className="buttons">
              <button className="button is-danger is-light" disabled>
                <Icon icon="fa-trash" />
                <span>Delete account</span>
              </button>
              <button className="button is-info is-light" onClick={() => setPasswordChanging(true)}>
                <Icon icon="fa-lock" />
                <span>Change password</span>
              </button>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <BoxTitle>Active Sessions</BoxTitle>
            {
              (data && !error && !isValidating && !awaitingSessions)
                ? data.sessions.map(s => <SessionRow onDelete={async () => {
                  setAwaitingSessions(true);

                  await Request.create('delete')
                    .authorize()
                    .data({ fingerprint: s.fingerprint.id })
                    .exec('/token')
                    .catch((err) => console.error('Failed to invalidate a session', err));

                  if (isMounted) {
                    setAwaitingSessions(false);
                    revalidate();
                  }
                }} session={s} key={s.fingerprint.id} />)
                : (error ? <ErrorMessage error={error} /> : <progress className="progress" max="100" />)
            }
          </div>
        </div>
      </div>
    </Container>
  );
};

Page.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'sidemenu'],
  };
};

export default Redux(Login(Page));
