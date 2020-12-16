import "./Dropdown.scss";
import React, { useState, useEffect } from "react";

export interface DropdownProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const DropDown = React.forwardRef<any, React.PropsWithChildren<DropdownProps>>((props, ref) => {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget) {
      let val = e.currentTarget.value;
      if (val) {
        setValue(e.currentTarget.options[e.currentTarget.selectedIndex].text);
      } else {
        setValue("");
      }
    }
  };

  useEffect(() => {
    if (props.defaultValue) {
      React.Children.toArray(props.children).some(child => {
        const childProps = (child?.valueOf() as any).props;
        if (childProps.value === props.defaultValue) {
          setValue(childProps.children);
          return true;
        }
        return false;
      });
    }
  }, [props.defaultValue, props.children]);

  return (
    <div className={`dropdown ${value ? "active" : ""}`}>
      {props.icon && <span className="icon">{props.icon}</span>}
      <input type="text" value={value} readOnly placeholder={props.placeholder} style={props.icon ? { paddingLeft: "1.8rem" } : {}} />
      <select onChange={e => onChange(e)} ref={ref} name={props.name}>
        {props.children}
      </select>
    </div>
  );
});

export default DropDown;
