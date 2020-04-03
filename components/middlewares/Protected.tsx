import { useSelector } from 'react-redux';
import IState from "../../core/store";
import { IUser, UserPermission } from "../../core/authorization";
import { ReactNode } from 'react';

export type ProtectedProps = {
  children?: ReactNode;
  permissions: UserPermission[];
};

type NoAccessProps = {
  permissions: UserPermission[];
}

const NoAccess = ({ permissions }: NoAccessProps) => {
  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: '15px' }}>
      <span className="icon is-large">
        <i className="fas fa-3x fa-lock"></i>
      </span>

      <div style={{ width: '100%', textAlign: 'center' }}>
        <h3 className="subtitle" style={{ margin: '24px 0' }}>You don't have permission to view this page.</h3>
        We are sorry, but you do not have access to this page or resource.
        <br />
        If you believe this is a mistake, please contact your server administrator.

      </div>
    </div>
  );
};

export default (props: ProtectedProps) => {
  const { children, permissions } = props;
  const user = useSelector<IState>(state => state.user) as IUser;
  
  return permissions.every(p => user.permissions.includes(p)) ? <>{children}</> : <NoAccess permissions={permissions} />;
}

