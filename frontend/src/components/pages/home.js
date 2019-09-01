import React, { Component } from 'react';

export default class Home extends Component {
    constructor(){
        super();
        console.log("Portfolio Container has rendered");
      }
   render() {
     return (
       <div>
           <h2>Home </h2>
       </div>
     );
   }
 }