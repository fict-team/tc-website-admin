import { HTMLAttributes, useState } from 'react';
import Translation, { TranslationProps } from './middlewares/Translation';

export type PermissionProps = TranslationProps & {
  title: string;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void; 
};

export const Permission = Translation('permissions')((props: PermissionProps) => {
  const { t, title, defaultValue } = props;
  const [value, setValue] = useState(defaultValue ?? true);

  return (
    <span onClick={() => setValue(!value)} className={`tag is-${value ? 'success' : 'danger'}`}>{t(title)}</span>
  );
});

export type PermissionsProps = HTMLAttributes<HTMLDivElement> & { 
  permissions: string[];
  onValueChange?: (key: string, value: boolean) => void; 
};

export default (props: PermissionsProps) => {
  const { permissions, onValueChange, ...other } = props;
  const elements = permissions.map(p => <Permission key={p} title={p} defaultValue={false} onValueChange={(v) => onValueChange && onValueChange(p, v)} />);

  return <div className="permissions" {...other}>{elements}</div>;
};
