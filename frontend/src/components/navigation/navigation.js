import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationComponent = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };
  const handleSignOut = () => {
    let token = localStorage.getItem('token');
    let data = {headers: {
      Authorization:`Bearer ${token}`
    }};
    axios
      .get("http://localhost:10177/api/auth/logout", data)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          localStorage.clear();
          props.history.push("/");
          props.handleSuccessfulLogout();
        }
        return response.data;
      })
      .catch(error => {
        console.log("Error signing out", error);
      });
  };
  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>

      </div>

      <div className="right-side">

        <a onClick={handleSignOut}>
          Logout
          </a>
        {props.loggedInStatus === "LOGGED_IN" ? (<a onClick={handleSignOut}>Sign Out</a>) : null}
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);