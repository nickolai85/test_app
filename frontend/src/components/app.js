import React, { Component } from 'react';

import Login from './auth/login';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state= {
            isAuth:false
        }
    }
/*    async componentWillMount () {
        let token=await localStorage.getItem('token')
        if (token) {
            axios.defaults.baseURL= API_URL+'api/'
            axios.defaults.headers.common.Authorization=`Bearer ${token}`
            this.setState({
                isAuth:true
            })
        }
    }*/
  render() {
    return (
      <div className='app'>
        <h1>DevCamp React Starter</h1>
        <h2>React Redux Router</h2>
          <Login/>
      </div>
    );
  }
}
