import Redux from '../../components/middlewares/Redux';
import Login from '../../components/middlewares/Login';
import Container from '../../components/Container';

import { makeRoute } from '../../components/Navbar';
import { UserPermission } from '../../core/authorization';

import { Editor } from '@tinymce/tinymce-react';
import Input from '../../components/Input';
import BoxTitle from '../../components/BoxTitle';
import Switch from '../../components/Switch';

import { useState } from 'react';
import HTMLEditor from '../../components/HTMLEditor';

const Page = () => {
  const [htmlContent, setHtmlContent] = useState('');

  return (
    <Container
      breadcrumb={makeRoute(['general', 'articles'])}
      permissions={[UserPermission.MANAGE_ARTICLES]}
      page="articles"
    >
      <div className="columns" style={{ margin: 0 }}>
        <div className="column">
          <div className="box">
            <BoxTitle>Content</BoxTitle>
            <Input label="Title" type="text" />
            <HTMLEditor />
            <button className="button is-fullwidth is-link" style={{ marginTop: '15px' }}>Create</button>
          </div>
        </div>
        <div className="column is-5">
          <div className="box">
            <BoxTitle>Details</BoxTitle>
            <Switch defaultValue={false} label="Hidden" />
            <Switch defaultValue={true} label="Publish to Telegram channel" />
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
