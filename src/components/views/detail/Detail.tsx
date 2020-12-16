import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction_getUser } from "store/actions/userAction";

import "./Detail.scss";
import { UserData } from "store/reducers/userReducer";
import { StoreType } from "store";

interface DetailParams {
  id: string;
}

const Detail: React.FC = () => {
  const id = useParams<DetailParams>().id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAction_getUser(id));
  }, [dispatch, id]);

  const user = useSelector<StoreType, UserData | undefined>(state => state.user.user);

  return (
    <div className="com-detail">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      {user && (
        <div className="info">
          <p className="name">{user.name}</p>
          <p>
            Email: <span className="detail">{user.email}</span>
          </p>
          <p>
            Address:
            <span className="detail">
              {user.address.street} - {user.address.city}
            </span>
          </p>
          <p>
            Company: <span className="detail">{user.company.name}</span>
          </p>
          <p>
            Phone: <span className="detail">{user.phone}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Detail;
