import "./Checkbox.scss";
import React from "react";

export interface CheckboxProps {
  name: string;
}

const Checkbox = React.forwardRef<any, React.HTMLProps<CheckboxProps>>((props, ref) => {
  return (
    <label className="checkbox">
      <input type="checkbox" name={props.name} ref={ref} />
      <span className="check-mark"></span>
      <p>{props.children}</p>
    </label>
  );
});

export default Checkbox;
