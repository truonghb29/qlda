import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Đăng nhập</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
