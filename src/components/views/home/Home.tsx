import "./Home.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction_getUsers } from "store/actions/userAction";
import { useErrorChecker } from "store/actions/errorAction";
import { UserData, UserAction } from "store/reducers/userReducer";
import User from "components/user/User";
import { StoreType } from "store";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction_getUsers());
  }, [dispatch]);

  const users = useSelector<StoreType, UserData[]>((state) => state.user.users);
  const error = useErrorChecker(UserAction.GET_USERS);

  useEffect(() => {
    if (error) {
      console.log(JSON.stringify(error));
    }
  }, [error]);

  const userComps = users.map((user) => {
    return <User {...user} key={user.id}></User>;
  });

  return (
    <div className="com-home">
      <div className="caption">User list</div>
      <div className="com-user title">
        <p>
          <span className="id">Id</span>
          <span className="name">Name</span>
          <span className="email">Email</span>
          <span className="detail">More</span>
        </p>
      </div>
      <div className="user-list">{userComps}</div>
    </div>
  );
};

export default Home;
