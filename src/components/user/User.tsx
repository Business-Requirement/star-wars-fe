import React from "react";
import "./User.scss";
import { UserData } from "store/reducers/userReducer";
import { Link } from "react-router-dom";

type UserProps = UserData;

const User: React.FC<UserProps> = props => {
  return (
    <p className="com-user">
      <span className="id">{props.id}</span>
      <span className="name">{props.name}</span>
      <span className="email">{props.email}</span>
      <span className="detail">
        <Link to={"/detail/" + props.id}>Detail</Link>
      </span>
    </p>
  );
};

export default User;
