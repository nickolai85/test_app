
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from "react-router-dom";
 import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRECT,API_URL } from '../config/env';

import Signup from './auth/signup';
import Home from './pages/home';
import Navigation from './navigation/navigation';
import NoMatch from "./pages/no-match"
import Auth from "./pages/auth";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
  }
  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }
  checkLoginStatus() {
    
    let token = localStorage.getItem('token');
    console.log(`Bearer ${token}`);
   // console.log(token);
    let data = {headers: {
      Authorization:`Bearer ${token}`
    }};

    return axios
      .get("http://localhost:10177/api/auth/user",data
      )
      .then(response => {

        console.log(response);
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        
        // If loggedIn and status LOGGED_IN => return data
        // If loggedIn status NOT_LOGGED_IN => update state
        // If not loggedIn and status LOGGED_IN => update state
console.log('loggedIn',loggedIn);
console.log('loggedInStatus',)
        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }
  
  componentDidMount() {
    this.checkLoginStatus();
  }
  authorizedPages() {
    return [
      <Route
        key="portfolio-manager"
        path="/portfolio-manager"
        component={PortfolioManager}
      />
    ];
  }
  render() {
    return (
      <div className='app'>
       <Router>
         <div>
           {/*this.navitems()*/}
           <Navigation />
           <Switch>
              <Route exact path = "/" component={Home} />
              <Route path = "/signup" component={Signup} />
              <Route
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />
              <Route component={NoMatch} />
           </Switch>
         </div>
       </Router>

      </div>
    );
  }
}