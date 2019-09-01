import React, { Component } from 'react';
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRECT, LOGIN_URL } from '../../config/env';
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state= {
            username:'',
            password:'',
            isLoading:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     //   this.getPortfolioItems = this.getPortfolioItems.bind(this);
   }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }
    handleSubmit(event) {
        axios
            .post(
                "http://localhost:10177/api/auth/login",
                {
                   // "email":"br@mail.com",
                   // "password":"1234567",
                   // "remember_me":true,
                   email: this.state.email,
                   password: this.state.password,
                   "remember_me":true,                  
                }
                )
            .then(response => {   
              if (response.statusText === "OK") {
                        console.log('we are loget in');
                        this.props.handleSuccessfulAuth();
                        localStorage.setItem('token', response.data.access_token);
                        
                    } else {
                        console.log('we are not');
                        this.setState({
                            
                            errorText: "Wrong email or password"
                        });
                        this.props.handleUnsuccessfulAuth();
                    }
                })
                .catch(error => {
                    this.setState({
                        errorText: "An error occurred"
                    });

                    console.log('pissets');
                    this.props.handleUnsuccessfulAuth();
                });

            event.preventDefault();
        }
    render() {
      //  this.getPortfolioItems();
        return (

            <div>
                <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>

                <div>{this.state.errorText}</div>
                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <button className="btn" type="submit">
                        Login
                    </button>
                </form>
            </div>

        );
    }
}