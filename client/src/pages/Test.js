import React, { Component } from 'react';
import './Form.css';
import AuthContext from '../context/auth-context';

class Test extends Component{
  static contextType=AuthContext;

  componentWillMount () {
    let a=JSON.parse(decodeURIComponent(this.props.match.params.id));
    this.context.login(a.address,a.email,a.phoneNumber,a.name);
  }
  componentWillUnmount () {
    let a=JSON.parse(decodeURIComponent(this.props.match.params.id));
    this.context.login(a.address,a.email,a.phoneNumber,a.name);
  }

  render(){
    return(
      <div className="result">
        <div className="form-control">
          <p>Redirecting..</p>
        </div>
      </div>
    )
  }
}

export default Test;
