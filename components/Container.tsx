import { ReactNode } from 'react';

import SideMenu from '../components/SideMenu';
import Protected from '../components/middlewares/Protected';
import Navbar, { BreadcrumbItem } from '../components/Navbar';
import { UserPermission } from '../core/authorization';

export type ContainerProps = {
  children?: ReactNode;
  breadcrumb?: BreadcrumbItem[];
  permissions?: UserPermission[];
  page?: string;
};

export default (props: ContainerProps) => {
  const { children, page, breadcrumb, permissions } = props;

  return (
    <div style={{ height: '100%' }}>
      <div className="columns" style={{ height: '100%', margin: '-0.75rem 0 0 0' }}>
        <div className="column is-2 is-hidden-touch" style={{ minWidth: '200px', maxWidth: '200px', height: '100%', backgroundColor: '#2f353a' }}>
          <SideMenu page={page} />
        </div>
        <div className="column" style={{ margin: 0, padding: 0 }}>
          <Navbar breadcrumb={breadcrumb} />
          <div style={{ padding: '15px', width: '100%', height: 'calc(100% - 3.25rem)', overflow: 'hidden' }}>
            <div style={{ overflow: 'auto', height: '100%' }}>
            {
              permissions 
                ? <Protected permissions={permissions}>{children}</Protected>
                : children
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};