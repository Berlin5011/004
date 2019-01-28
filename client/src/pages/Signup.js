import React, { Component } from 'react';
import './Form.css'

class Signup extends Component{
  constructor(props){
      super(props);
      this.nameEl = React.createRef();
      this.usernameEl = React.createRef();
      this.emailEl = React.createRef();
      this.passwordEl = React.createRef();
      this.password2El = React.createRef();
  }

  submitHandler = event =>{
    event.preventDefault();
    const name=this.nameEl.current.value;
    const username=this.usernameEl.current.value;
    const email=this.emailEl.current.value;
    const password=this.passwordEl.current.value;
    const password2=this.password2El.current.value;
    if (password!==password2){
      return;
    }

    const requestBody = {
      query:
      `
      mutation{
        createUser(userInput:{name:"${name}",username:"${username}",email:"${email}",password:"${password}"}){
          _id
          username
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
        throw new Error('Failed')
      }
      return res.json();
    })
    .then(resData =>{
      console.log(resData);
    })
    .catch(err =>{
      console.log(err);
    });
  }

  render(){
    return(
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" id="Name" placeholder="Name" ref={this.nameEl} required/>
        </div>
        <div className="form-control">
          <label htmlFor="Username">Username</label>
          <input type="text" id="username" placeholder="Username" ref={this.usernameEl} required/>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" ref={this.emailEl} required/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password01" placeholder="Password" ref={this.passwordEl} required/>
        </div>
        <div className="form-control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="password02" placeholder="Confirm Password" ref={this.password2El} required/>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default Signup;
