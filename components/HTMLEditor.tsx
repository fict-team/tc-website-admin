import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { Language } from "../core/language";
import Translation from '../components/middlewares/Translation';

const languages = Object.keys(Language);
const defaultContent = {};
languages.forEach(l => defaultContent[l] = '');

export default Translation('common')(({ t }) => {
  const [content, setContent] = useState({ ...defaultContent });
  const [currentTab, setCurrentTab] = useState(languages[0]);
  const tabs = languages.map(l => <li key={l} className={currentTab === l ? 'is-active' : ''}><a onClick={() => setCurrentTab(l)}>{t(l)}</a></li>)
  const editors = languages.map(l => {
    return (
      <div key={`editor_${l}`} hidden={l != currentTab}>
        <Editor
          initialValue=""
          value={content[l]}
          onEditorChange={(c) => setContent({ ...content, [l]: c })}
          
          init={{
            height: '500px',
            plugins: [
              'advlist autolink lists link image charmap preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
          />
        </div>
      );
  });

  return (
    <div>
      <div className="tabs is-centered">
        <ul>
          {tabs}
        </ul>
      </div>
      {editors}
    </div>
  );
});