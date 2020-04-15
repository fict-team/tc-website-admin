import { InputHTMLAttributes, useState } from "react";

export type SwitchProps = {
  label: string;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void;
};

export default ({ label, onValueChange, defaultValue, ...props }: SwitchProps) => {
  const [checked, setChecked] = useState(defaultValue ?? false);

  return (
    <div className="field" {...props}>
      <input 
        type="checkbox" 
        name="switchColorDefault" 
        className="switch" 
        checked={checked}
        readOnly
      />
     <label 
        style={{ verticalAlign: 'middle' }}
        onClick={() => {
          const v = !checked;
          setChecked(v);
          if (onValueChange) {
            onValueChange(v);
          }
        }}
      >
        <span>{label}</span>
      </label>
    </div>
  );
};