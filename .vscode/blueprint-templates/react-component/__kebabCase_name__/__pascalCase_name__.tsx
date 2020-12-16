import './{{pascalCase name}}.scss';
import React from "react";

export interface {{pascalCase name}}Props {
  
}

const {{pascalCase name}} : React.FC<{{pascalCase name}}Props> = (props) => {
  return (
    <div className="com-{{kebabCase name}}">
      Component {{pascalCase name}}
    </div>
  );
}

export default {{pascalCase name}};