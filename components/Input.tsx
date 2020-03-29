import { InputHTMLAttributes } from 'react';
import Icon from './Icon';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { 
  icon?: string;
};

export default (props: InputProps) => {
  const { icon = null, ...other } = props;

  return (
    <div className="field">
      <div className={`control ${icon ? 'has-icons-left' : ''}`}>
          <input className="input" {...other} />
          {icon && <Icon icon={icon} />}
      </div>
    </div>
  );
};
