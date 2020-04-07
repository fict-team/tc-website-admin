import { HTMLAttributes, useState } from 'react';
import Translation, { TranslationProps } from './middlewares/Translation';

export type PermissionProps = TranslationProps & {
  title: string;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void; 
};

export const Permission = Translation('permissions')((props: PermissionProps) => {
  const { t, onValueChange, title, defaultValue } = props;
  const [value, setValue] = useState(defaultValue);

  return (
    <span 
    className={`tag is-${value ? 'success' : 'danger'}`}
    onClick={() => { 
      if (onValueChange) { 
        const v = !value;
        setValue(v);
        onValueChange(v);
      }
    }} 
    >
      {t(title)}
    </span>
  );
});

export type PermissionsProps = HTMLAttributes<HTMLDivElement> & { 
  permissions: string[];
  value?: boolean;
  onValueChange?: (key: string, value: boolean) => void; 
};

export default (props: PermissionsProps) => {
  const { permissions, onValueChange, value, ...other } = props;
  const elements = permissions.map(p => <Permission key={p} title={p} defaultValue={value} onValueChange={onValueChange ? (v) => onValueChange(p, v) : null} />);

  return <div className="permissions" {...other}>{elements}</div>;
};
