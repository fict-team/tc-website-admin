import { InputHTMLAttributes } from 'react';
import Icon from './Icon';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { 
  icon?: string;
  ['data-tooltip']?: string;
};

export default (props: InputProps) => {
  const { className, ["data-tooltip"]: tooltip, icon = null, ...other } = props;
  return (
    <div className={`field ${className ? className : ''}`} data-tooltip={tooltip}>
      <div className={`control ${icon ? 'has-icons-left' : ''}`}>
          <input className="input" {...other} />
          {icon && <Icon icon={icon} />}
      </div>
    </div>
  );
};
