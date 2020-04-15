import { InputHTMLAttributes } from 'react';
import Icon from './Icon';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { 
  icon?: string;
  label?: string;
  ['data-tooltip']?: string;
};

const WithLabel = (Component, label) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal" style={{ flexGrow: 0.5, marginRight: '20px', textAlign: 'center' }}>
        <label className="label">{label}</label>
      </div>
      <div className="field-body">
        {Component}
      </div>
    </div>
  );
};

export default (props: InputProps) => {
  const { label, className, ["data-tooltip"]: tooltip, icon = null, ...other } = props;
  
  const input = (
    <div className={`field ${className ? className : ''}`} data-tooltip={tooltip}>
      <div className={`control ${icon ? 'has-icons-left' : ''}`}>
          <input className="input" {...other} />
          {icon && <Icon icon={icon} />}
      </div>
    </div>
  );

  return label ? WithLabel(input, label) : input;
};
