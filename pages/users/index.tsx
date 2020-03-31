import useSWR from 'swr';

import Redux from '../../components/middlewares/Redux';
import Login from '../../components/middlewares/Login';
import Container from '../../components/Container';
import Icon from '../../components/Icon';
import Link from 'next/link';

import { makeRoute } from '../../components/Navbar';
import { Request } from '../../core/api';

const UserRow = (props) => {
  const { id, username, email, createdAt } = props;

  return (
    <tr>
      <td style={{ width: '1%' }}>{id}</td>
      <td><a>{username}</a></td>
      <td>
        {
          email
            ? <a target="_blank" href={`mailto:${email}`}>{email ?? 'unknown'}</a>
            : <p className="has-text-grey">no email</p>
        }
      </td>
      <td style={{ width: '1%' }}>{createdAt}</td>
      <td style={{ width: '1%' }}>
        <button className="button is-small is-primary">
          <Icon size="small" icon="fa-pen" style={{ margin: 'auto' }} />
        </button>
      </td>
      <td style={{ width: '1%' }}>
        <button className="button is-small is-danger">
          <Icon size="small" icon="fa-trash" style={{ margin: 'auto' }} />
        </button>
      </td>
    </tr>
  );
};

const Page = () => {
  const { data, error } = useSWR('/users?take=10', Request.fetcher(true));

  return (
    <Container
      breadcrumb={makeRoute(['administration', 'users'])}
    >
      <div className="field has-addons">
        <div className="control">
          <input className="input" type="text" placeholder="Find a user" />
        </div>
        <div className="control">
          <a className="button is-info">
            Search
          </a>
        </div>
        <Link href="/users/create">
          <button className="button is-info" style={{ marginLeft: '10px' }}>
            <Icon icon="fa-user-plus" style={{ marginRight: '10px' }} />
            Create a user
          </button>
        </Link>
      </div>
      <div>
        <table className="table is-fullwidth is-bordered is-hoverable is-striped">
          <tbody>
            {data && data.users.map(u => <UserRow key={u.id} {...u} />)}
          </tbody>
        </table>
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
