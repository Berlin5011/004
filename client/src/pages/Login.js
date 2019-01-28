import React, { Component } from 'react';
import './Form.css';
import AuthContext from '../context/auth-context';

class Login extends Component{
  constructor(props){
      super(props);
      this.usernameEl = React.createRef();
      this.passwordEl = React.createRef();
  }
  static contextType=AuthContext;

  submitHandler = event =>{
    event.preventDefault();
    const username=this.usernameEl.current.value;
    const password=this.passwordEl.current.value;

    const requestBody = {
      query:
      `
      query{
        login(username:"${username}",password:"${password}"){
          userId
          token
          TokenExpiration
          userName
        }
      }
      `
    };

    fetch('http://localhost:3002/graphql',{
      method:'POST',
      body: JSON.stringify(requestBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res =>{
      if (res.status!==200 && res.status!==201){
        throw new Error('Auth Failed')
      }
      return res.json();
    })
    .then(resData =>{
      if (resData.data.login.token){
        this.context.login(
          resData.data.login.userId,
          resData.data.login.token,
          resData.data.login.TokenExpiration,
          resData.data.login.userName
        );
      }
    })
    .catch(err =>{
      console.log(err);
    });
  }
//---------------------------------
  render(){
    return(
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="Username">Username</label>
          <input type="text" id="username" ref={this.usernameEl} placeholder="Username" required/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} placeholder="Password"required/>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default Login;
