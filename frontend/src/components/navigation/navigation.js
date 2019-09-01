import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class Navigation extends Component {
  constructor(){
    super();
    this.state={
      pageTitle: "Welcome to xZero",
      navigation:[
        {id:0 , title: 'Signin' , link:'/auth'},
        {id:1 , title: 'Signup' , link:'/signup'}
      ]
    }
    this.navlinks = this.navlinks.bind(this);
  }
  navlinks(){
    return this.state.navigation.map(item =>{
        return <NavLink key = {item.id} to = {item.link}>
                 {item.title}
              </NavLink>
        }
      )
  }
  render() {
      return (
          <div>
             <NavLink exact to="/">
                  Home
             </NavLink>
             {this.navlinks()}
          </div>
      );
  }
}