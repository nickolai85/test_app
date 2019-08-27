import React, { Component } from 'react';
//import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRECT, LOGIN_URL } from '../../config/env';
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
/*    getPortfolioItems(){
        axios.get('http://localhost:10177/test')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }*/


        handleSubmit(event) {
            axios
                .post(
                    "http://localhost:10177/api/auth/login",
                    {

                            "email":"jorik@mail.com",
                            "password":"1234567",
                            "remember_me":true,
                            "grant_type":"password",
                            "client_id":2,
                            "client_secret":"IyyVSQFfw8cdIHDBMImadounjmJo2RgRc2o3c0ut",

                    },
                    {headers:{
                            "grant_type":"password",
                            "client_id":2,
                            "client_secret":"IyyVSQFfw8cdIHDBMImadounjmJo2RgRc2o3c0ut",
                            "Content-Type": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                        }

                    }

                )
                .then(response => {
                    console.log(response);
/*                    if (response.data.status === "created") {
                        this.props.handleSuccessfulAuth();
                    } else {
                        this.setState({
                            errorText: "Wrong email or password"
                        });
                        this.props.handleUnsuccessfulAuth();
                    }*/
                })
                .catch(error => {
                    this.setState({
                        errorText: "An error occurred"
                    });

                    console.log('pissets');
                   // this.props.handleUnsuccessfulAuth();
                });

            event.preventDefault();
        }

/*    async handleSubmit(event) {
        console.log('email',this.state.email);
        console.log('psw',this.state.password);

    }*/
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