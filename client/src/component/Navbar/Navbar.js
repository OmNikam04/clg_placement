import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import profile_icon from "./profile_icon.jpg";
import decode from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    console.log("logged out");
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    //JWT Token expired or not
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        // if token is expires after specified time then logout
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <div className="myHeader">
        <div className="profile_div">
          <div className="userProfile">
            {/* <img src={profile_icon} alt="img" />
                <div className="user_info">
                  <h5 className="username">Om Nikam</h5>
                  <h6 className="userRole">Admin</h6>
                </div> */}
            { user ? (
              <>
                {user.result.imageUrl ?
                  <img src={user.result.imageUrl} alt={user.result.name} />: 
                  <h5>{user.result.name.charAt(0)}</h5>
                }
                <div className="user_info">
                  <h5 className="username">{user.result.name}</h5>
                  <h6 className="userRole">{user.result.role}</h6>
                </div>
              </>
            ) : (
              <>
                {/* if user doesn't exist then show dummy data */}
                <img src={profile_icon} alt="img" />
                <div className="user_info">
                  <h5 className="username">Om Nikam</h5>
                  <h6 className="userRole">Admin</h6>
                </div>
              </>
            )}
          </div>
        </div>
              {
                user? 
                  <div className="auth_div">
                  <div className="auth">
                    <Link to="/auth" className="glow-on-hover" onClick={logout}>
                      Log Out
                    </Link>
                  </div>
                </div>
                :
                <div className="auth_div">
                  <div className="auth">
                    <Link to="/auth" className="glow-on-hover">
                      Sign up
                    </Link>
                  </div>
                </div>
              }
      </div>
      <div className="area"></div>
      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/">
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className="has-subnav">
            <a href="#">
              <i className="fa fa-laptop fa-2x"></i>
              <span className="nav-text">Filter Student</span>
            </a>
          </li>
          <li className="has-subnav">
            <a href="#">
              <i className="fa fa-list fa-2x"></i>
              <span className="nav-text">Student sign up</span>
            </a>
          </li>
          <li className="has-subnav">
            <a href="#">
              <i className="fa fa-folder-open fa-2x"></i>
              <span className="nav-text">faculty sign up</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-bar-chart-o fa-2x"></i>
              <span className="nav-text">Graphs and Statistics</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-font fa-2x"></i>
              <span className="nav-text">Quotes</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-table fa-2x"></i>
              <span className="nav-text">Tables</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-map-marker fa-2x"></i>
              <span className="nav-text">Maps</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-info fa-2x"></i>
              <span className="nav-text">Documentation</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="content"></div>
    </>
  );
};

export default Navbar;
