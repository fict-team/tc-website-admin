import { HTMLAttributes } from 'react';

export type IconProps = HTMLAttributes<HTMLSpanElement> & { 
  icon: string; 
  position?: 'left' | 'right';
  size?: 'small' | 'tiny' | 'large' | 'huge' | 'big';
};

export default (props: IconProps) => {
  const { icon, position = 'left', size = 'small', ...other } = props;

  return (
    <span className={`icon is-${size} is-${position}`} {...other}>
      <i className={`fas ${icon}`}></i>
    </span>
  );
};